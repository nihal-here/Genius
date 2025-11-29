import { auth } from "@clerk/nextjs/server";

import prismadb from "./prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  return true;
};