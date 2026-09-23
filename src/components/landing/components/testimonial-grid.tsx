import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import landingData from "../data/landing.json";
import { cn } from "@/lib/utils";
import {
  Card,
  CardFrame,
  CardFrameFooter,
  CardPanel,
} from "@/components/ui/card";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  insta_handle: string;
  image: string;
  review: string;
};

const DATA = landingData.testimontials.filter(
  (t): t is Testimonial => !!t.review,
);

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function hasProfile(handle: string) {
  return !!handle && handle !== "#";
}

function TestimonialTile({ card }: { card: Testimonial }) {
  const linkable = hasProfile(card.insta_handle);

  const content = (
    <CardFrame className="mb-5 w-full break-inside-avoid">
      <Card
        className={cn(
          "group relative overflow-hidden shadow-sm transition-all duration-300",
          linkable &&
            "hover:shadow-lg hover:border-foreground/20 hover:-translate-y-0.5",
        )}
      >
        <CardPanel className="p-0">
          <img
            src={card.review}
            alt={`${card.name}'s review`}
            loading="lazy"
            className="block w-full h-auto"
          />
        </CardPanel>
      </Card>

      <CardFrameFooter className="flex items-center gap-2.5">
        <Avatar className="h-8 w-8 shrink-0 border">
          <AvatarImage src={card.image} alt={card.name} />
          <AvatarFallback className="text-[10px]">
            {initials(card.name)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p
            className={cn(
              "truncate text-sm font-semibold",
              linkable && "group-hover:underline",
            )}
          >
            {card.name}
          </p>
          <p className="truncate text-xs text-muted-foreground">{card.role}</p>
        </div>
      </CardFrameFooter>
    </CardFrame>
  );

  if (!linkable) return content;

  return (
    <a
      href={`https://instagram.com/${card.insta_handle}?utm_source=fellownotes&utm_medium=website&utm_campaign=testimonial`}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      {content}
    </a>
  );
}

export function TestimonialGrid() {
  return (
    <section
      id="testimonial"
      className="flex w-full flex-col items-center gap-10 px-4 pt-24"
    >
      <div className="max-w-lg space-y-3 text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Trusted by Students
        </h2>
        <p className="text-sm text-muted-foreground md:text-base">
          Real feedback from students who&apos;ve used FellowNotes.
        </p>
      </div>

      <div className="w-full max-w-6xl columns-1 gap-5 sm:columns-2 lg:columns-3">
        {DATA.map((card) => (
          <TestimonialTile key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
