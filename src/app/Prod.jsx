"use client";
import React from "react";
import Image from "next/image";
import { useBasket } from "./BasketContext";
import Link from "next/link";

export default function Prod({
  id,
  gamme,
  price,
  dsc,
  image,
  onQuickView,
  isDsc,
}) {
  const { basket, addToBasket } = useBasket();
  console.log(dsc);

  // Check if this product is already in the basket
  const isAdded = basket.some(
    (item) =>
      item.gamme === gamme &&
      item.price === price &&
      item.dsc === dsc &&
      item.image === image
  );

  const handleAdd = () => {
    if (!isAdded) {
      addToBasket({ gamme, price, dsc, image });
    }
  };

  return (
    <div className=" bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl hover:shadow-blue-300  border border-blue-100 group flex flex-col justify-between pt-6 gap-5 items-center hover:scale-105 transition-all duration-300 text-[#252525]">
      <Link
        href={`/produits/${id}`}
        className="w-full flex justify-evenly items-center flex-col gap-5"
      >
        <h1 className="text-blue-600 text-center font-bold">{gamme}</h1>
        {isDsc && <p className="w-[90%] text-center">{dsc}</p>}
        <div className="relative w-[80%] h-[200px]">
          {/* Main image */}
          <img
            unoptimized="true"
            src={image}
            alt={gamme}
            fill="true"
            loading="lazy"
            className="h-[100%] w-[100%] rounded-md object-cover transition duration-300 group-hover:shadow-[0px_0px_20px_#252525] group-hover:scale-105 group-hover:object-contain"
          />
        </div>
        <h3 className="text-blue-600 text-center font-bold">{price} DZD</h3>
      </Link>

      <div className="flex w-full gap-2 px-2 pb-2">
        <div
          className={`flex-1 my-0 p-5 flex justify-center items-center font-bold rounded-b-2xl cursor-pointer transition-all duration-300 ${
            isAdded ? "bg-white text-blue-600" : "bg-blue-600 text-white"
          }`}
          onClick={handleAdd}
          style={isAdded ? { pointerEvents: "none" } : {}}
        >
          {isAdded ? "Ajouté !" : "Ajouter Au Panier"}
        </div>
        <button
          className="flex-1 my-0 p-5 flex justify-center items-center font-bold rounded-b-2xl bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 shadow-lg"
          onClick={() =>
            onQuickView && onQuickView({ id, gamme, price, dsc, image })
          }
          aria-label="Quick View"
          type="button"
        >
          Quick View
        </button>
      </div>
    </div>
  );
}
