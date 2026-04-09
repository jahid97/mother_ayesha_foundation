// Utility functions for the application
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Combines multiple class names and merges Tailwind classes efficiently
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

