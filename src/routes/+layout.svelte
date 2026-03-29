<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import './layout.css';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { cn } from '$lib/utils.js';
	import { IsMobile } from '$lib/components/hooks/is-mobile.svelte.js';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { navigationMenuTriggerStyle } from '$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte';

	type NavItem = {
		title: string;
		href: string;
	};

	const navItems: NavItem[] = [
		{ title: '首頁', href: '/' },
		{ title: '最新消息', href: '/news' },
		{ title: '精彩回顧', href: '/highlights' },
		{ title: '榮譽榜', href: '/hall-of-fame' },
		{ title: '管理團隊', href: '/team' }
	];

	let { children } = $props();
	const isMobile = new IsMobile();

	const isActive = (href: string) => {
		const pathname = page.url.pathname;
		if (href === '/') return pathname === '/';
		return pathname === href || pathname.startsWith(`${href}/`);
	};

	const BRAND_TEXT = 'YF_Team';
	const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

	let headerBrandText = $state(BRAND_TEXT);
	let footerBrandText = $state(BRAND_TEXT);

	let stopHeaderScramble: (() => void) | null = null;
	let stopFooterScramble: (() => void) | null = null;

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

	const runScramble = (
		target: string,
		setter: (value: string) => void,
		duration = 850,
		step = 40
	) => {
		let elapsed = 0;
		setter(buildScrambleFrame(target, 0));

		const intervalId = window.setInterval(() => {
			elapsed += step;
			const progress = Math.min(elapsed / duration, 1);
			setter(buildScrambleFrame(target, progress));

			if (progress >= 1) {
				window.clearInterval(intervalId);
				setter(target);
			}
		}, step);

		return () => {
			window.clearInterval(intervalId);
			setter(target);
		};
	};

	const triggerHeaderBrandScramble = () => {
		stopHeaderScramble?.();
		stopHeaderScramble = runScramble(BRAND_TEXT, (value) => {
			headerBrandText = value;
		});
	};

	const triggerFooterBrandScramble = () => {
		stopFooterScramble?.();
		stopFooterScramble = runScramble(BRAND_TEXT, (value) => {
			footerBrandText = value;
		}, 1050);
	};

	onMount(() => {
		triggerHeaderBrandScramble();
		triggerFooterBrandScramble();

		return () => {
			stopHeaderScramble?.();
			stopFooterScramble?.();
		};
	});
</script>

<svelte:head><link rel="icon" href="/LOGO.svg" /></svelte:head>
<ModeWatcher />

<div class="app-bg pointer-events-none fixed inset-0 -z-10"></div>

<header
	class="bg-background/85 supports-backdrop-filter:bg-background/65 sticky top-0 z-40 border-b backdrop-blur-xl"
>
	<div
		class="from-primary/12 via-primary/3 to-primary/12 pointer-events-none absolute inset-x-0 top-0 h-0.75 bg-linear-to-r"
	></div>
	<div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
		<a href="/" class="relative inline-flex items-center gap-2 text-base font-semibold tracking-tight">
			<img src="/LOGO.svg" alt="YF_Team Logo" class="size-7" />
			<span
				class="from-primary via-foreground to-primary [font-family:var(--font-display)] bg-linear-to-r bg-clip-text text-transparent"
			>
				{headerBrandText}
			</span>
		</a>

		<div class="flex items-center gap-2">
			<div class="no-scrollbar overflow-x-auto">
				<NavigationMenu.Root viewport={isMobile.current}>
					<NavigationMenu.List
						class="bg-muted/35 ring-border/70 inline-flex flex-nowrap items-center gap-1 rounded-full p-1 ring-1 shadow-[0_10px_25px_-20px_color-mix(in_oklab,var(--foreground)_75%,transparent)]"
					>
						{#each navItems as item (item.href)}
							<NavigationMenu.Item>
								<NavigationMenu.Link
									href={item.href}
									class={cn(
										navigationMenuTriggerStyle(),
										'relative h-8 rounded-full px-3 text-xs font-medium md:text-sm',
										isActive(item.href)
											? 'bg-primary text-primary-foreground shadow-[0_0_0_1px_hsl(var(--background))_inset,0_10px_28px_-14px_hsl(var(--foreground))]'
											: 'bg-transparent text-foreground/80 hover:text-foreground'
									)}
								>
									{item.title}
								</NavigationMenu.Link>
							</NavigationMenu.Item>
						{/each}
					</NavigationMenu.List>
				</NavigationMenu.Root>
			</div>

			<button
				type="button"
				onclick={toggleMode}
				class="border-input bg-background/90 hover:bg-accent hover:text-accent-foreground relative inline-flex size-9 items-center justify-center rounded-full border transition-colors"
				aria-label="切換深淺色模式"
				title="切換深淺色模式"
			>
				<SunIcon
					class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all! dark:scale-0 dark:-rotate-90"
				/>
				<MoonIcon
					class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all! dark:scale-100 dark:rotate-0"
				/>
				<span class="sr-only">Toggle theme</span>
			</button>
		</div>
	</div>
</header>

<main class="mx-auto w-full max-w-6xl px-4 py-8">
	{@render children()}
</main>

<footer
	class="border-input bg-background/50 supports-backdrop-filter:bg-background/30 relative border-t backdrop-blur-sm"
>
	<div
		class="from-primary/8 via-primary/2 to-primary/8 pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-linear-to-r"
	></div>

	<div class="mx-auto w-full max-w-6xl px-4 py-12">
		<div class="grid gap-8 md:grid-cols-4 md:gap-12">
			<!-- 品牌區域 -->
			<div class="flex flex-col gap-3">
				<div class="flex items-center gap-2">
					<img src="/LOGO.svg" alt="YF_Team Logo" class="size-6" />
					<span
						class="from-primary via-foreground to-primary [font-family:var(--font-display)] bg-linear-to-r bg-clip-text text-sm font-semibold tracking-tight text-transparent"
					>
						{footerBrandText}
					</span>
				</div>
				<p class="text-xs leading-relaxed text-foreground/70">與我們一起探索無限可能，打造充滿活力的技術社群。</p>
			</div>

			<!-- 快速導航 1 -->
			<div class="flex flex-col gap-3">
				<h3 class="text-sm font-semibold text-foreground/90">產品</h3>
				<ul class="flex flex-col gap-2">
					<li>
						<a href="/" class="text-xs text-foreground/70 hover:text-foreground/90 transition-colors"
							>首頁</a
						>
					</li>
					<li>
						<a href="/news" class="text-xs text-foreground/70 hover:text-foreground/90 transition-colors"
							>最新消息</a
						>
					</li>
					<li>
						<a href="/highlights" class="text-xs text-foreground/70 hover:text-foreground/90 transition-colors"
							>精彩回顧</a
						>
					</li>
				</ul>
			</div>

			<!-- 快速導航 2 -->
			<div class="flex flex-col gap-3">
				<h3 class="text-sm font-semibold text-foreground/90">社群</h3>
				<ul class="flex flex-col gap-2">
					<li>
						<a href="/hall-of-fame" class="text-xs text-foreground/70 hover:text-foreground/90 transition-colors"
							>榮譽榜</a
						>
					</li>
					<li>
						<a href="/team" class="text-xs text-foreground/70 hover:text-foreground/90 transition-colors"
							>管理團隊</a
						>
					</li>
					<li>
						<a href="mailto:contact@yfteam.com" class="text-xs text-foreground/70 hover:text-foreground/90 transition-colors"
							>聯絡我們</a
						>
					</li>
				</ul>
			</div>

			<!-- 聯絡資訊 -->
			<div class="flex flex-col gap-3">
				<h3 class="text-sm font-semibold text-foreground/90">聯繫</h3>
				<ul class="flex flex-col gap-2">
					<li class="text-xs text-foreground/70">
						<a href="mailto:contact@yfteam.com" class="hover:text-foreground/90 transition-colors"
							>contact@yfteam.com</a
						>
					</li>
					<li>
						<a href="https://discord.gg/WtmxxKmH4Z" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs text-foreground/70 hover:text-foreground/90 transition-colors"
							>加入 Discord 社群</a
						>
					</li>
				</ul>
			</div>
		</div>

		<!-- 分隔線 -->
		<div class="border-input my-8 border-t"></div>

		<!-- 底部 -->
		<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
			<p class="text-xs text-foreground/60">
				© 2024-2026 YF_Team. 保留所有權利。
			</p>
			<div class="flex gap-4">
				<button class="text-xs text-foreground/60 hover:text-foreground/90 transition-colors"
					>隱私政策</button
				>
				<button class="text-xs text-foreground/60 hover:text-foreground/90 transition-colors"
					>使用條款</button
				>
				<button class="text-xs text-foreground/60 hover:text-foreground/90 transition-colors"
					>網頁地圖</button
				>
			</div>
		</div>
	</div>
</footer>

<style>
	.app-bg {
		background-image:
			linear-gradient(
				to bottom,
				color-mix(in oklab, var(--background) 24%, transparent),
				color-mix(in oklab, var(--background) 80%, transparent)
			),
			url('/bg-main-layout.webp');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	:global(.dark) .app-bg {
		background-image:
			linear-gradient(
				to bottom,
				color-mix(in oklab, var(--background) 24%, transparent),
				color-mix(in oklab, var(--background) 80%, transparent)
			),
			url('/bg-second-layout.webp');
	}
</style>
