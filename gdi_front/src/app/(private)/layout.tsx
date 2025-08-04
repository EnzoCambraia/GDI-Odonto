"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/appbar/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { themeClasses } from "@/lib/colors";

function DynamicBreadcrumb() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const routeNames: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/equipamentos": "Equipamentos",
    "/equipamentos/cadastro": "Cadastrar Equipamento",
    "/emprestimos": "Empréstimos",
    "/usuarios": "Usuários",
    "/relatorios": "Relatórios",
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const getCurrentPageName = () => {
    return routeNames[pathname] || "Página";
  };

  if (!mounted) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Carregando...</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>{getCurrentPageName()}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          className={`flex h-16 mb-2 shrink-0 items-center justify-between transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 ${themeClasses.appbar.background} ${themeClasses.appbar.text}`}
        >
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <DynamicBreadcrumb />
          </div>
          <div className="flex items-center gap-2 px-4">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex flex-col flex-1 p-4 pt-0">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
