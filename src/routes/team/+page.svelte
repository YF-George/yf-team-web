<script lang="ts">
	import CrownIcon from '@lucide/svelte/icons/crown';
	import ZapIcon from '@lucide/svelte/icons/zap';
	import HeartIcon from '@lucide/svelte/icons/heart';

	const teamMembers: Array<{ order: number; name: string; discord: string; joinedAt: string; tags: string }> = [];
</script>

<section class="px-4 pb-14 pt-6 md:pb-22 md:pt-10">
	<div class="mx-auto w-full max-w-7xl space-y-8 md:space-y-12">
		<div class="relative isolate overflow-hidden rounded-[2.4rem] border border-white/35 bg-[linear-gradient(132deg,color-mix(in_oklab,var(--background)_93%,transparent),color-mix(in_oklab,var(--primary)_9%,var(--background)))] px-6 py-8 shadow-[0_30px_90px_-52px_color-mix(in_oklab,var(--foreground)_68%,transparent)] md:px-10 md:py-12">
			<div class="pointer-events-none absolute -right-14 top-6 h-44 w-44 rounded-full bg-primary/14 blur-3xl"></div>
			<div class="pointer-events-none absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-primary/8 blur-3xl"></div>

			<div class="relative space-y-5 md:space-y-6">
				<p class="text-foreground/80 text-xs font-semibold tracking-[0.32em] uppercase">YF_Team Management</p>
				<h1 class="[font-family:var(--font-display)] text-4xl leading-tight font-bold tracking-tight md:text-6xl">管理團隊</h1>
				<p class="text-foreground/84 max-w-3xl text-base leading-relaxed md:text-lg">
					每位管理者都有不同的位置與責任，但目標一致: 讓社群維持秩序、溫度與可持續成長。
				</p>
			</div>
		</div>

		<div class="grid gap-6 md:grid-cols-[minmax(0,1fr)_300px] md:gap-8">
			<section class="rounded-3xl border bg-background/70 p-6 md:p-7">
				<div class="flex items-end justify-between gap-4">
					<h2 class="[font-family:var(--font-display)] text-2xl font-bold tracking-tight md:text-3xl">分工架構</h2>
					<p class="text-foreground/72 text-xs tracking-[0.16em] uppercase">Role Structure</p>
				</div>

				<div class="mt-6 space-y-4">
					<div class="rounded-2xl border bg-background/78 p-4 md:p-5">					<div class="inline-flex items-center justify-center size-8 rounded-lg bg-primary/15 mb-2">
						<CrownIcon class="size-4 text-primary" />
					</div>						<p class="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Leadership</p>
						<h3 class="mt-2 text-lg font-semibold">總管理層</h3>
						<p class="text-foreground/80 mt-2 text-sm leading-relaxed">負責重大決策、制度方向與跨組協調，確保社群持續穩定運作。</p>
					</div>

					<div class="rounded-2xl border bg-background/78 p-4 md:p-5">					<div class="inline-flex items-center justify-center size-8 rounded-lg bg-primary/15 mb-2">
						<ZapIcon class="size-4 text-primary" />
					</div>						<p class="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Operations</p>
						<h3 class="mt-2 text-lg font-semibold">營運與活動</h3>
						<p class="text-foreground/80 mt-2 text-sm leading-relaxed">規劃活動與日常流程，維持節奏，讓每次參與都有清楚體驗。</p>
					</div>

					<div class="rounded-2xl border bg-background/78 p-4 md:p-5">					<div class="inline-flex items-center justify-center size-8 rounded-lg bg-primary/15 mb-2">
						<HeartIcon class="size-4 text-primary" />
					</div>						<p class="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Community Care</p>
						<h3 class="mt-2 text-lg font-semibold">社群陪伴與秩序</h3>
						<p class="text-foreground/80 mt-2 text-sm leading-relaxed">回應成員需求、維持交流品質，守住社群舒服且安全的氛圍。</p>
					</div>
				</div>
			</section>

			<aside class="rounded-3xl border bg-background/64 p-5 md:p-6">
				<p class="text-foreground/78 text-xs font-semibold tracking-[0.2em] uppercase">Team Contact</p>
				<div class="mt-5 space-y-3">
					<div class="rounded-xl border bg-background/80 p-3">
						<p class="text-foreground/84 text-xs font-semibold tracking-wide">問題回報</p>
						<div class="mt-2 h-8 rounded-lg border border-dashed bg-background/85"></div>
					</div>
					<div class="rounded-xl border bg-background/80 p-3">
						<p class="text-foreground/84 text-xs font-semibold tracking-wide">合作洽談</p>
						<div class="mt-2 h-8 rounded-lg border border-dashed bg-background/85"></div>
					</div>
					<div class="rounded-xl border bg-background/80 p-3">
						<p class="text-foreground/84 text-xs font-semibold tracking-wide">其他建議</p>
						<div class="mt-2 h-8 rounded-lg border border-dashed bg-background/85"></div>
					</div>
				</div>
			</aside>
		</div>

		<section class="rounded-3xl border bg-background/68 p-6 md:p-7">
			<div class="flex items-end justify-between gap-4">
				<h2 class="[font-family:var(--font-display)] text-2xl font-bold tracking-tight md:text-3xl">成員名單 (1-9)</h2>
				<p class="text-foreground/72 text-xs tracking-[0.16em] uppercase">Team Members</p>
			</div>

			{#if teamMembers.length === 0}
				<div class="mt-6 rounded-2xl border border-dashed bg-background/78 px-5 py-10 text-center">
					<p class="text-foreground/72 text-sm">目前管理團隊名單已清空，稍後更新。</p>
				</div>
			{:else}
				<div class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{#each teamMembers as member (member.order)}
						<article class="rounded-2xl border bg-background/80 p-4">
							<div class="flex items-start justify-between gap-3">
								<div>
									<p class="text-primary text-xs font-semibold tracking-[0.18em] uppercase">#{member.order}</p>
									<h3 class="mt-2 text-base font-semibold">{member.name}</h3>
									<p class="text-foreground/76 mt-1 text-xs">@{member.discord}</p>
								</div>
								<p class="text-foreground/70 text-xs">{member.joinedAt}</p>
							</div>

							<div class="mt-4 flex flex-wrap gap-2">
								{#each member.tags.split(';') as tag (`${member.order}-${tag}`)}
									<span class="rounded-full border bg-background/88 px-2.5 py-1 text-[11px] text-foreground/84">{tag}</span>
								{/each}
							</div>
						</article>
					{/each}
				</div>
			{/if}
		</section>
	</div>
</section>
