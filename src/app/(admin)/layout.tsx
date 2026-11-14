import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <div className="pl-64">
        <TopBar />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
      </div>
    </>
  );
}
