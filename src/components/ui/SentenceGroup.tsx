interface Props {
  sourceText: string;
  targetText: string | null;
}

export default function SentenceGroup(props: Props) {
  return (
    <div className="lg:hover:bg-gray-200">
      <p className="font-bold">{props.sourceText}</p>
      <p className="font-thin">{props.targetText}</p>
    </div>
  );
}
