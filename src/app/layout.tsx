import '@/styles/globals.css';
import { classNames } from '@smartive/datocms-utils';
import { draftMode } from 'next/headers';
import { DraftModeBanner } from '@/components/draft-mode-banner';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraft = (await draftMode()).isEnabled;

  return (
    <html lang="en" className={classNames('antialiased')}>
      <body className="bg-primary-100">
        {isDraft && <DraftModeBanner />}
        {children}
      </body>
    </html>
  );
}
