import ProduitsClient from "./ProduitsClient";

export const metadata = {
  title: "NextGen Shop | Products",
};

export default async function Produits() {
  const path = "https://gnmc-dz.com/ecomm/";
  let result = [];
  try {
    // Add caching to speed up API calls
    const prods = await fetch(`https://gnmc-dz.com/ecomm/all`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });
    if (!prods.ok) {
      console.error("API Error:", prods.status, prods.statusText);
    } else {
      result = await prods.json();
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
  return <ProduitsClient products={result} path={path} />;
}
