import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

// base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
