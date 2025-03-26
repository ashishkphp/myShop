import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import Link from "next/link";
import Head from "next/head";
import Accordion from "../../components/Accordion";
import parse from "html-react-parser";

export default function Home() {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:1337/api/homes?populate=*");
        const json = await res.json();

        console.log("API Response:", json); // Debugging Log

        if (json?.data?.length > 0) {
          setHomeData(json.data[0]);
        } else {
          console.warn("No data found!");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!homeData) return <p>No data available.</p>;

  const {
    metaTitle,
    metaDescription,
    servicestitle,
    servicesdescription,
    Services,
    suburbtitle,
    suburbdescription,
    Suburb,
    FAQs,
    faqTitle,
    faqDescription,
    faqImage,
  } = homeData;

   const imageUrl = faqImage?.url ? `http://localhost:1337${faqImage.url}` : null;

  return (
    <div>   
    <Head>
        <title>{metaTitle || "Default Home Title"}</title>
        <meta name="description" content={metaDescription || "Default home description."} />
        <meta property="og:title" content={metaTitle || "Default Home Title"} />
        <meta property="og:description" content={metaDescription || "Default home description."} />
      </Head>
    <Layout>   

    <section className="text-gray-600 body-font">
  <div className="container px-5 py-16 mx-auto">
    <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">{homeData.servicestitle}</h1>
      <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">{homeData.servicesdescription}</p>
    </div>
    <div className="flex flex-wrap -m-4">
      {Services && Services.length > 0 ? (
              Services.map((Services) => (
      <div className="xl:w-1/3 md:w-1/2 p-4">
        <div className="border border-gray-200 p-6 rounded-lg">
          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokelinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2"><a href={`https://${Services.servicelink}`} target="_blank" rel="noopener noreferrer">
                    {Services.name}
                  </a></h2>
          <p className="leading-relaxed text-base">{Services.description}</p>
        </div>
      </div>
     ))
            ) : (
              <p>No Services available.</p>
            )}  
    </div> 
  </div>
</section>

    <section className="text-gray-600 body-font">
        <div className="container px-3 pb-16 mx-auto">
        <div className="text-center mb-10">
          <h2 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">{homeData.suburbtitle}</h2>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">{homeData.suburbdescription}</p>
        </div>
        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
          {Suburb && Suburb.length > 0 ? (
              Suburb.map((suburb) => (
          <div className="p-2 sm:w-1/4 sm:w-1/4 w-full">
            <div className="bg-gray-100 rounded flex p-4 h-full items-center">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" className="text-indigo-500 w-6 h-6 flex-shrink-0 mr-4" viewBox="0 0 24 24">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                <path d="M22 4L12 14.01l-3-3"></path>
              </svg>
              <span className="title-font font-medium"><a href={`https://${suburb.link}`} target="_blank" rel="noopener noreferrer">
                    {suburb.name}
                  </a></span>
            </div>
          </div> 
          ))
            ) : (
              <p>No suburbs available.</p>
            )}  
        </div>
              <Link href="/">
        <button className="flex mx-auto mt-10 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">View All</button>
              </Link>
        </div>
    </section>

  
<section className="text-gray-600 body-font">
<div className="container px-3 pb-16 mx-auto lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
        <div className="text-center mb-10">
          <h2 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">
            {faqTitle || "Frequently Asked Questions"}
          </h2>
          <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
            {faqDescription || "Find answers to common queries here."}
          </p>
        </div>
  <div className="container mx-auto flex px-5 md:flex-row flex-col items-center">
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0"> 
      {imageUrl && (
        <img
          src={imageUrl}
          alt={faqTitle}
          className="object-cover object-center rounded"
        />
      )} 
    </div>
    <div className="lg:flex-grow md:w-1/2  flex flex-col md:items-start md:text-left items-center text-center">
        <div className="flex flex-wrap lg:w-4/5 sm:mx-auto sm:mb-2 -mx-2">
          {FAQs.length > 0 ? (
            FAQs.map((faq) => (
              <div key={faq.id} className="p-2 w-full">
                <Accordion
                  question={faq.question}
                   answer={
                faq.answer && Array.isArray(faq.answer) && faq.answer.length > 0
                  ? faq.answer.map((ans, i) =>
                      ans.children && Array.isArray(ans.children) && ans.children.length > 0
                        ? ans.children.map((child, j) => (
                            <span key={`${i}-${j}`}>{child.text}</span>
                          ))
                        : "No answer available."
                    )
                  : "No answer available."
              }
                />
              </div>
            ))
          ) : (
            <p>No FAQs available.</p>
          )}
        </div>
      </div>
    </div>
  </div>
</section>
 
      </Layout>
    </div>
  );
}
