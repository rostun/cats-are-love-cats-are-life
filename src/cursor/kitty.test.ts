/**
 * @jest-environment jsdom
 */

import { kittyPop } from './kitty';

describe('kittyPop', () => {
	beforeEach(() => {
		document.body.innerHTML = ''; // clean DOM
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	const fakeEvent = new MouseEvent('click', {
		clientX: 100,
		clientY: 200,
	});

	it('creates an element with the default emoji', () => {
		kittyPop(fakeEvent);

		const el = document.body.querySelector('div');
		expect(el).not.toBeNull();
		expect(el!.textContent).toBe('🐈');
	});

	it('applies the provided emoji and font size', () => {
		kittyPop(fakeEvent, { emoji: '😺', fontSize: '4rem' });

		const el = document.body.querySelector('div')!;
		expect(el.textContent).toBe('😺');
		expect(el.style.fontSize).toBe('4rem');
	});

	it('removes the element after duration in float mode', () => {
		kittyPop(fakeEvent, { durationMs: 500 });

		expect(document.body.querySelector('div')).not.toBeNull();

		// fast-forward timers
		jest.advanceTimersByTime(500);

		expect(document.body.querySelector('div')).toBeNull();
	});

	it('uses parabola animation and still removes the element', () => {
		kittyPop(fakeEvent, { animation: 'parabola', durationMs: 700 });

		expect(document.body.querySelector('div')).not.toBeNull();

		// fast-forward timers longer than duration
		jest.advanceTimersByTime(700);

		expect(document.body.querySelector('div')).toBeNull();
	});

	it('positions the element based on click coordinates', () => {
		kittyPop(fakeEvent);

		const el = document.body.querySelector('div')!;
		// left and top should match click event values
		expect(el.style.left).toBe('100px');
		expect(el.style.top).toBe('200px');
	});
});
