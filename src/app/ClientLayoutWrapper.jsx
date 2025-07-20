"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import LoadingSpinner from "./LoadingSpinner";
import { BasketProvider } from "./BasketContext";
import NavBar from "./NavBar";
import { AnimatePresence, motion } from "framer-motion";

export default function ClientLayoutWrapper({ children }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events?.on("routeChangeStart", handleStart);
    router.events?.on("routeChangeComplete", handleComplete);
    router.events?.on("routeChangeError", handleComplete);

    return () => {
      router.events?.off("routeChangeStart", handleStart);
      router.events?.off("routeChangeComplete", handleComplete);
      router.events?.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <BasketProvider>
      <NavBar />
      {loading && <LoadingSpinner />}
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          className="mt-[10vh] min-h-[80vh]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {children}
        </motion.main>
      </AnimatePresence>
    </BasketProvider>
  );
}
