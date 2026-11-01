/**
 * Main JavaScript for National Language Fest 2026 (NLF '26 at BAU)
 * Clean, minimal & performant script
 */

(function () {
  'use strict';

  // --- 1. NAVBAR SCROLL & BACK TO TOP ---
  function handleScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 20) {
        navbar.classList.add('solid');
      } else {
        navbar.classList.remove('solid');
      }
    }

    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
      if (window.scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // --- 2. SMOOTH ANCHOR NAVIGATION ---
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && href.length > 1) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            const navOffset = 80;
            const targetPosition =
              target.getBoundingClientRect().top + window.scrollY - navOffset;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth',
            });
          }
        }
      });
    });

    // --- 3. SCROLL REVEAL OBSERVER ---
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && reveals.length > 0) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      reveals.forEach((el) => revealObserver.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('visible'));
    }

    // --- 4. ANIMATED NUMBER COUNTERS ---
    const statCounters = document.querySelectorAll('.stat-number');
    if ('IntersectionObserver' in window && statCounters.length > 0) {
      const counterObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const counter = entry.target;
              const target = parseInt(counter.getAttribute('data-target') || '0', 10);
              const suffix = counter.getAttribute('data-suffix') || '';
              const duration = 1600;
              const startTime = performance.now();

              function step(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);

                counter.textContent = current.toLocaleString() + suffix;

                if (progress < 1) {
                  requestAnimationFrame(step);
                } else {
                  counter.textContent = target.toLocaleString() + suffix;
                }
              }

              requestAnimationFrame(step);
              counterObserver.unobserve(counter);
            }
          });
        },
        { threshold: 0.3 }
      );

      statCounters.forEach((c) => counterObserver.observe(c));
    }
  });

  // --- 5. ALPINE.JS COUNTDOWN REGISTRATION ---
  document.addEventListener('alpine:init', () => {
    if (window.Alpine) {
      window.Alpine.data('countdown', () => ({
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
        target: new Date('2026-11-20T23:59:59'),
        init() {
          this.update();
          setInterval(() => this.update(), 1000);
        },
        update() {
          let diff = this.target - new Date();
          if (diff <= 0) {
            diff = 60 * 24 * 60 * 60 * 1000;
          }
          this.days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
          this.hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
          this.minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, '0');
          this.seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
        },
      }));
    }
  });
})();
