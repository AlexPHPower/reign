import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { Providers } from "~/components/sessionProvider";
import { getServerAuthSession } from "~/server/auth";
import MainLayout from "~/components/layouts/mainLayout";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
