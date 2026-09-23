import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import landingData from "../data/landing.json";
import { Activity } from "react";
import { Zap, Layers, Users, Check, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const DATA = landingData.pricingSection[0];

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="flex flex-col gap-10 w-full items-center pt-24 mb-0"
    >
      <div className="md:w-2xl space-y-5">
        <div className="flex items-center justify-center gap-2">
          <h2 className="md:text-4xl text-3xl text-center font-bold tracking-tight">
            {DATA.title}
          </h2>
        </div>
        <p className="text-md text-muted-foreground text-center">
          {DATA.description}
        </p>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        {DATA.plans.map((plan) => (
          <Card
            className={cn(
              "w-xs relative",
              plan.badge !== "null" ? "border-2 border-primary" : "",
            )}
            key={plan.id}
          >
            <Activity mode={plan.badge !== "null" ? "visible" : "hidden"}>
              <Badge className="absolute inset-x-0 -top-3 mx-auto w-fit  rounded-full">
                {plan.badge}
              </Badge>
            </Activity>
            <CardHeader>
              {plan.activeCard && (
                <h3 className="text-lg font-bold tracking-tight">
                  {plan.name}
                </h3>
              )}
              {!plan.activeCard && (
                <div className="flex gap-x-3 items-center">
                  <h3 className="text-lg font-bold tracking-tight line-through">
                    {plan.name}
                  </h3>
                  <Badge>Free</Badge>
                </div>
              )}
              <p className="text-sm text-muted-foreground">
                {plan.description}
              </p>
              <div>
                <Activity mode={plan.activeCard ? "visible" : "hidden"}>
                  <span className="text-3xl font-semibold">
                    {plan.price + " "}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </Activity>
                <Activity mode={!plan.activeCard ? "visible" : "hidden"}>
                  <div className="">
                    <span className="text-3xl font-semibold">₹0 </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </Activity>
              </div>
              <Separator className="mt-2" />
            </CardHeader>
            <CardContent className="space-y-3 h-40">
              {plan.features.map((feature, index) => (
                <div className="flex items-center gap-2 text-sm" key={index}>
                  <Check size={18} />
                  <p key={index}>{feature}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex flex-col gap-2 justify-center">
              <Button
                variant={JSON.parse(JSON.stringify(plan.buttonVariant))}
                className="w-full"
              >
                {plan.activeCard ? "Get Started" : "Coming Soon"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
