import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
//to resolve these errors clx tailwind merge i've to
//install both of them npm i clsx tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
