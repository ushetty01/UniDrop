import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

export function Logo(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'font-headline text-3xl font-bold text-primary',
        props.className
      )}
    >
      ManipalRun
    </div>
  );
}
