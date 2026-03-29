<script lang="ts">
	type SiteLink = {
		title: string;
		href: string;
		description: string;
	};

	const sections: { heading: string; links: SiteLink[] }[] = [
		{
			heading: '主要頁面',
			links: [
				{ title: '首頁', href: '/', description: '站點主視覺、重點導覽與入口區。' },
				{ title: '最新消息', href: '/news', description: '查看近期公告與活動更新。' },
				{ title: '規範', href: '/rules', description: '社群準則、參與規範與投稿說明。' }
			]
		},
		{
			heading: '社群資訊',
			links: [
				{ title: '榮譽榜', href: '/hall-of-fame', description: '成員名單與榮譽紀錄。' },
				{ title: '管理團隊', href: '/team', description: '管理團隊資訊與角色介紹。' },
				{ title: 'FAQ', href: '/faq', description: '常見問題與成員專區說明。' }
			]
		},
		{
			heading: '法律與條款',
			links: [
				{ title: '隱私政策', href: '/privacy-policy', description: '個人資料與隱私處理原則。' },
				{ title: '使用條款', href: '/terms-of-service', description: '網站與社群使用規範。' },
				{ title: '網頁地圖', href: '/sitemap', description: '站點頁面索引與快速導覽。' }
			]
		}
	];
</script>

<section class="space-y-6 pt-4 md:pt-8">
	<div class="space-y-3">
		<p class="text-muted-foreground text-sm font-medium tracking-wide">Navigation</p>
		<h1 class="text-3xl font-bold tracking-tight md:text-4xl">網頁地圖</h1>
		<p class="text-muted-foreground max-w-3xl leading-relaxed">
			透過此頁快速瀏覽 YF_Team 全站主要內容，找到你需要的資訊與入口。
		</p>
	</div>

	<div class="grid gap-4 md:gap-6">
		{#each sections as section (section.heading)}
			<article class="rounded-2xl border bg-background/70 p-5 md:p-7">
				<h2 class="text-xl font-semibold md:text-2xl">{section.heading}</h2>
				<ul class="mt-4 space-y-3">
					{#each section.links as link (link.href)}
						<li>
							<a href={link.href} class="group block rounded-xl border border-transparent bg-background/70 px-4 py-3 transition hover:border-border hover:bg-background">
								<p class="text-base font-semibold group-hover:text-primary">{link.title}</p>
								<p class="text-muted-foreground mt-1 text-sm leading-relaxed">{link.description}</p>
								<p class="text-muted-foreground mt-2 text-xs">{link.href}</p>
							</a>
						</li>
					{/each}
				</ul>
			</article>
		{/each}
	</div>
</section>
