"use client";

import * as React from "react";
import {
  ChartSpline,
  FileText,
  LogOut,
  Package,
  Package2,
  Receipt,
  TicketPercent,
} from "lucide-react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/context/userContext";

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = React.useState(() => {
    const path = pathname?.split("/")[1] || "dashboard";
    return path;
  });
  const { user, setUser } = useUser();

  const adminName = "Andrew Smith";

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: ChartSpline,
      href: "/dashboard",
    },
    {
      id: "products",
      label: "Products",
      icon: Package,
      href: "/dashboard/products",
    },
    {
      id: "invoices",
      label: "Invoices",
      icon: Receipt,
      href: "/dashboard/invoices",
    },
    {
      id: "coupons",
      label: "Coupons",
      icon: TicketPercent,
      href: "/dashboard/coupons",
    },
    {
      id: "tickets",
      label: "Tickets",
      icon: FileText,
      href: "/dashboard/tickets",
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: Package2,
      href: "/dashboard/inventory",
    },
  ];

  const handleNavigation = (id, href) => {
    setSelectedItem(id);
    router.push(href);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    console.log("Logging out...");
    router.push("/");
  };

  return (
    <div
      className="w-[280px] m-6 rounded-[28px] border-[0.5px] border-[#5D43E1]
  bg-[linear-gradient(90deg,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_22.94%,rgba(255,255,255,0)_72.33%,rgba(255,255,255,0.2)_100%),linear-gradient(119deg,#5D43E1_12.9%,#AB51DE_86.02%)]
  shadow-[0px_64px_64px_-32px_rgba(41,15,0,0.56)] backdrop-blur-[5px] flex flex-col"
    >
      {/* Header with admin profile */}
      <div className="pt-6 pb-2">
        <div className="flex flex-col items-center gap-2 px-4">
          {/* <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 overflow-hidden"> */}
          {/* <Image
              src="/placeholder.svg?height=48&width=48"
              alt="Admin avatar"
              width={48}
              height={48}
              className="rounded-full"
            /> */}
          {/* </div> */}
          <div className="flex flex-col items-center">
            <span className="text-2xl text-white">Admin</span>
          </div>
        </div>
      </div>

      {/* Menu items */}
      <div className="flex-1 px-4 py-6">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const isActive = selectedItem === item.id;
            return (
              <div key={item.id}>
                <button
                  onClick={() => handleNavigation(item.id, item.href)}
                  className={`
                    flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all
                    ${
                      isActive
                        ? "bg-white text-purple-700"
                        : "text-white hover:bg-white/10"
                    }
                  `}
                >
                  <item.icon
                    className={`
                    h-5 w-5
                    ${isActive ? "text-purple-700" : "text-white"}
                  `}
                  />
                  {item.label}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer with logout button */}
      <div className="px-4 pb-6">
        <button
          onClick={handleLogout}
          className="flex w-full items-center bg-white justify-center gap-2 rounded-xl  px-4 py-3 text-sm font-medium text-[#972cf0] cursor-pointer transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
