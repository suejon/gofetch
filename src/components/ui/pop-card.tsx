"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

import { cn } from "@/lib/utils";

const PopCard = HoverCardPrimitive.Root;

const PopCardTrigger = HoverCardPrimitive.Trigger;

const PopCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
      className,
    )}
    {...props}
  />
));
PopCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { PopCard, PopCardTrigger, PopCardContent };
