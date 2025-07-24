"use client";
import { motion } from "framer-motion";
import AddToBasketButton from "./[id]/AddToBasketButton";
import Image from "next/image";
import { useEffect } from "react";

export default function ProductQuickViewModal({ product, onClose }) {
  console.log(product);

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative flex flex-col gap-6"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-blue-600"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="w-full h-64 relative rounded-xl overflow-hidden bg-gray-100">
          <img
            unoptimized="true"
            src={product.image}
            alt={product.gamme}
            fill="true"
            className="object-contain h-full w-full "
            priority="true"
          />
        </div>
        <h2 className="text-2xl font-bold text-blue-700">{product.gamme}</h2>
        <p className="text-gray-700">{product.dsc}</p>
        <div className="text-blue-700 font-extrabold text-2xl">
          {product.price} DZD
        </div>
        <AddToBasketButton product={product} />
      </motion.div>
    </motion.div>
  );
}
