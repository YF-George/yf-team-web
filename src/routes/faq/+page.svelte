<script>
	import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '$lib/components/ui/accordion';

	const faqs = [
		{
			id: 'join-process',
			question: '如何加入 YF_Team？',
			answer: '加入 YF_Team 非常簡單！您可以透過以下方式連絡我們：\n1. 使用官方邀請連結\n2. 在 Discord 伺服器中提出申請\n3. 聯絡現有成員推薦'
		},
		{
			id: 'community-rules',
			question: '社群有哪些基本規則？',
			answer: '為了維持良好的社群環境，我們期望所有成員遵守以下規則：\n\n✓ 尊重他人的意見和背景\n✓ 禁止騷擾、歧視或仇恨言論\n✓ 不分享未經授權的內容\n✓ 遵守官方頻道用途設定\n✓ 禁止垃圾訊息或頻繁轉貼\n✓ 保護個人隱私與安全\n\n違反規則的成員可能會收到警告或被移出社群。'
		},
		{
			id: 'roles',
			question: '社群內有哪些角色？',
			answer: 'YF_Team 中設有不同的角色，各有其責任：\n\n大隊長 - 負責社群運營和政策執行\n隊長 - 協助管理頻道和回答問題\n隊員 - 活躍參與社群討論\n\n您加入時將獲得成員角色。透過活躍參與和貢獻，您可能會被邀請擔任更高級別的角色。'
		},
		{
			id: 'channels',
			question: '主要的 Discord 頻道有哪些？',
			answer: '我們的 Discord 伺服器包含以下主要頻道：\n\n📰 #伺服器公告 - 重要更新和通知\n💬 #聊天分流 - 自由對話和交流\n🎮apex約戰 - 揪團一起在APEX裡隊戰\n🎬影片分享 - 在這裡分享有趣搞怪的影片\n🎵音樂分享 - 一起聆聽那些動人的旋律\n*📸圖片分享** - 用各種的圖片為伺服器增添樂趣\n\n請確保在正確的頻道進行討論。'
		},
		{
			id: 'code-of-conduct',
			question: '有沒有行為準則文件？',
			answer: '是的！我們有完善的行為準則文件。您可以在網站的「使用條款」和「隱私政策」頁面中查看完整詳情。\n\n簡單來說，我們期望：\n• 所有成員相互尊重和友善\n• 建設性的批評和反饋\n• 開放和包容的心態\n• 尊重所有人的多樣性\n\n如有任何疑問，請聯絡管理團隊。'
		},
		{
			id: 'report-issue',
			question: '如果我看到違反規則的行為該怎麼辦？',
			answer: '感謝您幫助維護社群品質！以下是舉報的步驟：\n\n1. 使用 Discord 的舉報功能或直接訊息管理者\n2. 提供具體信息（如頻道、時間、內容描述）\n3. 如果涉及騷擾，請保存證據截圖\n4. 我們會在 24-48 小時內審查並採取行動\n\n所有舉報都會被保密處理。'
		},
		{
			id: 'privacy-concern',
			question: '社群如何保護我的隱私？',
			answer: '隱私是我們的優先事項。我們：\n\n✓ 不會分享您的個人信息\n✓ 使用安全的通訊方式\n✓ 遵守 Discord 的隱私政策\n✓ 提供明確的隱私設定控制\n\n更詳細的信息，請查看我們的「隱私政策」頁面。如有任何隱私疑慮，請立即聯絡我們的管理團隊。'
		},
		{
			id: 'contact-support',
			question: '如何聯絡技術支援或管理者？',
			answer: '如果您需要協助或有建議，可以透過以下方式聯絡我們：\n\n💌 Discord - 在 #問題求助 頻道提出，或直接訊息管理者\n📧 Email - yf.george320@gmail.com\n🔗 社群頻道 - 查看固定訊息了解更多聯絡方式\n\n我們通常在 24-48 小時內回應。緊急事項會優先處理。'
		}
	];
</script>

<section class="space-y-3 pt-4 md:pt-8">
	<p class="text-muted-foreground text-sm font-medium tracking-wide">成員專區</p>
	<h1 class="text-3xl font-bold tracking-tight">規範與 FAQ</h1>
	<p class="text-muted-foreground max-w-2xl leading-relaxed">
		這裡整合社群規則、加入流程與常見問題，讓新舊成員都能快速查詢。
	</p>
</section>

<section class="mt-8 space-y-6">
	<div>
		<h2 class="mb-4 text-2xl font-bold">常見問題</h2>
		<Accordion type="single" class="w-full space-y-2">
			{#each faqs as faq (faq.id)}
				<AccordionItem value={faq.id} class="border border-border rounded-lg px-4">
					<AccordionTrigger class="hover:no-underline text-left font-semibold">
						{faq.question}
					</AccordionTrigger>
					<AccordionContent class="text-muted-foreground whitespace-pre-wrap leading-relaxed">
						{faq.answer}
					</AccordionContent>
				</AccordionItem>
			{/each}
		</Accordion>
	</div>

	<!-- Additional Resources Section -->
	<div class="mt-12 pt-8 border-t border-border">
		<h2 class="mb-4 text-2xl font-bold">還有其他問題？</h2>
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="rounded-lg border border-border bg-muted/50 p-4">
				<h3 class="font-semibold mb-2">📚 查看文件</h3>
				<p class="text-sm text-muted-foreground">
					詳細了解我們的
					<a href="/terms-of-service" class="text-primary hover:underline">使用條款</a>
					和
					<a href="/privacy-policy" class="text-primary hover:underline">隱私政策</a>。
				</p>
			</div>
			<div class="rounded-lg border border-border bg-muted/50 p-4">
				<h3 class="font-semibold mb-2">💬 聯絡我們</h3>
				<p class="text-sm text-muted-foreground">
					在 Discord 上直接訊息管理者，或透過官方郵件聯繫我們的支援團隊。
				</p>
			</div>
		</div>
	</div>
</section>
