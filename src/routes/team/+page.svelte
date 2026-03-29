<script lang="ts">
	import CrownIcon from '@lucide/svelte/icons/crown';

	const teamMembers: Array<{ order: number; name: string; discord: string; joinedAt: string; tags: string }> = [
		{ order: 1, name: '掠奪狂熱', discord: 'haisha_y', joinedAt: '現任', tags: '大隊長' },
		{ order: 2, name: '小蘋果', discord: 'xiaopingg4976', joinedAt: '現任', tags: '隊長' },
		{ order: 3, name: '武藤油膩', discord: 'qwqeee', joinedAt: '現任', tags: '隊長' },
		{ order: 4, name: '西瓜', discord: '西瓜', joinedAt: '現任', tags: '隊長' },
		{ order: 5, name: '恨群主建模怪、帥潮', discord: 'itznotkevin', joinedAt: '現任', tags: '隊長' },
		{ order: 6, name: 'Porn George', discord: 'yf_george', joinedAt: '現任', tags: '隊長' },
		{ order: 7, name: 'jerry lin', discord: 'linjerryfish', joinedAt: '現任', tags: '隊長' },
		{ order: 8, name: '狂熱前女友(烤狗肉)', discord: 'fachi1126', joinedAt: '現任', tags: '隊長' }
	];

	const captain = teamMembers.find((member) => member.tags.includes('大隊長'));
	const leaders = teamMembers.filter((member) => member.tags.includes('隊長'));
</script>

<section class="px-4 pb-14 pt-6 md:pb-22 md:pt-10">
	<div class="mx-auto w-full max-w-7xl space-y-8 md:space-y-12">
		<section class="relative isolate overflow-hidden rounded-[2.5rem] border border-white/35 bg-[radial-gradient(95%_120%_at_92%_2%,color-mix(in_oklab,var(--primary)_17%,transparent),transparent_58%),linear-gradient(136deg,color-mix(in_oklab,var(--background)_92%,transparent),color-mix(in_oklab,var(--primary)_8%,var(--background)))] px-6 py-8 shadow-[0_35px_95px_-56px_color-mix(in_oklab,var(--foreground)_74%,transparent)] md:px-10 md:py-12">
			<div class="pointer-events-none absolute -right-12 top-5 h-44 w-44 rounded-full bg-primary/18 blur-3xl"></div>
			<div class="pointer-events-none absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-primary/10 blur-3xl"></div>

			<div class="relative">
				<div class="space-y-5 md:space-y-6">
					<p class="text-foreground/86 text-xs font-semibold tracking-[0.32em] uppercase">YF_Team Management</p>
					<h1 class="[font-family:var(--font-display)] text-4xl leading-tight font-bold tracking-tight md:text-6xl">管理團隊</h1>
					<p class="text-foreground/90 max-w-3xl text-base leading-relaxed md:text-lg">
						每位管理者都有不同的位置與責任，但目標一致：讓社群維持秩序、溫度與可持續成長。
					</p>
				</div>
			</div>
		</section>

		{#if captain}
			<section class="rounded-3xl border bg-background/68 p-6 md:p-7">
				<div class="flex flex-col gap-4 rounded-2xl border bg-background/84 p-5 md:flex-row md:items-center md:justify-between">
					<div class="flex items-center gap-3">
						<div class="inline-flex size-10 items-center justify-center rounded-xl bg-primary/14 text-primary">
							<CrownIcon class="size-5" />
						</div>
						<div>
							<p class="text-primary text-[11px] font-semibold tracking-[0.18em] uppercase">大隊長</p>
							<h2 class="mt-1 text-xl font-semibold md:text-2xl">{captain.name}</h2>
							<p class="text-foreground/82 mt-1 text-sm">@{captain.discord}</p>
						</div>
					</div>
					<span class="inline-flex w-fit rounded-full border bg-background/90 px-3 py-1 text-xs text-foreground/84">{captain.joinedAt}</span>
				</div>
			</section>
		{/if}

		<section class="rounded-3xl border bg-background/68 p-6 md:p-7">
			<div class="flex items-end justify-between gap-4">
				<h2 class="[font-family:var(--font-display)] text-2xl font-bold tracking-tight md:text-3xl">隊長名單 (目前 {leaders.length} 位)</h2>
				<p class="text-foreground/80 text-xs tracking-[0.16em] uppercase">Team Members</p>
			</div>

			{#if leaders.length === 0}
				<div class="mt-6 rounded-2xl border border-dashed bg-background/78 px-5 py-10 text-center">
					<p class="text-foreground/80 text-sm">目前管理團隊名單已清空，稍後更新。</p>
				</div>
			{:else}
				<div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{#each leaders as member (member.order)}
						<article class="rounded-2xl border bg-background/82 p-4 transition hover:bg-background/92">
							<div class="flex items-start justify-between gap-3">
								<div>
									<p class="text-primary text-xs font-semibold tracking-[0.18em] uppercase">#{member.order}</p>
									<h3 class="mt-2 text-base font-semibold">{member.name}</h3>
									<p class="text-foreground/80 mt-1 text-xs">@{member.discord}</p>
								</div>
								<p class="text-foreground/78 text-xs">{member.joinedAt}</p>
							</div>

							<div class="mt-4 flex flex-wrap gap-2">
								{#each member.tags.split(';') as tag (`${member.order}-${tag}`)}
									<span class="rounded-full border bg-background/90 px-2.5 py-1 text-[11px] text-foreground/86">{tag}</span>
								{/each}
							</div>
						</article>
					{/each}
				</div>
			{/if}
		</section>
	</div>
</section>
