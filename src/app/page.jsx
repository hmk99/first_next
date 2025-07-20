import HomeClient from "./HomeClient";

export const generateMetadata = () => {
  return {
    title: "NextGen Shop | HOME",
    description:
      "Welcome to NextGen Shop - Discover the latest products and exclusive deals",
  };
};

export default function Home() {
  return <HomeClient />;
}
