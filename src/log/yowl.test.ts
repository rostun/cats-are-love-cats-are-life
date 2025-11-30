import { yowlError } from './yowl';

describe('yowlError', () => {
	it('uses default alarmed mood when none is provided', () => {
		const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

		yowlError('Oops');

		expect(spy).toHaveBeenCalledWith('🙀 Oops 🙀');

		spy.mockRestore();
	});

	it('uses a custom mood emoji when provided', () => {
		const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

		yowlError('This is bad', { mood: 'furious' });

		expect(spy).toHaveBeenCalledWith('😾 This is bad 😾');

		spy.mockRestore();
	});
});
