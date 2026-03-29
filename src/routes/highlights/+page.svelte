<script lang="ts">
	import { onMount } from 'svelte';

	const slides = [
		{ id: 1, alt: '精采回顧圖片 1' },
		{ id: 2, alt: '精采回顧圖片 2' },
		{ id: 3, alt: '精采回顧圖片 3' },
		{ id: 4, alt: '精采回顧圖片 4' }
	];

	let currentIndex = $state(0);
	let isAutoplayRunning = $state(false);

	type AutoplayOptions = {
		delay: number;
		stopOnInteraction: boolean;
	};

	const Autoplay = ({ delay, stopOnInteraction }: AutoplayOptions) => {
		let timerId: ReturnType<typeof setInterval> | null = null;

		const start = (onTick: () => void) => {
			if (timerId) return;
			timerId = setInterval(onTick, delay);
			isAutoplayRunning = true;
		};

		const stop = () => {
			if (!timerId) return;
			clearInterval(timerId);
			timerId = null;
			isAutoplayRunning = false;
		};

		const reset = (onTick: () => void) => {
			stop();
			start(onTick);
		};

		return {
			stopOnInteraction,
			start,
			stop,
			reset
		};
	};

	const plugin = Autoplay({ delay: 2000, stopOnInteraction: true });

	const tick = () => {
		currentIndex = (currentIndex + 1) % slides.length;
	};

	const goTo = (index: number) => {
		currentIndex = (index + slides.length) % slides.length;
		if (plugin.stopOnInteraction) {
			plugin.stop();
		} else {
			plugin.reset(tick);
		}
	};

	const prev = () => goTo(currentIndex - 1);
	const next = () => goTo(currentIndex + 1);

	const pauseAutoplay = () => {
		plugin.stop();
	};

	const resumeAutoplay = () => {
		if (!plugin.stopOnInteraction) {
			plugin.start(tick);
		}
	};

	onMount(() => {
		plugin.start(tick);

		return () => {
			plugin.stop();
		};
	});
</script>

<section class="px-4 pb-12 pt-6 md:pb-20 md:pt-10">
	<div class="mx-auto w-full max-w-7xl space-y-10 md:space-y-14">
		<div class="relative isolate overflow-hidden rounded-[2.4rem] border border-white/35 bg-[linear-gradient(140deg,color-mix(in_oklab,var(--background)_94%,transparent),color-mix(in_oklab,var(--primary)_7%,var(--background)))] px-6 py-8 shadow-[0_30px_85px_-48px_color-mix(in_oklab,var(--foreground)_68%,transparent)] md:px-10 md:py-12">
			<div class="pointer-events-none absolute -right-16 top-8 h-40 w-40 rounded-full bg-primary/12 blur-3xl"></div>
			<div class="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--foreground)_5%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--foreground)_5%,transparent)_1px,transparent_1px)] bg-size-[32px_32px] opacity-55"></div>

			<div class="relative space-y-6 md:space-y-8">
				<p class="text-foreground/80 text-xs font-semibold tracking-[0.3em] uppercase">Highlights Archive</p>
				<h1 class="[font-family:var(--font-display)] text-4xl leading-tight font-bold tracking-tight md:text-6xl">精彩回顧</h1>
				<p class="text-foreground/82 max-w-3xl text-base leading-relaxed md:text-lg">
					這裡預留給活動照片、紀錄與故事。現在先保留版面，等你準備好內容後再放上去。
				</p>
			</div>
		</div>

		<div class="relative overflow-hidden rounded-[2rem] border bg-[linear-gradient(160deg,color-mix(in_oklab,var(--background)_88%,transparent),color-mix(in_oklab,var(--primary)_10%,var(--background)))] p-5 shadow-[0_24px_70px_-50px_color-mix(in_oklab,var(--foreground)_72%,transparent)] md:p-8">
			<div class="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/16 blur-3xl"></div>
			<div class="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-foreground/10 blur-3xl"></div>

			<div class="mb-5 flex items-center justify-between gap-3 md:mb-7">
				<div class="flex items-center gap-3">
					<p class="text-foreground/80 text-xs font-semibold tracking-[0.3em] uppercase">Image Carousel</p>
					<span class={`rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em] uppercase ${isAutoplayRunning ? 'bg-primary/20 text-primary' : 'bg-foreground/12 text-foreground/70'}`}>
						{isAutoplayRunning ? 'Playing' : 'Paused'}
					</span>
				</div>
				<div class="flex items-center gap-2">
					<button
						type="button"
						onclick={prev}
						class="hover:bg-muted/70 inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background/85 text-sm transition"
						aria-label="上一張"
					>
						←
					</button>
					<button
						type="button"
						onclick={next}
						class="hover:bg-muted/70 inline-flex h-9 w-9 items-center justify-center rounded-full border bg-background/85 text-sm transition"
						aria-label="下一張"
					>
						→
					</button>
				</div>
			</div>

			<div
				class="overflow-hidden rounded-3xl border bg-background/60"
				onmouseenter={pauseAutoplay}
				onmouseleave={resumeAutoplay}
				role="region"
				aria-label="精采回顧輪播"
			>
				<div
					class="flex transition-transform duration-500 ease-out"
					style={`transform: translateX(-${currentIndex * 100}%);`}
				>
					{#each slides as slide (slide.id)}
						<article class="min-w-full p-4 md:p-6">
							<div class="group relative overflow-hidden rounded-2xl border">
								<img
									src="/bg-main-layout.webp"
									alt={slide.alt}
									class="h-64 w-full object-cover dark:hidden md:h-112"
								/>
								<img
									src="/bg-second-layout.webp"
									alt={slide.alt}
									class="hidden h-64 w-full object-cover dark:block md:h-112"
								/>
								<div class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/35 via-transparent to-transparent opacity-70"></div>
								<div class="absolute left-4 top-4 rounded-full border border-white/45 bg-black/20 px-3 py-1 text-[10px] tracking-[0.18em] text-white/90 uppercase backdrop-blur-sm">YF Highlights</div>
							</div>
							<div class="mt-4 grid gap-3 md:grid-cols-[180px_minmax(0,1fr)]">
								<div class="h-14 rounded-2xl border border-dashed bg-background/78"></div>
								<div class="h-14 rounded-2xl border border-dashed bg-background/78"></div>
							</div>
						</article>
					{/each}
				</div>
			</div>

			<div class="mt-5 flex justify-center gap-2">
				{#each slides as slide, index (slide.id)}
					<button
						type="button"
						onclick={() => goTo(index)}
						class={`h-2.5 rounded-full transition-all ${
							index === currentIndex
								? 'bg-primary w-8'
								: 'bg-foreground/25 hover:bg-foreground/40 w-2.5'
						}`}
						aria-label={`切換到第 ${index + 1} 張`}
					></button>
				{/each}
			</div>
		</div>
	</div>
</section>
