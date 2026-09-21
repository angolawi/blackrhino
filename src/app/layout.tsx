import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CheckoutModal } from "@/components/checkout/CheckoutModal";

export const metadata: Metadata = {
  metadataBase: new URL("https://blackrhinokimonos.com"),
  title: "Black Rhino Kimonos | Kimonos de Alta Performance para Jiu-Jitsu",
  description:
    "Forjado para o Tatame. Feito para Durar. Kimonos trançados de alta performance para Jiu-Jitsu (BJJ), faixas graduadas e equipamentos. Do 350 GSM Ultraleve ao 550 GSM Pesado. Desenvolvidos em Brasília, DF.",
  keywords: [
    "Kimono Jiu Jitsu",
    "Kimono BJJ",
    "Black Rhino Kimonos",
    "Kimono Trançado",
    "Kimono Homologado CBJJ IBJJF",
    "Calça Ripstop",
    "Brasília DF",
  ],
  openGraph: {
    title: "Black Rhino Kimonos | Kimonos de Jiu-Jitsu de Alta Performance",
    description: "Forjado para o Tatame. Feito para Durar. 100% dedicado ao Jiu-Jitsu. Brasília, DF.",
    siteName: "Black Rhino Kimonos",
    images: [
      {
        url: "/images/products/black-gi-jacket-angle.png",
        width: 1200,
        height: 630,
        alt: "Black Rhino Kimonos",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="bg-obsidian text-bonewhite min-h-screen flex flex-col antialiased selection:bg-rhinogold selection:text-obsidian-950">
        <CartProvider>
          <LanguageProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
            <CheckoutModal />
            <MobileBottomNav />
          </LanguageProvider>
        </CartProvider>
      </body>
    </html>
  );
}
