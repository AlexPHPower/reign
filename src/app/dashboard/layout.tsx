import React from "react";
import SidebarNav from "~/components/sidebarNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SidebarNav />
      {children}
    </div>
  );
}
