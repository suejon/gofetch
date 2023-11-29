import ArticleCard from "@/components/ui/ArticleCard";
import { getArticles } from "@/lib/server/article";

export default async function Articles() {
  const articles = await getArticles();
  return (
    <div className="p-4 space-y-2">
      <p>
        Hello, welcome to the articles page. Click on an article to get going
      </p>
      <div className="flex space-x-2">
        {articles.map((article) => (
          <ArticleCard {...article} key={article.articleId} />
        ))}
      </div>
    </div>
  );
}
