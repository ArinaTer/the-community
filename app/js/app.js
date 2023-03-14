import * as myFunctions from "./modules/functions.js";
import * as bootstrap from "bootstrap";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin.js";
import { SplitText } from "gsap/SplitText.js";
import { CSSRulePlugin } from "gsap/CSSRulePlugin.js";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin.js";
import SmoothScroll from "smoothscroll-for-websites";
import Swiper, {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  EffectCoverflow,
  Thumbs,
  Controller,
} from "swiper";
import Splitting from "splitting";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  MorphSVGPlugin,
  SplitText,
  DrawSVGPlugin,
  CSSRulePlugin
);

myFunctions.isWebp();

//  Preload transform
(function preloadTransform() {
  window.addEventListener("load", function (event) {
    document.body.classList.add("loaded");
  });
})();

//Pop-up-modal
(function popUpModal() {
  const seconds = 40000;
  const timer = setTimeout(function () {
    const myModal = new bootstrap.Modal(document.getElementById("popupModal"));
    myModal.show();
  }, seconds);
  const modal = document.querySelectorAll(".modal");
  modal.forEach(function (el) {
    el.addEventListener("show.bs.modal", function () {
      clearTimeout(timer);
    });
  });
})();

//Admin-modal
(function adminModal() {
  if (window.location.href.indexOf("#admin") != -1) {
    const successModal = new bootstrap.Modal(
      document.getElementById("adminModal"),
      {}
    );
    successModal.show();
  }

  if (location.href.indexOf("en/node/6?check_logged_in=1") != -1) {
    location.replace(
      window.location.href.replace("en/node/6?check_logged_in=1", "admin")
    );
  }
})();

// Class Header
(function addClassHeader() {
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("fixed-top").style.top = "0";
    } else {
      document.getElementById("fixed-top").style.top = "-100%";
    }
    prevScrollpos = currentScrollPos;
  };
})();

// Scroller
(function scroller() {
  SmoothScroll({
    animationTime: 1000,
    stepSize: 80,
    keyboardSupport: true,
    arrowScroll: 100,
    touchpadSupport: true,
  });
})();

// text lines
(function splittingText() {
  document.querySelectorAll(".split-lines").forEach((el) => {
    Splitting({ target: el, by: "lines" });
  });

  document.querySelectorAll(".split-lines .word").forEach((el) => {
    Splitting({ target: el, by: "lines" });
  });

  document.querySelectorAll(".split-lines-box").forEach((el) => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 100%",
        },
      })
      .to(el, { className: "split-lines-box split" });
  });
})();

(function gsapMatchMedia() {
  ScrollTrigger.matchMedia({
    all: function () {
      //Navbar

      let bodyOverlay = document.createElement("div");
      bodyOverlay.classList.add("body-overlay");
      document.body.append(bodyOverlay);

      const tlMenu = gsap.timeline({ paused: true });

      tlMenu
        .from(".main-header__menu", { yPercent: -200, opacity: 0 })
        .to(".main-header__menu", { yPercent: 0, opacity: 1 })
        .to(".main-header__burger", { yPercent: 0, opacity: 1 })
        .to(".body-overlay", { visibility: "visible", autoAlpha: 1 }, 0)
        .to(".main-header__burger-line_top", { y: 2 }, 0)
        .to(".main-header__burger-line_bot", { y: -3 }, 0)
        .to(".main-header__burger-line_top", { rotate: 40 }, 0.5)
        .to(".main-header__burger-line_bot", { rotate: -40 }, 0.5)
        .from(".main-header__menu__item", { autoAlpha: 0, stagger: 0.05 }, 0.6)

      const btnToggler = document.querySelector(".btn-toggler");
      btnToggler.addEventListener("click", toggleMenu);
      document
        .querySelector(".body-overlay")
        .addEventListener("click", toggleMenu);
      function toggleMenu() {
        tlMenu.reversed()
          ? tlMenu.timeScale(1).play()
          : tlMenu.timeScale(2).reverse();
        btnToggler.classList.toggle("open");
      }
      tlMenu.reverse();

      function getSamePageAnchor(link) {
        if (
          link.protocol !== window.location.protocol ||
          link.host !== window.location.host ||
          link.pathname !== window.location.pathname ||
          link.search !== window.location.search
        ) {
          return false;
        }

        return link.hash;
      }
      function scrollToHash(hash, e) {
        const elem = hash ? document.querySelector(hash) : false;
        if (elem) {
          if (e) e.preventDefault();
          gsap.to(window, { duration: 0, scrollTo: elem, ease: "power2" });
        }
      }
      document.querySelectorAll("a[href]").forEach((a) => {
        a.addEventListener("click", (e) => {
          scrollToHash(getSamePageAnchor(a), e);
        });
      });
      scrollToHash(window.location.hash);

      document.querySelectorAll(".menu__link").forEach((a) => {
        a.addEventListener("click", (e) => {
          toggleMenu();
        });
      });

      gsap.utils.toArray(".panel").forEach(function (panel) {
        let mainPanel = panel.querySelector(".main-panel");

        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            scrub: true,
            pin: false,
          },
        });
        tl.from(mainPanel, {
          yPercent: -10,
          ease: "none",
        }).to(mainPanel, {
          yPercent: 30,
          ease: "none",
        });
      });
    },
    // 2500 - 993
    "(max-width: 2500px) and (min-width: 993px)": function () {
      const boxes = gsap.utils.toArray(".gs-anim");
      boxes.forEach((box) => {
        gsap.from(box, {
          yPercent: 30,
          duration: 1,
          scrollTrigger: {
            trigger: box,
            start: "top 100%",
            end: "center 40%",
            scrub: true,
          },
        });
      });
    },
    // 992 - 769
    "(max-width: 992px) and (min-width: 769px)": function () {},
    // 768 - 577
    "(max-width: 768px) and (min-width: 577px)": function () {},
    // 576 - 320
    "(max-width: 576px) and (min-width: 320px)": function () {},
  });
})();

// Swiper banner
(function swiperInteryor() {
  document
    .querySelectorAll(".banner-section__swiper.swiper")
    .forEach(function (el, index) {
      const swiperBanner = new Swiper(el, {
        modules: [Pagination, Navigation],
        watchSlidesProgress: true,
        slidesPerView: 1,
        spaceBetween: 0,
        // Navigation arrows
        navigation: {
          prevEl: ".banner-section__swiper .forSwiper .main__btn-prev",
          nextEl: ".banner-section__swiper .forSwiper .main__btn-next",
        },
      });
    });
})();
