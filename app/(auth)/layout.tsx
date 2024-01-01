import { Header } from "@/src/components/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <div className="flex-1 container relative">{children}</div>
      {/* <SiteFooter /> */}
    </div>
  );
}
