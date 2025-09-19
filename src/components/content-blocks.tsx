import { TextBlock } from '@/components/blocks/text';
import { PageModelContentField, TextBlockFragment } from '@/graphql/generated';
import { FC } from 'react';

type Props = {
  blocks: PageModelContentField[];
};

export const ContentBlocks: FC<Props> = ({ blocks }) => {
  return blocks.map((block) => {
    switch (block.__typename) {
      case 'TextRecord':
        return <TextBlock key={block.id} block={block as TextBlockFragment} />;
      default:
        console.warn('Unknown block type', block);

        return null;
    }
  });
};
