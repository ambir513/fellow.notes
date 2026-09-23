import { NotesHeader } from "@/components/notes/components/header";
import type { Metadata } from "next";
import FilterNotes from "@/components/notes/components/filter";

export const metadata: Metadata = {
  title: "Study Notes & PYQs",
  description:
    "Browse chapter-wise study notes and previous year question papers filtered by course, university, and semester. BSc IT, Mumbai University, and more.",
  keywords: [
    "study notes",
    "chapter wise notes",
    "PYQs",
    "previous year papers",
    "BSc IT notes",
    "Mumbai University",
    "semester notes",
    "college notes",
  ],
  openGraph: {
    title: "Study Notes & PYQs — FellowNotes",
    description:
      "Browse chapter-wise study notes and previous year question papers filtered by course, university, and semester.",
    url: "https://fellownotes.app/notes",
  },
  alternates: {
    canonical: "https://fellownotes.app/notes",
  },
};

export default function NotesPage() {
  return (
    <>
      <div>
        <NotesHeader />
        <FilterNotes />
      </div>
    </>
  );
}
