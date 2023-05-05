import { Outfit } from "next/font/google";

// TODO: move globals.css to local folder
import "../styles/globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={outfit.className}>{children}</body>
  </html>
);
export default RootLayout;
