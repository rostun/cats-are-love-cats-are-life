import { purrLog, PurrMood } from './purr';

describe('purrLog', () => {
	let spy: jest.SpyInstance;

	beforeEach(() => {
		spy = jest.spyOn(console, 'log').mockImplementation(() => {});
	});

	afterEach(() => {
		spy.mockRestore();
	});

	it("logs with the default 'happy' mood when no options are provided", () => {
		purrLog('Hello!');
		expect(spy).toHaveBeenCalledWith('😺 Hello!');
	});

	const moodCases: { mood: PurrMood; emoji: string }[] = [
		{ mood: 'happy', emoji: '😺' },
		{ mood: 'grumpy', emoji: '😾' },
		{ mood: 'sleepy', emoji: '😴' },
		{ mood: 'chaotic', emoji: '🙀' },
	];

	it.each(moodCases)(
		"logs with the correct emoji for mood '%s'",
		({ mood, emoji }) => {
			purrLog('Test message', { mood });
			expect(spy).toHaveBeenCalledWith(`${emoji} Test message`);
		},
	);
});
