import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import img from "../../../public/bedbug.jpg";
import placeholder from "../../../public/placeholder.webp";

interface Props {
  articleId: number;
  title: string;
  image: string;
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
    <div className="border-black border-2 rounded-md flex-col gap-2 p-4 max-w-lg">
      <div className="flex justify-center h-72">
        {/* <Image */}
        {/*   src={img} */}
        {/*   style={{ objectFit: "cover" }} */}
        {/*   alt="thumbnail" */}
        {/*   blurDataURL="/placeholder.webp" */}
        {/* /> */}
        <Image
          src={placeholder}
          style={{ objectFit: "cover" }}
          alt="thumbnail"
          blurDataURL="/placeholder.webp"
        />
      </div>
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
