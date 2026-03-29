<script lang="ts">
	import { onMount } from 'svelte';
	import { navigating } from '$app/state';
	import type { HTMLAttributes } from 'svelte/elements';
	import './layout.css';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { cn } from '$lib/utils.js';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import MegaphoneIcon from '@lucide/svelte/icons/megaphone';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { navigationMenuTriggerStyle } from '$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte';

	type MenuItem = {
		title: string;
		href: string;
		description: string;
	};

	const homeMenuItems: MenuItem[] = [
		{ title: '社群規範', href: '/rules', description: '了解社群行為準則與參與方式。' },
		{ title: 'FAQ', href: '/faq', description: '快速查詢常見問題與加入流程。' },
		{ title: '管理團隊', href: '/team', description: '查看目前管理成員與聯絡資訊。' }
	];

	const communityMenuItems: MenuItem[] = [
		{ title: '隱私政策', href: '/privacy-policy', description: '了解個人資料與隱私處理原則。' },
		{ title: '使用條款', href: '/terms-of-service', description: '查看網站與社群使用規範。' },
		{ title: '網頁地圖', href: '/sitemap', description: '快速索引全站頁面與入口。' }
	];

	type ListItemProps = HTMLAttributes<HTMLAnchorElement> & {
		title: string;
		href: string;
		content: string;
	};

	let { children } = $props();

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

{#snippet ListItem({ title, content, href, class: className, ...restProps }: ListItemProps)}
	<li>
		<NavigationMenu.Link>
			{#snippet child()}
				<a
					{href}
					class={cn(
						'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
						className
					)}
					{...restProps}
				>
					<div class="text-sm leading-none font-medium">{title}</div>
					<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">{content}</p>
				</a>
			{/snippet}
		</NavigationMenu.Link>
	</li>
{/snippet}

<svelte:head><link rel="icon" href="/LOGO.svg" /></svelte:head>
<ModeWatcher />

<div class="app-bg pointer-events-none fixed inset-0 -z-10"></div>

<div class="min-h-dvh flex flex-col">
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
			<div class="no-scrollbar min-w-0 overflow-x-auto md:overflow-visible">
				<NavigationMenu.Root viewport={true}>
					<NavigationMenu.List
						class="nav-list bg-muted/35 ring-border/70 inline-flex flex-nowrap items-center gap-1 rounded-xl p-1 ring-1 shadow-[0_10px_25px_-20px_color-mix(in_oklab,var(--foreground)_75%,transparent)]"
					>
						<NavigationMenu.Item>
							<NavigationMenu.Trigger class="text-xs md:text-sm">首頁</NavigationMenu.Trigger>
							<NavigationMenu.Content>
								<ul class="grid gap-2 p-2 md:w-105 lg:w-130 lg:grid-cols-[.8fr_1fr]">
									<li class="row-span-3">
										<NavigationMenu.Link
											class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden select-none focus:shadow-md md:p-6"
										>
											{#snippet child({ props })}
												<a {...props} href="/">
													<div class="mt-4 mb-2 text-lg font-medium">YF_Team</div>
													<p class="text-muted-foreground text-sm leading-tight">社群首頁與核心資訊入口。</p>
												</a>
											{/snippet}
										</NavigationMenu.Link>
									</li>
									{#each homeMenuItems as item (item.href)}
										{@render ListItem({ href: item.href, title: item.title, content: item.description })}
									{/each}
								</ul>
							</NavigationMenu.Content>
						</NavigationMenu.Item>

						<NavigationMenu.Item>
							<NavigationMenu.Trigger class="text-xs md:text-sm">社群</NavigationMenu.Trigger>
							<NavigationMenu.Content>
								<ul class="grid w-75 gap-2 p-2 sm:w-105 md:w-130 md:grid-cols-2">
									{#each communityMenuItems as item (item.href)}
										{@render ListItem({ href: item.href, title: item.title, content: item.description })}
									{/each}
								</ul>
							</NavigationMenu.Content>
						</NavigationMenu.Item>

						<NavigationMenu.Item>
							<NavigationMenu.Link>
								{#snippet child()}
									<a href="/news" class={cn(navigationMenuTriggerStyle(), 'inline-flex items-center gap-2 text-xs md:text-sm')}>
										<MegaphoneIcon class="size-4" />
										最新消息
									</a>
								{/snippet}
							</NavigationMenu.Link>
						</NavigationMenu.Item>


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

<main
	class="page-shell theme-transition mx-auto flex-1 w-full max-w-6xl px-4 py-8"
	class:page-switching={Boolean(navigating.to)}
>
	{@render children()}
</main>

<a
	href="https://discord.gg/WtmxxKmH4Z"
	target="_blank"
	rel="noopener noreferrer"
	class="dc-fab group fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-background/90 px-3 py-2 shadow-[0_12px_30px_-12px_color-mix(in_oklab,var(--foreground)_65%,transparent)] backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-primary/10 md:bottom-6 md:right-6"
	aria-label="加入 DC 社群"
	title="加入 DC 社群"
>
	<span class="inline-flex size-8 items-center justify-center rounded-full bg-[#5865F2] text-white">
		<svg class="size-4.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
			<path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8851-1.5152.0741.0741 0 0 0-.0785.0371c-.2112.3753-.4447.8648-.6083 1.2495a18.27 18.27 0 0 0-5.4875 0 12.64 12.64 0 0 0-.6179-1.2495.077.077 0 0 0-.0785-.037A19.7363 19.7363 0 0 0 3.677 4.3698a.0699.0699 0 0 0-.0321.0277C.5334 9.0467-.3202 13.58.0992 18.0578a.0824.0824 0 0 0 .0312.0561 19.9008 19.9008 0 0 0 6.0056 3.0386.0777.0777 0 0 0 .0842-.0276 14.0231 14.0231 0 0 0 1.2264-1.9944.076.076 0 0 0-.0416-.1057 13.107 13.107 0 0 1-1.872-0.8924.077.077 0 0 1-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 0 1 .0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0743.0743 0 0 1 .0789.0094c.1202.0991.246.1981.3728.2925a.077.077 0 0 1-.0066.1276 12.299 12.299 0 0 1-1.873.8914.0766.0766 0 0 0-.0407.1067c.2472.7138.6612 1.3816 1.2254 1.9935a.076.076 0 0 0 .0842.0286 19.839 19.839 0 0 0 6.0065-3.0386.077.077 0 0 0 .0313-.0552c.5006-5.1778-.838-9.6749-3.5485-13.6591a.061.061 0 0 0-.0313-.0286ZM8.02 15.3312c-1.1822 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.1569-2.4189 1.2103 0 2.1758 1.0952 2.1568 2.4189 0 1.3333-.9555 2.419-2.1568 2.419Zm7.9747 0c-1.1822 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.1569-2.4189 1.2103 0 2.1758 1.0952 2.1568 2.4189 0 1.3333-.9465 2.419-2.1568 2.419Z" />
		</svg>
	</span>
</a>

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
</div>

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

	.page-shell {
		animation: pageShellEnter 420ms cubic-bezier(0.22, 1, 0.36, 1);
		transition:
			opacity 260ms cubic-bezier(0.22, 1, 0.36, 1),
			transform 320ms cubic-bezier(0.22, 1, 0.36, 1),
			filter 320ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.page-shell.page-switching {
		opacity: 0.72;
		transform: translateY(6px) scale(0.998);
		filter: saturate(0.94);
	}

	.dc-fab {
		animation:
			dcFabPop 360ms cubic-bezier(0.22, 1, 0.36, 1),
			dcFabFloat 2800ms ease-in-out 420ms infinite;
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

	@keyframes pageShellEnter {
		0% {
			opacity: 0;
			transform: translateY(10px);
			filter: blur(2px);
		}
		100% {
			opacity: 1;
			transform: translateY(0);
			filter: blur(0);
		}
	}

	@keyframes dcFabPop {
		0% {
			opacity: 0;
			transform: translateY(10px) scale(0.9);
		}
		100% {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes dcFabFloat {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-3px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.nav-switching .nav-list),
		:global(.nav-switching .nav-link),
		.page-shell,
		.dc-fab {
			animation: none !important;
		}

		.page-shell {
			transition: none !important;
		}
	}
</style>
