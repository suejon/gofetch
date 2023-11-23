import { Badge } from "@/components/ui/badge"
import { getArticle } from "@/lib/server/article"
import { formatDistance } from "date-fns"
import Image from "next/image"
import splash from "../../../../public/splash.jpg" // TODO: replace with dynamic Image

interface Props {
  params: { id: number, lf_level: string }
}
export default async function Article({ params }: Props) {
  const article = await getArticle(params.id, params.lf_level)

  if (!article) {
    throw Error("Article not found")
  }

  return (
    <main className="flex flex-col items-center justify-center flex-grow p-6 space-y-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{article.title}</h1>
      <h2 className="text-xl text-gray-700 dark:text-gray-300">
        By {article.author} - {formatDistance(new Date(article.createdAt), new Date(), { addSuffix: true })}
      </h2>
      <div className="flex gap-2">
        <Badge variant="outline">{article.lang}</Badge>
        <Badge variant="destructive">{article.lf}</Badge>
        <Badge>{article.lf_level}</Badge>
      </div>
      {/* <Image src={article.image} alt="something" width={600} height={400} blurDataURL="/placeholder.webp" /> */}
      <Image src={splash} alt="something" width={600} height={400} blurDataURL="/placeholder.webp" />
      <article className="prose dark:prose-dark max-w-none">
        <p className="text-xl">{article.content}</p>
      </article>
    </main>
  )
}
