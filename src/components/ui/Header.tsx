"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SheetTrigger, SheetContent, Sheet } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import dog from "../../../public/gofetch-dog.svg";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="flex items-center justify-between px-6 py-4 md:px-8 lg:px-12">
      <Link href="/">
        <Image priority src={dog} alt="gofetch" className="h-10 w-10" />
        <span className="sr-only">gofetch</span>
      </Link>
      <Sheet open={open} onOpenChange={(val) => setOpen(val)}>
        <SheetTrigger asChild>
          <Button className="lg:hidden" size="icon" variant="outline">
            <svg
              className=" h-6 w-6"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-white dark:bg-zinc-950" side="left">
          <nav>
            {siteConfig.nav.map((item) => (
              <Link
                onClick={() => setOpen(false)}
                key={item.name}
                className="block px-4 py-2 text-lg font-semibold text-gray-600 hover:text-black dark:text-white dark:hover:text-gray-200"
                href={item.path}
              >
                {item.name}
              </Link>
            ))}
            {/* <Button className="w-full mt-4">Login</Button> */}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="hidden lg:block">
        {siteConfig.nav.map((item) => (
          <Link
            onClick={() => setOpen(false)}
            key={item.name}
            className="ml-4 text-base font-medium text-gray-600 hover:text-black dark:text-white dark:hover:text-gray-200"
            href={item.path}
          >
            {item.name}
          </Link>
        ))}
        {/* <Button className="ml-4">Login</Button> */}
      </div>
    </header>
  );
}
