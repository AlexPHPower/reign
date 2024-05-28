"use client";

import Navbar from "~/components/navbar";
import { Toaster } from "~/components/ui/toaster";
import Footer from "~/components/footer";
import React from "react";
import { usePathname } from "next/navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/dashboard" ? <Navbar /> : null}
      {children}
      <Toaster />
      {pathname !== "/dashboard" ? <Footer /> : null}
    </>
  );
}
