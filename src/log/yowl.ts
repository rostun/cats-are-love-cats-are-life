/**
 * yowlError — a cat-themed wrapper for console.error.
 * Because sometimes your code does not just fail, it yowls.
 */

export type YowlMood = 'alarmed' | 'furious' | 'panicked' | 'cursed';

export interface YowlOptions {
	mood?: YowlMood;
}

const yowlEmojis: Record<YowlMood, string> = {
	alarmed: '🙀',
	furious: '😾',
	panicked: '😿',
	cursed: '🐈‍⬛',
};

export function yowlError(message: string, options: YowlOptions = {}): void {
	const emoji = yowlEmojis[options.mood ?? 'alarmed'];
	console.error(`${emoji} ${message} ${emoji}`);
}
