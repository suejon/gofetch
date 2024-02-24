import ArticleCard from "@/components/ui/ArticleCard";
import { getArticles } from "@/lib/server/article";
import { api } from "@/server/routers/_app";

export default async function Articles() {
  const articles = await api.article.findMany();
  return (
    <div className="p-4 space-y-2">
      <p>
        Hello, welcome to the articles page. Click on an article to get going
      </p>
      <div className="flex flex-wrap gap-2">
        {articles.map((article) => (
          <ArticleCard {...article} key={article.articleId} />
        ))}
      </div>
    </div>
  );
}
