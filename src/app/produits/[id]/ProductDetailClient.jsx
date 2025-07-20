"use client";
import React, { useRef, useState, useMemo } from "react";
import Link from "next/link";
import AddToBasketButton from "./AddToBasketButton";
import ZoomImg from "../ZoomImg";
import { motion } from "framer-motion";
import Prod from "../../Prod";
import LoadingSpinner from "../../LoadingSpinner";

function getRandomItems(arr, n) {
  const shuffled = arr.slice().sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

export default function ProductDetailClient({
  product,
  path,
  related,
  allProducts,
}) {
  if (!product) {
    return <LoadingSpinner />;
  }

  // --- Badge logic ---
  // New: if product.date is within last 30 days
  // Best Seller: if product.price is in top 10% of related
  const isNew = useMemo(() => {
    if (!product.date) return false;
    const prodDate = new Date(product.date);
    const now = new Date();
    const diffDays = (now - prodDate) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
  }, [product.date]);

  const isBestSeller = useMemo(() => {
    if (!related || related.length < 5) return false;
    const prices = related.map((p) => p.price).sort((a, b) => a - b);
    const threshold =
      prices[Math.floor(prices.length * 0.9)] || prices[prices.length - 1];
    return product.price >= threshold;
  }, [product.price, related]);

  // --- Carousel scroll logic ---
  const carouselRef = useRef(null);
  const scrollBy = (offset) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  // --- You may also like logic ---
  const alsoLike = useMemo(() => {
    if (!allProducts) return [];
    // Find products from other categories, not current, not self
    const others = allProducts.filter(
      (p) =>
        p.categorie && p.categorie !== product.categorie && p.id !== product.id
    );
    return getRandomItems(others, 3);
  }, [allProducts, product]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-16 px-4 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-12 border border-blue-100">
        <div className="flex-1 flex flex-col items-center justify-center">
          <Link
            href="/produits"
            className="self-start mb-6 text-blue-600 hover:underline text-lg font-semibold flex items-center gap-2"
          >
            <span className="text-2xl">←</span> Back to Products
          </Link>
          <div className="relative w-full max-w-md h-96">
            {isNew && (
              <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold px-4 py-1 rounded-full shadow-lg text-base animate-bounce select-none">
                New
              </span>
            )}
            {isBestSeller && !isNew && (
              <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold px-4 py-1 rounded-full shadow-lg text-base animate-pulse select-none">
                Best Seller
              </span>
            )}
            {product.path && (
              <ZoomImg style={{}} src={path + product.path} id={product.id} />
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-8">
          <h1 className="font-extrabold text-4xl md:text-5xl text-blue-800 mb-2 leading-tight drop-shadow-lg">
            {product.gamme}
          </h1>
          <div className="text-gray-700 text-lg md:text-xl mb-4 min-h-[64px] leading-relaxed">
            {product.intro}
          </div>
          <div className="text-blue-700 font-extrabold text-3xl md:text-4xl mb-6">
            {product.price} DA
          </div>
          <AddToBasketButton product={product} />
        </div>
      </div>
      {/* Related Products Carousel */}
      {related && related.length > 0 && (
        <div className="w-full max-w-5xl mt-16">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 ml-2">
            Related Products
          </h2>
          <div className="relative">
            <button
              onClick={() => scrollBy(-350)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-blue-100 text-blue-700 rounded-full shadow p-2 transition"
              aria-label="Scroll left"
            >
              ◀
            </button>
            <motion.div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide px-12 py-2"
              style={{ scrollSnapType: "x mandatory" }}
            >
              {related.map((item) => (
                <motion.div
                  key={item.id}
                  className="min-w-[260px] max-w-xs flex-shrink-0"
                  style={{ scrollSnapAlign: "start" }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Prod
                    id={item.id}
                    gamme={item.gamme}
                    price={item.price}
                    dsc={item.dsc}
                    image={path + item.path}
                  />
                </motion.div>
              ))}
            </motion.div>
            <button
              onClick={() => scrollBy(350)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-blue-100 text-blue-700 rounded-full shadow p-2 transition"
              aria-label="Scroll right"
            >
              ▶
            </button>
          </div>
        </div>
      )}
      {/* You may also like section */}
      {alsoLike && alsoLike.length === 3 && (
        <div className="w-full max-w-5xl mt-16">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 ml-2">
            You may also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {alsoLike.map((item) => (
              <Prod
                key={item.id}
                id={item.id}
                gamme={item.gamme}
                price={item.price}
                dsc={item.dsc}
                image={path + item.path}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
