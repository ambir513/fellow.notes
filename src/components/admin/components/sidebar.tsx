"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  FilePlus2,
  Files,
  CreditCard,
  Users,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV_ITEMS = [
  {
    id: "dashboard",
    label: "Analytics",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    id: "create-post",
    label: "Create Post",
    icon: FilePlus2,
    href: "/admin/create-post",
  },
  {
    id: "manage-posts",
    label: "Manage Posts",
    icon: Files,
    href: "/admin/manage-posts",
  },
  {
    id: "payments",
    label: "Payments",
    icon: CreditCard,
    href: "/admin/payments",
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
    href: "/admin/users",
  },
];

export function AppSidebar() {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center gap-2 p-4">
        <Avatar className="size-7 rounded-md">
          <AvatarImage alt="Fellow Notes" src="/brand/logo.png" />
          <AvatarFallback className="rounded-md text-xs">FN</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-sm tracking-tight">
          Fellow Notes.
        </span>
      </SidebarHeader>

      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {NAV_ITEMS.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton
                  render={<Link href={item.href} />}
                  isActive={path === item.href}
                >
                  <item.icon className="size-3.5 shrink-0" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem key="settings">
            <SidebarMenuButton
              render={<Link href="/admin/settings" />}
              isActive={path === "/admin/settings"}
            >
              <Settings className="size-3.5 shrink-0" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
