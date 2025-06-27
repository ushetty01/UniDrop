import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('size-10', props.className)}
      {...props}
    >
      <path d="M10.09 10.09 3.02 3.02" />
      <path d="M14 4h4v4" />
      <path d="M10 20v-5h5" />
      <path d="m3.5 20.5 7-7" />
      <path d="M12 12v6" />
      <path d="M12 12h6" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
}
