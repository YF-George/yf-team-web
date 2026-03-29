<script lang="ts">
	import { onMount } from 'svelte';
	import type { Component } from 'svelte';
	import { navigating, page } from '$app/state';
	import './layout.css';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { cn } from '$lib/utils.js';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import HouseIcon from '@lucide/svelte/icons/house';
	import NewspaperIcon from '@lucide/svelte/icons/newspaper';
	import BookTextIcon from '@lucide/svelte/icons/book-text';
	import TrophyIcon from '@lucide/svelte/icons/trophy';
	import UsersIcon from '@lucide/svelte/icons/users';
	import HelpCircleIcon from '@lucide/svelte/icons/help-circle';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { navigationMenuTriggerStyle } from '$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte';

	type NavItem = {
		title: string;
		href: string;
		icon: Component;
	};

	const navItems: NavItem[] = [
		{ title: '首頁', href: '/', icon: HouseIcon },
		{ title: '最新消息', href: '/news', icon: NewspaperIcon },
		{ title: '規範', href: '/rules', icon: BookTextIcon },
		{ title: 'FAQ', href: '/faq', icon: HelpCircleIcon },
		{ title: '榮譽榜', href: '/hall-of-fame', icon: TrophyIcon },
		{ title: '管理團隊', href: '/team', icon: UsersIcon }
	];

	let { children } = $props();

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
	class="theme-transition bg-background/85 supports-backdrop-filter:bg-background/65 sticky top-0 z-40 border-b backdrop-blur-xl"
	class:nav-switching={Boolean(navigating.to)}
>
	<div
		class="from-primary/12 via-primary/3 to-primary/12 pointer-events-none absolute inset-x-0 top-0 h-0.75 bg-linear-to-r"
	></div>
	<div class="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-4 py-3 md:gap-4">
		<a href="/" class="relative inline-flex shrink-0 items-center gap-2 text-base font-semibold tracking-tight">
			<span
				class="inline-flex size-8 items-center justify-center rounded-xl bg-black/70 p-1 ring-1 ring-black/15 shadow-sm"
			>
				<img src="/LOGO.svg" alt="YF_Team Logo" class="size-full" />
			</span>
			<span
				class="from-primary via-foreground to-primary [font-family:var(--font-display)] hidden bg-linear-to-r bg-clip-text text-transparent sm:inline"
			>
				{headerBrandText}
			</span>
		</a>

		<div class="ml-auto flex min-w-0 items-center gap-2">
			<div class="no-scrollbar min-w-0 overflow-x-auto">
				<NavigationMenu.Root viewport={false}>
					<NavigationMenu.List
						class="nav-list bg-muted/35 ring-border/70 inline-flex flex-nowrap items-center gap-1 rounded-xl p-1 ring-1 shadow-[0_10px_25px_-20px_color-mix(in_oklab,var(--foreground)_75%,transparent)]"
					>
						{#each navItems as item (item.href)}
							<NavigationMenu.Item>
								<NavigationMenu.Link
									href={item.href}
									class={cn(
										navigationMenuTriggerStyle(),
										'nav-link relative inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-2 text-xs font-medium transition-all duration-300 ease-out md:px-3 md:text-sm',
										isActive(item.href)
											? 'bg-primary text-primary-foreground shadow-[0_0_0_1px_hsl(var(--background))_inset,0_10px_28px_-14px_hsl(var(--foreground))]'
											: 'bg-transparent text-foreground/80 hover:-translate-y-0.5 hover:text-foreground'
									)}
									aria-label={item.title}
									title={item.title}
								>
									<item.icon class="size-4 md:hidden" aria-hidden="true" />
									<span class="hidden md:inline">{item.title}</span>
								</NavigationMenu.Link>
							</NavigationMenu.Item>
						{/each}
					</NavigationMenu.List>
				</NavigationMenu.Root>
			</div>

			<button
				type="button"
				onclick={toggleMode}
				class="border-input bg-background/90 hover:bg-accent hover:text-accent-foreground relative inline-flex size-9 items-center justify-center rounded-xl border transition-colors"
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

<main class="theme-transition mx-auto w-full max-w-6xl px-4 py-8">
	{@render children()}
</main>

<footer
	class="theme-transition border-input bg-background/50 supports-backdrop-filter:bg-background/30 relative border-t backdrop-blur-sm"
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
				<p class="text-xs leading-relaxed text-foreground/80">與我們一起探索無限可能，打造充滿活力的技術社群。</p>
			</div>

			<!-- 快速導航 1 -->
			<div class="flex flex-col gap-3">
				<h3 class="text-sm font-semibold text-foreground/90">產品</h3>
				<ul class="flex flex-col gap-2">
					<li>
						<a href="/" class="text-xs text-foreground/80 hover:text-foreground/90 transition-colors"
							>首頁</a
						>
					</li>
					<li>
						<a href="/news" class="text-xs text-foreground/80 hover:text-foreground/90 transition-colors"
							>最新消息</a
						>
					</li>
					<li>
						<a href="/rules" class="text-xs text-foreground/80 hover:text-foreground/90 transition-colors"
							>規範</a
						>
					</li>
					<li>
						<a href="/faq" class="text-xs text-foreground/80 hover:text-foreground/90 transition-colors"
							>FAQ</a
						>
					</li>
				</ul>
			</div>

			<!-- 快速導航 2 -->
			<div class="flex flex-col gap-3">
				<h3 class="text-sm font-semibold text-foreground/90">社群</h3>
				<ul class="flex flex-col gap-2">
					<li>
						<a href="/hall-of-fame" class="text-xs text-foreground/80 hover:text-foreground/90 transition-colors"
							>榮譽榜</a
						>
					</li>
					<li>
						<a href="/team" class="text-xs text-foreground/80 hover:text-foreground/90 transition-colors"
							>管理團隊</a
						>
					</li>
					<li>
						<a href="mailto:yf.george320@gmail.com" class="text-xs text-foreground/80 hover:text-foreground/90 transition-colors"
							>聯絡我們</a
						>
					</li>
				</ul>
			</div>

			<!-- 聯絡資訊 -->
			<div class="flex flex-col gap-3">
				<h3 class="text-sm font-semibold text-foreground/90">聯繫</h3>
				<ul class="flex flex-col gap-2">
					<li class="text-xs text-foreground/80">
						<a href="mailto:yf.george320@gmail.com" class="hover:text-foreground/90 transition-colors"
							>yf.george320@gmail.com</a
						>
					</li>
					<li>
						<a href="https://discord.gg/WtmxxKmH4Z" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1 text-xs text-foreground/80 hover:text-foreground/90 transition-colors"
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
			<p class="text-xs text-foreground/75">
				© 2024-2026 YF_Team. 保留所有權利。
			</p>
			<div class="flex gap-4">
				<a href="/privacy-policy" class="text-xs text-foreground/75 hover:text-foreground/90 transition-colors"
					>隱私政策</a
				>
				<a href="/terms-of-service" class="text-xs text-foreground/75 hover:text-foreground/90 transition-colors"
					>使用條款</a
				>
				<a href="/sitemap" class="text-xs text-foreground/75 hover:text-foreground/90 transition-colors"
					>網頁地圖</a
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
		filter: brightness(1) saturate(1);
		opacity: 1;
		transition:
			filter 680ms cubic-bezier(0.22, 1, 0.36, 1),
			opacity 680ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	:global(.dark) .app-bg {
		background-image:
			linear-gradient(
				to bottom,
				color-mix(in oklab, var(--background) 10%, transparent),
				color-mix(in oklab, var(--background) 36%, transparent)
			),
			url('/bg-second-layout.webp');
		filter: brightness(0.88) saturate(1.06);
		opacity: 0.96;
	}

	:global(.nav-switching .nav-list) {
		animation: navListPulse 420ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	:global(.nav-switching .nav-link) {
		animation: navLinkNudge 360ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	@keyframes navListPulse {
		0% {
			transform: scale(1);
			filter: saturate(1);
		}
		40% {
			transform: scale(1.015);
			filter: saturate(1.08);
		}
		100% {
			transform: scale(1);
			filter: saturate(1);
		}
	}

	@keyframes navLinkNudge {
		0% {
			transform: translateY(0);
		}
		45% {
			transform: translateY(-1px);
		}
		100% {
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.nav-switching .nav-list),
		:global(.nav-switching .nav-link) {
			animation: none !important;
		}
	}
</style>
