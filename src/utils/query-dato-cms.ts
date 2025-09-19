import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print } from 'graphql';

type Options<TResult = unknown, TVariables = unknown> = {
  document: TypedDocumentNode<TResult, TVariables>;
  variables?: TVariables;
  includeDrafts?: boolean;
};

export async function queryDatoCMS<TResult = unknown, TVariables = unknown>({
  document,
  variables,
  includeDrafts,
}: Options<TResult, TVariables>): Promise<TResult> {
  if (!process.env.DATOCMS_API_TOKEN) {
    throw new Error('Missing DATOCMS_API_TOKEN');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Exclude-Invalid': 'true',
    Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
  };

  if (includeDrafts) {
    headers['X-Include-Drafts'] = 'true';
  }

  if (process.env.DATOCMS_ENVIRONMENT) {
    headers['X-Environment'] = process.env.DATOCMS_ENVIRONMENT;
  }

  const response = await fetch('https://graphql.datocms.com/', {
    next: { revalidate: includeDrafts ? 0 : undefined },
    method: 'POST',
    headers,
    body: JSON.stringify({ query: print(document), variables }),
  });

  if (!response.ok) {
    const body = await response.text();

    throw new Error(`DatoCMS request failed: ${response.status}\n${body}`);
  }

  const body = (await response.json()) as { data: TResult } | { errors: unknown[] };

  if ('errors' in body) {
    throw new Error(`Invalid GraphQL request: ${JSON.stringify(body.errors)}`);
  }

  return body.data;
}
