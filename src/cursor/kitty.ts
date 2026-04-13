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

export interface KittyPoint {
	x: number;
	y: number;
}

type KittyPopTarget = MouseEvent | KittyPoint;

export function kittyPop(
	target: KittyPopTarget,
	options: KittyPopOptions = {},
): void {
	const {
		emoji = '🐈',
		durationMs = 600,
		fontSize = '2rem',
		animation = 'float',
	} = options;

	const { x, y } = getPoint(target);

	const el = document.createElement('div');
	el.textContent = emoji;

	el.style.position = 'fixed';
	el.style.left = `${x}px`;
	el.style.top = `${y}px`;
	el.style.transform = 'translate(-50%, -50%)';
	el.style.pointerEvents = 'none';
	el.style.fontSize = fontSize;
	el.style.opacity = '1';
	el.style.zIndex = '9999';

	document.body.appendChild(el);

	if (animation === 'parabola') {
		runParabolaAnimation(el, x, y, durationMs);
	} else {
		requestAnimationFrame(() => {
			el.style.transition = `transform ${durationMs}ms ease-out, opacity ${durationMs}ms ease-out`;
			el.style.transform = 'translate(-50%, -80%) scale(1.2)';
			el.style.opacity = '0';
		});

		window.setTimeout(() => {
			el.remove();
		}, durationMs);
	}
}

function getPoint(target: KittyPopTarget): KittyPoint {
	if ('clientX' in target && 'clientY' in target) {
		return {
			x: target.clientX,
			y: target.clientY,
		};
	}

	return target;
}

function runParabolaAnimation(
	el: HTMLElement,
	startX: number,
	startY: number,
	durationMs: number,
): void {
	const start = performance.now();

	const vx = (Math.random() * 2 - 1) * 150;
	const vy = -300;
	const gravity = 600;

	function frame(now: number): void {
		const t = (now - start) / 1000;
		const total = durationMs / 1000;

		if (t > total) {
			el.remove();
			return;
		}

		const x = startX + vx * t;
		const y = startY + (vy * t + 0.5 * gravity * t * t);

		el.style.left = `${x}px`;
		el.style.top = `${y}px`;

		if (t > total - 0.2) {
			el.style.opacity = String(1 - (t - (total - 0.2)) / 0.2);
		}

		requestAnimationFrame(frame);
	}

	requestAnimationFrame(frame);
}

export function enableKittyCursor(options: KittyPopOptions = {}): void {
	window.addEventListener('click', (e) => kittyPop(e, options));
}
