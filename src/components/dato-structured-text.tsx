import {
  isBlockquote,
  isHeading,
  isLink,
  isList,
  isListItem,
  isParagraph,
  isThematicBreak,
  StructuredText as StructuredTextType,
} from 'datocms-structured-text-utils';
import NextLink from 'next/link';
import { FC, Fragment } from 'react';
import { renderMarkRule, renderNodeRule, StructuredText } from 'react-datocms';
import {
  Blockquote,
  Code,
  Copy,
  Decoration,
  Heading,
  ListItem,
  OrderedList,
  TextLink,
  ThematicBreak,
  UnorderedList,
} from './nodes';

type Props = {
  data: StructuredTextType | null | undefined;
};

export const StructuredTextRenderer: FC<Props> = ({ data }) => (
  <div className="text-sm lg:text-base">
    <StructuredText
      data={data}
      customNodeRules={[
        renderNodeRule(isList, ({ node, children, key }) =>
          node.style === 'numbered' ? (
            <OrderedList key={key}>{children}</OrderedList>
          ) : (
            <UnorderedList key={key}>{children}</UnorderedList>
          ),
        ),
        renderNodeRule(isListItem, ({ children, key }) => <ListItem key={key}>{children}</ListItem>),
        renderNodeRule(isHeading, ({ node, children, key }) => {
          return (
            <Heading level={node.level.toString() as '1' | '2' | '3'} key={key}>
              {children}
            </Heading>
          );
        }),
        renderNodeRule(isLink, ({ node, children, key }) => {
          const target = node.meta?.find((metaItem) => metaItem.id === 'target')?.value;
          const rel = node.meta?.find((metaItem) => metaItem.id === 'rel')?.value;

          return (
            <NextLink key={key} href={node.url} passHref legacyBehavior>
              <TextLink newTab={target === '_blank'} rel={rel}>
                {children}
              </TextLink>
            </NextLink>
          );
        }),
        renderNodeRule(isParagraph, ({ children, key, ancestors }) => {
          if (ancestors[0].type === 'listItem' || ancestors[0].type === 'list') {
            // we want to get rid of paragraphs inside list items
            return <Fragment key={key}>{children}</Fragment>;
          }

          return <Copy key={key}>{children}</Copy>;
        }),
        renderNodeRule(isBlockquote, ({ key, children, node }) => (
          <Blockquote key={key} attribution={node.attribution}>
            {children}
          </Blockquote>
        )),
        renderNodeRule(isThematicBreak, ({ key }) => <ThematicBreak key={key} />),
      ]}
      customMarkRules={[
        renderMarkRule('emphasis', ({ children, key }) => <Decoration key={key}>{children}</Decoration>),
        renderMarkRule('code', ({ children, key }) => <Code key={key}>{children}</Code>),
        renderMarkRule('strong', ({ children, key }) => (
          <strong key={key} className="font-bold">
            {children}
          </strong>
        )),
      ]}
    />
  </div>
);
