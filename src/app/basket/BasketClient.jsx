"use client";
import { useBasket } from "../BasketContext";
import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function BasketClient() {
  const path = "https://gnmc-dz.com/ecomm/";
  const { basket, removeFromBasket } = useBasket();
  const [name, setName] = useState("");
  const [wilaya, setWilaya] = useState("");
  // Track quantities for each product (by index)
  const [quantities, setQuantities] = useState(basket.map(() => 1));
  console.log(basket);

  // Update quantity for a product
  const handleQuantityChange = (idx, value) => {
    const newQuantities = [...quantities];
    newQuantities[idx] = Math.max(1, Number(value));
    setQuantities(newQuantities);
  };

  // Calculate totals
  const totalItems = quantities.reduce((sum, q) => sum + q, 0);
  const totalPrice = basket.reduce(
    (sum, item, idx) => sum + Number(item.price) * (quantities[idx] || 1),
    0
  );

  if (!basket) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8 tracking-tight drop-shadow-lg">
          🧺 Your Basket
        </h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="block text-lg font-semibold text-blue-900 mb-2">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-blue-900 font-medium bg-blue-50"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-blue-900 mb-2">
              Wilaya
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-blue-900 font-medium bg-blue-50"
              placeholder="Your Wilaya"
              value={wilaya}
              onChange={(e) => setWilaya(e.target.value)}
            />
          </div>
        </form>
        {basket.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Your basket is empty.
          </p>
        ) : (
          <div>
            <ul className="divide-y divide-blue-100 mb-8">
              {basket.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between py-4 gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.gamme}
                      width={64}
                      height={64}
                      className="rounded-lg shadow-md border border-blue-100"
                    />
                    <div>
                      <div className="font-bold text-blue-700">
                        {item.gamme}
                      </div>
                      <div className="text-gray-500">{item.price} DZD</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={quantities[idx] || 1}
                      onChange={(e) =>
                        handleQuantityChange(idx, e.target.value)
                      }
                      className="w-16 px-2 py-1 rounded border border-blue-200 text-center"
                    />
                    <button
                      onClick={() => removeFromBasket(idx)}
                      className="ml-2 px-3 py-1 rounded bg-red-100 text-red-600 font-bold hover:bg-red-200 transition"
                      aria-label="Remove from basket"
                    >
                      &times;
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mb-8">
              <div className="text-lg font-semibold text-blue-900">
                Total Items: {totalItems}
              </div>
              <div className="text-2xl font-extrabold text-blue-700">
                {totalPrice} DZD
              </div>
            </div>
            <button
              className="w-full py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-xl shadow hover:from-blue-600 hover:to-purple-600 transition"
              disabled={basket.length === 0}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
