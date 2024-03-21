/**
 * This file is unused until functionality is safely migrated from pages router
 */
import { rootRouter } from "@/server/routers/_app";
import { db } from "@db/index";
import * as trpcNext from "@trpc/server/adapters/next";

//TODO: fix app router trpc 404
export default trpcNext.createNextApiHandler({
  router: rootRouter,
  createContext: () => ({ db: db }),
});
