import { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        'min-h-32 w-full rounded-2xl border border-line bg-white/85 px-4 py-2 text-base text-espresso placeholder:text-inksoft/70 outline-none transition focus:border-bronze focus:bg-white sm:py-3 sm:text-lg',
        props.className
      )}
    />
  );
}
