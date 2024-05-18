"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import SignUpButton from "~/components/signUpButton";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);
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
          <a href="/" className="text-xl font-semibold">
            <Image
              src="/reign.svg"
              alt="Reign Logo"
              className="h-24 w-auto invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
        <div className="mx-5 block lg:hidden">
          <button
            onClick={() => setIsNavOpen(!isNavOpen)}
            className="flex items-center rounded border px-3 py-2"
          >
            <svg
              className="h-3 w-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:block lg:flex-grow">
          <div className="text-sm lg:mr-24 lg:flex lg:justify-end">
            <SignUpButton />
          </div>
        </div>
        {isNavOpen && (
          <div
            className="fixed inset-0 z-10 bg-black bg-opacity-80 lg:hidden"
            onClick={() => setIsNavOpen(false)}
          ></div>
        )}
        <div
          className={`fixed inset-y-0 left-0 transform ${isNavOpen ? "translate-x-0" : "-translate-x-full"} z-20 w-64 p-6 text-center transition duration-300 ease-in-out lg:hidden`}
        >
          <div className="text-sm">
            <a
              href="/about"
              className="block border-b-2 border-b-destructive py-2"
            >
              About Reign
            </a>
            <a
              href="/sign-up"
              className="block border-b-2 border-b-destructive py-2"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
