import Image from "next/image";
import dog from "../../public/gofetch-dog.svg";
// import { api } from "@/server/routers/_app";

export default async function Home() {
  // const data = await api.hello({
  //   text: "this page is directly from the server",
  // });
  return (
    <main className="flex min-h-screen flex-col items-center gap-8 p-24">
      {/* <p>{data.gretting}</p> */}
      <Image src={dog} alt="gofetch" className="h-52" />
      <h1 className="text-8xl font-thin">
        Welcome to <span className="font-bold">GoFetch</span>
      </h1>
      <p>Learn a language through the content you love &#x2764;</p>
    </main>
  );
}
