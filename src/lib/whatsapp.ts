import { CartItem } from "@/types/product";

export function generateWhatsAppOrderUrl(items: CartItem[], totalAmount: number): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER || "5561999999999";
  
  // Higienize o número: remove espaços, traços, parênteses, etc
  const cleanPhone = phoneNumber.replace(/\D/g, "");

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const timestamp = Date.now().toString().slice(-6);
  
  const header = `*Novo Pedido via Site*\nPedido: #${timestamp}\n\n`;
  
  const itemsList = items
    .map((item) => {
      const subtotal = item.quantity * item.price;
      const cutText = item.cut ? ` (${item.cut})` : "";
      return `• ${item.quantity}x ${item.title}${cutText} - ${formatter.format(subtotal)}`;
    })
    .join("\n");

  const totalText = `\n\n*Total:* ${formatter.format(totalAmount)}\n\n`;
  
  const footer = "Gostaria de confirmar a disponibilidade e combinar a entrega/pagamento!";
  
  const message = header + itemsList + totalText + footer;
  
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
