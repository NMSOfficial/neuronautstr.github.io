(function () {
  "use strict";

  // ======= Sticky
  window.onscroll = function () {
    const ud_header = document.querySelector(".ud-header");
    if (!ud_header) return; // nothing to do when header missing

    const sticky = ud_header.offsetTop;
    const logo = document.querySelectorAll(".header-logo");

    if (window.pageYOffset > sticky) {
      ud_header.classList.add("sticky");
    } else {
      ud_header.classList.remove("sticky");
    }

    if (logo.length) {
      // safe logo change (if single logo exists)
      const headerLogo = document.querySelector('.header-logo');
      if (headerLogo) {
        headerLogo.src = 'assets/images/logo-04.png';
      }
    }

    // show or hide the back-to-top button safely
    const backToTop = document.querySelector(".back-to-top");
    if (backToTop) {
      if (
        document.body.scrollTop > 50 ||
        document.documentElement.scrollTop > 50
      ) {
        backToTop.style.display = "flex";
      } else {
        backToTop.style.display = "none";
      }
    }
  };

  // ===== responsive navbar
  let navbarToggler = document.querySelector("#navbarToggler");
  const navbarCollapse = document.querySelector("#navbarCollapse");

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener("click", () => {
      navbarToggler.classList.toggle("navbarTogglerActive");
      navbarCollapse.classList.toggle("hidden");
    });
  }

  //===== close navbar-collapse when a  clicked
  const navbarLinks = document.querySelectorAll("#navbarCollapse ul li:not(.submenu-item) a");
  if (navbarLinks && navbarLinks.length && navbarToggler && navbarCollapse) {
    navbarLinks.forEach((e) =>
      e.addEventListener("click", () => {
        navbarToggler.classList.remove("navbarTogglerActive");
        navbarCollapse.classList.add("hidden");
      })
    );
  }

  // ===== Sub-menu
  const submenuItems = document.querySelectorAll(".submenu-item");
  submenuItems.forEach((el) => {
    const a = el.querySelector("a");
    const submenu = el.querySelector(".submenu");
    if (a && submenu) {
      a.addEventListener("click", () => {
        submenu.classList.toggle("hidden");
      });
    }
  });

  // ===== Faq accordion
  const faqs = document.querySelectorAll(".single-faq");
  faqs.forEach((el) => {
    const btn = el.querySelector(".faq-btn");
    const icon = el.querySelector(".icon");
    const content = el.querySelector(".faq-content");
    if (btn && icon && content) {
      btn.addEventListener("click", () => {
        icon.classList.toggle("rotate-180");
        content.classList.toggle("hidden");
      });
    }
  });

  // ===== wow js
  // will init on DOMContentLoaded so page-load fade-in can run smoothly

  // ====== scroll top js
  function scrollTo(element, to = 0, duration = 500) {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;

      const val = Math.easeInOutQuad(currentTime, start, change, duration);

      element.scrollTop = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  // guard in case element not present
  const backToTopEl = document.querySelector('.back-to-top');
  if (backToTopEl) {
    backToTopEl.onclick = () => scrollTo(document.documentElement);
  }

  /* ========  themeSwitcher start ========= */

  // themeSwitcher
  const themeSwitcher = document.getElementById('themeSwitcher');

  // Theme Vars
  const userTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Initial Theme Check
  const themeCheck = () => {
    if (userTheme === 'dark' || (!userTheme && systemTheme)) {
      document.documentElement.classList.add('dark');
      return;
    }
  };

  // Manual Theme Switch
  const themeSwitch = () => {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      return;
    }

    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  };

  // call theme switch on clicking buttons (guarded)
  if (themeSwitcher) {
    themeSwitcher.addEventListener('click', () => {
      themeSwitch();
    });
  }

  // invoke theme check on initial load
  themeCheck();
  /* ========  themeSwitcher End ========= */

  // DOM ready: remove loading class and init WOW animations
  document.addEventListener('DOMContentLoaded', function () {
    try {
      document.body.classList.remove('page-is-loading');
    } catch (e) {}

    // Staggered animation helper: for containers with `.stagger`, add CSS-based stagger animations (avoid WOW hiding)
    try {
      const staggerContainers = document.querySelectorAll('.stagger');
      const baseDelayMs = 0;
      const stepMs = 120;
      staggerContainers.forEach((container) => {
        const children = Array.from(container.children).filter((c) => c.nodeType === 1);
        children.forEach((child, i) => {
          const delaySec = (baseDelayMs + i * stepMs) / 1000;
          // add CSS-only stagger child class and set animation delay; do NOT add 'wow' class
          child.classList.add('stagger-child');
          child.style.animationDelay = `${delaySec}s`;
          child.style.webkitAnimationDelay = `${delaySec}s`;
        });
        // small timeout to trigger animations (play class will respect animationDelay)
        setTimeout(() => {
          children.forEach((c) => c.classList.add('play'));
        }, 60);
      });
    } catch (e) {}

    // initialize WOW for other elements after CSS-stagger setup
    if (typeof WOW !== 'undefined') {
      new WOW().init();
    }
  });

  // Projects Carousel
  const projectsSwiper = new Swiper(".projects-carousel", {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 700,
    on: {
      init: function() {
        try { this.wrapperEl.style.transitionTimingFunction = 'cubic-bezier(.22,.9,.32,1)'; } catch(e){}
      }
    },

    navigation: {
      nextEl: ".projects-carousel .swiper-button-next",
      prevEl: ".projects-carousel .swiper-button-prev",
    },

    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  // Competitions Carousel
  const competitionsSwiper = new Swiper(".competitions-carousel", {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 700,
    on: {
      init: function() {
        try { this.wrapperEl.style.transitionTimingFunction = 'cubic-bezier(.22,.9,.32,1)'; } catch(e){}
      }
    },

    navigation: {
      nextEl: ".swiper-button-next-comp",
      prevEl: ".swiper-button-prev-comp",
    },

    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });


})();
