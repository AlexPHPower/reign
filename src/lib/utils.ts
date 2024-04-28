import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalise(str: string | undefined | null) {
  if (!str) return null;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
