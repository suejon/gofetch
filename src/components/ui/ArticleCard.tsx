import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

interface Props {
  articleId: number;
  title: string;
  thumbnail: string;
  lf: string;
  lf_level: string;
}

export default function ArticleCard({
  articleId,
  title,
  thumbnail,
  lf,
  lf_level,
}: Props) {
  return (
    <div className="border-black border-2 rounded-md flex-col gap-2 p-2 max-w-lg">
      <Image
        src={thumbnail}
        width={200}
        height={200}
        alt="thumbnail"
        blurDataURL="/placeholder.webp"
      />
      <p className="text-xl">{title}</p>
      <Link
        className="float-right"
        href={`/articles/${articleId}?level=${lf_level}`}
      >
        <Button variant="outline">View Article</Button>
      </Link>
    </div>
  );
}
