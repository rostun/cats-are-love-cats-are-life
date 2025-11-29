import { kittyPop } from './kitty';

describe('kittyPop', () => {
	it('creates and removes a cat element', () => {
		// fake click event
		const event = new MouseEvent('click', {
			clientX: 100,
			clientY: 200,
		});

		jest.useFakeTimers();

		kittyPop(event, { emoji: '🐈' });

		// element is created
		expect(document.body.querySelector('div')).not.toBeNull();

		// after duration, element is removed
		jest.advanceTimersByTime(600);
		expect(document.body.querySelector('div')).toBeNull();

		jest.useRealTimers();
	});
});
