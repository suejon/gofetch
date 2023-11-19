import { Button } from "./button";
import Link from "next/link"

interface Props {
  id: number
}

export default function ArticleCard({ id }: Props) {
  return (

    <div className="border-black border-2 rounded-md flex-col gap-2 p-2 max-w-lg">
      <img className="bg-red-300" alt="The project logo" src="%sveltekit.assets%/favicon.png" />

      <p className="text-xl">Article Title</p>
      <p className="text-sm">
        summary textsummary textsummary textsummary textsummary textsummary textsummary textsummary
        textsummary textsummary textsummary text
      </p>
      <Link href={`/articles/${id}`}>
        <Button variant="outline">View Article</Button>
      </Link>
    </div>
  )
}
