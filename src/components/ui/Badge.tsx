import { cn } from '@/utils/cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'cyan' | 'gold' | 'rust' | 'ghost' | 'green'
  className?: string
}

export function Badge({ children, variant = 'ghost', className }: BadgeProps) {
  const variants = {
    cyan: 'bg-nebula-cyan/10 border-nebula-cyan/30 text-nebula-cyan',
    gold: 'bg-apollo-gold/10 border-apollo-gold/30 text-apollo-gold',
    rust: 'bg-martian-rust/10 border-martian-rust/30 text-martian-rust',
    ghost: 'bg-white/5 border-white/10 text-white/50',
    green: 'bg-green-500/10 border-green-500/30 text-green-400',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center border px-1.5 py-0.5 text-[10px] tracking-widest uppercase font-mono',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
