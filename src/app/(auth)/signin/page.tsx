import { Suspense } from "react";
import { SignIn } from "@/components/sign-in/sign-in";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Sign in to FellowNotes to access chapter-wise study notes, PYQs, and collaborative study tools.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <Suspense>
        <SignIn />
      </Suspense>
    </main>
  );
}
