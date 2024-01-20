import Image from "next/image";
import dog from "../../public/gofetch-dog.svg";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-8">
      <Image src={dog} alt="gofetch" className="h-52" />
      <h1 className="text-8xl font-thin">
        Welcome to <span className="font-bold">GoFetch</span>
      </h1>
      <p>Learn a language through the content you love &#x2764;</p>
    </main>
  );
}
