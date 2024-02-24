import { db } from "@db/index";
import { createCallerFactory, procedure, router } from "../trpc";
import { z } from "zod";
import { articleRouter } from "./article";

export const rootRouter = router({
  article: articleRouter,
  hello: procedure
    .input(z.object({ text: z.string() }))
    .query((opts) => ({ gretting: `hello ${opts.input.text}!` })),
});

export type AppRouter = typeof rootRouter;

// server access to api
const createCaller = createCallerFactory(rootRouter);
export const api = createCaller({ db: db });
