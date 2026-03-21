import Link from 'next/link';
import { cn } from '@/lib/utils/cn';
import { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  href?: string;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
};

const baseClassName =
  'inline-flex items-center justify-center rounded-full px-6 py-3 text-[13px] font-medium uppercase tracking-[0.18em] transition duration-300 active:scale-[0.98]';

const variants = {
  primary: 'bg-espresso text-white shadow-soft hover:bg-[#4b3d31]',
  secondary: 'border border-[#d9cab7] bg-white/70 text-espresso hover:bg-white',
  ghost: 'text-espresso hover:text-bronze',
};

export function Button({ children, href, type = 'button', variant = 'primary', className, onClick, disabled }: ButtonProps) {
  const merged = cn(baseClassName, variants[variant], className, disabled && 'pointer-events-none opacity-50');

  if (href) {
    return (
      <Link href={href} className={merged} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={merged} disabled={disabled}>
      {children}
    </button>
  );
}
