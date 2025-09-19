import { classNames } from '@smartive/datocms-utils';
import { PropsWithChildren, forwardRef } from 'react';

type Props = PropsWithChildren<{
  hasSmallMargin?: boolean;
  isWide?: boolean;
  className?: string;
}>;

export const BlockWrapper = forwardRef<HTMLElement, Props>(({ children, hasSmallMargin, isWide, className }, ref) => (
  <section
    ref={ref}
    className={classNames(
      'mx-auto',
      hasSmallMargin ? 'my-6 md:my-12' : 'my-12 md:my-16 xl:my-20',
      isWide ? 'w-site-width-wide max-w-content-wide' : 'w-site-width max-w-content',
      className,
    )}
  >
    {children}
  </section>
));

BlockWrapper.displayName = 'BlockWrapper';
