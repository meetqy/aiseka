import "~/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Providers } from "~/components/providers";
import clsx from "clsx";
import { Navbar } from "~/components/navbar";
import { siteConfig } from "~/config/site";
import { Footer } from "~/components/footer";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: {
    template: `%s | AISEKA`,
    default: `AISEKA | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={clsx("min-h-screen bg-content2 font-sans antialiased light")}>
        <NextTopLoader color="#115ae5" />
        <TRPCReactProvider>
          <Providers>
            <div className="relative flex flex-col">
              <Navbar />
              <main className="lg:container lg:py-8">{children}</main>
              <Footer />
            </div>
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
