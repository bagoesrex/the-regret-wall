import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRotate() {
  const sign = Math.random() < 0.5 ? -1 : 1;
  return sign * (1 + Math.random() * 2);
}
