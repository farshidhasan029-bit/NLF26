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
      document.documentElement.classList.add('js-reveal');
      const winHeight = window.innerHeight || document.documentElement.clientHeight;

      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
      );

      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Elements in initial top viewport (hero) reveal immediately on load
        if (rect.top < winHeight * 0.75 && rect.bottom > 0 && window.scrollY < 80) {
          setTimeout(() => {
            el.classList.add('visible');
          }, 80);
        } else {
          // Offscreen elements wait until user scrolls down!
          revealObserver.observe(el);
        }
      });

      // Proactive scroll listener for fluid responsive triggering
      let scrollTicking = false;
      window.addEventListener('scroll', () => {
        if (!scrollTicking) {
          window.requestAnimationFrame(() => {
            const vh = window.innerHeight || document.documentElement.clientHeight;
            reveals.forEach((el) => {
              if (!el.classList.contains('visible')) {
                const r = el.getBoundingClientRect();
                if (r.top < vh - 30 && r.bottom > 0) {
                  el.classList.add('visible');
                  revealObserver.unobserve(el);
                }
              }
            });
            scrollTicking = false;
          });
          scrollTicking = true;
        }
      }, { passive: true });
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

  // --- 5. ALPINE.JS COUNTDOWN & GALLERY REGISTRATION ---
  function createGalleryData() {
    return {
      activeFilter: 'all',
      isOpen: false,
      currentIndex: 0,
      // User will provide official festival photos to populate this list
      items: [],
      get filteredItems() {
        if (this.activeFilter === 'all') return this.items;
        return this.items.filter(item => item.category === this.activeFilter);
      },
      open(index) {
        this.currentIndex = index;
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
      },
      close() {
        this.isOpen = false;
        document.body.style.overflow = '';
      },
      next() {
        const list = this.filteredItems;
        if (!list || list.length === 0) return;
        this.currentIndex = (this.currentIndex + 1) % list.length;
      },
      prev() {
        const list = this.filteredItems;
        if (!list || list.length === 0) return;
        this.currentIndex = (this.currentIndex - 1 + list.length) % list.length;
      }
    };
  }

  window.galleryModal = createGalleryData;

  // --- 6. ALPINE.JS LEGACY EDITIONS CAROUSEL ---
  function createLegacyCarouselData() {
    return {
      current: 0,
      total: 3,

      // Live drag & swipe tracking
      isDragging: false,
      startX: 0,
      startY: 0,
      dragOffset: 0,
      isHorizontalSwipe: null,

      init() {
        // Static manual slider: auto-interval disabled per user request
      },
      goTo(index) {
        this.current = Math.max(0, Math.min(this.total - 1, index));
        this.dragOffset = 0;
      },
      next() {
        this.current = (this.current + 1) % this.total;
        this.dragOffset = 0;
      },
      prev() {
        this.current = (this.current - 1 + this.total) % this.total;
        this.dragOffset = 0;
      },
      pause() {},
      resume() {},

      // Live interactive swipe & drag handlers
      handlePointerDown(e) {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        if (e.target && e.target.closest && e.target.closest('button, a, input, select, textarea')) return;

        this.isDragging = true;
        this.startX = e.clientX;
        this.startY = e.clientY;
        this.dragOffset = 0;
        this.isHorizontalSwipe = null;
        this.pause();

        if (e.currentTarget && e.currentTarget.setPointerCapture) {
          try {
            e.currentTarget.setPointerCapture(e.pointerId);
          } catch (err) {}
        }
      },
      handlePointerMove(e) {
        if (!this.isDragging) return;

        const deltaX = e.clientX - this.startX;
        const deltaY = e.clientY - this.startY;

        if (this.isHorizontalSwipe === null) {
          if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
            this.isHorizontalSwipe = Math.abs(deltaX) >= Math.abs(deltaY);
          }
        }

        if (this.isHorizontalSwipe) {
          // Rubber-band resistance at extremes
          if ((this.current === 0 && deltaX > 0) || (this.current === this.total - 1 && deltaX < 0)) {
            this.dragOffset = deltaX * 0.35;
          } else {
            this.dragOffset = deltaX;
          }
        }
      },
      handlePointerUp(e) {
        if (!this.isDragging) return;
        this.isDragging = false;

        if (e.currentTarget && e.currentTarget.releasePointerCapture) {
          try {
            e.currentTarget.releasePointerCapture(e.pointerId);
          } catch (err) {}
        }

        const threshold = 50;
        if (this.isHorizontalSwipe) {
          if (this.dragOffset < -threshold) {
            this.next();
          } else if (this.dragOffset > threshold) {
            this.prev();
          }
        }

        this.dragOffset = 0;
        this.resume();
      },
      handlePointerCancel(e) {
        this.isDragging = false;
        this.dragOffset = 0;
        this.resume();
      }
    };
  }

  window.legacyCarousel = createLegacyCarouselData;

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

      window.Alpine.data('galleryModal', createGalleryData);
      window.Alpine.data('legacyCarousel', createLegacyCarouselData);
    }
  });
})();
