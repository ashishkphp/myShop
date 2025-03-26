import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import ReviewsSection from "./ReviewsSection";

export default function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // Get the page's pathname and convert it into a class-friendly format
    const pageClass = router.pathname.replace(/\//g, "-").replace(/^-/, "");

    // Add the class to the body tag
    document.body.classList.add(`page-${pageClass}`);

    // Cleanup function to remove class on route change
    return () => {
      document.body.classList.remove(`page-${pageClass}`);
    };
  }, [router.pathname]);


  // State for form data
  const [formData, setFormData] = useState({
    movingFrom: "",
    movingTo: "",
    message: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/submit-quote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json(); // Parse response

    console.log(result);

    if (response.ok) {
      alert("Form submitted successfully!qwe");
      setFormData({ movingFrom: "", movingTo: "", message: "" }); // Reset form
    } else {
      alert(`Error: ${result.error || "Something went wrong"}`);
    }
  } catch (error) {
    console.error("Submission error:", error);
    alert("Something went wrong, please try again.");
  }
};


  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Google Map Section - Hide on Contact Page */}
      {router.pathname !== "/contact" && (
        <section className="text-gray-600 body-font relative">
          <div className="absolute inset-0 bg-gray-300">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              title="map"
              scrolling="no"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.9803084406212!2d144.7353927!3d-37.8841432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad64598205047cd%3A0x3261846a688b48a4!2sCareful%20Hands%20Movers!5e0!3m2!1sen!2sin!4v1741784283312!5m2!1sen!2sin"
              style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
            ></iframe>
          </div>
          <div className="container px-5 py-24 mx-auto flex">
          
            <form 
  onSubmit={handleSubmit} 
  className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md"
>
  <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
    Instant Moving Quote
  </h2>
  <p className="leading-relaxed mb-5 text-gray-600">
    From moving & storage to packing & box hire, we do it all.
  </p>

  <div className="relative mb-4">
    <label htmlFor="moving-from" className="leading-7 text-sm text-gray-600">
      Moving From
    </label>
    <input
      type="text"
      id="moving-from"
      name="movingFrom"
      value={formData.movingFrom}
      onChange={handleChange}
      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      required
    />
  </div>

  <div className="relative mb-4">
    <label htmlFor="moving-to" className="leading-7 text-sm text-gray-600">
      Moving To
    </label>
    <input
      type="text"
      id="moving-to"
      name="movingTo"
      value={formData.movingTo}
      onChange={handleChange}
      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
      required
    />
  </div>

  <div className="relative mb-4">
    <label htmlFor="message" className="leading-7 text-sm text-gray-600">
      Message
    </label>
    <textarea
      id="message"
      name="message"
      value={formData.message}
      onChange={handleChange}
      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
      required
    ></textarea>
  </div>

  <button
    type="submit"
    className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
  >
    Get a Quote
  </button>
</form>

          </div>
        </section>
      )}

 <ReviewsSection /> 
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
