import WordBox from "@/components/ui/WordBox";

// dictionary
const lookup = {
  hello: {
    definition: "a greeting",
    type: "noun",
    example: "hello there neighbor",
  },
};
//tokens

const tokens = ["hello", "mr", "donut"];

export default async function Article() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow p-6 space-y-8">
      <article className="prose dark:prose-dark max-w-none space-y-6">
        <div className="">
          {tokens.map((t, i) => (
            <WordBox key={t + i} entry={lookup[t]} word={t} />
          ))}
        </div>
      </article>
    </main>
  );
}
