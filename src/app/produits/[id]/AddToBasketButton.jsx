"use client";
import { useBasket } from "../../BasketContext";
import { useRef } from "react";
import { motion, useAnimation } from "framer-motion";

export default function AddToBasketButton({ product, onFlyToBasket }) {
  const path = "https://gnmc-dz.com/ecomm/";
  const { basket, addToBasket } = useBasket();
  const controls = useAnimation();
  const btnRef = useRef(null);

  const isAdded = basket.some((item) => item.id === product.id);

  const handleClick = async () => {
    if (isAdded) return;
    // Animate button
    await controls.start({
      scale: [1, 1.15, 0.95, 1],
      transition: { duration: 0.5 },
    });
    addToBasket({
      id: product.id,
      gamme: product.gamme,
      price: product.price,
      image: path + product.path,
    });
    // Trigger fly-to-basket animation in parent (if provided)
    if (onFlyToBasket) onFlyToBasket();
  };

  return (
    <motion.button
      ref={btnRef}
      className={` w-full py-4 mt-8 rounded-2xl text-xl font-bold shadow-lg transition-all duration-300 border-2 border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400
        ${
          isAdded
            ? "bg-white text-blue-600 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
        }`}
      onClick={handleClick}
      disabled={isAdded}
      animate={controls}
      whileTap={{ scale: 0.95 }}
    >
      {isAdded ? "Ajouté !" : "Ajouter Au Panier"}
    </motion.button>
  );
}
