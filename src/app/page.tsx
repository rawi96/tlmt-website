import {performRequest} from "@/lib/datocms";

const PAGE_CONTENT_QUERY = `
  query Home {
  page {
    title
    content {
      content {
        value
      }
    }
  }
}`;

export default async function Home() {
    const data: any = await performRequest(PAGE_CONTENT_QUERY);

    console.log(data);

    return (
        <main>
            <h1>{data?.page?.title}</h1>
        </main>
    );
}