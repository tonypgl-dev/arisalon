import { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        'w-full rounded-2xl border border-line bg-white/85 px-4 py-3 text-sm text-espresso outline-none transition focus:border-bronze focus:bg-white',
        props.className
      )}
    />
  );
}
