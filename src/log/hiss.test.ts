import { hissWarning } from './hiss';

describe('hissWarning', () => {
	it('uses default annoyed mood when none is provided', () => {
		const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

		hissWarning('Uh oh');

		expect(spy).toHaveBeenCalledWith('😾 Uh oh 😾');

		spy.mockRestore();
	});

	it('uses a custom mood when provided', () => {
		const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});

		hissWarning('Not great', { mood: 'judging' });

		expect(spy).toHaveBeenCalledWith('😼 Not great 😼');

		spy.mockRestore();
	});
});
