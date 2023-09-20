import Stripe from "stripe";
//* to fix the typescript error i added an exclamation mark
export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
  apiVersion: "2023-08-16",
  typescript: true,
});
