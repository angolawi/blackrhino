import { AddressInfo, ShippingQuote } from "@/types/shipping";
import { CartItem } from "@/types/product";
import {
  SHIPPING_CONFIG,
  UF_TO_REGION,
  REGIONAL_SHIPPING_RATES,
  BrazilianRegion,
} from "@/data/shippingRates";

/**
 * Remove qualquer caractere não numérico do CEP
 */
export function cleanCep(cep: string): string {
  return cep.replace(/\D/g, "");
}

/**
 * Aplica máscara de CEP brasileira (00000-000)
 */
export function formatCep(cep: string): string {
  const digits = cleanCep(cep).slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}

/**
 * Valida se possui exatamente 8 dígitos numéricos
 */
export function isValidCep(cep: string): boolean {
  return cleanCep(cep).length === 8;
}

/**
 * Consulta de endereço via ViaCEP com fallback resiliente para BrasilAPI
 */
export async function fetchAddressByCep(rawCep: string): Promise<AddressInfo | null> {
  const digits = cleanCep(rawCep);
  if (digits.length !== 8) return null;

  // Tentativa 1: ViaCEP (Padrão ouro de disponibilidade pública no Brasil)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (!data.erro) {
        return {
          cep: formatCep(digits),
          street: data.logradouro || "",
          neighborhood: data.bairro || "",
          city: data.localidade || "",
          state: (data.uf || "").toUpperCase(),
        };
      }
    }
  } catch (e) {
    console.warn("ViaCEP indisponível ou timeout, tentando BrasilAPI...", e);
  }

  // Tentativa 2: Fallback BrasilAPI
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(`https://brasilapi.com.br/api/cep/v1/${digits}`, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      return {
        cep: formatCep(digits),
        street: data.street || "",
        neighborhood: data.neighborhood || "",
        city: data.city || "",
        state: (data.state || "").toUpperCase(),
      };
    }
  } catch (e) {
    console.error("Falha ao consultar CEP nas APIs públicas brasileiras:", e);
  }

  return null;
}

/**
 * Calcula o peso estimado total do pacote em kg com base nos itens
 */
export function calculateCartWeight(items: CartItem[]): number {
  return items.reduce((totalWeight, item) => {
    let itemWeight = 1.7; // Peso médio de um kimono completo adulto

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
      itemWeight = 2.1; // Trançado pesado 550 GSM
    } else if (slug.includes("aeroweave-350") || title.includes("350")) {
      itemWeight = 1.35; // Trançado ultraleve 350 GSM
    }

    return totalWeight + itemWeight * item.quantity;
  }, 0.2); // + 200g de embalagem e saco tático de envio
}

/**
 * Motor de cotação baseado na tabela regional calibrada
 */
export function calculateRegionalShippingQuotes(
  address: AddressInfo,
  subtotal: number,
  items: CartItem[]
): ShippingQuote[] {
  const uf = address.state.toUpperCase();
  const region: BrazilianRegion = UF_TO_REGION[uf] || "SUDESTE";
  const config = REGIONAL_SHIPPING_RATES[region];

  const totalWeightKg = calculateCartWeight(items);
  const extraWeightKg = Math.max(0, totalWeightKg - SHIPPING_CONFIG.baseWeightKg);

  const qualifiesForFreeShipping = subtotal >= SHIPPING_CONFIG.freeShippingThreshold;

  const quotes: ShippingQuote[] = config.options.map((option) => {
    const extraCost = extraWeightKg * (option.extraPerKg || 0);
    const originalPrice = Math.round(option.basePrice + extraCost);

    const isFree = qualifiesForFreeShipping && option.eligibleForFreeShipping;
    const finalPrice = isFree ? 0 : originalPrice;

    return {
      id: option.id,
      name: option.name,
      carrier: option.carrier,
      price: finalPrice,
      originalPrice,
      deliveryDaysMin: option.deliveryDaysMin,
      deliveryDaysMax: option.deliveryDaysMax,
      isFree,
      badge: isFree ? "FRETE GRÁTIS" : option.badge,
    };
  });

  // Ordena: Opções gratuitas primeiro, depois mais baratas
  return quotes.sort((a, b) => {
    if (a.price === 0 && b.price !== 0) return -1;
    if (b.price === 0 && a.price !== 0) return 1;
    return a.price - b.price;
  });
}

import { calculateMelhorEnvioRates } from "./melhorEnvio";

/**
 * Função principal (Adapter): consulta prioritariamente o provedor Melhor Envio
 * e utiliza a tabela regional calibrada como fallback resiliente e determinístico.
 */
export async function getShippingQuotes(
  address: AddressInfo,
  subtotal: number,
  items: CartItem[]
): Promise<ShippingQuote[]> {
  const hasMelhorEnvioConfig = Boolean(
    process.env.NEXT_PUBLIC_MELHOR_ENVIO_TOKEN ||
    process.env.MELHOR_ENVIO_TOKEN ||
    process.env.NEXT_PUBLIC_MELHOR_ENVIO_ENDPOINT ||
    process.env.NEXT_PUBLIC_SHIPPING_API_URL
  );

  // 1. Tenta cotação via API do Melhor Envio
  if (hasMelhorEnvioConfig && items.length > 0) {
    try {
      const apiQuotes = await calculateMelhorEnvioRates(address, subtotal, items);

      if (Array.isArray(apiQuotes) && apiQuotes.length > 0) {
        // Se a entrega for no Distrito Federal, inclui a opção de Retirada no Ateliê (Sem custo)
        if (address.state.toUpperCase() === "DF") {
          const pickupOption: ShippingQuote = {
            id: "pickup",
            name: "Retirada no Ateliê Black Rhino",
            carrier: "local_pickup",
            price: 0,
            originalPrice: 0,
            deliveryDaysMin: 1,
            deliveryDaysMax: 1,
            isFree: true,
            badge: "Sem Custo",
          };

          return [pickupOption, ...apiQuotes].sort((a, b) => {
            if (a.isFree && !b.isFree) return -1;
            if (!a.isFree && b.isFree) return 1;
            return a.price - b.price;
          });
        }

        return apiQuotes;
      }
    } catch (e) {
      console.warn("Falha no provedor Melhor Envio, recorrendo à tabela regional calibrada:", e);
    }
  }

  // 2. Fallback resiliente: Motor de cálculo local calibrado (DF, Centro-Oeste, Sudeste, Sul, Nordeste, Norte)
  return calculateRegionalShippingQuotes(address, subtotal, items);
}
