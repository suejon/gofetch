import ArticleText from "@/components/ui/ArticleText";
import LanguageProficiencyButtonGroup from "@/components/ui/LanguageProficiencyButtonGroup";
import { Badge } from "@/components/ui/badge";
import { api } from "@/server/routers/_app";
import { formatDistance } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
  searchParams: { level: string };
}
export default async function Article({ params, searchParams }: Props) {
  const article = await api.article.findOne({
    articleId: parseInt(params.id),
    lfLevel: searchParams.level,
  });

  if (!article) {
    notFound();
  }

  return (
    <main className="flex flex-grow flex-col items-center justify-center space-y-8 p-6">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        {article.title}
      </h1>
      <h2 className="text-xl text-gray-700 dark:text-gray-300">
        By {article.author} -{" "}
        {formatDistance(new Date(article.createdAt), new Date(), {
          addSuffix: true,
        })}
      </h2>
      <div className="flex gap-2">
        <Badge variant="destructive">{article.lang}</Badge>
        <LanguageProficiencyButtonGroup
          lf={article.langFramework}
          selectedLevel={article.lfLevel}
          articleId={article.articleId}
        />
      </div>
      <Image
        src={process.env.NEXT_PUBLIC_STORAGE_URL + "/" + article.image}
        alt="something"
        width={600}
        height={400}
        blurDataURL="/placeholder.webp"
      />
      <article className="prose dark:prose-dark max-w-none space-y-6 leading-5 md:w-3/4 lg:leading-10">
        <ArticleText id={article.id} />
      </article>
    </main>
  );
}
