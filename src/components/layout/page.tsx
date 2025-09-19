import { FC, PropsWithChildren } from 'react';

export const Page: FC<PropsWithChildren> = ({ children }) => (
  <>
    header
    <main className="min-h-[70vh] pt-[96px] md:pt-[182px]">{children}</main>
    footer
  </>
);
