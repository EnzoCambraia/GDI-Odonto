"use client";

import * as React from "react";
import { LayoutDashboard, Package } from "lucide-react";
import { NavMain } from "@/components/appbar/nav-main";
import { NavUser } from "@/components/appbar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { themeClasses } from "@/lib/colors";

const data = {
  user: {
    name: "orsano",
    email: "orsano@example.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      isActive: true,
      icon: LayoutDashboard,
      items: [
        {
          title: "Visão Geral",
          url: "/dashboard",
          description: "Estatísticas e resumo geral",
        },
      ],
    },
    {
      title: "Inventário",
      url: "#",
      isActive: false,
      icon: Package,
      items: [
        {
          title: "Gerenciar Equipamentos",
          url: "/equipamentos/gerenciamento",
          description: "Visualizar todos os equipamentos e gerenciar",
        },
        {
          title: "Empréstimos",
          url: "/equipamentos/emprestimos",
          description: "Gerenciar empréstimos ativos",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      className={`${themeClasses.appbar.background} border-gray-200 dark:border-gray-700`}
      {...props}
    >
      <SidebarHeader
        className={`border-b border-gray-200 dark:border-gray-700 ${themeClasses.appbar.background}`}
      >
        <div
          className={`flex items-center gap-3 px-3 py-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-2 ${themeClasses.appbar.text}`}
        >
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 overflow-hidden`}
          >
            <Image
              src="/logo.png"
              alt="Logo"
              width="100"
              height="100"
              className="h-8 w-8 object-contain"
            />
          </div>
          <div
            className={`grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden ${themeClasses.appbar.text}`}
          >
            <span className="truncate font-semibold">GDI-Odonto</span>
            <span className="truncate text-xs text-sidebar-muted-foreground">
              Gestão de Equipamentos
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent
        className={`px-2 py-4 group-data-[collapsible=icon]:px-0 ${themeClasses.appbar.background}`}
      >
        <NavMain items={data.navMain} />
      </SidebarContent>

      <SidebarFooter
        className={`border-t border-gray-200 dark:border-gray-700 p-2 group-data-[collapsible=icon]:px-1 ${themeClasses.appbar.background}`}
      >
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
