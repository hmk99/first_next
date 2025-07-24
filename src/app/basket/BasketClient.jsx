"use client";
import { useBasket } from "../BasketContext";
import { useState, useMemo, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";
import axios from "axios";

export default function BasketClient() {
  const path = "https://gnmc-dz.com/ecomm/";
  const { basket, removeFromBasket, setBasket } = useBasket();
  const [name, setName] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [phone, setPhone] = useState("");
  // Track quantities for each product (by index)
  const [quantities, setQuantities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sync quantities with basket length
  useEffect(() => {
    setQuantities((prev) => {
      if (basket.length !== prev.length) {
        return basket.map((_, i) => prev[i] || 1);
      }
      return prev;
    });
  }, [basket]);

  // Update quantity for a product
  const handleQuantityChange = (idx, value) => {
    const newQuantities = [...quantities];
    newQuantities[idx] = Math.max(1, Number(value));
    setQuantities(newQuantities);
  };

  // Calculate totals
  const totalItems = useMemo(
    () => quantities.reduce((sum, q) => sum + q, 0),
    [quantities, basket]
  );
  const totalPrice = basket.reduce(
    (sum, item, idx) => sum + Number(item.price) * (quantities[idx] || 1),
    0
  );

  const addCommande = async (prod) => {
    try {
      await axios.post("https://gnmc-dz.com/ecomm/addCommande", {
        gamme: prod.gamme,
        nom: prod.nom,
        numTel: prod.numTel,
        adr: prod.adr,
        qte: prod.qte,
      });
      return true;
    } catch (err) {
      console.log(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);
    for (let i = 0; i < basket.length; i++) {
      const item = basket[i];
      const order = {
        gamme: item.gamme,
        nom: name,
        numTel: phone,
        adr: wilaya,
        qte: quantities[i] || 1,
      };
      const success = await addCommande(order);
      if (!success) {
        alert("Failed to place order for " + item.gamme);
        setLoading(false);
        return;
      }
    }
    alert("Order placed successfully!");
    setName("");
    setWilaya("");
    setPhone("");
    setQuantities([]);
    setBasket([]);
    setLoading(false);
    // Optionally clear basket here
  };

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
          <div className="md:col-span-2">
            <label className="block text-lg font-semibold text-blue-900 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full px-4 py-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-blue-900 font-medium bg-blue-50"
              placeholder="Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </form>
        {basket.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-center text-gray-500 text-lg">
              Your basket is empty.
            </p>
            <a
              href="/produits"
              className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow hover:from-blue-600 hover:to-purple-600 transition text-lg mt-2"
            >
              ← Return to Products
            </a>
          </div>
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
                      className="text-black w-16 px-2 py-1 rounded border border-blue-200 text-center"
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
              disabled={
                basket.length === 0 || loading || !name || !wilaya || !phone
              }
              onClick={handleCheckout}
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
