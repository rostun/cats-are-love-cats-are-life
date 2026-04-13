/**
 * @jest-environment jsdom
 */

import { kittyBurst } from './kittyBurst';

describe('kittyBurst', () => {
	beforeEach(() => {
		document.body.innerHTML = '';
		jest.useFakeTimers();
		jest
			.spyOn(window, 'requestAnimationFrame')
			.mockImplementation(() => 0);
	});

	afterEach(() => {
		jest.restoreAllMocks();
		jest.useRealTimers();
	});

	it('initializes the target cat', () => {
		const target = document.createElement('button');
		document.body.appendChild(target);

		kittyBurst(target, { emoji: '😺', size: '5rem' });

		expect(target.textContent).toBe('😺');
		expect(target.style.fontSize).toBe('5rem');
		expect(target.style.cursor).toBe('pointer');
	});

	it('bursts into fragments after the hold duration', () => {
		const target = document.createElement('button');
		document.body.appendChild(target);

		kittyBurst(target, {
			holdMs: 300,
			burstCount: 3,
			fragmentEmoji: '🐾',
			durationMs: 700,
		});

		target.dispatchEvent(new Event('pointerdown'));
		jest.advanceTimersByTime(300);

		const fragments = Array.from(document.body.querySelectorAll('div'));
		expect(fragments).toHaveLength(3);
		expect(fragments.map((fragment) => fragment.textContent)).toEqual([
			'🐾',
			'🐾',
			'🐾',
		]);
		expect(target.style.visibility).toBe('hidden');

		jest.advanceTimersByTime(700);

		expect(target.style.visibility).toBe('visible');
	});

	it('cancels the burst when the pointer is released early', () => {
		const target = document.createElement('button');
		document.body.appendChild(target);

		kittyBurst(target, { holdMs: 300, burstCount: 3 });

		target.dispatchEvent(new Event('pointerdown'));
		jest.advanceTimersByTime(299);
		target.dispatchEvent(new Event('pointerup'));
		jest.advanceTimersByTime(1);

		expect(document.body.querySelectorAll('div')).toHaveLength(0);
		expect(target.style.visibility).toBe('');
	});
});
