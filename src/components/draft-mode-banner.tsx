'use client';

import { usePathname } from 'next/navigation';
import { FC } from 'react';

export const DraftModeBanner: FC = () => {
  const pathname = usePathname();

  return (
    <div className="bg-green text-blue z-1000 fixed inset-x-0 top-0 flex items-center justify-center gap-2 p-1 text-sm">
      <span>Entwurf-Modus ist aktiviert</span>
      <a
        href={`/api/draft/disable?url=${pathname}`}
        className="bg-blue whitespace-nowrap rounded px-1 py-[2px] text-white transition-colors hover:bg-blue-400"
        title="Entwurfsmodus deaktivieren"
      >
        Deaktivieren
      </a>
    </div>
  );
};
