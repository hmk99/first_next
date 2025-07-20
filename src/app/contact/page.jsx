import ContactClient from "./ContactClient";

export const generateMetadata = () => {
  return {
    title: "NextGen Shop | Contact Us",
    description:
      "Get in touch with NextGen Shop. We're here to help with any questions or support you need.",
  };
};

export default function Contact() {
  return <ContactClient />;
}
