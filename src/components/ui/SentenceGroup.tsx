interface Props {
  sourceText: string;
  targetText: string;
}

export default function SentenceGroup(props: Props) {
  return (
    <div className="">
      <p className="font-bold">{props.sourceText}</p>
      <p className="font-thin">{props.targetText}</p>
    </div>
  );
}
