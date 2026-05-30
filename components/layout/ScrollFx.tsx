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

		// 5. Reserve / Final-CTA — rising embers + cursor-reactive heat.
		const cta = document.querySelector<HTMLElement>('.cta-final');
		const emberHost = document.getElementById('cta-embers');
		let ctaRaf = 0;
		let ctaActive = false;
		let onCtaMove: ((e: MouseEvent) => void) | null = null;
		let onCtaLeave: (() => void) | null = null;

		if (cta && emberHost && !prefersReducedMotion) {
			if (emberHost.childElementCount === 0) {
				const EMBER_COUNT = 18;
				for (let i = 0; i < EMBER_COUNT; i++) {
					const em = document.createElement('span');
					em.className = 'ember';
					const size = 2 + Math.random() * 4;
					const dur = 9 + Math.random() * 9;
					const fdur = 1.2 + Math.random() * 1.8;
					em.style.left = `${Math.random() * 100}%`;
					em.style.bottom = `${-6 + Math.random() * 16}%`;
					em.style.width = `${size}px`;
					em.style.height = `${size}px`;
					em.style.setProperty('--drift', `${-30 + Math.random() * 60}px`);
					em.style.animationDuration = `${dur}s, ${fdur}s`;
					em.style.animationDelay = `${-Math.random() * dur}s, ${-Math.random() * fdur}s`;
					emberHost.appendChild(em);
				}
			}

			let etx = 0;
			let ety = 0;
			let ecx = 0;
			let ecy = 0;
			let thx = 50;
			let thy = 50;
			let hx = 50;
			let hy = 50;

			onCtaMove = (e: MouseEvent) => {
				const r = cta.getBoundingClientRect();
				const px = (e.clientX - r.left) / r.width;
				const py = (e.clientY - r.top) / r.height;
				etx = Math.max(-1, Math.min(1, (px - 0.5) * 2));
				ety = Math.max(-1, Math.min(1, (py - 0.5) * 2));
				thx = Math.max(0, Math.min(100, px * 100));
				thy = Math.max(0, Math.min(100, py * 100));
			};
			onCtaLeave = () => {
				etx = 0;
				ety = 0;
				thx = 50;
				thy = 50;
			};
			const ctaLoop = () => {
				ecx += (etx - ecx) * 0.06;
				ecy += (ety - ecy) * 0.06;
				hx += (thx - hx) * 0.08;
				hy += (thy - hy) * 0.08;
				emberHost.style.translate = `${ecx * 16}px ${ecy * 10}px`;
				cta.style.setProperty('--hx', `${hx}%`);
				cta.style.setProperty('--hy', `${hy}%`);
				ctaRaf = window.requestAnimationFrame(ctaLoop);
			};
			cta.addEventListener('mousemove', onCtaMove, { passive: true });
			cta.addEventListener('mouseleave', onCtaLeave, { passive: true });
			ctaRaf = window.requestAnimationFrame(ctaLoop);
			ctaActive = true;
		}

		// 6. Story / positioning — subtle cursor glow + micro-parallax.
		const story = document.querySelector<HTMLElement>('.intro-state');
		let storyRaf = 0;
		let storyActive = false;
		let onStoryMove: ((e: MouseEvent) => void) | null = null;
		let onStoryLeave: (() => void) | null = null;

		if (story && !prefersReducedMotion) {
			const storyText = story.querySelector<HTMLElement>('.wrap p');
			const storyNum = story.querySelector<HTMLElement>('.num');
			let stx = 0;
			let sty = 0;
			let scx = 0;
			let scy = 0;
			let smtx = 50;
			let smty = 50;
			let smx = 50;
			let smy = 50;

			onStoryMove = (e: MouseEvent) => {
				const r = story.getBoundingClientRect();
				const px = (e.clientX - r.left) / r.width;
				const py = (e.clientY - r.top) / r.height;
				stx = Math.max(-1, Math.min(1, (px - 0.5) * 2));
				sty = Math.max(-1, Math.min(1, (py - 0.5) * 2));
				smtx = Math.max(0, Math.min(100, px * 100));
				smty = Math.max(0, Math.min(100, py * 100));
			};
			onStoryLeave = () => {
				stx = 0;
				sty = 0;
				smtx = 50;
				smty = 50;
			};
			const storyLoop = () => {
				scx += (stx - scx) * 0.05;
				scy += (sty - scy) * 0.05;
				smx += (smtx - smx) * 0.08;
				smy += (smty - smy) * 0.08;
				story.style.setProperty('--mx', `${smx}%`);
				story.style.setProperty('--my', `${smy}%`);
				if (storyText) storyText.style.translate = `${scx * 5}px ${scy * 4}px`;
				if (storyNum) storyNum.style.translate = `${scx * -8}px ${scy * -5}px`;
				storyRaf = window.requestAnimationFrame(storyLoop);
			};
			story.addEventListener('mousemove', onStoryMove, { passive: true });
			story.addEventListener('mouseleave', onStoryLeave, { passive: true });
			storyRaf = window.requestAnimationFrame(storyLoop);
			storyActive = true;
		}

		return () => {
			io?.disconnect();
			window.removeEventListener('scroll', onScroll);
			if (parallaxActive) {
				window.removeEventListener('mousemove', onMouseMove);
				window.cancelAnimationFrame(rafId);
			}
			if (ctaActive) {
				if (onCtaMove) cta?.removeEventListener('mousemove', onCtaMove);
				if (onCtaLeave) cta?.removeEventListener('mouseleave', onCtaLeave);
				window.cancelAnimationFrame(ctaRaf);
			}
			if (storyActive) {
				if (onStoryMove) story?.removeEventListener('mousemove', onStoryMove);
				if (onStoryLeave) story?.removeEventListener('mouseleave', onStoryLeave);
				window.cancelAnimationFrame(storyRaf);
			}
		};
	}, []);

	return null;
}
