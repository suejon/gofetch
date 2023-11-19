import ArticleCard from "@/components/ui/ArticleCard";

export default function Articles() {
  const count = 2;
  const l = Array.from({ length: count }, (_, i) => i);
  return (
    <div>
      <p>Hello, welcome to articles</p>
      <div className="flex space-x-2 p-4">
        {l.map((_, i) => (
          <ArticleCard id={i} />
        ))}
      </div>
    </div>
  )
}
