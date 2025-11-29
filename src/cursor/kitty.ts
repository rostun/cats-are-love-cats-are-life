/**
 * kittyPop — spawns a cute cat emoji at the cursor when a click occurs.
 *
 * This is intentionally tiny and dependency-free.
 */

export interface KittyPopOptions {
	emoji?: string;
	durationMs?: number;
	fontSize?: string;
}

export function kittyPop(
	event: MouseEvent,
	options: KittyPopOptions = {},
): void {
	const { emoji = '🐈', durationMs = 600, fontSize = '2rem' } = options;

	const el = document.createElement('div');
	el.textContent = emoji;

	el.style.position = 'absolute';
	el.style.left = `${event.clientX}px`;
	el.style.top = `${event.clientY}px`;
	el.style.transform = 'translate(-50%, -50%)';
	el.style.pointerEvents = 'none';
	el.style.fontSize = fontSize;
	el.style.opacity = '1';
	el.style.transition = `opacity ${durationMs}ms ease-out, transform ${durationMs}ms ease-out`;

	document.body.appendChild(el);

	// trigger the fade + float slightly upward
	requestAnimationFrame(() => {
		el.style.opacity = '0';
		el.style.transform = 'translate(-50%, -80%)';
	});

	setTimeout(() => el.remove(), durationMs);
}

/**
 * enableKittyCursor — attaches the kittyPop effect to click events.
 */
export function enableKittyCursor(options: KittyPopOptions = {}): void {
	window.addEventListener('click', (e) => kittyPop(e, options));
}
