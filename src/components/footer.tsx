import { siteConfig } from "~/config/site";
import { GithubIcon } from "./icons";
import { Link } from "@nextui-org/react";

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-autu container py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center md:text-left">
            <Link href="https://beian.miit.gov.cn/" target="_blank">
              蜀ICP备2023009496号
            </Link>
          </p>
          <p className="text-center text-sm leading-5 text-foreground-500">&copy; 2024{new Date().getFullYear() != 2024 && `-${new Date().getFullYear()}`} AISEKA, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
