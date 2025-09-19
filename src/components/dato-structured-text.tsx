import { FC } from 'react';
import { StructuredText as StructuredTextType } from 'datocms-structured-text-utils';

type Props = {
  data: StructuredTextType;
};

export const StructuredTextRenderer: FC<Props> = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;
