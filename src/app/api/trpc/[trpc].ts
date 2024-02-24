import { rootRouter } from "@/server/routers/_app";
import { db } from "@db/index";
import * as trpcNext from "@trpc/server/adapters/next";

export default trpcNext.createNextApiHandler({
  router: rootRouter,
  createContext: () => ({ db: db }),
});
