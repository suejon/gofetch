import { article } from "@db/schema/main";
import { procedure, router } from "../trpc";
import { and, eq } from "@db/index";

export const articleRouter = router({
  findMany: procedure.query(async ({ ctx }) => {
    return await ctx.db.query.article.findMany({
      columns: {
        articleId: true,
        title: true,
        image: true,
        thumbnail: true,
        lf_level: true,
        lf: true,
      },
      where: and(eq(article.hidden, false), eq(article.original, true)),
    });
  }),
});
