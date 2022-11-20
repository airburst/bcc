import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const Document = () => (
  <Html>
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1"
      />
      <meta name="description" content="Bath Cycling Club Ride Planner" />
      <meta name="keywords" content="Bath CC Cycling Club Ride Rides Planner" />
      <meta name="author" content="Mark Fairhurst" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicon-16x16.png"
      />
      <link rel="manifest" href="/static/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/static/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#2b5797" />
      <meta name="theme-color" content="#ffffff" />
      <link
        href="https://fonts.googleapis.com/css2?family=Prompt:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <meta
        name="google-site-verification"
        content="Mo-wRmOnufCVny2ZCkZG6iEZhuO0GMB5jLGUJJ6Ne_0"
      />
    </Head>
    <body>
      <Main />
      <NextScript />
      <Script
        id="fontawesome"
        src="https://kit.fontawesome.com/329fae5f95.js"
        strategy="lazyOnload"
      />
    </body>
  </Html>
);

export default Document;
