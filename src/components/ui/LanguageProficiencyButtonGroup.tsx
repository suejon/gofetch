import { getArticleDifficultyList } from "@/lib/server/article";
import Link from "next/link";
import { Button } from "./button";

interface Props {
  lf: string;
  selectedLevel: string;
  articleId: number;
}

export default async function LanguageProficiencyButtonGroup(props: Props) {
  const languageProficiencyLevels = await getArticleDifficultyList(
    props.articleId,
  );
  return (
    <div className="flex gap-2">
      {languageProficiencyLevels.map((lpl) => (
        <Button
          variant={props.selectedLevel === lpl ? "default" : "outline"}
          key={lpl}
        >
          <Link href={"/articles/" + props.articleId + "?level=" + lpl}>
            {`${props.lf.toUpperCase()} ${lpl}`}
          </Link>
        </Button>
      ))}
    </div>
  );
}
