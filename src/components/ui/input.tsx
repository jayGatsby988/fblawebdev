/**
 * @file Input Component
 * @author Robel
 * @description
 * This file defines a reusable Input component in React.
 * It supports customization via class names and additional props.
 *
 * Features:
 * - Fully responsive input field with default styles.
 * - Supports file input styling adjustments.
 * - Implements accessibility features such as focus-visible styling.
 * - Allows external class name overrides for further customization.
 */

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Input Component
 *
 * A flexible and customizable input field.
 * Uses `forwardRef` to pass refs to the input element.
 *
 * @param {React.ComponentProps<"input">} props - Component properties
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.type - Input type (text, password, email, etc.)
 * @param {React.Ref<HTMLInputElement>} ref - Forwarded ref for the input element
 * @returns {JSX.Element} A styled input field
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
