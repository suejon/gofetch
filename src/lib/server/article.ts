import { and, asc, db, eq } from "@db/index";
import {
  article,
  articleSentence,
  lf_level,
  sentenceTranslation,
} from "@db/schema/main";

export const getArticles = async () => {
  return await db.query.article.findMany({
    columns: {
      articleId: true,
      title: true,
      thumbnail: true,
      lf_level: true,
      lf: true,
    },
    where: and(eq(article.hidden, false), eq(article.original, true)),
  });
};
export const getArticle = async (
  article_id: number,
  lf_level: string,
): Promise<
  [
    typeof article.$inferSelect | undefined,
    { source_text: string; target_text: string | null; position: number }[],
  ]
> => {
  const articleData = await db.query.article.findFirst({
    where: and(
      eq(article.articleId, article_id),
      eq(article.lf_level, lf_level),
    ),
  });

  // if (!articleData) return [null, []];

  const sentences = await db
    .select({
      source_text: articleSentence.source_text,
      target_text: sentenceTranslation.content,
      position: articleSentence.position,
    })
    .from(articleSentence)
    .leftJoin(
      sentenceTranslation,
      and(
        eq(articleSentence.articleId, sentenceTranslation.source),
        eq(articleSentence.position, sentenceTranslation.position),
      ),
    )
    .orderBy(asc(articleSentence.position));

  return [articleData, sentences];
};

export const getLanguageProficiencyLevels = async (lf: string) =>
  await db.query.lf_level.findMany({
    where: eq(lf_level.languageFramework, lf),
  });

export const getArticleDifficultyList = async (articleId: number) => {
  const result = await db
    .select({ lf_level: article.lf_level })
    .from(article)
    .where(eq(article.articleId, articleId));
  return result.map((r) => r.lf_level);
};
