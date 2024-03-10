import { AppRouter } from "@/server/routers/_app";
import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { createTRPCReact } from "@trpc/react-query";
function getBaseUrl() {
  // **** client browser host **** //
  // browser client should use relative path
  if (typeof window !== "undefined") return "";

  // **** server host **** //
  // vercel hosted
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  // assume localhost server
  return `http://localhost:${process.env.PORT ?? 3000}`;
}
export const trpcReact = createTRPCReact<AppRouter>({});

export const clientApi = createTRPCNext<AppRouter>({
  config(opts) {
    const { ctx } = opts;
    // client requests
    if (typeof window !== "undefined") {
      return {
        links: [
          httpBatchLink({
            url: "/api/trpc",
          }),
        ],
      };
    }
    // server requests
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            if (!ctx?.req?.headers) {
              return {};
            }
            return {
              cookie: ctx.req.headers.cookie,
            };
          },
        }),
      ],
    };
  },
});
