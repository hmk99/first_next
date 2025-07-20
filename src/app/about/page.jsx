import AboutClient from "./AboutClient";

export const generateMetadata = () => {
  return {
    title: "NextGen Shop | About Us",
    description:
      "Learn about our story, mission, and why you should choose NextGen Shop",
  };
};

export default function About() {
  return <AboutClient />;
}
