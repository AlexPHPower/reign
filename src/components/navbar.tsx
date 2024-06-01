"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import SignUpButton from "~/components/signUpButton";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`sticky top-0 z-20 transition-all duration-300 ease-in-out ${isScrolled ? "border-b-2 bg-background" : ""}`}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between">
        <div className="flex flex-shrink-0 items-center lg:ml-24">
          <a href="/" className="font-semibold lg:text-xl">
            <Image
              src="/titan.svg"
              alt="Reign Logo"
              className="h-24 w-auto invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
        <div className="lg:block lg:flex-grow">
          <div className="text-sm lg:mr-24 lg:flex lg:justify-end">
            <SignUpButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
