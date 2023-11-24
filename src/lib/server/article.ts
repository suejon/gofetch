import { and, db, eq } from "@db/index";
import { article, lf_level } from "@db/schema/main";

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
export const getArticle = async (article_id: number, lf_level: string) => {
  return await db.query.article.findFirst({
    where: and(
      eq(article.articleId, article_id),
      eq(article.lf_level, lf_level),
    ),
  });
};

export const getLanguageProficiencyLevels = async (lf: string) =>
  await db.query.lf_level.findMany({
    where: eq(lf_level.languageFramework, lf),
  });

export const getLanguageProficiencyLevelsForArticle = async (
  articleId: number,
) => {
  const result = await db
    .select({ lf_level: article.lf_level })
    .from(article)
    .where(eq(article.articleId, articleId));
  return result.map((r) => r.lf_level);
};
