import React from "react";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { ProductClientPage } from "@/components/pdp/ProductClientPage";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) return { title: "Kimono Não Encontrado | Black Rhino Kimonos" };

  return {
    title: `${product.title} | Black Rhino Kimonos`,
    description: product.subhead,
    openGraph: {
      title: `${product.title} | Black Rhino Atelier`,
      description: product.subhead,
      images: [{ url: product.images.primary }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return <ProductClientPage product={product} relatedProducts={relatedProducts} />;
}
