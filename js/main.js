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

    // --- 3. SCROLL REVEAL OBSERVER (PROACTIVE & FAILSAFE) ---
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
        { threshold: 0, rootMargin: '120px 0px 120px 0px' }
      );

      reveals.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < winHeight * 1.25) {
          el.classList.add('visible');
        } else {
          revealObserver.observe(el);
        }
      });

      // Safety timeout: Ensure all elements become visible even on mobile desktop emulation
      setTimeout(() => {
        reveals.forEach((el) => el.classList.add('visible'));
      }, 500);
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
      items: [
        {
          src: 'assets/images/gallery/nlf25-bornokunjo-stage.jpg',
          title: 'NLF25 Bornokunjo Edition Stage & Delegation',
          tag: 'NLF 2025 • Bornokunjo',
          category: 'editions',
          caption: 'National Language Fest 2025 closing ceremony and grand award stage at BAU.'
        },
        {
          src: 'assets/images/gallery/competition-spelling-bee.jpg',
          title: 'National Spelling Bee & Language Olympiad',
          tag: 'Competition • Auditorium Stage',
          category: 'competitions',
          caption: 'High-intensity spelling bee and language olympiad competition in session.'
        },
        {
          src: 'assets/images/gallery/auditorium-keynote-session.jpg',
          title: 'Keynote Literary Session & Youth Oratory',
          tag: 'Session • Central Auditorium',
          category: 'sessions',
          caption: 'Eminent speakers and authors addressing university students from across the country.'
        },
        {
          src: 'assets/images/gallery/wall-magazine-exhibition.jpg',
          title: 'Handcrafted Wall Magazine & Literary Exhibition',
          tag: 'Exhibition • Campus Gallery',
          category: 'exhibitions',
          caption: 'Multilingual calligraphy posters, investigative articles, and handcrafted literary exhibits.'
        },
        {
          src: 'assets/images/gallery/champion-awards-trophies.jpg',
          title: 'Official Championship Trophies & Medals',
          tag: 'Awards • Gala Ceremony',
          category: 'competitions',
          caption: 'Prestigious crystal trophies, gold medals, and merit certificates for fest champions.'
        },
        {
          src: 'assets/images/gallery/nlf24-grand-audience.jpg',
          title: 'NLF24 Grand Gala & Packed Auditorium',
          tag: 'NLF 2024 • Celebration',
          category: 'editions',
          caption: 'Full-house celebration at BAU Central Auditorium during National Language Fest 2024.'
        },
        {
          src: 'assets/images/gallery/nlf23-inaugural-celebration.jpg',
          title: 'NLF23 Inaugural Stage Celebration',
          tag: 'NLF 2023 • Founding Edition',
          category: 'editions',
          caption: 'Founding edition bringing delegations together to establish the National Language Fest legacy.'
        },
        {
          src: 'assets/images/gallery/baulc-delegation-stage.jpg',
          title: 'BAULC Organizing Committee & Mentors',
          tag: 'Delegation • BAU Mymensingh',
          category: 'exhibitions',
          caption: 'The student leaders, organizers, and advisors behind the Bangladesh Agricultural University Language Club.'
        }
      ],
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
    }
  });
})();
