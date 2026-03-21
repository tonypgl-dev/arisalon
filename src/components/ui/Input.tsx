import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        'w-full rounded-2xl border border-line bg-white/85 px-4 py-3 text-sm text-espresso placeholder:text-inksoft/70 outline-none transition focus:border-bronze focus:bg-white',
        props.className
      )}
    />
  );
}
