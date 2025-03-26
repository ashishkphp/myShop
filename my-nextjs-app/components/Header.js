import Link from "next/link";
import Image from "next/image";
import SEO from "./SEO";
import ReviewsSection from "../components/ReviewsSection";

export default function Header({ metaTitle, metaDescription, Component, pageProps }) {
  return (
    <>
      {/* Dynamic SEO for each page */}
      <SEO title={metaTitle} description={metaDescription} />

      <header className="text-gray-600 body-font shadow-md">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.jpg" // Ensure this image exists in the "public" folder
              alt="MyShop Logo"
              width={50}
              height={50}
              priority // Prioritizing the logo for faster loading
            />
            <span className="ml-3 text-xl font-semibold">MyShop</span>
          </Link>

          {/* Navigation */}
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link href="/" className="mr-5 hover:text-gray-900">
              Home
            </Link>
            <Link href="/about" className="mr-5 hover:text-gray-900">
              About
            </Link>
            <Link href="/services" className="mr-5 hover:text-gray-900">
              Services
            </Link>
            <Link href="/blog" className="mr-5 hover:text-gray-900">
              Blog
            </Link>
            <Link href="/contact" className="mr-5 hover:text-gray-900">
              Contact Us
            </Link>
          </nav>

          {/* Button */}
          <button className="inline-flex items-center bg-gray-100 border border-gray-300 py-2 px-4 focus:outline-none hover:bg-gray-200 rounded-lg text-sm mt-4 md:mt-0 transition-all">
            Volume Calculator
          </button>
        </div>
      </header> 
    </>
  );
}
