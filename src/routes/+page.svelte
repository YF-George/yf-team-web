<script lang="ts">
	import { onMount } from 'svelte';

	const HERO_BRAND_TARGET = 'YF_Team';
	const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

	const stackCards = [
		{
			kicker: '01 / LEADERSHIP',
			title: '總召留言：把每個人都放在心上',
			description:
				'謝謝每位夥伴在忙碌中仍然願意投入。YF_Team 的價值，不是誰最耀眼，而是我們願不願意彼此成就、一起把路走穩。',
			cta: '查看管理團隊',
			href: '/team'
		},
		{
			kicker: '02 / OPERATIONS',
			title: '副召留言：細節會說話，承諾要落地',
			description:
				'每一場活動、每一次協作，我們都在學習把流程做得更清楚、把分工做得更貼心。讓大家可以放心投入、安心發揮。',
			cta: '查看管理團隊',
			href: '/team'
		},
		{
			kicker: '03 / CULTURE',
			title: '幹部留言：在這裡，我們一起變得更好',
			description:
				'我們希望這裡不只是做事的地方，更是能被理解、被支持的地方。感謝你願意留下，也歡迎你一起把文化延續下去。',
			cta: '認識管理團隊',
			href: '/team'
		}
	];

	let heroBrandText = $state(HERO_BRAND_TARGET);
	let heroFadeProgress = $state(0);
	let leadershipHeadingOpacity = $state(1);
	let leadershipSectionEl: HTMLElement | null = null;

	const getHeroOpacity = () => Math.max(0, 1 - heroFadeProgress);

	const updateHeroFade = () => {
		if (typeof window === 'undefined') return;
		const fadeRange = window.innerHeight * 0.45;
		heroFadeProgress = Math.min(window.scrollY / fadeRange, 1);
	};

	const updateLeadershipHeadingFade = () => {
		if (typeof window === 'undefined' || !leadershipSectionEl) return;

		const rect = leadershipSectionEl.getBoundingClientRect();
		const stickyStart = window.innerWidth >= 768 ? 96 : 80;
		const fadeDistance = window.innerHeight * 0.32;
		const progress = Math.max(0, (stickyStart - rect.top) / fadeDistance);
		leadershipHeadingOpacity = Math.max(0, 1 - Math.min(progress, 1));
	};

	const randomScrambleChar = () => SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)] ?? 'X';

	const buildScrambleFrame = (target: string, progress: number) => {
		return target
			.split('')
			.map((char, index) => {
				if (char === ' ') return ' ';
				const revealAt = (index + 1) / target.length;
				return progress >= revealAt ? char : randomScrambleChar();
			})
			.join('');
	};

	const runHeroScramble = (duration = 980, step = 40) => {
		let elapsed = 0;
		heroBrandText = buildScrambleFrame(HERO_BRAND_TARGET, 0);

		const intervalId = window.setInterval(() => {
			elapsed += step;
			const progress = Math.min(elapsed / duration, 1);
			heroBrandText = buildScrambleFrame(HERO_BRAND_TARGET, progress);

			if (progress >= 1) {
				window.clearInterval(intervalId);
				heroBrandText = HERO_BRAND_TARGET;
			}
		}, step);

		return () => {
			window.clearInterval(intervalId);
			heroBrandText = HERO_BRAND_TARGET;
		};
	};

	onMount(() => {
		const stop = runHeroScramble();
		const handleViewportChange = () => {
			updateHeroFade();
			updateLeadershipHeadingFade();
		};

		handleViewportChange();
		window.addEventListener('scroll', handleViewportChange, { passive: true });
		window.addEventListener('resize', handleViewportChange);

		return () => {
			stop();
			window.removeEventListener('scroll', handleViewportChange);
			window.removeEventListener('resize', handleViewportChange);
		};
	});
</script>

<section class="hero-top sticky top-0 z-0 isolate flex h-[calc(100dvh-7rem)] w-full items-center justify-center px-4">
	<div class="pointer-events-none absolute inset-0 opacity-70" style={`opacity: ${0.7 * getHeroOpacity()};`}>
		<div class="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"></div>
		<div class="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_8%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_8%,transparent)_1px,transparent_1px)] bg-size-[38px_38px] mask-[radial-gradient(circle_at_center,black,transparent_78%)]"></div>
	</div>

	<div class="relative text-center" style={`opacity: ${getHeroOpacity()};`}>
		<p class="text-foreground/78 text-[10px] font-semibold tracking-[0.36em] uppercase md:text-xs">YOUTH FORGE COLLECTIVE</p>
		<h1 class="mt-4 [font-family:var(--font-display)] text-6xl leading-none font-bold tracking-[-0.03em] md:text-8xl lg:text-9xl">
			<span class="text-foreground">{heroBrandText.slice(0, 2)}</span><span class="text-primary">{heroBrandText.slice(2, 3)}</span><span class="text-foreground">{heroBrandText.slice(3)}</span>
		</h1>
		<p class="text-foreground/70 mt-5 text-sm tracking-[0.14em] uppercase md:text-base">Built by people, not by noise</p>
	</div>
	<p class="text-foreground/72 absolute bottom-8 text-[10px] tracking-[0.28em] uppercase md:text-xs" style={`opacity: ${getHeroOpacity()};`}>Scroll Down</p>
</section>

<section class="relative z-10 px-4 pb-14 pt-8 md:pb-24 md:pt-16">
	<div class="mx-auto w-full max-w-7xl">
		<article class="relative isolate overflow-hidden rounded-[2.75rem] border border-white/40 bg-[linear-gradient(140deg,color-mix(in_oklab,var(--background)_92%,transparent),color-mix(in_oklab,var(--primary)_6%,var(--background)))] px-7 py-10 shadow-[0_30px_90px_-46px_color-mix(in_oklab,var(--foreground)_65%,transparent)] backdrop-blur-sm md:px-14 md:py-16">
			<div class="pointer-events-none absolute inset-y-0 left-0 w-[40%] bg-linear-to-r from-primary/12 via-primary/5 to-transparent"></div>
			<div class="pointer-events-none absolute -right-14 top-12 h-44 w-44 rounded-full bg-primary/10 blur-3xl"></div>
			<div class="relative grid gap-10 md:grid-cols-[260px_minmax(0,1fr)] md:gap-16">
				<aside class="flex flex-col justify-between gap-10 border-border/70 border-b pb-10 md:border-r md:border-b-0 md:pb-0 md:pr-10">
					<div class="space-y-6">
						<p class="text-foreground/84 text-[11px] font-semibold tracking-[0.32em] uppercase md:text-xs">YF_Team Message</p>
						<p class="text-foreground/84 text-base leading-relaxed md:text-lg">給每一個走得很遠、也曾經很累的人。</p>
						<a
							href="https://discord.gg/WtmxxKmH4Z"
							target="_blank"
							rel="noopener noreferrer"
							class="border-primary/55 bg-background/88 text-foreground hover:bg-primary/14 inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-semibold tracking-wide transition"
						>
							加入 DC
						</a>
					</div>
					<div class="flex flex-wrap gap-3">
						<span class="text-foreground/86 bg-background/76 rounded-full border px-4 py-1.5 text-sm">陪伴</span>
						<span class="text-foreground/86 bg-background/76 rounded-full border px-4 py-1.5 text-sm">家人</span>
					</div>
				</aside>

				<div class="relative py-1 md:py-2">
					<p class="text-primary/85 mb-4 text-xs font-semibold tracking-[0.24em] uppercase md:mb-6">Home is here</p>
					<h2 class="[font-family:var(--font-display)] text-4xl leading-tight font-bold tracking-tight md:text-6xl md:leading-[1.14]">
						累了就待會，這裡沒那麼多規矩
						<br class="hidden md:block" />
					</h2>
					<p class="text-foreground/92 mt-8 max-w-5xl border-l-2 border-primary/55 pl-6 text-lg leading-relaxed md:mt-10 md:pl-8 md:text-2xl md:leading-relaxed">
						外面世界很大、走得很累的時候，這裡永遠為你留著一盞燈。我們不只是聚在一起的人，而是彼此生命裡的一份力量。在那些沒人看見的脆弱時刻，是這個家給了我們重新出發的勇氣；我們或許沒有血緣，卻在無數個日常的關心裡，活成了彼此最親的家人。
					</p>
				</div>
			</div>
		</article>
	</div>
</section>

<section class="relative z-10 px-4 pb-16 pt-2 md:pb-28 md:pt-6" bind:this={leadershipSectionEl}>
	<div class="mx-auto w-full max-w-6xl">
		<div
			class="sticky top-20 z-50 mb-8 flex items-end justify-between gap-4 pt-3 transition-opacity duration-300 md:top-24 md:mb-10 md:pt-4"
			style={`opacity: ${leadershipHeadingOpacity};`}
		>
			<div>
				<p class="text-foreground/74 text-[10px] font-semibold tracking-[0.34em] uppercase md:text-xs">Leadership Messages</p>
				<h3 class="[font-family:var(--font-display)] mt-2 text-3xl font-bold tracking-tight md:text-5xl">燈火下的真心話</h3>
			</div>
		</div>

		<div class="relative space-y-6 pt-2 md:space-y-8 md:pt-3">
			{#each stackCards as card, index (card.kicker)}
				<article
					class="sticky overflow-hidden rounded-[2rem] border border-white/40 bg-[linear-gradient(145deg,color-mix(in_oklab,var(--background)_88%,transparent),color-mix(in_oklab,var(--primary)_9%,var(--background)))] p-6 shadow-[0_28px_80px_-50px_color-mix(in_oklab,var(--foreground)_75%,transparent)] backdrop-blur-sm md:p-8"
					style={`top: calc(14rem + ${index * 2}rem); z-index: ${30 - index}; transform: scale(${1 - index * 0.025});`}
				>
					<div class="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-primary/15 blur-3xl"></div>
					<div class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_5%,transparent)_1px,transparent_1px)] bg-size-[34px_34px] opacity-40"></div>

					<div class="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
						<div class="space-y-4 md:space-y-5">
							<p class="text-primary/85 text-[10px] font-semibold tracking-[0.28em] uppercase md:text-xs">{card.kicker}</p>
							<h4 class="[font-family:var(--font-display)] text-2xl leading-tight font-bold tracking-tight md:text-4xl">{card.title}</h4>
							<p class="text-foreground/86 max-w-2xl text-sm leading-relaxed md:text-base">{card.description}</p>
						</div>

						<a
							href={card.href}
							class="bg-background/84 hover:bg-muted inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-semibold transition"
						>
							{card.cta}
						</a>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<section class="relative z-10 px-4 pb-12 pt-2 md:pb-16 md:pt-6">
	<div class="mx-auto w-full max-w-6xl">
		<div class="relative overflow-hidden rounded-[2rem] border border-white/30 bg-background/68 p-5 shadow-[0_22px_70px_-45px_color-mix(in_oklab,var(--foreground)_70%,transparent)] backdrop-blur-sm md:p-7">
			<div class="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-primary/10 to-transparent"></div>

			<div class="relative flex flex-col gap-6 md:gap-8">
				<div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
					<div class="space-y-2">
						<p class="text-foreground/78 text-[10px] font-semibold tracking-[0.34em] uppercase md:text-xs">Explore YF_Team</p>
						<h3 class="[font-family:var(--font-display)] text-2xl font-bold tracking-tight md:text-4xl">從這裡開始，找到你的歸屬感</h3>
					</div>
					<div class="flex flex-wrap gap-2">
						<a
							href="/news"
							class="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center rounded-full px-4 py-2.5 text-sm font-semibold shadow-lg shadow-primary/20 transition"
						>
							看最新消息
						</a>
						<a
							href="/highlights"
							class="bg-background/80 hover:bg-muted inline-flex items-center rounded-full border px-4 py-2.5 text-sm font-semibold transition"
						>
							看精彩回顧
						</a>
					</div>
				</div>

				<div class="grid gap-4 md:grid-cols-6 md:grid-rows-2">
					<a href="/news" class="group md:col-span-3 md:row-span-2 rounded-3xl border bg-background/72 p-6 transition hover:bg-background/90">
						<p class="text-primary text-xs font-semibold tracking-[0.15em]">LATEST</p>
						<h2 class="mt-3 [font-family:var(--font-display)] text-2xl font-semibold md:text-3xl">最新消息</h2>
						<p class="text-foreground/80 mt-3 max-w-sm text-sm leading-relaxed md:text-base">公告、制度更新、活動上線資訊一站掌握，第一時間知道社群正在發生什麼。</p>
					</a>
					<a href="/highlights" class="group md:col-span-3 rounded-3xl border bg-background/62 p-5 transition hover:bg-background/82">
						<p class="text-primary text-xs font-semibold tracking-[0.15em]">MOMENTS</p>
						<h2 class="mt-2 [font-family:var(--font-display)] text-xl font-semibold">精彩回顧</h2>
						<p class="text-foreground/80 mt-2 text-sm">用照片與紀錄，保存每次熱血與感動。</p>
					</a>
					<a href="/hall-of-fame" class="group md:col-span-2 rounded-3xl border bg-background/62 p-5 transition hover:bg-background/82">
						<p class="text-primary text-xs font-semibold tracking-[0.15em]">CULTURE</p>
						<h2 class="mt-2 [font-family:var(--font-display)] text-xl font-semibold">榮譽榜</h2>
						<p class="text-foreground/80 mt-2 text-sm">看見努力的價值，讓文化被記住。</p>
					</a>
					<a href="/team" class="group md:col-span-1 rounded-3xl border bg-primary/13 p-5 transition hover:bg-primary/20">
						<p class="text-primary text-xs font-semibold tracking-[0.15em]">PEOPLE</p>
						<h2 class="mt-2 [font-family:var(--font-display)] text-xl font-semibold">管理團隊</h2>
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
