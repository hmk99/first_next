"use client";
import { useState, useMemo } from "react";
import Prod from "../Prod";
import { AnimatePresence, motion } from "framer-motion";
import ProductQuickViewModal from "./ProductQuickViewModal";
import LoadingSpinner from "../LoadingSpinner";

// --- Skeleton Loader ---
function ProductSkeleton() {
  return (
    <div className="animate-pulse bg-white/80 rounded-xl shadow-lg p-6 flex flex-col gap-4">
      <div className="h-40 bg-gray-200 rounded-lg" />
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-100 rounded w-1/2" />
      <div className="h-4 bg-gray-100 rounded w-1/3" />
    </div>
  );
}

// --- Highlight search terms ---
function highlight(text, term) {
  if (text !== "") {
    if (!term) return text;
    const regex = new RegExp(
      `(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 text-black rounded px-1 py-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  }
}

export default function ProduitsClient({ products, path }) {
  // Extract unique gammes/categories for dropdown
  const gammes = useMemo(
    () => [...new Set(products.map((p) => p.gamme).filter(Boolean))],
    [products]
  );

  const [search, setSearch] = useState("");
  const [selectedGamme, setSelectedGamme] = useState("");
  const [sort, setSort] = useState("date-desc");
  const [loading, setLoading] = useState(false);

  // Simulate loading skeletons on first mount or when filters change
  // (In real app, tie this to actual loading state)
  const [firstLoad, setFirstLoad] = useState(true);
  useState(() => {
    setLoading(true);
    const t = setTimeout(() => {
      setLoading(false);
      setFirstLoad(false);
    }, 700);
    return () => clearTimeout(t);
  }, [search, selectedGamme, sort]);

  // Filtering and sorting logic
  const filtered = useMemo(() => {
    let filtered = products;
    if (search) {
      const s = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.dsc?.toLowerCase().includes(s) || p.gamme?.toLowerCase().includes(s)
      );
    }
    if (selectedGamme) {
      filtered = filtered.filter((p) => p.gamme === selectedGamme);
    }
    // Sorting
    if (sort === "price-asc") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sort === "date-desc") {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    } else if (sort === "date-asc") {
      filtered = [...filtered].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    }
    return filtered;
  }, [products, search, selectedGamme, sort]);

  // --- Clear Filters Button ---
  function clearFilters() {
    setSearch("");
    setSelectedGamme("");
    setSort("date-desc");
  }

  const [quickView, setQuickView] = useState(null);

  return (
    <div className="text-[#252525] min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-blue-700 mb-12 tracking-tight drop-shadow-lg">
          🛍️ Our Products
        </h1>
        {/* Search & Filter Container */}
        <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between bg-white/80 rounded-xl shadow-lg p-6">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition"
            aria-label="Search products"
          />
          <select
            value={selectedGamme}
            onChange={(e) => setSelectedGamme(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-sm transition"
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {gammes.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none shadow-sm transition"
            aria-label="Sort products"
          >
            <option value="date-desc">Newest</option>
            <option value="date-asc">Oldest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <button
            onClick={clearFilters}
            className="w-full md:w-auto px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
            aria-label="Clear filters and search"
            disabled={!search && !selectedGamme && sort === "date-desc"}
          >
            Reset Filters
          </button>
        </div>
        {/* Products Grid with AnimatePresence */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading || firstLoad ? (
            <LoadingSpinner />
          ) : filtered && filtered.length > 0 ? (
            filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ duration: 0.35, type: "spring", bounce: 0.25 }}
              >
                <Prod
                  id={item.id}
                  gamme={item.gamme}
                  price={item.price}
                  dsc={highlight(item.intro, search)}
                  isDsc={search !== ""}
                  image={path + item.path}
                  onQuickView={(prod) =>
                    setQuickView({ ...prod, image: path + item.path })
                  }
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              className="col-span-full text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key="no-products"
            >
              <p className="text-gray-500 text-lg">No products found.</p>
            </motion.div>
          )}
        </div>
        <AnimatePresence>
          {quickView && (
            <ProductQuickViewModal
              product={quickView}
              onClose={() => setQuickView(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
