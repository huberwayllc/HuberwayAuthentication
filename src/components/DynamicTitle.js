import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

function DynamicTitle() {
  const location = useLocation();
  const [pageMeta, setPageMeta] = useState({
    title: "Huberway - Optimize Your Workflow",
    description:
      "Join Huberway to optimize your business processes with CRM, email marketing, and customer support solutions.",
    keywords: "CRM, Email Marketing, Customer Support, SaaS, Huberway",
    image: "https://app.huberway.com/assets/images/home-image.png",
    url: "https://app.huberway.com/",
  });

  useEffect(() => {
    const getPageMeta = (pathname) => {
      switch (pathname) {
        case "/account/login":
          return {
            title: "Login - Huberway",
            description:
              "Login to Huberway and access your business management tools.",
            keywords: "Login, Huberway, Business Tools, CRM Access",
            image: "https://app.huberway.com/assets/images/login-image.png",
            url: "https://app.huberway.com/account/login",
          };
        case "/account/register-huberway":
          return {
            title: "Register - Huberway",
            description:
              "Create a new account to start using Huberway CRM and other tools for your business.",
            keywords: "Register, Huberway, CRM, New Account",
            image: "https://app.huberway.com/assets/images/register-image.png",
            url: "https://app.huberway.com/account/register-huberway",
          };
        case "/account/recovery":
          return {
            title: "Recover Password - Huberway",
            description:
              "Forgot your password? Recover your Huberway account here.",
            keywords: "Password Recovery, Huberway, Account Recovery",
            image: "https://app.huberway.com/assets/images/recovery-image.png",
            url: "https://app.huberway.com/account/recovery",
          };
        case "/account/dashboard":
          return {
            title: "Dashboard - Huberway",
            description: "Select your app prefer",
            keywords: "Dashboard, Huberway, Apps",
            image: "https://app.huberway.com/assets/images/recovery-image.png",
            url: "https://app.huberway.com/account/dashboard",
          };
        case "/account/pricing":
          return {
            title: "Pricing - Huberway",
            description: "Select your plane prefer",
            keywords: "Pricing, Huberway, Apps",
            image: "https://app.huberway.com/assets/images/recovery-image.png",
            url: "https://app.huberway.com/account/dashboard",
          };
        default:
          return {
            title: "404 - Page Not Found - Huberway",
            description: "The page you are looking for does not exist.",
            keywords: "404, Page Not Found, Huberway",
            image: "https://app.huberway.com/assets/images/404-image.png",
            url: "https://app.huberway.com/404",
          };
      }
    };

    const meta = getPageMeta(location.pathname);
    setPageMeta(meta);
  }, [location.pathname]);

  const { title, description, keywords, image, url } = pageMeta;

  return (
    <Helmet>
      {/* Meta tag di base */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Huberway" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Meta tag per i social network - Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Huberway" />

      {/* Meta tag per Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@Huberway" />

      {/* Meta tag di compatibilità e mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    </Helmet>
  );
}

export default DynamicTitle;
