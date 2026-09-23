"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import landingData from "../data/landing.json";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SparklesIcon } from "lucide-react";
import { CountdownTimer } from "@/components/counter/components/count-timer";

const DATA = landingData.heroSection[0];

const AVATAR_LIST = [
  {
    id: 1,
    url: "https://pub-b289a32534284964b865f90fc9d138d6.r2.dev/review/lowly_csum.jpeg",
  },
  {
    id: 3,
    url: "https://pub-b289a32534284964b865f90fc9d138d6.r2.dev/review/aditya_gupta_2007_01.jpg",
  },
  {
    id: 4,
    url: "https://pub-b289a32534284964b865f90fc9d138d6.r2.dev/review/hii.satvika.here_.jpg",
  },
  {
    id: 5,
    url: "https://pub-b289a32534284964b865f90fc9d138d6.r2.dev/review/mandar.notfound.jpg",
  },

  {
    id: 8,
    url: "https://pub-b289a32534284964b865f90fc9d138d6.r2.dev/review/Iblame.nhr.jpeg",
  },
  {
    id: 10,
    url: "https://pub-b289a32534284964b865f90fc9d138d6.r2.dev/review/pallavii.__.23.jpeg",
  },
  {
    id: 6,
    url: "https://pub-b289a32534284964b865f90fc9d138d6.r2.dev/review/mr_vedu_06.jpg",
  },
];

const LAUNCH_DATE = "2026-10-01T00:00:00+05:30";

export function HeroSection() {
  return (
    <section className="font-sans mb-10">
      <div className="flex relative justify-center items-center flex-col gap-10 sm:py-28 py-24">
        <Image
          src={DATA.image[0].src}
          alt={DATA.image[0].alt}
          width={200}
          height={300}
          sizes="(max-width: 640px) 120px, (max-width: 1024px) 160px, 200px"
          className="dark:invert absolute left-0 top-0 w-20 h-auto sm:w-40 lg:w-48"
        />
        <Image
          src={DATA.image[1].src}
          alt={DATA.image[1].alt}
          width={200}
          height={300}
          sizes="(max-width: 640px) 120px, (max-width: 1024px) 160px, 200px"
          className="dark:invert absolute right-0 sm:bottom-0 bottom-0 w-20 h-auto sm:w-40 lg:w-48"
        />

        <div className="space-y-5 text-center">
          <div className="flex flex-col items-center gap-3">
            <Badge variant="secondary" size="sm" className="mt-8 gap-1.5">
              <SparklesIcon className="size-3.5" />
              Launching October 1, 2026
            </Badge>
            <CountdownTimer target={LAUNCH_DATE} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight md:w-2xl ">
            {DATA.title}
          </h1>
          <p className="text-base md:text-lg md:w-2xl text-muted-foreground">
            {DATA.description}
          </p>
        </div>
        <div className="flex gap-x-3 flex-wrap items-center">
          <div className="flex -space-x-[0.6rem]">
            {AVATAR_LIST.map((avatar) => (
              <Avatar key={avatar.id} className="ring-2 ring-background">
                <AvatarImage alt={`U${avatar.id}`} src={avatar.url} />
                <AvatarFallback>{`U${avatar.id}`}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <p className="text-md font-semibold">250+ Students</p>
        </div>

        <Button
          disabled={true}
          className="w-full max-w-xs sm:w-48 text-base sm:text-lg"
          render={<Link href={DATA.ctaLink} />}
        >
          {DATA.ctaText}
          {/* <IconArrowNarrowRight className="h-5 w-5" aria-hidden /> */}
        </Button>
      </div>
    </section>
  );
}
