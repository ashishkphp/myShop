import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "../../../components/Layout";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [blogsRes, categoriesRes] = await Promise.all([
          fetch("http://localhost:1337/api/blogs?populate=*"),
          fetch("http://localhost:1337/api/blog-categories"),
        ]);

        const blogsData = await blogsRes.json();
        const categoriesData = await categoriesRes.json();

        setBlogs(blogsData.data || []);
        setFilteredBlogs(blogsData.data || []);
        setCategories(categoriesData.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
 

const handleCategoryChange = (categoryName) => {
  setSelectedCategory(categoryName);

  if (categoryName === "all") {
    setFilteredBlogs(blogs);
  } else {
    const filtered = blogs.filter((blog) => 
      blog.blog_category && blog.blog_category.name === categoryName
    );

    //console.log("Filtered Blogs:", filtered);
    setFilteredBlogs(filtered);
  }
};



  if (loading) return <p>Loading...</p>;
  if (!blogs.length) return <p>No blog posts available.</p>;

  return (
    <Layout>
      <section className="text-gray-600 body-font">
        <div className="container px-5 pt-16 mx-auto">
          <div className="flex flex-wrap w-full flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Moving Tips and Tricks
            </h1>
            {/* Category Filter */}
            <div className="mb-6">
              <button
                className={`mr-3 px-4 py-2 rounded ${selectedCategory === "all" ? "bg-indigo-500 text-white" : "bg-gray-200"}`}
                onClick={() => handleCategoryChange("all")}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`mr-3 px-4 py-2 rounded ${
                    selectedCategory === category.name ? "bg-indigo-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => handleCategoryChange(category.name)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-wrap -m-4">
            {filteredBlogs.map((blog) => {
              const { title, description, slug } = blog;
              return (
                <div key={blog.id} className="p-4 md:w-1/3">
                  <div className="border border-gray-200 p-6 rounded-lg">
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-2">
                      {title}
                    </h2>
                    <p className="leading-relaxed text-base mb-2">
                      <strong>Category: </strong>{blog.blog_category.name}
                    </p>
                    <p className="leading-relaxed text-base">
                      {description ? description.substring(0, 100) + "..." : ""}
                    </p>
                    <Link href={`/blog/${slug}`}>
                      <span className="text-indigo-500 inline-flex items-center mt-4 cursor-pointer">
                        Read More
                      </span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}
