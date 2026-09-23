"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  GraduationCap,
  School,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectPopup,
  SelectItem,
} from "@/components/ui/select";

const COURSES = [
  { value: "all", label: "All courses" },
  { value: "bscit", label: "BSc IT" },
];

const UNIVERSITIES = [
  { value: "all", label: "All universities" },
  { value: "mu", label: "Mumbai University" },
];

const SEMESTERS = [
  { value: "all", label: "All semesters" },
  { value: "sem1", label: "Semester 1" },
  { value: "sem2", label: "Semester 2" },
  { value: "sem3", label: "Semester 3" },
  { value: "sem4", label: "Semester 4" },
  { value: "sem5", label: "Semester 5" },
  { value: "sem6", label: "Semester 6" },
];

const FILTERS = [
  {
    key: "course",
    label: "Course",
    icon: GraduationCap,
    options: COURSES,
    placeholder: "Select course",
  },
  {
    key: "university",
    label: "University",
    icon: School,
    options: UNIVERSITIES,
    placeholder: "Select university",
  },
  {
    key: "semester",
    label: "Semester",
    icon: BookOpen,
    options: SEMESTERS,
    placeholder: "Select semester",
  },
] as const;

type FilterKey = (typeof FILTERS)[number]["key"];
type FilterState = Record<FilterKey, string>;

const DEFAULT_STATE: FilterState = {
  course: "all",
  university: "all",
  semester: "all",
};

export default function FilterNotes() {
  const [filters, setFilters] = React.useState<FilterState>(DEFAULT_STATE);

  const activeCount = Object.entries(filters).filter(
    ([, v]) => v !== "all",
  ).length;

  const setFilter = (key: FilterKey) => (value: string | null) =>
    setFilters((prev) => ({ ...prev, [key]: value ?? "all" }));

  const resetFilters = () => setFilters(DEFAULT_STATE);

  return (
    <main className="mx-auto w-full py-4 max-w-4xl mt-4 sm:mt-6 px-4 sm:px-0">
      {/* Page header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <BookOpen className="size-4.5 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Study Notes
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl text-sm sm:text-base leading-relaxed">
          Browse and filter notes by course, university, and semester. Select a
          subject to start reading.
        </p>
      </div>

      {/* Filter bar */}
      <Card className="mt-5">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-foreground">
              <SlidersHorizontal className="size-4 opacity-70" />
              <span>Filters</span>
              {activeCount > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-1 rounded-full px-2 py-0 text-xs"
                >
                  {activeCount}
                </Badge>
              )}
            </div>
            {activeCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="h-7 gap-1 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
                Clear
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-3">
            {FILTERS.map(({ key, icon: Icon, options, placeholder }) => (
              <Select
                key={key}
                value={filters[key]}
                onValueChange={setFilter(key)}
              >
                <SelectTrigger className="w-full">
                  <Icon className="size-4 mr-1.5 opacity-60" />
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectPopup>
                  {options.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectPopup>
              </Select>
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
