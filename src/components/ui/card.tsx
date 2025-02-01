/**
 * @file Card Component
 * @author Pravan
 * @description
 * This file defines a modular and reusable Card component system in React.
 * The components provide structured sections for cards, including headers, titles,
 * descriptions, content, and footers. The `className` prop allows additional
 * styling customization.
 *
 * Features:
 * - Provides a `Card` wrapper with a default border, background, and shadow.
 * - Includes subcomponents such as `CardHeader`, `CardTitle`, `CardDescription`,
 *   `CardContent`, and `CardFooter` for organized layouts.
 * - Uses `forwardRef` to allow parent components to reference the DOM elements.
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Main Card container component.
 * Wraps child components and applies default styles.
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

/**
 * Card header component.
 * Typically contains the title and optional description.
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * Card title component.
 * Used within `CardHeader` to display the main heading.
 */
const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * Card description component.
 * Typically used within `CardHeader` to provide additional details.
 */
const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * Card content component.
 * Holds the main body content of the card.
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * Card footer component.
 * Usually contains actions or additional information at the bottom.
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
