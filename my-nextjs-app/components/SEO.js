import Head from 'next/head';

const DEFAULT_TITLE = "My Shop - Best Web Development Tips";
const DEFAULT_DESCRIPTION = "Read the latest web development blogs and tutorials.";
const DEFAULT_IMAGE = "/default-image.jpg";

const SEO = ({ title, description, image }) => {
  const pageTitle = title && title.trim() !== "" ? `${title} | My Shop` : DEFAULT_TITLE;
  const pageDescription = description && description.trim() !== "" ? description : DEFAULT_DESCRIPTION;
  const pageImage = image && image.trim() !== "" ? image : DEFAULT_IMAGE;

  return (
    <Head>
      {/* Meta Title & Description */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />

      {/* Open Graph Meta Tags (Facebook, LinkedIn) */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:type" content="website" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />
    </Head>
  );
};

export default SEO;
