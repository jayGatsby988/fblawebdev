/**
 * @file Button Component
 * @author Darshan
 * @description
 * This file defines a reusable Button component using React and Radix UI's Slot.
 * It utilizes the `class-variance-authority` (CVA) library to manage variant styles dynamically.
 * The component supports multiple variants and sizes, providing flexibility for UI design.
 *
 * Features:
 * - Supports different button variants (default, destructive, outline, etc.).
 * - Allows size customization (small, large, icon, etc.).
 * - Enables `asChild` prop to render as a different element using Radix's Slot.
 * - Implements accessibility features such as focus-visible styling.
 */

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Defines button style variants using `class-variance-authority`.
 * Variants control color styles, while sizes adjust padding and height.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * Button component props definition.
 * Extends default button attributes and allows customization via `variant` and `size` props.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** If true, renders the button as a child component, preserving surrounding styles */
  asChild?: boolean
}

/**
 * Button Component
 *
 * A flexible and customizable button that supports different styles and sizes.
 * Uses `forwardRef` to pass refs to the button element.
 *
 * @param {ButtonProps} props - Component properties
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.variant - Button variant (default, destructive, outline, etc.)
 * @param {string} props.size - Button size (default, sm, lg, icon)
 * @param {boolean} props.asChild - If true, renders as a different element via Radix Slot
 * @param {React.Ref<HTMLButtonElement>} ref - Forwarded ref for the button element
 * @returns {JSX.Element} A styled button element
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // If `asChild` is true, render as the Slot component; otherwise, use a standard button
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Apply computed styles
        ref={ref} // Pass ref for parent control
        {...props} // Spread remaining props to allow customization
      />
    )
  }
)

// Assign display name for better debugging and component identification
Button.displayName = "Button"

export { Button, buttonVariants }
