import { Montserrat } from "next/font/google";
import "./globals.css";
import ClientLayoutWrapper from "./ClientLayoutWrapper";

// --- SEO: Default metadata for the app ---
export const metadata = {
  title: {
    default: "NextGen Shop",
    template: "%s",
  },
  description:
    "A modern Next.js app for movies, products, and more. Discover, shop, and enjoy!",
  openGraph: {
    title: "NextGen Shop",
    description:
      "A modern Next.js app for movies, products, and more. Discover, shop, and enjoy!",
    url: "https://yourdomain.com/",
    siteName: "NextGen Shop",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 600,
        alt: "NextGen Shop Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://yourdomain.com"),
  alternates: {
    canonical: "/",
  },
};
// --- End SEO ---

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
