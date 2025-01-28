import type { Metadata } from "next";
import { Bricolage_Grotesque as Grotesque } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Footer from "./footer";
// import Header from "./header";

const grotesque = Grotesque({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${grotesque.className} antialiased`}>
        {/* <Header /> */}
        <main>
          <Suspense
            fallback={
              <div className="flex min-h-screen items-center justify-center">
                <div className="text-lg">Loading...</div>
              </div>
            }
          >
            {children}
          </Suspense>
        </main>
        <Footer />
      </body>
    </html>
  );
}
