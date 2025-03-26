import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

export default function Services() {
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "http://localhost:1337/api/all-services?populate[Services][populate]=serviceimage"
        );
        const json = await res.json();

        console.log("API Response:", json); // Debugging Log

        if (json?.data?.length > 0) {
          setServiceData(json.data[0]);
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
  if (!serviceData) return <p>No data available.</p>;

  const { title, description, Services } = serviceData;

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-16 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              {title}
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              {description}
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            {Services && Services.length > 0 ? (
              Services.map((service) => {
                // Extract the service image URL
                const imageUrl = service.serviceimage?.url
                  ? `http://localhost:1337${service.serviceimage.url}`
                  : null; 

                return (
                  <div key={service.id} className="xl:w-1/3 md:w-1/2 p-4">
                    <a
                      href={`https://${service.servicelink}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="border border-gray-200 p-6 rounded-lg">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={service.name}
                                className="w-full h-full object-cover rounded-full"
                              />
                            ) : (
                              <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                              >
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                              </svg>
                            )}
                          </div>
                          <h2 className="text-lg text-gray-900 font-medium title-font mb-2 pl-4">
                            {service.name}
                          </h2>
                        </div>
                        <p className="leading-relaxed text-base">
                          {service.description}
                        </p>
                      </div>
                    </a>
                  </div>
                );
              })
            ) : (
              <p>No Services available.</p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
