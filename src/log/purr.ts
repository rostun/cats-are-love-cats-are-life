/**
 * purrLog — the original cat-themed console logger.
 * Because plain console.log is for humans, not cats.
 */

export type PurrMood = 'happy' | 'grumpy' | 'sleepy' | 'chaotic';

export interface PurrOptions {
	mood?: PurrMood;
}

const moodEmojis: Record<PurrMood, string> = {
	happy: '😺',
	grumpy: '😾',
	sleepy: '😴',
	chaotic: '🙀',
};

export function purrLog(message: string, options: PurrOptions = {}): void {
	const emoji = moodEmojis[options.mood ?? 'happy'];
	console.log(`${emoji} ${message}`);
}
