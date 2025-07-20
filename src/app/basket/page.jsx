import BasketClient from "./BasketClient";

export const generateMetadata = () => ({
  title: "NextGen Shop | Basket",
  description: "View and manage your shopping basket at NextGen Shop.",
});

export default function BasketPage() {
  return <BasketClient />;
}
