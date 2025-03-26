import { useEffect, useState } from "react";

export default function ReviewsSection() {
  const [googleReviews, setGoogleReviews] = useState([]);
  const [facebookReviews, setFacebookReviews] = useState([]);
  const [productReviews, setProductReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const [googleRes, facebookRes, productRes] = await Promise.all([
          fetch("http://localhost:1337/api/google-reviews?populate=*"),
          fetch("http://localhost:1337/api/facebook-reviews?populate=*"),
          fetch("http://localhost:1337/api/product-reviews?populate=*"),
        ]);

        const googleData = await googleRes.json();
        const facebookData = await facebookRes.json();
        const productData = await productRes.json();
/*
        console.log(googleData);
        console.log(facebookData);
        console.log(productData);
*/
        setGoogleReviews(googleData.data || []);
        setFacebookReviews(facebookData.data || []);
        setProductReviews(productData.data || []);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    }

    fetchReviews();
  }, []);

  return (
    <section className="bg-gray-100 py-8">
      <div className="container mx-auto flex flex-wrap lg:w-1/2"> 

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Google Reviews */}
 <div className=""> 
  {googleReviews.map((review) => (
    <div key={review.id} className="flex items-center gap-4 bg-white p-4 border rounded">
      {/* Left: Image */}
      {review.googleImage && (
        <img
          src={`http://localhost:1337${review.googleImage.url}`}
          alt={review.defaultText}
          className="w-16 h-16 rounded object-cover"
        />
      )}

      {/* Right: Text Content */}
      <div>
        

        {/* ⭐ Dynamic Star Rating */}
        <p className="text-yellow-500 text-sm"><span className="text-xl">{review.totalRating}/5</span><span className="text-xs"> {"⭐".repeat(Math.round(review.totalRating))}</span></p>

       <p className="text-sm">{review.totalReviews} {review.defaultText}</p>
      </div>
    </div>
  ))}
</div>



  {/* Facebook Reviews */}
  <div className=""> 
  {facebookReviews.map((review) => (
    <div key={review.id} className="flex items-center gap-4 bg-white p-4 border rounded">
      {/* Left: Image */}
      {review.facebookImage && (
        <img
          src={`http://localhost:1337${review.facebookImage.url}`}
          alt={review.defaultText}
          className="w-16 h-16 rounded object-cover"
        />
      )}

      {/* Right: Text Content */}
      <div>
       {/* ⭐ Dynamic Star Rating */}
        <p className="text-yellow-500 text-sm"><span className="text-xl">{review.totalRating}/5</span><span className="text-xs"> {"⭐".repeat(Math.round(review.totalRating))}</span>
        </p>

       <p className="text-sm">{review.totalReviews} {review.defaultText}</p> 
        <p></p>
      </div>
    </div>
  ))}
</div>


  {/* Product Reviews */}
  <div className=""> 
  {productReviews.map((review) => (
    <div key={review.id} className="flex items-center gap-4 bg-white p-4 border rounded">
      {/* Left: Image */}
      {review.productImage && (
        <img
          src={`http://localhost:1337${review.productImage.url}`}
          alt={review.defaultText}
          className="w-16 h-16 rounded object-cover"
        />
      )}

      {/* Right: Text Content */}
      <div>
         {/* ⭐ Dynamic Star Rating */}
        <p className="text-yellow-500 text-sm"><span className="text-xl">{review.totalRating}/5</span><span className="text-xs"> {"⭐".repeat(Math.round(review.totalRating))}</span>
        </p>

       <p className="text-sm">{review.totalReviews} {review.defaultText}</p>     
      </div>
    </div>
  ))}
</div>


      </div>
      </div>
    </section>
  );
}
