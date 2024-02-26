import ArticleCard from "@/components/ui/ArticleCard";
import { api } from "@/server/routers/_app";

export default async function Articles() {
  const articles = await api.article.findMany();
  return (
    <div className="p-4 space-y-2">
      <p>
        Hello, welcome to the Gofetch articles. Click on an article to start
        learning!
      </p>
      <div className="flex flex-wrap gap-2">
        {articles.map((article) => (
          <ArticleCard {...article} key={article.articleId} />
        ))}
      </div>
    </div>
  );
}
