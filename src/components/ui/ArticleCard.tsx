import Image from "next/image";
import { Button } from "./button";
import Link from "next/link"

interface Props {
  articleId: number
  title: string
  thumbnail: string
}

export default function ArticleCard({ articleId, title, thumbnail }: Props) {
  return (
    <div className="border-black border-2 rounded-md flex-col gap-2 p-2 max-w-lg">
      <img className="bg-red-300" alt="The project logo" src="%sveltekit.assets%/favicon.png" />
      <Image src={thumbnail} alt="thumbnail" width={200} height={200} blurDataURL="/placeholder.webp" />
      <p className="text-xl">{title}</p>
      <p className="text-sm">
        summary textsummary textsummary textsummary textsummary textsummary textsummary textsummary
        textsummary textsummary textsummary text
      </p>
      <Link href={`/articles/${articleId}`}>
        <Button variant="outline">View Article</Button>
      </Link>
    </div>
  )
}
