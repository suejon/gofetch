import Image from "next/image";
import Link from "next/link";

interface Props {
  articleId: number;
  title: string;
  image: string;
  thumbnail: string;
  langFramework: string;
  lfLevel: string;
}

export default function ArticleCard({
  articleId,
  title,
  image,
  lfLevel: lf_level,
}: Props) {
  const imageUrl = process.env.STORAGE_URL + "/" + image;
  return (
    <>
      <Link
        className="float-right"
        href={`/articles/${articleId}?level=${lf_level}`}
      >
        <div className="flex-col space-y-2 rounded-md pb-2 shadow-lg">
          <div className="flex h-72 justify-center">
            <Image
              src={imageUrl}
              width={600}
              height={400}
              style={{ objectFit: "cover" }}
              alt="thumbnail"
              blurDataURL="/placeholder.webp"
            />
          </div>
          <div className="space-y-2 p-2">
            <p className="text-xl">{title}</p>
          </div>
        </div>
      </Link>
    </>
  );
}
