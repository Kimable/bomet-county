import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "@/store/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bomet County Government",
  description: "This is the official website of Bomet County Goverment",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/bomet-logo.jpg" sizes="any" />
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
