<script lang="ts">
	const guidelineSections = [
		{
			title: '社群行為準則',
			items: ['尊重彼此，不人身攻擊', '禁止歧視、騷擾與仇恨言論', '討論以建設性回饋為原則']
		},
		{
			title: '活動參與規範',
			items: ['活動報名後請準時出席', '若無法參加請提前告知', '遵守活動流程與幹部指引']
		},
		{
			title: '投稿與內容規範',
			items: ['投稿內容需為原創或註明來源', '不得散佈不實資訊與侵權素材', '標題與內容需符合主題與事實']
		},
		{
			title: '違規處理機制',
			items: ['初次違規：提醒與溝通', '重複違規：暫停權限', '重大違規：移除社群資格']
		}
	];
</script>

<section class="px-4 pb-12 pt-6 md:pb-20 md:pt-10">
	<div class="mx-auto w-full max-w-7xl space-y-10 md:space-y-14">
		<div class="relative isolate overflow-hidden rounded-[2.4rem] border border-white/35 bg-[linear-gradient(140deg,color-mix(in_oklab,var(--background)_94%,transparent),color-mix(in_oklab,var(--primary)_7%,var(--background)))] px-6 py-8 shadow-[0_30px_85px_-48px_color-mix(in_oklab,var(--foreground)_68%,transparent)] md:px-10 md:py-12">
			<div class="pointer-events-none absolute -right-16 top-8 h-40 w-40 rounded-full bg-primary/12 blur-3xl"></div>
			<div class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_5%,transparent)_1px,transparent_1px)] bg-size-[32px_32px] opacity-55"></div>

			<div class="relative space-y-6 md:space-y-8">
				<p class="text-foreground/80 text-xs font-semibold tracking-[0.3em] uppercase">Community Guidelines</p>
				<h1 class="[font-family:var(--font-display)] text-4xl leading-tight font-bold tracking-tight md:text-6xl">規範</h1>
				<p class="text-foreground/82 max-w-3xl text-base leading-relaxed md:text-lg">
					本頁提供 YF_Team 社群與活動的共同規範，請所有成員與參與者在交流與參與前先閱讀，維持安全、尊重、有效的合作環境。
				</p>
			</div>
		</div>

		<div class="grid gap-4 md:grid-cols-2 md:gap-6">
			{#each guidelineSections as section (section.title)}
				<article class="rounded-3xl border bg-[linear-gradient(165deg,color-mix(in_oklab,var(--background)_90%,transparent),color-mix(in_oklab,var(--primary)_8%,var(--background)))] p-6 shadow-[0_20px_55px_-44px_color-mix(in_oklab,var(--foreground)_74%,transparent)]">
					<h2 class="[font-family:var(--font-display)] text-2xl font-semibold tracking-tight">{section.title}</h2>
					<ul class="mt-4 space-y-2 text-sm leading-relaxed text-foreground/86 md:text-base">
						{#each section.items as item (`${section.title}-${item}`)}
							<li class="flex gap-2">
								<span class="text-primary mt-[0.1rem]">•</span>
								<span>{item}</span>
							</li>
						{/each}
					</ul>
				</article>
			{/each}
		</div>
	</div>
</section>
