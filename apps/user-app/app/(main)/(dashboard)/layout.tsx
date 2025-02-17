import type { Metadata } from "next";
import { SidebarProvider } from "@ui/components/ui/sidebar";
import { AppSidebar } from "../../../components/app-sidebar";

export const metadata: Metadata = {
  title: "Wallet",
  description: "Wallet Application",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div className="box-border h-[calc(100vh-60px)] overflow-hidden">
        <SidebarProvider>
          <AppSidebar />
          <div className="w-full box-border ">
            {children}
          </div>
        </SidebarProvider>
      </div>
  );
}
