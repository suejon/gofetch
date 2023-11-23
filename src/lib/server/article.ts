import { and, db, eq } from "@db/index"
import { article } from "@db/schema/main"

export const getArticles = async () => {
  return await db.query.article.findMany({
    columns: {
      articleId: true,
      title: true,
      thumbnail: true,
    },
    where: and(
      eq(article.hidden, false),
      eq(article.original, true),
    )
  })
}
export const getArticle = async (id: number, level?: string) => {
  return await db.query.article.findFirst({
    where: and(
      eq(article.articleId, id),
      level && eq(article.lf_level, level)
    )
  })
}
