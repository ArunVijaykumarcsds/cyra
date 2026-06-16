import { motion } from 'framer-motion'
import type { Planet } from '@/types'
import { missionTypeLabel, missionStatusColor } from '@/utils/format'
import { Badge } from '@/components/ui/Badge'

interface MissionsTabProps {
  planet: Planet
}

const STATUS_VARIANT: Record<string, 'cyan' | 'ghost' | 'gold'> = {
  active: 'cyan',
  completed: 'ghost',
  planned: 'gold',
}

export function MissionsTab({ planet }: MissionsTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-[10px] text-white/30 tracking-wide mb-4">
        {planet.missions.length} mission{planet.missions.length !== 1 ? 's' : ''} in the archive
      </div>

      <div className="space-y-3">
        {planet.missions.map((mission, i) => (
          <motion.div
            key={mission.name}
            className="border border-white/6 bg-white/[0.015]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            {/* Mission header */}
            <div className="px-4 py-3 border-b border-white/5">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span className="text-[13px] text-apollo-gold">{mission.name}</span>
                <Badge variant={STATUS_VARIANT[mission.status] ?? 'ghost'}>
                  {mission.status}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-white/35 font-mono">{mission.agency}</span>
                <span className="text-white/15">·</span>
                <span className="text-[10px] text-white/35 font-mono">{mission.year}</span>
                <span className="text-white/15">·</span>
                <span className="text-[10px] text-white/35 font-mono">{missionTypeLabel(mission.type)}</span>
              </div>
            </div>

            {/* Description */}
            <div className="px-4 py-3">
              <p className="text-[12px] leading-[1.8] text-white/55">{mission.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
