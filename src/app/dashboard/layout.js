"use client";

import AuthGuard from "@/components/authGuard";
import { AdminSidebar } from "@/components/main-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UserProvider } from "@/context/userContext";
import { User } from "lucide-react";

export default function DashboardLayout({ children }) {
  return (
    <AuthGuard>
      <UserProvider>
        <SidebarProvider>
          <AdminSidebar />
          <SidebarInset>
            <div className="flex min-h-screen flex-col">
              <main className="flex-1 p-6 text-white">{children}</main>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </UserProvider>
    </AuthGuard>
  );
}
