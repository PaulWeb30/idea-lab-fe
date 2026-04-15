import { CalendarDays, Lightbulb, Vote } from 'lucide-react'

import { ProfileMetaRow, ProfileStatCard } from '@/components/profile/profile-primitives'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/profile/utils/date'
import { getInitials } from '@/lib/profile/utils/profile'
import type { MeProfile, PublicProfile } from '@/types/profile'

export function ProfileOverviewCard({
  currentProfile,
  isPublicMode,
  privateProfile
}: {
  currentProfile: PublicProfile | MeProfile
  isPublicMode: boolean
  privateProfile?: MeProfile
}) {
  const ideasCount = currentProfile.stats?.ideasCount ?? 0
  const totalVotes = currentProfile.stats?.totalVotes ?? 0

  return (
    <Card className="border-border/70 bg-card/95 shadow-sm">
      <CardContent className="space-y-6 p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/15 to-emerald-500/10 text-xl font-semibold text-primary ring-1 ring-primary/15">
              {getInitials(currentProfile.name ?? null, currentProfile.nickname)}
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                  {currentProfile.name ?? currentProfile.nickname}
                </h2>
                <span className="rounded-full border border-border/70 bg-secondary/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  @{currentProfile.nickname}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                Joined {formatDate(currentProfile.createdAt)}
              </p>

              {!isPublicMode && privateProfile ? (
                <p className="text-sm text-muted-foreground">{privateProfile.email}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <ProfileStatCard icon={Lightbulb} label="Ideas" value={ideasCount} />
          <ProfileStatCard icon={Vote} label="Total votes" value={totalVotes} />
          <ProfileStatCard
            icon={CalendarDays}
            label="Member since"
            value={formatDate(currentProfile.createdAt)}
            accent="soft"
          />
        </div>

        {!isPublicMode && privateProfile ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <ProfileMetaRow label="Email" value={privateProfile.email} />
            <ProfileMetaRow label="Plan" value={privateProfile.plan} />
          </div>
        ) : null}

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <ProfileMetaRow label="Nickname" value={`@${currentProfile.nickname}`} />
          <ProfileMetaRow label="Display name" value={currentProfile.name ?? 'Not set'} />
          <ProfileMetaRow label="Timezone" value="Browser local time" />
        </div>
      </CardContent>
    </Card>
  )
}
