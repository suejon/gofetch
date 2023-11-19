import { Badge } from "@/components/ui/badge"
import { getArticle } from "@/lib/server/article"
import { formatDistance } from "date-fns"

interface Props {
  params: { id: number }
}
export default async function Article({ params }: Props) {
  const article = await getArticle(params.id)

  return (
    <main className="flex flex-col items-center justify-center flex-grow p-6 space-y-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{article?.title}</h1>
      <h2 className="text-xl text-gray-700 dark:text-gray-300">
        By Author Name - {formatDistance(new Date(article?.createdAt), new Date(), { addSuffix: true })}
      </h2>
      <div className="flex gap-2">
        <Badge variant="outline">{article?.lang}</Badge>
        <Badge variant="destructive">{article?.lf}</Badge>
        <Badge>{article?.lf_level}</Badge>
      </div>
      <article className="prose dark:prose-dark max-w-none">
        <p className="text-xl">{article?.content}</p>
      </article>
    </main>
  )
}
