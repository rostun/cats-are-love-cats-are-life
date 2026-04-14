# cats-are-love-cats-are-life

A tiny, zero-dependency collection of cat-themed browser utilities for logging, cursor effects, and press-and-hold cat bursts.

## Installation

```sh
npm install cats-are-love-cats-are-life
```

```sh
yarn add cats-are-love-cats-are-life
```

## Import

```ts
import {
	purrLog,
	hissWarning,
	yowlError,
	kittyPop,
	enableKittyCursor,
	kittyBurst,
} from 'cats-are-love-cats-are-life';
```

## Console Helpers

### purrLog

Logs a message with a cat mood emoji.

```ts
import { purrLog } from 'cats-are-love-cats-are-life';

purrLog('The deploy is looking cozy.');
purrLog('The cache is asleep.', { mood: 'sleepy' });
```

Options:

| Option | Type | Default | Values |
| --- | --- | --- | --- |
| `mood` | `PurrMood` | `'happy'` | `'happy'`, `'grumpy'`, `'sleepy'`, `'chaotic'` |

### hissWarning

Writes a cat-themed warning with `console.warn`.

```ts
import { hissWarning } from 'cats-are-love-cats-are-life';

hissWarning('That prop is deprecated.');
hissWarning('The cat is judging this input.', { mood: 'judging' });
```

Options:

| Option | Type | Default | Values |
| --- | --- | --- | --- |
| `mood` | `HissMood` | `'annoyed'` | `'annoyed'`, `'judging'`, `'irritated'`, `'chaotic'` |

### yowlError

Writes a cat-themed error with `console.error`.

```ts
import { yowlError } from 'cats-are-love-cats-are-life';

yowlError('The yarn ball escaped.');
yowlError('The production cat is upset.', { mood: 'furious' });
```

Options:

| Option | Type | Default | Values |
| --- | --- | --- | --- |
| `mood` | `YowlMood` | `'alarmed'` | `'alarmed'`, `'furious'`, `'panicked'`, `'cursed'` |

## Cursor Effects

The cursor utilities create DOM elements, so use them in browser code after `window` and `document` are available.

### kittyPop

Spawns one cat at a click event or at an explicit `{ x, y }` point.

```ts
import { kittyPop } from 'cats-are-love-cats-are-life';

window.addEventListener('click', (event) => {
	kittyPop(event, {
		emoji: '🐈',
		fontSize: '3rem',
		durationMs: 800,
		animation: 'parabola',
	});
});
```

```ts
kittyPop({ x: 120, y: 240 }, { emoji: '🐱' });
```

Options:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `emoji` | `string` | `'🐈'` | Emoji or text to spawn. |
| `durationMs` | `number` | `600` | How long the cat stays on screen. |
| `fontSize` | `string` | `'2rem'` | CSS font size for the spawned cat. |
| `animation` | `'float' \| 'parabola'` | `'float'` | `float` rises and fades; `parabola` launches like a little fountain. |

### enableKittyCursor

Adds a click listener to the whole window and calls `kittyPop` for every click.

```ts
import { enableKittyCursor } from 'cats-are-love-cats-are-life';

enableKittyCursor({
	animation: 'parabola',
	emoji: '🐈',
	fontSize: '2rem',
});
```

`enableKittyCursor` accepts the same options as `kittyPop`.

## Interaction Effects

### kittyBurst

Turns an element into a press-and-hold cat. Hold it long enough and it bursts into fragments.

```ts
import { kittyBurst, purrLog } from 'cats-are-love-cats-are-life';

const cat = document.querySelector<HTMLElement>('#cat');

if (cat) {
	const cleanup = kittyBurst(cat, {
		holdMs: 500,
		burstCount: 10,
		emoji: '🐈',
		fragmentEmoji: '🐱',
		size: '5rem',
		fragmentSize: '1.5rem',
		durationMs: 900,
		respawn: true,
		onBurst: () => {
			purrLog('pop');
		},
	});

	// Later, call cleanup() when you want to remove the pointer listeners.
}
```

Options:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `holdMs` | `number` | `600` | How long the element must be held before bursting. |
| `burstCount` | `number` | `8` | Number of fragment cats to spawn. |
| `emoji` | `string` | `'🐈'` | Emoji or text placed in the target element. |
| `fragmentEmoji` | `string` | `'🐱'` | Emoji or text used for each burst fragment. |
| `size` | `string` | `'4rem'` | CSS font size for the target cat. |
| `fragmentSize` | `string` | `'1.5rem'` | CSS font size for each fragment. |
| `durationMs` | `number` | `900` | How long the fragments animate. |
| `respawn` | `boolean` | `true` | Whether the target cat becomes visible again after the burst. |
| `onBurst` | `(element: HTMLElement) => void` | `undefined` | Callback fired when the burst happens. |

`kittyBurst` returns a cleanup function that removes its pointer event listeners.

## React Example

```tsx
import { useEffect, useRef } from 'react';
import { kittyBurst } from 'cats-are-love-cats-are-life';

export function CatButton() {
	const catRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (!catRef.current) return;
		return kittyBurst(catRef.current, { burstCount: 12 });
	}, []);

	return <button ref={catRef}>Hold the cat</button>;
}
```

## TypeScript

The package ships TypeScript declarations. These types are exported:

```ts
import type {
	PurrMood,
	PurrOptions,
	HissMood,
	HissOptions,
	YowlMood,
	YowlOptions,
	KittyAnimation,
	KittyPopOptions,
	KittyPoint,
	KittyBurstOptions,
} from 'cats-are-love-cats-are-life';
```

## Playground

Build the package, serve the repo root, and open the playground page.

```sh
yarn build
yarn dlx serve .
```

Then open `http://localhost:3000/playground.html`.

## Development

```sh
yarn test
yarn build
```

## License

MIT License
Copyright (c) 2025 Rosa Tung
