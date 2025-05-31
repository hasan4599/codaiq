'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { cn } from '@/lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> & {
    content: React.ReactNode;
    side?: 'top' | 'right' | 'bottom' | 'left';
    delayDuration?: number;
  }
>(({ children, content, side = 'top', delayDuration = 200, ...props }, ref) => (
  <TooltipPrimitive.Root delayDuration={delayDuration} {...props}>
    <TooltipPrimitive.Trigger asChild>
      {children}
    </TooltipPrimitive.Trigger>
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        ref={ref}
        side={side}
        className={cn(
          'z-50 overflow-hidden rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white',
          'animate-in fade-in-0 zoom-in-95',
          'shadow-md border border-gray-800/50'
        )}
        sideOffset={5}
      >
        {content}
        <TooltipPrimitive.Arrow className="fill-gray-900" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  </TooltipPrimitive.Root>
));

Tooltip.displayName = 'Tooltip';

export { Tooltip, TooltipProvider }; 