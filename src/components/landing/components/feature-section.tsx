import { Card, CardContent, CardHeader } from "@/components/ui/card";
import landingData from "../data/landing.json";
import { Activity } from "react";
import { SquareText, Layers, Sparkles } from "lucide-react";

const DATA = landingData.FeaturesSection[0];

export function FeaturesSection() {
  return (
    <section className="flex flex-col gap-10 w-full items-center">
      <div className="md:w-lg space-y-5">
        <h2 className="md:text-4xl text-3xl text-center font-bold tracking-tight">
          {DATA.title}
        </h2>
        <p className="text-md text-muted-foreground text-center">
          {DATA.description}
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {DATA.cards.map((card, index) => (
          <Card className="md:w-fit" key={card.id}>
            <CardHeader>
              <Activity mode={index === 0 ? "visible" : "hidden"}>
                <Layers size="32" />
              </Activity>
              <Activity mode={index === 1 ? "visible" : "hidden"}>
                <SquareText size="32" />
              </Activity>
              <Activity mode={index === 2 ? "visible" : "hidden"}>
                <Sparkles size="32" />
              </Activity>
            </CardHeader>
            <CardContent className="space-y-2">
              <h3 className="text-lg font-bold tracking-tight">{card.title}</h3>
              <p className="text-sm text-muted-foreground">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
