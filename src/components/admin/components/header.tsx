import { ThemeToggleBtn } from "@/components/landing/components/theme-toggle-btn";
import UserDropdown from "@/components/landing/components/user-dropdown";
import React from "react";

export default function AdminHeader() {
  return (
    <header className="w-full flex gap-x-3 items-center justify-end p-3.5 px-10 border-b">
      <UserDropdown />
      <ThemeToggleBtn />
    </header>
  );    
}
