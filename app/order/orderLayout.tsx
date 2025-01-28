import { Suspense } from "react";
import Footer from "../footer";

export default function orderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <style jsx global>{`
        header {
          display: none;
        }
      `}</style>
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
    </>
  );
}
