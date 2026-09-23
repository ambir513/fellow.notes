import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/components/sidebar";
import AdminHeader from "@/components/admin/components/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <AdminHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
