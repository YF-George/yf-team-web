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
		{ order: 2, displayName: 'kihoficett', discord: 'kihoficett', joinedAt: '2023-07-28', tags: '隊員' },
		{ order: 3, displayName: 'misosoup_0706', discord: 'misosoup_0706', joinedAt: '2023-07-31', tags: '隊員' },
		{ order: 4, displayName: 'kaozhu.', discord: 'kaozhu.', joinedAt: '2023-08-05', tags: '隊員' },
		{ order: 5, displayName: 'datenshi0446', discord: 'datenshi0446', joinedAt: '2023-08-06', tags: '隊員' },
		{ order: 6, displayName: 'fruuu._.', discord: 'fruuu._.', joinedAt: '2023-08-08', tags: '隊員' },
		{ order: 7, displayName: 'moya3042', discord: 'moya3042', joinedAt: '2023-08-10', tags: '隊員' },
		{ order: 8, displayName: 'hatsuki._.', discord: 'hatsuki._.', joinedAt: '2023-09-02', tags: '隊員;原神;崩鐵' },
		{ order: 9, displayName: 'weeee233', discord: 'weeee233', joinedAt: '2023-09-15', tags: '隊員' },
		{ order: 10, displayName: 'Porn George', discord: 'yf_george', joinedAt: '2023-09-16', tags: '隊長;隊員;Porn YF;APEX;資深隊員' },
		{ order: 11, displayName: 'qiaozhi9465', discord: 'qiaozhi9465', joinedAt: '2023-09-17', tags: '隊員' },
		{ order: 12, displayName: 'hua214', discord: 'hua214', joinedAt: '2023-09-21', tags: '隊員' },
		{ order: 13, displayName: 'fengye2186', discord: 'fengye2186', joinedAt: '2023-10-09', tags: '隊員' },
		{ order: 14, displayName: 'quodlun', discord: 'quodlun', joinedAt: '2023-10-14', tags: '隊員' },
		{ order: 15, displayName: 'wulujason', discord: 'wulujason', joinedAt: '2023-11-27', tags: '隊員' },
		{ order: 16, displayName: 'zonetwelve', discord: 'zonetwelve', joinedAt: '2023-11-29', tags: '隊員' },
		{ order: 17, displayName: 'Rafe', discord: 'rafe0212', joinedAt: '2024-01-21', tags: '隊員;APEX;原神;崩鐵' },
		{ order: 18, displayName: 'wayne0524', discord: 'wayne0524', joinedAt: '2024-02-25', tags: '隊員;APEX' },
		{ order: 19, displayName: 'wopeiniqudahai', discord: 'wopeiniqudahai', joinedAt: '2024-03-09', tags: '隊員' },
		{ order: 20, displayName: 'lindiquan', discord: 'lindiquan', joinedAt: '2024-03-14', tags: '隊員' },
		{ order: 21, displayName: 'zz8846', discord: 'zz8846', joinedAt: '2024-07-29', tags: '隊員' },
		{ order: 22, displayName: 'patrickl.3', discord: 'patrickl.3', joinedAt: '2024-07-29', tags: '隊員' },
		{ order: 23, displayName: 'bigass7788', discord: 'bigass7788', joinedAt: '2024-08-15', tags: '隊員;APEX;原神;崩鐵' },
		{ order: 24, displayName: 'itznotkevin', discord: 'itznotkevin', joinedAt: '2024-08-24', tags: '隊長;隊員;禁域管理員;哥布林;APEX;TMT;鑽石' },
		{ order: 25, displayName: 'RY', discord: 'tsuki_ry', joinedAt: '2024-09-05', tags: '隊員;APEX;資深隊員;STA' },
		{ order: 26, displayName: '931007', discord: '931007', joinedAt: '2024-09-09', tags: '隊員;APEX' },
		{ order: 27, displayName: 'Fa7450 (世一跳)', discord: 'fa7450', joinedAt: '2024-09-13', tags: '隊員;APEX;TMT;SOS;大師' },
		{ order: 28, displayName: '恩', discord: 'lolicon332_0', joinedAt: '2024-09-14', tags: '隊員' },
		{ order: 29, displayName: 'lcyxmh.80', discord: 'lcyxmh.80', joinedAt: '2024-09-14', tags: '隊員' },
		{ order: 30, displayName: 'black._.tw', discord: 'black._.tw', joinedAt: '2024-09-15', tags: '隊員' },
		{ order: 31, displayName: 'zhaomao1126', discord: 'zhaomao1126', joinedAt: '2024-09-30', tags: '隊員;APEX;崩鐵;大師' },
		{ order: 32, displayName: 'aaaaannnna', discord: 'aaaaannnna', joinedAt: '2024-10-01', tags: '隊員' },
		{ order: 33, displayName: 'n01', discord: 'n01', joinedAt: '2024-10-03', tags: '隊員;APEX;大師' },
		{ order: 34, displayName: 'simple1314520', discord: 'simple1314520', joinedAt: '2024-10-05', tags: '隊員;APEX;原神;鳴潮' },
		{ order: 35, displayName: 'ytchenouo', discord: 'ytchenouo', joinedAt: '2024-10-10', tags: '頂獵;隊員;APEX;大隊長' },
		{ order: 36, displayName: 'lzxkynn', discord: 'lzxkynn', joinedAt: '2024-10-13', tags: '隊員;APEX;鑽石' },
		{ order: 37, displayName: 'luonair', discord: 'luonair', joinedAt: '2024-10-17', tags: '隊員;APEX' },
		{ order: 38, displayName: 'owo557', discord: 'owo557', joinedAt: '2024-10-27', tags: '隊員;APEX;崩鐵' },
		{ order: 39, displayName: 'rysen0415 (NK)', discord: 'rysen0415', joinedAt: '2024-10-30', tags: '隊員;APEX;鑽石' },
		{ order: 40, displayName: 'not_name', discord: 'not_name', joinedAt: '2024-11-07', tags: '隊員;原神' },
		{ order: 41, displayName: 'eclosion_', discord: 'eclosion_', joinedAt: '2024-12-03', tags: '隊員;APEX' },
		{ order: 42, displayName: '林茉莉', discord: 'molly_65_0', joinedAt: '2024-12-03', tags: '隊員;頂獵;APEX;崩鐵' },
		{ order: 43, displayName: 'kasa', discord: 'kasa1218', joinedAt: '2024-12-03', tags: '隊員;水 大師;APEX;大師;崩鐵' },
		{ order: 44, displayName: 'kyz3n', discord: 'kyz3n', joinedAt: '2024-12-04', tags: '隊員;APEX;鑽石' },
		{ order: 45, displayName: 'chuan348', discord: 'chuan348', joinedAt: '2024-12-06', tags: '隊員;APEX' },
		{ order: 46, displayName: 'buick5391', discord: 'buick5391', joinedAt: '2024-12-13', tags: '隊員;APEX;原神;崩鐵' },
		{ order: 47, displayName: 'haisha_y', discord: 'haisha_y', joinedAt: '2025-02-10', tags: '鳴潮;氣氛組;隊員;狗;水 大師;APEX;原神;至尊加成隊員;TMT;大隊長;崩鐵' },
		{ order: 48, displayName: 'Rickeee', discord: 'moe03560', joinedAt: '2025-02-24', tags: '隊員;APEX' },
		{ order: 49, displayName: 'laoshiji_0', discord: 'laoshiji_0', joinedAt: '2025-03-24', tags: '隊員;鳴潮' },
		{ order: 50, displayName: 'szniiyu', discord: 'szniiyu', joinedAt: '2025-03-31', tags: '隊員;APEX' },
		{ order: 51, displayName: 'blacktea9999', discord: 'blacktea9999', joinedAt: '2025-04-01', tags: '隊員;APEX' },
		{ order: 52, displayName: 'aqua_0470', discord: 'aqua_0470', joinedAt: '2025-05-02', tags: '隊員;APEX' },
		{ order: 53, displayName: 'en99820', discord: 'en99820', joinedAt: '2025-05-24', tags: '隊員;APEX' },
		{ order: 54, displayName: 'hiyoko_uwu', discord: 'hiyoko_uwu', joinedAt: '2025-05-29', tags: '隊員;APEX' },
		{ order: 55, displayName: 'feepdeep0', discord: 'feepdeep0', joinedAt: '2025-07-04', tags: '隊員' },
		{ order: 56, displayName: 'iska.80', discord: 'iska.80', joinedAt: '2025-07-05', tags: '隊員;APEX' },
		{ order: 57, displayName: 'Typename(皇家禮炮)', discord: 'typename_0', joinedAt: '2025-07-08', tags: '隊員;大師;男同' },
		{ order: 58, displayName: 'riko级上分享受者', discord: 'jian1an', joinedAt: '2025-07-18', tags: '隊員;APEX;TMT;AW' },
		{ order: 59, displayName: 'Ciallo～ (凱文小帳)', discord: 'superchanowo0', joinedAt: '2025-07-19', tags: '隊員;金銀銅;APEX' },
		{ order: 60, displayName: '狂熱斐濟杯', discord: 'ykl6660', joinedAt: '2025-09-22', tags: '男同;隊員;APEX;SOS;崩鐵' },
		{ order: 61, displayName: 'whydt0', discord: 'whydt0', joinedAt: '2025-10-26', tags: '隊員;APEX;崩鐵' },
		{ order: 62, displayName: '蔣介石', discord: 'kisara1207_yehnai0', joinedAt: '2025-11-17', tags: '隊員;APEX;原神;SOS;崩鐵' },
		{ order: 63, displayName: 'kasa', discord: 'sana_chan1218', joinedAt: '2026-01-08', tags: '隊員;APEX' },
		{ order: 64, displayName: 'akfc', discord: 'akfc', joinedAt: '2026-01-20', tags: '隊員;氣氛組;狗;APEX' },
		{ order: 65, displayName: 'ye06587', discord: 'ye06587', joinedAt: '2026-01-23', tags: '隊員;APEX' },
		{ order: 66, displayName: 'ezgame9487', discord: 'ezgame9487', joinedAt: '2026-02-10', tags: '隊員;APEX' },
		{ order: 67, displayName: 'OTOME*DOMAIN', discord: 'latis_dia', joinedAt: '2026-02-24', tags: '隊員;APEX;STA;大師' },
		{ order: 68, displayName: 'john6786', discord: 'john6786', joinedAt: '2026-02-28', tags: '隊員;APEX;原神;崩鐵' },
		{ order: 69, displayName: 'chiara_ouo', discord: 'chiara_ouo', joinedAt: '2026-02-28', tags: '隊員;APEX;原神;崩鐵' },
		{ order: 70, displayName: '2-4x havoc noob', discord: 'yurxxz741', joinedAt: '2026-02-28', tags: '隊員;APEX;大師' },
		{ order: 71, displayName: 'that1_guy_jodn', discord: 'that1_guy_jodn', joinedAt: '2026-03-02', tags: '隊員;APEX' },
		{ order: 72, displayName: 'r1cky_1018', discord: 'r1cky_1018', joinedAt: '2026-03-02', tags: '隊員;APEX;崩鐵' },
		{ order: 73, displayName: 'crying_man555', discord: 'crying_man555', joinedAt: '2026-03-07', tags: '隊員;APEX;崩鐵' },
		{ order: 74, displayName: 'mao_0214', discord: 'mao_0214', joinedAt: '2026-03-09', tags: '隊員;APEX' },
		{ order: 75, displayName: '男娘獵手（狂熱曾祖父）', discord: 'setsuna_1218', joinedAt: '2026-03-14', tags: '隊員;APEX;男同;大師' },
		{ order: 76, displayName: 'dm0123', discord: 'dm0123', joinedAt: '2026-03-15', tags: '隊員;APEX' },
		{ order: 77, displayName: 'peter.98370', discord: 'peter.98370', joinedAt: '2026-03-15', tags: '隊員;APEX' },
		{ order: 78, displayName: 'ethan07312882', discord: 'ethan07312882', joinedAt: '2026-03-16', tags: '隊員;APEX' },
		{ order: 79, displayName: 'AimNoob', discord: 'lurou8240', joinedAt: '2026-03-18', tags: '隊員;APEX' },
		{ order: 80, displayName: 'kakuzatou.yuzu_0', discord: 'kakuzatou.yuzu_0', joinedAt: '2026-03-20', tags: '隊員;APEX' },
		{ order: 81, displayName: 'ouo...', discord: 'ouo._._.', joinedAt: '2026-03-21', tags: '隊員;APEX' },
		{ order: 82, displayName: '0x2i0e5', discord: '0x2i0e5', joinedAt: '2026-03-23', tags: '隊員;APEX' },
		{ order: 83, displayName: 'alt1221', discord: 'alt1221', joinedAt: '2026-03-23', tags: '隊員;APEX' },
		{ order: 84, displayName: '175341_0', discord: '175341_0', joinedAt: '2026-03-24', tags: '隊員;APEX' },
		{ order: 85, displayName: 'yuzuki_kaede', discord: 'yuzuki_kaede', joinedAt: '2026-03-24', tags: '隊員;APEX;AW' },
		{ order: 86, displayName: 'ger_1213', discord: 'ger_1213', joinedAt: '2026-03-25', tags: '隊員;APEX;原神;崩鐵' },
		{ order: 87, displayName: 'sexyboyyyyyy', discord: 'sexyboyyyyyy', joinedAt: '2026-03-26', tags: '隊員' }
	];
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

			<div class="mt-6 overflow-x-auto">
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
