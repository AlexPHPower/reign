import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cn } from "~/lib/utils";
import { PlusCircle } from "lucide-react";

const AccordionTriggerPlus = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-center py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-45",
        className,
      )}
      {...props}
    >
      {children}
      <PlusCircle className="h-8 w-8 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTriggerPlus.displayName = AccordionPrimitive.Trigger.displayName;

export { AccordionTriggerPlus };
