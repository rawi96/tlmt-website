import { FC, PropsWithChildren } from 'react';

export const Code: FC<PropsWithChildren> = ({ children }) => (
  <code className="bg-cornflower-500 rounded-sm bg-opacity-20 p-1 font-mono text-[0.9em]">{children}</code>
);
