import { CartItem } from "@/types/product";
import { AddressInfo, ShippingQuote } from "@/types/shipping";

export interface WhatsAppOrderPayload {
  items: CartItem[];
  subtotal?: number;
  shippingQuote?: ShippingQuote | null;
  shippingAddress?: AddressInfo | null;
  totalAmount: number;
}

export function generateWhatsAppOrderUrl(
  itemsOrPayload: CartItem[] | WhatsAppOrderPayload,
  maybeTotalAmount?: number
): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER || "5561999999999";
  const cleanPhone = phoneNumber.replace(/\D/g, "");

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const timestamp = Date.now().toString().slice(-6);
  
  const header = `*Novo Pedido via Site*\nPedido: #${timestamp}\n\n`;
  
  const itemsList = items
    .map((item) => {
      const itemSubtotal = item.quantity * item.price;
      const cutText = item.cut ? ` (${item.cut})` : "";
      return `• ${item.quantity}x ${item.title}${cutText} - ${formatter.format(itemSubtotal)}`;
    })
    .join("\n");

  let shippingText = "";
  if (shippingQuote && shippingAddress) {
    const days =
      shippingQuote.deliveryDaysMin === shippingQuote.deliveryDaysMax
        ? `${shippingQuote.deliveryDaysMin} ${
            shippingQuote.deliveryDaysMin === 1 ? "dia útil" : "dias úteis"
          }`
        : `${shippingQuote.deliveryDaysMin} a ${shippingQuote.deliveryDaysMax} dias úteis`;

    const costText = shippingQuote.isFree ? "GRÁTIS" : formatter.format(shippingQuote.price);

    const addressLine = shippingAddress.neighborhood
      ? `${shippingAddress.neighborhood}, ${shippingAddress.city} - ${shippingAddress.state}`
      : `${shippingAddress.city} - ${shippingAddress.state}`;

    shippingText =
      `\n\n*Subtotal:* ${formatter.format(subtotal)}\n` +
      `*Modalidade de Frete:* ${shippingQuote.name} (${days}) - ${costText}\n` +
      `*Endereço de Entrega:* CEP ${shippingAddress.cep} • ${addressLine}\n` +
      `*Total Final:* ${formatter.format(totalAmount)}\n\n` +
      `_(Frete estimado com base na tabela do Ateliê em Brasília/DF)_\n\n`;
  } else {
    shippingText =
      `\n\n*Subtotal:* ${formatter.format(subtotal)}\n` +
      `*Frete:* A calcular no atendimento (CEP não preenchido)\n` +
      `*Total Estimado:* ${formatter.format(totalAmount)}\n\n`;
  }

  const footer = "Gostaria de confirmar a disponibilidade e os dados para pagamento via PIX/Cartão!";

  const message = header + itemsList + shippingText + footer;
  const encodedMessage = encodeURIComponent(message);

  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
