/**
 * kittyPop — spawns a cute cat emoji at the cursor when a click occurs.
 *
 * This is intentionally tiny and dependency-free.
 */

export type KittyAnimation = 'float' | 'parabola';

export interface KittyPopOptions {
	emoji?: string;
	durationMs?: number;
	fontSize?: string;
	animation?: KittyAnimation;
}

export function kittyPop(
	event: MouseEvent,
	options: KittyPopOptions = {},
): void {
	const {
		emoji = '🐈',
		durationMs = 600,
		fontSize = '2rem',
		animation = 'float',
	} = options;
	const el = document.createElement('div');
	el.textContent = emoji;

	el.style.position = 'absolute';
	el.style.left = `${event.clientX}px`;
	el.style.top = `${event.clientY}px`;
	el.style.transform = 'translate(-50%, -50%)';
	el.style.pointerEvents = 'none';
	el.style.fontSize = fontSize;
	el.style.opacity = '1';

	document.body.appendChild(el);

	if (animation === 'parabola') {
		runParabolaAnimation(el, event.clientX, event.clientY, durationMs);
	} else {
		// fallback: simple float
		requestAnimationFrame(() => {
			el.style.transition = `transform ${durationMs}ms ease-out, opacity ${durationMs}ms ease-out`;
			el.style.transform = 'translate(-50%, -80%) scale(1.2)';
			el.style.opacity = '0';
		});
		setTimeout(() => el.remove(), durationMs);
	}
}

function runParabolaAnimation(
	el: HTMLElement,
	startX: number,
	startY: number,
	durationMs: number,
): void {
	const start = performance.now();

	// random horizontal velocity so it sprays outward
	const vx = (Math.random() * 2 - 1) * 150; // px per second
	const vy = -300; // initial upward velocity
	const gravity = 600; // px per second^2

	function frame(now: number) {
		const t = (now - start) / 1000; // seconds

		if (t > durationMs / 1000) {
			el.remove();
			return;
		}

		const x = startX + vx * t;
		const y = startY + (vy * t + 0.5 * gravity * t * t);

		el.style.left = `${x}px`;
		el.style.top = `${y}px`;

		// fade out near the end
		if (t > durationMs / 1000 - 0.2) {
			el.style.opacity = String(1 - (t - (durationMs / 1000 - 0.2)) / 0.2);
		}

		requestAnimationFrame(frame);
	}

	requestAnimationFrame(frame);
}

export function enableKittyCursor(options: KittyPopOptions = {}): void {
	window.addEventListener('click', (e) => kittyPop(e, options));
}
