"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useBasket } from "./BasketContext";

export default function NavBar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { basket } = useBasket();

  const isActive = (path) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav
      className="z-10 fixed top-0 w-full h-[10vh] bg-white flex justify-between items-center shadow-sm px-4"
      aria-label="Main navigation"
    >
      <img
        unoptimized="true"
        src="/logo.jpg"
        alt="App logo: stylized text or image representing the brand"
        fill="true"
        className="h-[100%] object-contain"
        priority="true"
      />

      {/* Hamburger Icon for Mobile */}
      <button
        className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-20 relative"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        onClick={() => setMenuOpen((open) => !open)}
      >
        {/* Hamburger bars */}
        <span
          className={`block h-1 w-8 rounded-full bg-blue-600 transition-all duration-300 ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block h-1 w-8 rounded-full bg-blue-600 my-1 transition-all duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block h-1 w-8 rounded-full bg-blue-600 transition-all duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>
      {/* Desktop Nav */}
      <ul className="text-[#252525] w-1/2 h-full md:flex justify-between items-center px-8 hidden">
        <li>
          <Link
            href="/"
            className={`transition-colors duration-200 ${
              isActive("/") ? "text-blue-600 font-semibold" : "hover:text-black"
            }`}
          >
            HOME
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`transition-colors duration-200 ${
              isActive("/about")
                ? "text-blue-600 font-semibold"
                : "hover:text-text-black"
            }`}
          >
            ABOUT
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className={`transition-colors duration-200 ${
              isActive("/contact")
                ? "text-blue-600 font-semibold"
                : "hover:text-text-black"
            }`}
          >
            CONTACT
          </Link>
        </li>
        <li>
          <Link
            href="/produits"
            className={`transition-colors duration-200 ${
              isActive("/produits")
                ? "text-blue-600 font-semibold"
                : "hover:text-text-black"
            }`}
          >
            PRODUITS
          </Link>
        </li>
        <li>
          <Link href="/basket" className="relative">
            🧺
            {basket.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full px-2 text-xs">
                {basket.length}
              </span>
            )}
          </Link>
        </li>
      </ul>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white/90 backdrop-blur-lg flex flex-col items-center justify-center gap-10 transition-all duration-500 z-10 md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          className="absolute top-6 right-6 text-3xl text-blue-600"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        >
          &times;
        </button>
        <Link
          href="/"
          className="text-2xl font-bold text-blue-700 hover:text-blue-900 transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          HOME
        </Link>
        <Link
          href="/about"
          className="text-2xl font-bold text-blue-700 hover:text-blue-900 transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          ABOUT
        </Link>
        <Link
          href="/contact"
          className="text-2xl font-bold text-blue-700 hover:text-blue-900 transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          CONTACT
        </Link>
        <Link
          href="/produits"
          className="text-2xl font-bold text-blue-700 hover:text-blue-900 transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          PRODUITS
        </Link>
        <Link
          href="/basket"
          className="relative text-2xl font-bold text-blue-700 hover:text-blue-900 transition-colors"
          onClick={() => setMenuOpen(false)}
        >
          🧺
          {basket.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white rounded-full px-2 text-xs">
              {basket.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
