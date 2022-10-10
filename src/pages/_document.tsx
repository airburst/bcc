import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script
          id="fontawesome"
          src="https://kit.fontawesome.com/329fae5f95.js"
          strategy="beforeInteractive"
        />
      </body>
    </Html>
  )
}
