"use client";

import * as React from "react";
import { SquareTerminal } from "lucide-react";
import { NavMain } from "@/components/appbar/nav-main";
import { NavUser } from "@/components/appbar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";

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
      icon: SquareTerminal,
      items: [
        {
          title: "Tabelas",
          url: "/dashboard/tabelas",
        },
      ],
    },
    {
      title: "Equipamentos",
      url: "#",
      isActive: true,
      icon: SquareTerminal,
      items: [
        {
          title: "Cadastro de Equipamentos",
          url: "/equipamentos/cadastro",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
