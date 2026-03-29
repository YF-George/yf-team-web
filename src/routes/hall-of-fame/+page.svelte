<script lang="ts">
	const tenureTop3 = [
		{ rank: "01", member: "Member_A", joinedAt: "2020-11-04", duration: "5 年 4 個月" },
		{ rank: "02", member: "Member_B", joinedAt: "2021-03-19", duration: "5 年" },
		{ rank: "03", member: "Member_C", joinedAt: "2021-08-07", duration: "4 年 7 個月" }
	];

	const tenureList = [
		{ member: "Member_D", joinedAt: "2021-11-25", duration: "4 年 4 個月" },
		{ member: "Member_E", joinedAt: "2022-02-13", duration: "4 年 1 個月" },
		{ member: "Member_F", joinedAt: "2022-07-01", duration: "3 年 8 個月" },
		{ member: "Member_G", joinedAt: "2023-01-10", duration: "3 年 2 個月" },
		{ member: "Member_H", joinedAt: "2023-06-29", duration: "2 年 9 個月" }
	];
</script>

<section class="px-4 pb-14 pt-6 md:pb-22 md:pt-10">
	<div class="mx-auto w-full max-w-7xl space-y-8 md:space-y-12">
		<div class="relative isolate overflow-hidden rounded-[2.4rem] border border-white/35 bg-[linear-gradient(130deg,color-mix(in_oklab,var(--background)_92%,transparent),color-mix(in_oklab,var(--primary)_10%,var(--background)))] px-6 py-8 shadow-[0_30px_90px_-52px_color-mix(in_oklab,var(--foreground)_70%,transparent)] md:px-10 md:py-12">
			<div class="pointer-events-none absolute -right-14 top-4 h-44 w-44 rounded-full bg-primary/14 blur-3xl"></div>
			<div class="pointer-events-none absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-primary/8 blur-3xl"></div>

			<div class="relative space-y-5 md:space-y-6">
				<p class="text-foreground/80 text-xs font-semibold tracking-[0.32em] uppercase">YF_Team Tenure Board</p>
				<h1 class="[font-family:var(--font-display)] text-4xl leading-tight font-bold tracking-tight md:text-6xl">榮譽榜: 在服年資</h1>
				<p class="text-foreground/84 max-w-3xl text-base leading-relaxed md:text-lg">
					這裡專門展示成員在本伺服器待了多久，向一路走到現在的夥伴致敬。
				</p>
			</div>
		</div>

		<div class="grid gap-4 md:grid-cols-3 md:gap-6">
			{#each tenureTop3 as member}
				<article class="relative overflow-hidden rounded-3xl border bg-background/72 p-6">
					<div class="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-bl-[2rem] bg-primary/14"></div>
					<p class="text-primary text-xs font-semibold tracking-[0.2em] uppercase">Top {member.rank}</p>
					<h2 class="[font-family:var(--font-display)] mt-2 text-2xl font-bold tracking-tight">{member.member}</h2>
					<p class="text-foreground/80 mt-3 text-sm">加入日期 {member.joinedAt}</p>
					<div class="mt-6 rounded-xl border bg-background/82 px-4 py-3">
						<p class="text-foreground/88 text-sm font-semibold">在服時間 {member.duration}</p>
					</div>
				</article>
			{/each}
		</div>

		<div class="grid gap-6 md:grid-cols-[minmax(0,1fr)_300px] md:gap-8">
			<section class="rounded-3xl border bg-background/70 p-6 md:p-7">
				<div class="flex items-end justify-between gap-4">
					<h3 class="[font-family:var(--font-display)] text-2xl font-bold tracking-tight md:text-3xl">完整年資列表</h3>
					<p class="text-foreground/74 text-xs tracking-[0.16em] uppercase">Tenure List</p>
				</div>

				<div class="mt-6 space-y-3">
					{#each tenureList as member, index}
						<div class="grid items-center gap-3 rounded-2xl border bg-background/78 px-4 py-3 md:grid-cols-[52px_minmax(0,1fr)_150px_140px]">
							<p class="text-primary text-sm font-semibold">#{index + 4}</p>
							<p class="text-foreground/88 font-semibold">{member.member}</p>
							<p class="text-foreground/78 text-sm">{member.joinedAt}</p>
							<p class="text-foreground/86 text-sm font-medium">{member.duration}</p>
						</div>
					{/each}
				</div>
			</section>

			<aside class="rounded-3xl border bg-background/64 p-5 md:p-6">
				<p class="text-foreground/78 text-xs font-semibold tracking-[0.2em] uppercase">統計摘要</p>
				<div class="mt-5 space-y-3">
					<div class="rounded-xl border bg-background/80 px-3 py-2">
						<p class="text-foreground/84 text-xs">最長年資</p>
						<p class="text-foreground/90 mt-1 text-sm font-semibold">5 年 4 個月</p>
					</div>
					<div class="rounded-xl border bg-background/80 px-3 py-2">
						<p class="text-foreground/84 text-xs">榜單平均年資</p>
						<p class="text-foreground/90 mt-1 text-sm font-semibold">4 年 1 個月</p>
					</div>
					<div class="rounded-xl border bg-background/80 px-3 py-2">
						<p class="text-foreground/84 text-xs">統計更新</p>
						<p class="text-foreground/90 mt-1 text-sm font-semibold">2026-03-28</p>
					</div>
				</div>

				<p class="text-foreground/70 mt-6 text-xs leading-relaxed">
					可改成串接 Bot 或資料庫，自動更新加入時間與年資。
				</p>
			</aside>
		</div>
	</div>
</section>
