<script lang="ts">
	type HallMember = {
		order: number;
		displayName: string;
		discord: string;
		joinedAt: string;
		tags: string;
	};

	const hallMembers: HallMember[] = [
		{ order: 1, displayName: 'aw_wee', discord: 'aw_wee', joinedAt: '2023-07-22', tags: '氣氛組;隊員;狗;APEX;原神;崩鐵' },
		]
</script>

<section class="px-4 pb-14 pt-6 md:pb-22 md:pt-10">
	<div class="mx-auto w-full max-w-7xl space-y-8 md:space-y-12">
		<div class="relative isolate overflow-hidden rounded-[2.4rem] border border-white/35 bg-[linear-gradient(130deg,color-mix(in_oklab,var(--background)_92%,transparent),color-mix(in_oklab,var(--primary)_10%,var(--background)))] px-6 py-8 shadow-[0_30px_90px_-52px_color-mix(in_oklab,var(--foreground)_70%,transparent)] md:px-10 md:py-12">
			<div class="pointer-events-none absolute -right-14 top-4 h-44 w-44 rounded-full bg-primary/14 blur-3xl"></div>
			<div class="pointer-events-none absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-primary/8 blur-3xl"></div>

			<div class="relative space-y-5 md:space-y-6">
				<p class="text-foreground/80 text-xs font-semibold tracking-[0.32em] uppercase">YF_Team Honor Board</p>
				<h1 class="[font-family:var(--font-display)] text-4xl leading-tight font-bold tracking-tight md:text-6xl">榮譽榜: 成員名單</h1>
				<p class="text-foreground/84 max-w-3xl text-base leading-relaxed md:text-lg">
					這裡收錄成員排序、顯示名稱、Discord 帳號、加入日期與身份標籤，完整名單從 1 到 87。
				</p>
			</div>
		</div>

		<section class="rounded-3xl border bg-background/70 p-5 md:p-7">
			<div class="flex items-end justify-between gap-4">
				<h2 class="[font-family:var(--font-display)] text-2xl font-bold tracking-tight md:text-3xl">完整名單 (1-87)</h2>
				<p class="text-foreground/74 text-xs tracking-[0.16em] uppercase">Honor Members</p>
			</div>

			<div class="mt-5 grid gap-3 sm:grid-cols-2 lg:hidden">
				{#each hallMembers as member (member.order)}
					<article class="rounded-2xl border bg-background/82 p-4">
						<div class="flex items-start justify-between gap-3">
							<div>
								<p class="text-primary text-sm font-semibold">#{member.order}</p>
								<p class="text-foreground/92 mt-1 text-base font-semibold">{member.displayName}</p>
							</div>
							<p class="text-foreground/74 text-xs">{member.joinedAt}</p>
						</div>

						<p class="text-foreground/80 mt-3 text-sm">@{member.discord}</p>

						<div class="mt-3 flex flex-wrap gap-2">
							{#each member.tags.split(';') as tag (`mobile-${member.order}-${tag}`)}
								<span class="rounded-full border bg-background/90 px-2.5 py-1 text-[11px] text-foreground/84">{tag}</span>
							{/each}
						</div>
					</article>
				{/each}
			</div>

			<div class="mt-6 hidden overflow-x-auto lg:block">
				<div class="min-w-240 space-y-3">
					<div class="grid items-center gap-3 rounded-2xl border bg-background/82 px-4 py-3 md:grid-cols-[72px_220px_190px_140px_minmax(0,1fr)]">
						<p class="text-foreground/74 text-xs font-semibold tracking-[0.12em] uppercase">排序</p>
						<p class="text-foreground/74 text-xs font-semibold tracking-[0.12em] uppercase">顯示名稱</p>
						<p class="text-foreground/74 text-xs font-semibold tracking-[0.12em] uppercase">Discord 帳號</p>
						<p class="text-foreground/74 text-xs font-semibold tracking-[0.12em] uppercase">加入時間</p>
						<p class="text-foreground/74 text-xs font-semibold tracking-[0.12em] uppercase">身份/特色標籤</p>
					</div>

					{#each hallMembers as member (member.order)}
						<div class="grid items-start gap-3 rounded-2xl border bg-background/78 px-4 py-3 md:grid-cols-[72px_220px_190px_140px_minmax(0,1fr)]">
							<p class="text-primary text-sm font-semibold">#{member.order}</p>
							<p class="text-foreground/90 text-sm font-semibold">{member.displayName}</p>
							<p class="text-foreground/80 text-sm">@{member.discord}</p>
							<p class="text-foreground/78 text-sm">{member.joinedAt}</p>
							<div class="flex flex-wrap gap-2">
								{#each member.tags.split(';') as tag (`${member.order}-${tag}`)}
									<span class="rounded-full border bg-background/90 px-2.5 py-1 text-[11px] text-foreground/84">{tag}</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</section>
	</div>
</section>
