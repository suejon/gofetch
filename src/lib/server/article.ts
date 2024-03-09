import { and, asc, db, eq, sql } from "@db/index";
import {
  article,
  articleMorpheme,
  articleSentence,
  entry,
  lfLevel,
  morpheme,
  sentenceTranslation,
} from "@db/schema/main";

export const getArticle = async (
  article_id: number,
  lf_level: string,
): Promise<
  [
    typeof article.$inferSelect | undefined,
    { source_text: string; target_text: string | null; position: number }[],
    Word[],
  ]
> => {
  const articleData = await db.query.article.findFirst({
    where: and(
      eq(article.articleId, article_id),
      eq(article.lfLevel, lf_level),
    ),
  });

  if (!articleData) throw Error("Article not found");

  const sentences = await db
    .select({
      source_text: articleSentence.sourceText,
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
    .where(eq(articleSentence.articleId, articleData.id))
    .orderBy(asc(articleSentence.position));
  const articleWords = await db
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
    .where(eq(articleMorpheme.article, articleData.id))
    .orderBy(articleMorpheme.offset);

  // TODO: do this at the sql level somehow
  const mapped = articleWords.map((w, i) => ({ index: i, ...w }));
  return [articleData, sentences, mapped];
};

export const getLanguageProficiencyLevels = async (lf: string) =>
  await db.query.lfLevel.findMany({
    where: eq(lfLevel.languageFramework, lf),
  });

export const getArticleDifficultyList = async (articleId: number) => {
  const result = await db
    .select({ lf_level: article.lfLevel })
    .from(article)
    .where(eq(article.articleId, articleId));
  return result.map((r) => r.lf_level);
};
