import { ContentBlocks } from '@/components/content-blocks';
import { Page } from '@/components/layout/page';
import { PageDocument, PageModelContentField } from '@/graphql/generated';
import { queryDatoCMS } from '@/utils/query-dato-cms';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { toNextMetadata } from 'react-datocms/seo';

type Params = { params: Promise<{ slug: string }> };

const getPageData = async (slug: string) => {
  const { site, page } = await queryDatoCMS({
    document: PageDocument,
    variables: { slug },
    includeDrafts: (await draftMode()).isEnabled,
  });

  return { site, page };
};

export async function generateMetadata(props: Params) {
  const { slug } = await props.params;
  const { site, page } = await getPageData(slug);

  return toNextMetadata([...site.favicon, ...(page?.seo ?? [])]);
}

export default async function ContentPage(props: Params) {
  const { slug } = await props.params;
  const { page } = await getPageData(slug);

  if (!page) {
    notFound();
  }

  return (
    <Page>
      <ContentBlocks blocks={page.content as PageModelContentField[]} />
    </Page>
  );
}
