import { useRouter } from "next/router";

const HiddenComponent = () => {
  const router = useRouter();

  // Hide this component on Contact Us page
  if (router.pathname === "/contact") {
    return null;
  }

  return <div>🚀 This appears on all pages except Contact Us</div>;
};

export default HiddenComponent;
