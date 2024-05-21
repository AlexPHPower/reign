import "~/styles/globals.css";
import MainLayout from "~/components/layouts/mainLayout";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
