<script lang="ts">
	import {
		Accordion,
		AccordionContent,
		AccordionItem,
		AccordionTrigger
	} from "$lib/components/ui/accordion/index.js";

	const announcements = [
		{
			id: "news-20260328-event",
			title: "03/28 網站demo測試",
			tag: "測試公告",
			content:
				"發布測試公告，邀請成員參與網站demo測試，提供反饋以優化使用體驗。"
		},
	];
</script>

<section class="space-y-6 pt-4 md:pt-8">
	<div class="space-y-3">
		<p class="text-muted-foreground text-sm font-medium tracking-wide">最新消息</p>
		<h1 class="text-3xl font-bold tracking-tight md:text-4xl">公告</h1>
		<p class="text-muted-foreground max-w-2xl leading-relaxed">
			這裡會整理近期活動、社群制度更新與重要通知，讓所有成員第一時間掌握動態。
		</p>
	</div>

	<Accordion type="single" class="w-full rounded-2xl border bg-background/70 p-2 md:p-3">
		{#each announcements as item (item.id)}
			<AccordionItem value={item.id} class="rounded-xl px-2 md:px-3">
				<AccordionTrigger class="text-left text-base font-semibold md:text-lg">
					<span class="inline-flex items-center gap-3">
						<span>{item.title}</span>
						<span class="text-muted-foreground rounded-full border px-2 py-0.5 text-xs font-medium">{item.tag}</span>
					</span>
				</AccordionTrigger>
				<AccordionContent class="text-muted-foreground text-sm leading-relaxed md:text-base">
					{item.content}
				</AccordionContent>
			</AccordionItem>
		{/each}
	</Accordion>
</section>
