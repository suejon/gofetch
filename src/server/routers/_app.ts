import { createCallerFactory, procedure, router } from "../trpc";
import { z } from "zod";

export const appRouter = router({
  hello: procedure
    .input(z.object({ text: z.string() }))
    .query((opts) => ({ gretting: `hello ${opts.input.text}!` })),
});

export type AppRouter = typeof appRouter;
const createCaller = createCallerFactory(appRouter);
export const api = createCaller({});
