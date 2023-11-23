import ArticleCard from "@/components/ui/ArticleCard";
import { getArticles } from "@/lib/server/article";

export default async function Articles() {
  const articles = await getArticles();
  return (
    <div>
      <p>Hello, welcome to articles</p>
      <div className="flex space-x-2 p-4">
        {articles.map((article) => (<ArticleCard {...article} />))}
      </div>
    </div>
  )
}
