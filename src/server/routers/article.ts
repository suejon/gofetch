import {
  article,
  articleMorpheme,
  articleSentence,
  entry,
  morpheme,
  sentenceTranslation,
} from "@db/schema/main";
import { procedure, router } from "../trpc";
import { and, asc, eq, sql } from "@db/index";
import z from "zod";

export const articleRouter = router({
  findMany: procedure.query(async ({ ctx }) => {
    return await ctx.db.query.article.findMany({
      columns: {
        articleId: true,
        title: true,
        image: true,
        thumbnail: true,
        lfLevel: true,
        langFramework: true,
      },
      where: and(eq(article.hidden, false), eq(article.original, true)),
    });
  }),
  getArticleDifficultyList: procedure
    .input(z.number())
    .query(async ({ ctx, input: articleId }) => {
      const result = await ctx.db.query.article.findMany({
        columns: { lfLevel: true },
        where: eq(article.articleId, articleId),
      });
      return result.map((r) => r.lfLevel);
    }),
  findOne: procedure
    .input(z.object({ articleId: z.number(), lfLevel: z.string() }))
    .query(async ({ ctx, input }) => {
      const articleData = await ctx.db.query.article.findFirst({
        where: and(
          eq(article.articleId, input.articleId),
          eq(article.lfLevel, input.lfLevel),
        ),
      });

      if (!articleData) throw Error("Article not found");

      return articleData;
    }),
  getArticleWords: procedure
    .input(z.object({ articleId: z.number() }))
    .query(async ({ ctx, input }) => {
      const articleWords = await ctx.db
        .select({
          word: articleMorpheme.morpheme,
          offset: articleMorpheme.offset,
          root: morpheme.root,
          lang: morpheme.lang,
          entries: sql<
            { name: string; type: string; value: string }[]
          >`cast(concat('[', group_concat(distinct json_object('name', ${entry.morpheme}, 'type', ${entry.type}, 'value', ${entry.value})), ']') as json)`,
        })
        .from(articleMorpheme)
        .leftJoin(morpheme, eq(articleMorpheme.morpheme, morpheme.name))
        .leftJoin(entry, eq(morpheme.name, entry.morpheme))
        .groupBy(articleMorpheme.morpheme, articleMorpheme.offset)
        .where(eq(articleMorpheme.article, input.articleId))
        .orderBy(articleMorpheme.offset);

      // TODO: do this at the sql level somehow
      const mapped = articleWords.map((w, i) => ({ index: i, ...w }));
      return mapped;
    }),
});
