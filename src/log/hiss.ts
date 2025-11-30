/**
 * hissWarning — a cat-themed wrapper for console.warn.
 * For when your code is annoyed but not fully broken.
 */

export type HissMood = 'annoyed' | 'judging' | 'irritated' | 'chaotic';

export interface HissOptions {
	mood?: HissMood;
}

const hissEmojis: Record<HissMood, string> = {
	annoyed: '😾',
	judging: '😼',
	irritated: '😠',
	chaotic: '🙀',
};

export function hissWarning(message: string, options: HissOptions = {}): void {
	const emoji = hissEmojis[options.mood ?? 'annoyed'];
	console.warn(`${emoji} ${message} ${emoji}`);
}
