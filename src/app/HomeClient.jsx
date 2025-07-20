"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function HomeClient() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);
  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-10 relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black overflow-hidden">
      {/* Hero Section */}
      <div className="absolute inset-0 -z-10">
        <img
          unoptimized="true"
          src="/globe.svg"
          alt="Background Globe"
          fill="true"
          className="object-cover opacity-10 animate-pulse"
          priority="true"
        />
      </div>
      <section className="w-full max-w-3xl text-center py-24 px-6">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-6">
          Welcome to <span className="text-blue-400">NextGen</span> Shop
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 mb-8">
          Discover the latest products, exclusive deals, and a seamless shopping
          experience. Elevate your lifestyle with our curated selection.
        </p>
        <Link
          href="/produits"
          className="inline-block bg-blue-600 hover:bg-blue-800 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300 text-lg"
        >
          Explore Products
        </Link>
      </section>
      {/* Features Section */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 px-6">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center shadow-xl border border-white/20">
          <img
            unoptimized="true"
            src="/window.svg"
            alt="Feature 1"
            width={64}
            height={64}
            className="mb-4"
          />
          <h2 className="text-xl font-bold text-white mb-2">Modern Design</h2>
          <p className="text-gray-200">
            Sleek, responsive layouts for a beautiful experience on any device.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center shadow-xl border border-white/20">
          <img
            unoptimized="true"
            src="/vercel.svg"
            alt="Feature 2"
            width={64}
            height={64}
            className="mb-4"
          />
          <h2 className="text-xl font-bold text-white mb-2">Lightning Fast</h2>
          <p className="text-gray-200">
            Powered by Next.js for instant loading and smooth navigation.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 flex flex-col items-center shadow-xl border border-white/20">
          <img
            unoptimized="true"
            src="/file.svg"
            alt="Feature 3"
            width={64}
            height={64}
            className="mb-4"
          />
          <h2 className="text-xl font-bold text-white mb-2">
            Curated Products
          </h2>
          <p className="text-gray-200">
            Handpicked selection to ensure quality and satisfaction every time.
          </p>
        </div>
      </section>
    </div>
  );
}
