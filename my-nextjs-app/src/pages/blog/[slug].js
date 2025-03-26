import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import Layout from "../../../components/Layout";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';

export default function BlogDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    async function fetchBlogDetails() {
      try {
        const res = await fetch(`http://localhost:1337/api/blogs?filters[slug][$eq]=${slug}&populate=*`);
        const json = await res.json();

        console.log("API Response:", json); // Debugging Log

        if (json.data.length > 0) {
          setBlog(json.data[0]);
        } else {
          console.warn("No blog post found!");
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogDetails();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog post not found.</p>;

  const imageUrl = blog.image?.url ? `http://localhost:1337${blog.image.url}` : null; 
  const metaTitle = blog.metaTitle || blog.title || "Default Blog Title";
  const metaDescription = blog.metaDescription || (blog.description ? blog.description.substring(0, 160) : "Default blog description.");

  return (
    <Layout>
    
    <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
      </Head> 
	<section class="text-gray-600 body-font">
		<div className="flex flex-wrap w-full pt-8 pb-8  flex-col items-center text-center"> 
            <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{blog.title}</h1>
      	</div>
		<div class="container mx-auto flex px-5 py-8 md:flex-row flex-col items-center">
			<div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
				
				<p class="mb-8 leading-relaxed">{blog.description}</p>
			</div>
			<div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
				<img
				src={imageUrl}
				alt={blog.title}
				className="object-cover object-center rounded"
				/>
			</div>
		</div>
	</section>
    </Layout>
  );
}
