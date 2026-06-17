/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }
};
showMenu('nav-toggle', 'nav-menu');

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
  const navMenu = document.getElementById('nav-menu');
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show');
}
navLink.forEach((n) => n.addEventListener('click', linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 60;
    const sectionId = current.getAttribute('id');
    const link = document.querySelector('.nav__menu a[href*=' + sectionId + ']');
    if (!link) return;

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/*==================== SCROLL REVEAL (self-contained, no CDN) ====================*/
/* Content is visible by default. We only opt into the hidden->reveal effect once
   JS runs (the `js` class on <html>), so the page can NEVER end up blank — even
   offline, with JS disabled, or if anything errors. */
(function scrollReveal() {
  document.documentElement.classList.add('js');

  var selector = [
    '.home__greeting', '.home__title', '.home__role', '.home__text',
    '.home__stats .stat', '.home__actions', '.home__social-icon',
    '.section-title', '.about__text',
    '.exp', '.project', '.skill__group', '.cert', '.edu',
    '.contact__text', '.contact__card',
    '.home__data p', '.home__data h3', '.blog', '.research__blog',
    '.contact__subtitle', '.contact__link'
  ].join(',');

  var els = Array.prototype.slice.call(document.querySelectorAll(selector));
  if (!els.length) return;

  // Stagger each element by its position among its reveal-siblings (same parent),
  // so every container animates in symmetrically.
  var counts = new Map();
  els.forEach(function (el) {
    el.classList.add('reveal');
    var parent = el.parentElement;
    var idx = counts.get(parent) || 0;
    el.style.transitionDelay = Math.min(idx * 90, 400) + 'ms';
    counts.set(parent, idx + 1);
  });

  // If IntersectionObserver is unavailable, just show everything.
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  els.forEach(function (el) { io.observe(el); });

  // Safety net: reveal anything still hidden shortly after load.
  window.addEventListener('load', function () {
    setTimeout(function () {
      els.forEach(function (el) { el.classList.add('is-visible'); });
    }, 2500);
  });
})();

/*==================== CUSTOM CURSOR ====================*/
const cursor = document.querySelector('.cursor');

if (cursor && window.matchMedia('(pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });
}
