import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Layout from "../../components/Layout";
import { useEffect, useState } from 'react';

const About = () => {

	const [aboutData, setAboutData] = useState(null);
  	const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:1337/api/abouts/?populate=*");
        const json = await res.json();

        console.log("API Response:", json); // Debugging Log

        if (json?.data?.length > 0) {
          setAboutData(json.data[0]);
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
  if (!aboutData) return <p>No data available.</p>;

  const { Title, description, image } = aboutData;

  const imageUrl = image?.url ? `http://localhost:1337${image.url}` : null;


  return ( 
      <Layout> 
      <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{Title}</h1>
      <p className="mb-8 leading-relaxed">{description}</p> 
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6"> 
      {imageUrl && (
        <img
          src={imageUrl}
          alt={Title}
          className="mt-5 rounded-lg w-full max-w-lg"
        />
      )}
    </div>
  </div>
</section>
      </Layout>  
  );
};

export default About;
