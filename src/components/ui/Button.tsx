import { forwardRef } from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'ghost' | 'outline' | 'cyan' | 'gold' | 'danger'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  active?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'ghost', size = 'sm', active, children, ...props }, ref) => {
    const base =
      'inline-flex items-center justify-center font-sans tracking-widest uppercase transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-nebula-cyan/50 disabled:opacity-40 disabled:cursor-not-allowed'

    const variants = {
      ghost:
        'bg-transparent border border-white/10 text-white/60 hover:text-white hover:border-white/25',
      outline:
        'bg-transparent border border-nebula-cyan/30 text-nebula-cyan/80 hover:text-nebula-cyan hover:border-nebula-cyan/60 hover:bg-nebula-cyan/5',
      cyan: 'bg-nebula-cyan/10 border border-nebula-cyan/50 text-nebula-cyan hover:bg-nebula-cyan/20 hover:border-nebula-cyan shadow-[0_0_20px_rgba(0,229,255,0.1)]',
      gold: 'bg-apollo-gold/10 border border-apollo-gold/50 text-apollo-gold hover:bg-apollo-gold/20',
      danger: 'bg-martian-rust/10 border border-martian-rust/50 text-martian-rust hover:bg-martian-rust/20',
    }

    const sizes = {
      xs: 'text-[10px] px-2 py-1 letter-spacing-[0.15em]',
      sm: 'text-[11px] px-3 py-1.5',
      md: 'text-xs px-4 py-2',
      lg: 'text-sm px-6 py-3',
    }

    const activeStyle = active
      ? variant === 'ghost'
        ? 'border-nebula-cyan/40 text-nebula-cyan bg-nebula-cyan/5'
        : ''
      : ''

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], activeStyle, className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
