import { BlockWrapper } from '@/components/block-wrapper';
import { StructuredTextRenderer } from '@/components/dato-structured-text';
import { TextBlockFragment } from '@/graphql/generated';
import { StructuredText as StructuredTextType, isEmptyDocument } from 'datocms-structured-text-utils';
import { FC } from 'react';

type Props = {
  block: TextBlockFragment;
};

export const TextBlock: FC<Props> = ({ block: { content } }) => (
  <BlockWrapper>
    {!isEmptyDocument(content) && (
      <div className="max-w-text-width mx-auto lg:text-lg">
        <StructuredTextRenderer data={content as StructuredTextType} />
      </div>
    )}
  </BlockWrapper>
);
