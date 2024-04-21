import { api } from "@/server/routers/_app";

async function fetchArticle(url) {
    fetch(url)
    .then(response => {
        // Check if response is OK
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        // Convert response body to text
        return response.text();
    })
    .then(html => {
        // Print raw HTML content
        console.log(html);
        // article = html
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}

export default async function Home() {

    const url = 'https://agileotter.blogspot.com/2014/09/programming-is-mostly-thinking.html'
    
    const res = await fetchArticle('https://agileotter.blogspot.com/2014/09/programming-is-mostly-thinking.html')
    console.log(res)
    console.log("hey")

    const data = { text: "this is a new page", article: res };

    return (
        <main className="flex min-h-screen flex-col items-center gap-8 p-24">
            <p>{data.text}</p>
            <p>{data.article}</p>
        </main>
    );
}