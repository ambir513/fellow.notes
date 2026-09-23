"use client";
import { ThemeToggleBtn } from "@/components/landing/components/theme-toggle-btn";
import UserDropdown from "@/components/landing/components/user-dropdown";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINK = [
  { name: "Pricing", href: "/#pricing", externalLink: false },
  {
    name: "Notes",
    href: "/notes",
    externalLink: false,
  },
  {
    name: "About",
    href: "/about",
    externalLink: false,
  },
];

export function NotesHeader() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;

      if (window.scrollY > 50) {
        headerRef.current.classList.add(
          "border",
          "bg-blend-saturation",
          "bg-background/90",
          "rounded-full",
          "backdrop-blur-sm",
        );
      } else {
        headerRef.current.classList.remove(
          "border",
          "bg-blend-saturation",
          "bg-background/90",
          "rounded-full",
          "backdrop-blur-sm",
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="font-sans w-full p-4 sticky top-0 z-50 border-b bg-background">
      <div
        ref={headerRef}
        className=" mx-auto max-w-6xl flex items-center justify-between px-4 sm:px-8"
      >
        <Link href="/">
          <Image src="/brand/logo.png" alt="Logo" width={35} height={35} />
        </Link>
        <nav className="hidden sm:block">
          <ul className="flex items-center gap-x-5">
            {NAV_LINK.map((link) => (
              <li key={link.name} className="text-muted-foreground relative">
                <Link href={link.href} className="hover:text-primary">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-x-2">
          <UserDropdown />
          <ThemeToggleBtn />
        </div>
      </div>
    </header>
  );
}
