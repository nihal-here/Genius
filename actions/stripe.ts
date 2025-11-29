"use server";

import { auth, currentUser } from "@clerk/nextjs/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function stripeRedirect() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return { error: "Unauthorized", status: 401 };
    }

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: { userId }
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });
      return { url: stripeSession.url };
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: settingsUrl,
      cancel_url: settingsUrl,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "USD",
            product_data: {
              name: "Genius Pro",
              description: "Unlimited AI Generations",
            },
            unit_amount: 2000,
            recurring: {
              interval: "month",
            }
          },
          quantity: 1,
        }
      ],
      metadata: { userId }
    });

    return { url: stripeSession.url };
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return { error: "Internal Error", status: 500 };
  }
}
