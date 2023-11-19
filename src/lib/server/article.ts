import { db, eq } from "@db/index"
import { article } from "@db/schema/main"

export const getArticles = async () => {
  return await db.query.article.findMany({})
}
export const getArticle = async (id: number) => {
  return await db.query.article.findFirst({ where: eq(article.id, id) })
}
