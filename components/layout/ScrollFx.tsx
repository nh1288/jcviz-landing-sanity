'use client';

/**
 * Client-side effects mounted once per page:
 *
 *   1. Reveal-on-scroll — adds `.in` to any [data-reveal] element when it
 *      enters the viewport. CSS in globals.css handles the actual fade.
 *
 *   2. Sticky nav shrink — tightens nav.top padding + bumps background
 *      opacity once the user scrolls past 80px.
 *
 *   3. Hero motes — spawns N tiny floating particles inside #motes after
 *      mount. Skipped under prefers-reduced-motion.
 *
 *   4. Mouse-driven parallax — slow-easing translate on .bloom and .haze
 *      based on cursor position. Skipped under prefers-reduced-motion.
 *
 * Returns null — pure side effects.
 */

import { useEffect } from 'react';

const MOTE_COUNT = 14;

export function ScrollFx() {
	useEffect(() => {
		const prefersReducedMotion =
			typeof window.matchMedia === 'function' &&
			window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// 1. Reveal-on-scroll observer.
		let io: IntersectionObserver | null = null;
		if ('IntersectionObserver' in window) {
			io = new IntersectionObserver(
				(entries) => {
					entries.forEach((e) => {
						if (e.isIntersecting) {
							e.target.classList.add('in');
							io?.unobserve(e.target);
						}
					});
				},
				{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
			);
			document
				.querySelectorAll<HTMLElement>('[data-reveal]')
				.forEach((el) => io!.observe(el));
		} else {
			document
				.querySelectorAll<HTMLElement>('[data-reveal]')
				.forEach((el) => el.classList.add('in'));
		}

		// 2. Sticky nav shrink.
		const nav = document.querySelector<HTMLElement>('nav.top');
		const onScroll = () => {
			if (!nav) return;
			if (window.scrollY > 80) {
				nav.style.padding = '14px 40px';
				nav.style.background = 'rgba(8,8,9,.92)';
			} else {
				nav.style.padding = '';
				nav.style.background = '';
			}
		};
		window.addEventListener('scroll', onScroll, { passive: true });

		// 3. Hero motes spawn.
		const moteHost = document.getElementById('motes');
		if (
			moteHost &&
			!prefersReducedMotion &&
			moteHost.childElementCount === 0
		) {
			for (let i = 0; i < MOTE_COUNT; i++) {
				const m = document.createElement('span');
				m.className = 'mote';
				const left = 10 + Math.random() * 80;
				const dur = 14 + Math.random() * 16;
				const delay = -Math.random() * dur;
				const size = 1 + Math.random() * 2.5;
				m.style.left = `${left}%`;
				m.style.bottom = `${-5 + Math.random() * 10}%`;
				m.style.width = `${size}px`;
				m.style.height = `${size}px`;
				m.style.animationDuration = `${dur}s`;
				m.style.animationDelay = `${delay}s`;
				m.style.opacity = (0.4 + Math.random() * 0.6).toString();
				moteHost.appendChild(m);
			}
		}

		// 4. Mouse-driven parallax on bloom + haze.
		const blooms = document.querySelectorAll<HTMLElement>('.bloom');
		const haze = document.querySelector<HTMLElement>('.haze');
		let tx = 0;
		let ty = 0;
		let cx = 0;
		let cy = 0;
		let rafId = 0;
		let parallaxActive = false;

		const onMouseMove = (e: MouseEvent) => {
			tx = (e.clientX / window.innerWidth - 0.5) * 2;
			ty = (e.clientY / window.innerHeight - 0.5) * 2;
		};

		const loop = () => {
			cx += (tx - cx) * 0.04;
			cy += (ty - cy) * 0.04;
			blooms.forEach((b, i) => {
				const k = 8 - i * 2;
				b.style.translate = `${cx * k}px ${cy * k * 0.5}px`;
			});
			if (haze) {
				haze.style.translate = `${cx * -12}px ${cy * -6}px`;
			}
			rafId = window.requestAnimationFrame(loop);
		};

		if (!prefersReducedMotion && (blooms.length > 0 || haze)) {
			window.addEventListener('mousemove', onMouseMove, { passive: true });
			rafId = window.requestAnimationFrame(loop);
			parallaxActive = true;
		}

		return () => {
			io?.disconnect();
			window.removeEventListener('scroll', onScroll);
			if (parallaxActive) {
				window.removeEventListener('mousemove', onMouseMove);
				window.cancelAnimationFrame(rafId);
			}
		};
	}, []);

	return null;
}
