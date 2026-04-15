'use client'

import { Button } from '@/components/ui/button'
import { PROFILE_PLAN_LABELS } from '@/constants/profile/plans'
import type { MeProfile } from '@/types/profile'

interface ProfileInfoField {
  label: string
  value: string
}

function InfoField({ label, value }: ProfileInfoField) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      <p className="text-base font-medium tracking-tight text-foreground">{value}</p>
    </div>
  )
}

export function ProfileInfoSection({
  profile,
  onUpgradeClick
}: {
  profile: MeProfile
  onUpgradeClick?: () => void
}) {
  return (
    <div className="space-y-6">
      {/* Row 1: Email and Nickname */}
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
        <InfoField label="Email" value={profile.email} />
        <InfoField label="Nickname" value={`@${profile.nickname}`} />
      </div>
      <div className="h-px bg-border/50" />

      {/* Row 2: Display Name (Full Width) */}
      <div>
        <InfoField label="Display Name" value={profile.name || 'Not set'} />
      </div>
      <div className="h-px bg-border/50" />

      {/* Row 3: Plan with Upgrade Button */}
      <div className="flex items-end justify-between gap-6">
        <InfoField label="Plan" value={PROFILE_PLAN_LABELS[profile.plan]} />
        <Button variant="outline" size="sm" onClick={onUpgradeClick} className="mb-1">
          Upgrade
        </Button>
      </div>
      <div className="h-px bg-border/50" />

      {/* Row 4: Timezone (Full Width) */}
      <div>
        <InfoField label="Timezone" value="Browser local time" />
      </div>
    </div>
  )
}
