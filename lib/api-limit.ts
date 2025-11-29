import {auth} from "@clerk/nextjs/server";

import prismadb from "./prismadb";
import { MAX_FREE_COUNTS } from "@/constants";

export const IncreaseApiLimit = async () => {
  return;
};

export const checkApiLimit = async () => {
  return true;
};

export const getApiLimitCount = async () => {
  return 0;
};