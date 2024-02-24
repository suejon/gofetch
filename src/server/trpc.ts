import { initTRPC } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";

import { db } from "@db/index";
export const createContext = async (opts: CreateNextContextOptions) => {
  return { db };
};
const t = initTRPC.context<typeof createContext>().create();

// base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
