import LanguageProficiencyButtonGroup from "@/components/ui/LanguageProficiencyButtonGroup";
import { Badge } from "@/components/ui/badge";
import { getArticle } from "@/lib/server/article";
import { formatDistance } from "date-fns";
import Image from "next/image";
import { notFound } from "next/navigation";
import ArticleText from "@/components/ui/ArticleText";

interface Props {
  params: { id: number };
  searchParams: { level: string };
}
export default async function Article({ params, searchParams }: Props) {
  const [article, _, words] = await getArticle(params.id, searchParams.level);

  if (!article) {
    notFound();
  }

  return (
    <main className="flex flex-col items-center justify-center flex-grow p-6 space-y-8">
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
          lf={article.lf}
          selectedLevel={article.lf_level}
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
      <article className="prose dark:prose-dark max-w-none space-y-6">
        <ArticleText words={words} />
      </article>
    </main>
  );
}
