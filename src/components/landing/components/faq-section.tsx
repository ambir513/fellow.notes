import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import landingData from '../data/landing.json';

const DATA = landingData.faqsSection[0];

export function FaqsSection() {
  return (
    <div className="sm:m-20 space-y-10 py-20">
      <div className="space-y-2 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold md:text-4xl">{DATA.title}</h2>
        <p className="text-muted-foreground max-w-2xl">{DATA.description}</p>
      </div>
      <Accordion
        className="bg-card dark:bg-card/50 w-full -space-y-px rounded-lg "
      >
        {DATA.faqs.map(item => (
          <AccordionItem
            value={item.question}
            key={item.id}
            className="relative border-x first:rounded-t-lg first:border-t last:rounded-b-lg last:border-b"
          >
            <AccordionTrigger className="px-4 py-4 text-[15px] leading-6 hover:no-underline">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4 px-4">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <p className="text-muted-foreground">
        {"Can't"} find what {"you're"} looking for? Contact our{' '}
        <a href="#" className="text-primary hover:underline">
          customer support team
        </a>
      </p>
    </div>
  );
}
