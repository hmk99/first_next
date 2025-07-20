"use client";
import { useState, useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function AboutClient() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);
  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            About Us
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Story
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Welcome to our company! We are passionate about delivering
              high-quality products and exceptional service to our customers.
              Our journey began with a simple mission: to provide innovative
              solutions that make a difference in people's lives.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Our mission is to create products that not only meet but exceed
              customer expectations. We believe in continuous innovation,
              quality craftsmanship, and building lasting relationships with our
              community.
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose Us?
            </h2>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Quality products at competitive prices
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Excellent customer service
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Fast and reliable delivery
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                ️Innovation and continuous improvement
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
