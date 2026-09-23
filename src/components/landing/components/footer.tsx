import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Instagram,
  LinkedIn,
  X,
  YouTube,
} from "@/components/svg/index";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import { ThemeToggleBtn } from "./theme-toggle-btn";

const FOOTER_LINKS = [
  {
    name: "Company",
    category: [
      { name: "About", href: "/about" },
      { name: "Notes", href: "/notes" },
      { name: "Contact", href: "mailto:amarbiradar147@gmail.com" },
    ],
  },
  {
    name: "Legal",
    category: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms & Conditions", href: "/terms" },
      { name: "Shipping & Delivery", href: "/shipping" },
      { name: "Cancellation & Refund", href: "/cancellation" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    name: "X",
    href: "https://x.com/ambir513",
    icon: X,
  },
  {
    name: "GitHub",
    href: "https://github.com/ambir513",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/ambir513",
    icon: LinkedIn,
  },
  {
    name: "Instagram",
    href: "https://instagram.com/ambir513",
    icon: Instagram,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@ambir513",
    icon: YouTube,
  },
  {
    name: "Email",
    href: "mailto:amarbiradar147@gmail.com",
    icon: Mail,
  },
];

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="w-full">
      <Separator />

      <div className="mx-auto max-w-5xl px-6 py-12 sm:px-8">
        {/* Top section */}
        <div className="flex flex-col items-center gap-10 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          {/* Brand */}
          <div className="flex max-w-xs flex-col items-center gap-4 sm:items-start">
            <div className="flex items-center gap-3">
              <Image
                src="/brand/logo.png"
                alt="Fellow Notes Logo"
                width={36}
                height={36}
                className="rounded-md ring-2 ring-border"
                priority
              />

              <h2 className="text-lg font-bold tracking-tight">Fellow Notes</h2>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              Notes for Fellows, by Fellows. Everything BSc I.T. students need
              to study, revise, and prepare for exams.
            </p>

            {/* Social icons */}
            <div className="flex gap-1 pt-1">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="group rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <social.icon className="size-4 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid w-full grid-cols-2 gap-4 sm:w-auto sm:gap-16">
            {FOOTER_LINKS.map((group) => (
              <div
                key={group.name}
                className="flex flex-col items-center gap-3 sm:items-start"
              >
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {group.name}
                </h3>

                <ul className="flex flex-col items-center gap-2.5 sm:items-start">
                  {group.category.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-foreground/70 transition-colors hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <Separator className="my-8" />

        <div className="flex flex-col items-center gap-3 text-xs text-muted-foreground sm:flex-row sm:justify-between">
          <p>
            Built with <span className="text-red-500">♥</span> by{" "}
            <span className="font-medium text-foreground">AmBir</span>
          </p>

          <p>© {CURRENT_YEAR} Fellow Notes. All rights reserved.</p>

          <ThemeToggleBtn />
        </div>
      </div>
    </footer>
  );
}
