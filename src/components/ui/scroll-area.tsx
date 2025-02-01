"use client"

/**
 * @file ScrollArea Component
 * @author Robel
 * @description
 * This file defines a scrollable area component using Radix UI's ScrollArea primitives.
 * It provides a flexible viewport with customizable scrollbars.
 *
 * Features:
 * - Supports both vertical and horizontal scrolling.
 * - Uses Radix UI's accessible and customizable scroll area primitives.
 * - Allows class name overrides for further customization.
 */

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

/**
 * ScrollArea Component
 *
 * Provides a scrollable container with a customizable viewport and scrollbars.
 *
 * @param {React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>} props - Component properties
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children - Child elements to render inside the viewport
 * @param {React.Ref} ref - Forwarded ref for the scroll area root element
 * @returns {JSX.Element} A scrollable container
 */
const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

/**
 * ScrollBar Component
 *
 * Provides a customizable scrollbar for the ScrollArea component.
 * Supports both vertical and horizontal orientations.
 *
 * @param {React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>} props - Component properties
 * @param {string} props.className - Additional CSS classes
 * @param {"vertical" | "horizontal"} [props.orientation="vertical"] - Scrollbar orientation
 * @param {React.Ref} ref - Forwarded ref for the scrollbar element
 * @returns {JSX.Element} A scrollbar element
 */
const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors",
      orientation === "vertical" &&
        "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" &&
        "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
