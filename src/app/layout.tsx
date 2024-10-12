import "~/styles/globals.css";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { Providers } from "~/components/providers";
import clsx from "clsx";
import { Link } from "@nextui-org/react";
import { Navbar } from "~/components/navbar";
import { siteConfig } from "~/config/site";

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
        <TRPCReactProvider>
          <Providers>
            <div className="relative flex flex-col">
              <Navbar />
              <main className="container py-8">{children}</main>
              <footer className="flex w-full items-center justify-center py-3">
                <Link isExternal className="flex items-center gap-1 text-current" href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template" title="nextui.org homepage">
                  <span className="text-default-600">Powered by</span>
                  <p className="text-primary">NextUI</p>
                </Link>
              </footer>
            </div>
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
