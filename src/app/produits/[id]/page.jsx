import React from "react";
import Link from "next/link";
import AddToBasketButton from "./AddToBasketButton";
import ProductDetailClient from "./ProductDetailClient";

// ✅ This is required for static export
export async function generateStaticParams() {
  try {
    const res = await fetch("https://gnmc-dz.com/ecomm/all");
    const products = await res.json();

    return products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (err) {
    console.error("generateStaticParams error:", err);
    return [];
  }
}

export default async function ProductDetail({ params }) {
  const path = "https://gnmc-dz.com/ecomm/";
  const { id } = await params;
  let product = null;
  let related = [];
  let allProducts = [];

  try {
    const res = await fetch("https://gnmc-dz.com/ecomm/all");
    if (res.ok) {
      allProducts = await res.json();
      product = allProducts.find((item) => String(item.id) === String(id));
      if (product && product.categorie) {
        related = allProducts.filter(
          (item) =>
            item.categorie === product.categorie &&
            String(item.id) !== String(id)
        );
      }
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100">
        <div className="text-2xl text-gray-500">Product not found.</div>
      </div>
    );
  }

  return (
    <ProductDetailClient
      product={product}
      path={path}
      related={related}
      allProducts={allProducts}
    />
  );
}
