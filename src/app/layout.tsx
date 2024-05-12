import "~/styles/globals.css";
import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { Providers } from "~/components/sessionProvider";
import { getServerAuthSession } from "~/server/auth";
import MainLayout from "~/components/layouts/mainLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Reign",
  description: "Play for keeps",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const serverSession = await getServerAuthSession();

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <Providers serverSession={serverSession}>
            <MainLayout>{children}</MainLayout>
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
