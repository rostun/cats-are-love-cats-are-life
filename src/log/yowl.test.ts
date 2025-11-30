import { yowlError } from './yowl';

describe('yowlError', () => {
	it('logs an error with the cat yowl formatting', () => {
		const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

		yowlError('Something bad happened');

		expect(spy).toHaveBeenCalledWith('🙀 ERROR: Something bad happened 🙀');

		spy.mockRestore();
	});
});
