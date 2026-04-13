/**
 * kittyBurst — press and hold a cat, then burst it into tiny cats.
 */

export interface KittyBurstOptions {
	holdMs?: number;
	burstCount?: number;
	emoji?: string;
	fragmentEmoji?: string;
	size?: string;
	fragmentSize?: string;
	durationMs?: number;
	respawn?: boolean;
	onBurst?: (element: HTMLElement) => void;
}

export function kittyBurst(
	element: HTMLElement,
	options: KittyBurstOptions = {},
): () => void {
	const {
		holdMs = 600,
		burstCount = 8,
		emoji = '🐈',
		fragmentEmoji = '🐱',
		size = '4rem',
		fragmentSize = '1.5rem',
		durationMs = 900,
		respawn = true,
		onBurst,
	} = options;

	let holdTimer: number | null = null;
	let isPressed = false;

	let holdStart = 0;
	let rafId: number | null = null;

	element.textContent = emoji;
	element.style.fontSize = size;
	element.style.cursor = 'pointer';
	element.style.userSelect = 'none';
	element.style.display = 'inline-block';

	const clearHoldTimer = (): void => {
		if (holdTimer !== null) {
			window.clearTimeout(holdTimer);
			holdTimer = null;
		}
	};

	const animateHold = () => {
		const now = performance.now();
		const elapsed = now - holdStart;
		const progress = Math.min(elapsed / holdMs, 1);

		// ease in/out feel
		const ease = progress * (2 - progress);

		// scale curve: grow then shrink
		let scale;
		if (progress < 0.5) {
			// grow phase
			scale = 1 + ease * 0.2; // up to ~1.2
		} else {
			// shrink phase
			const shrinkProgress = (progress - 0.5) * 2;
			scale = 1.2 - shrinkProgress * 0.4; // down to ~0.8
		}

		element.style.transform = `scale(${scale})`;

		if (progress < 1 && isPressed) {
			rafId = requestAnimationFrame(animateHold);
		}
	};

	const burst = (): void => {
		const rect = element.getBoundingClientRect();
		const startX = rect.left + rect.width / 2;
		const startY = rect.top + rect.height / 2;

		element.style.visibility = 'hidden';

		for (let i = 0; i < burstCount; i++) {
			spawnFragment(startX, startY, fragmentEmoji, fragmentSize, durationMs);
		}

		onBurst?.(element);

		if (respawn) {
			window.setTimeout(() => {
				element.style.visibility = 'visible';
			}, durationMs);
		}
	};

	const onPointerDown = (): void => {
		isPressed = true;
		clearHoldTimer();

		holdStart = performance.now();

		if (rafId !== null) cancelAnimationFrame(rafId);
		rafId = requestAnimationFrame(animateHold);

		holdTimer = window.setTimeout(() => {
			if (isPressed) {
				burst();
			}
		}, holdMs);
	};

	const resetScale = () => {
		element.style.transform = 'scale(1)';
		if (rafId !== null) {
			cancelAnimationFrame(rafId);
			rafId = null;
		}
	};

	const onPointerUp = (): void => {
		isPressed = false;
		clearHoldTimer();
		resetScale();
	};

	const onPointerLeave = (): void => {
		isPressed = false;
		clearHoldTimer();
		resetScale();
	};

	element.addEventListener('pointerdown', onPointerDown);
	element.addEventListener('pointerup', onPointerUp);
	element.addEventListener('pointerleave', onPointerLeave);
	element.addEventListener('pointercancel', onPointerUp);

	return () => {
		clearHoldTimer();
		element.removeEventListener('pointerdown', onPointerDown);
		element.removeEventListener('pointerup', onPointerUp);
		element.removeEventListener('pointerleave', onPointerLeave);
		element.removeEventListener('pointercancel', onPointerUp);
	};
}

function spawnFragment(
	startX: number,
	startY: number,
	emoji: string,
	fontSize: string,
	durationMs: number,
): void {
	const el = document.createElement('div');
	el.textContent = emoji;
	el.style.position = 'fixed';
	el.style.left = `${startX}px`;
	el.style.top = `${startY}px`;
	el.style.transform = 'translate(-50%, -50%)';
	el.style.pointerEvents = 'none';
	el.style.fontSize = fontSize;
	el.style.opacity = '1';
	el.style.zIndex = '9999';

	document.body.appendChild(el);

	const start = performance.now();

	const angle = randomBetween(-2.3, -0.8);
	const speed = randomBetween(120, 260);
	const vx = Math.cos(angle) * speed;
	const vy = Math.sin(angle) * speed;
	const gravity = 520;
	const drift = randomBetween(-20, 20);

	function frame(now: number): void {
		const t = (now - start) / 1000;
		const total = durationMs / 1000;

		if (t >= total) {
			el.remove();
			return;
		}

		const x = startX + vx * t + drift * t;
		const y = startY + vy * t + 0.5 * gravity * t * t;

		el.style.left = `${x}px`;
		el.style.top = `${y}px`;

		const fadeStart = total * 0.65;
		if (t > fadeStart) {
			const remaining = 1 - (t - fadeStart) / (total - fadeStart);
			el.style.opacity = String(Math.max(remaining, 0));
		}

		requestAnimationFrame(frame);
	}

	requestAnimationFrame(frame);
}

function randomBetween(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}
