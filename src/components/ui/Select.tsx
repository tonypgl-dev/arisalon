import { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        'w-full rounded-2xl border border-line bg-white/85 px-4 py-2 text-base text-espresso outline-none transition focus:border-bronze focus:bg-white sm:py-3 sm:text-lg',
        props.className
      )}
    />
  );
}
