import { CartItem } from "@/types/product";
import {
  AddressInfo,
  ShippingQuote,
  ShippingCarrier,
  MelhorEnvioVolume,
  MelhorEnvioCalculateRequest,
  MelhorEnvioQuoteRaw,
} from "@/types/shipping";
import { cleanCep } from "./shipping";
import { SHIPPING_CONFIG } from "@/data/shippingRates";

/**
 * Monta os volumes do pacote para envio com base nos itens do carrinho
 */
export function buildMelhorEnvioVolumes(items: CartItem[]): MelhorEnvioVolume[] {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  // Calcula peso estimado por categoria de produto
  const calculatedWeight = items.reduce((total, item) => {
    let itemWeight = 1.7; // Kimono adulto padrão
    const slug = (item.slug || "").toLowerCase();
    const title = (item.title || "").toLowerCase();

    if (item.isAddon || slug.includes("addon") || slug.includes("tape") || slug.includes("drawstring")) {
      itemWeight = 0.15;
    } else if (slug.includes("belt") || title.includes("faixa")) {
      itemWeight = 0.35;
    } else if (slug.includes("pants") || title.includes("calça")) {
      itemWeight = 0.75;
    } else if (slug.includes("jacket") || title.includes("vagui") || title.includes("casaco")) {
      itemWeight = 1.1;
    } else if (slug.includes("armour-550") || title.includes("550")) {
      itemWeight = 2.1;
    } else if (slug.includes("aeroweave-350") || title.includes("350")) {
      itemWeight = 1.35;
    }

    return total + itemWeight * item.quantity;
  }, 0.2); // +200g de embalagem tática

  // Dimensões padrão para caixa de kimono (40x40cm com altura proporcional ao volume)
  // Limites oficiais dos Correios e Jadlog: Altura máx 100cm, soma C+L+A <= 200cm
  const calculatedHeight = Math.min(70, Math.max(15, Math.ceil(totalQuantity * 12)));
  const finalWeight = Math.max(0.3, Number(calculatedWeight.toFixed(2)));

  return [
    {
      id: "blackrhino-pack-1",
      height: calculatedHeight,
      width: 40,
      length: 40,
      weight: finalWeight,
      qntd: 1,
    },
  ];
}

/**
 * Normaliza a resposta da API v2 do Melhor Envio para o formato ShippingQuote do Black Rhino
 */
export function mapMelhorEnvioResponseToQuotes(
  rawQuotes: MelhorEnvioQuoteRaw[],
  subtotal: number
): ShippingQuote[] {
  if (!Array.isArray(rawQuotes)) {
    return [];
  }

  // 1. Filtra itens com erro de rota ou sem preço
  const validQuotes = rawQuotes.filter((item) => {
    if (item.error) return false;
    const price = parseFloat(item.custom_price || item.price || "0");
    return !isNaN(price) && price > 0;
  });

  if (validQuotes.length === 0) {
    return [];
  }

  const qualifiesForFreeShipping = subtotal >= SHIPPING_CONFIG.freeShippingThreshold;

  // 2. Transforma para ShippingQuote
  const parsedQuotes: ShippingQuote[] = validQuotes.map((item) => {
    const rawPrice = parseFloat(item.custom_price || item.price || "0");
    const originalPrice = Math.round(rawPrice * 100) / 100;

    const daysMin =
      item.custom_delivery_range?.min ??
      item.delivery_range?.min ??
      item.custom_delivery_time ??
      item.delivery_time ??
      1;

    const daysMax =
      item.custom_delivery_range?.max ??
      item.delivery_range?.max ??
      item.custom_delivery_time ??
      item.delivery_time ??
      3;

    const companyName = item.company?.name || "";
    const isCorreios = companyName.toLowerCase().includes("correios");
    const carrier: ShippingCarrier = isCorreios ? "correios" : "transportadora";

    // Formata o nome legível
    const formattedName = companyName
      ? `${companyName} - ${item.name}`
      : item.name;

    return {
      id: `me_${item.id}`,
      name: formattedName,
      carrier,
      price: originalPrice,
      originalPrice,
      deliveryDaysMin: daysMin,
      deliveryDaysMax: daysMax,
      isFree: false,
      badge: undefined,
      company: {
        id: item.company.id,
        name: companyName,
        picture: item.company.picture,
      },
      serviceId: item.id,
    };
  });

  // 3. Identifica a opção mais econômica e a mais rápida para atribuir badges
  let cheapestIndex = 0;
  let fastestIndex = 0;

  for (let i = 1; i < parsedQuotes.length; i++) {
    if (parsedQuotes[i].price < parsedQuotes[cheapestIndex].price) {
      cheapestIndex = i;
    }
    if (parsedQuotes[i].deliveryDaysMax < parsedQuotes[fastestIndex].deliveryDaysMax) {
      fastestIndex = i;
    }
  }

  // 4. Aplica Frete Grátis na opção mais econômica se atingir o limiar
  if (qualifiesForFreeShipping && parsedQuotes.length > 0) {
    parsedQuotes[cheapestIndex].isFree = true;
    parsedQuotes[cheapestIndex].price = 0;
    parsedQuotes[cheapestIndex].badge = "FRETE GRÁTIS";
  } else if (parsedQuotes.length > 0) {
    parsedQuotes[cheapestIndex].badge = "Econômico";
  }

  // Se a mais rápida for diferente da mais econômica, destaca-a
  if (fastestIndex !== cheapestIndex && !parsedQuotes[fastestIndex].isFree) {
    parsedQuotes[fastestIndex].badge = "Mais Rápido";
  }

  // 5. Ordena: Frete grátis primeiro, depois por menor preço
  return parsedQuotes.sort((a, b) => {
    if (a.isFree && !b.isFree) return -1;
    if (!a.isFree && b.isFree) return 1;
    return a.price - b.price;
  });
}

/**
 * Consulta a API do Melhor Envio para cotação de frete em tempo real
 */
export async function calculateMelhorEnvioRates(
  address: AddressInfo,
  subtotal: number,
  items: CartItem[]
): Promise<ShippingQuote[]> {
  const endpoint =
    process.env.NEXT_PUBLIC_MELHOR_ENVIO_ENDPOINT ||
    process.env.NEXT_PUBLIC_SHIPPING_API_URL ||
    "https://melhorenvio.com.br/api/v2/me/shipment/calculate";

  const token =
    process.env.NEXT_PUBLIC_MELHOR_ENVIO_TOKEN ||
    process.env.MELHOR_ENVIO_TOKEN ||
    "";

  const originCep =
    process.env.NEXT_PUBLIC_SHIPPING_ORIGIN_CEP ||
    SHIPPING_CONFIG.originCep ||
    "71590476";

  const destCep = cleanCep(address.cep);
  const cleanOrigin = cleanCep(originCep);

  if (destCep.length !== 8 || cleanOrigin.length !== 8 || items.length === 0) {
    return [];
  }

  const volumes = buildMelhorEnvioVolumes(items);

  const payload: MelhorEnvioCalculateRequest = {
    from: {
      postal_code: cleanOrigin,
    },
    to: {
      postal_code: destCep,
    },
    volumes,
    options: {
      receipt: false,
      own_hand: false,
    },
  };

  const servicesConfig = process.env.NEXT_PUBLIC_MELHOR_ENVIO_SERVICES;
  if (servicesConfig) {
    payload.services = servicesConfig;
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "User-Agent": "BlackRhino/1.0 (contato@blackrhino.com.br)",
  };

  if (token) {
    headers["Authorization"] = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6500);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.warn(
        `Melhor Envio respondeu status HTTP ${response.status}: ${errorText.slice(0, 150)}`
      );
      return [];
    }

    const data = await response.json();

    // Se a resposta vier encapsulada (ex: por um proxy { quotes: [...] })
    const rawList: MelhorEnvioQuoteRaw[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.quotes)
      ? data.quotes
      : [];

    return mapMelhorEnvioResponseToQuotes(rawList, subtotal);
  } catch (err: unknown) {
    clearTimeout(timeoutId);
    console.warn("Falha na chamada à API do Melhor Envio (CORS/rede/timeout):", err);
    return [];
  }
}
