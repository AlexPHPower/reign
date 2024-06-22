"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-4 rounded-lg bg-background shadow">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="mb-4 flex items-center space-x-3 sm:mb-0 rtl:space-x-reverse"
          >
            <Image
              src="/titan.svg"
              alt="Titan Logo"
              className="h-12 w-auto invert"
              width={100}
              height={12}
              priority
            />
          </a>
          <ul className="mb-6 flex flex-wrap items-center text-sm font-medium text-white dark:text-gray-400 sm:mb-0">
            <li>
              <a
                href="#"
                className="me-4 underline-offset-8 hover:underline md:me-6"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="me-4 underline-offset-8 hover:underline md:me-6"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="me-4 underline-offset-8 hover:underline md:me-6"
              >
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="underline-offset-8 hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-primary sm:mx-auto lg:my-8" />
      </div>
    </footer>
  );
}
