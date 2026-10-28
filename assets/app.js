(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var navToggle = document.querySelector('.nav-toggle');
  var mobileMenu = document.getElementById('mobileMenu');
  var lastScroll = window.scrollY;

  function onScroll() {
    if (!header) return;
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 12);
    if (y > 260 && y > lastScroll + 8 && !document.body.classList.contains('menu-open')) {
      header.classList.add('is-hidden');
    } else if (y < lastScroll - 8 || y < 120) {
      header.classList.remove('is-hidden');
    }
    lastScroll = y;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    if (!mobileMenu || !navToggle) return;
    mobileMenu.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', '打开菜单');
    document.body.classList.remove('menu-open');
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? '关闭菜单' : '打开菜单');
      document.body.classList.toggle('menu-open', isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* Reveal */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if ('IntersectionObserver' in window && revealItems.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-in'); });
  }

  /* Safety net: never leave content invisible if the observer is delayed. */
  window.setTimeout(function () {
    revealItems.forEach(function (item) { item.classList.add('is-in'); });
  }, 2600);

  /* Active nav */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('[data-nav]'));
  var sections = navLinks.map(function (link) {
    return document.getElementById(link.getAttribute('data-nav'));
  }).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle('is-active', link.getAttribute('data-nav') === entry.target.id);
        });
      });
    }, { rootMargin: '-38% 0px -52% 0px', threshold: 0 });

    sections.forEach(function (section) { navObserver.observe(section); });
  }

  /* Project filtering */
  var filterButtons = Array.prototype.slice.call(document.querySelectorAll('.filter-btn'));
  var projects = Array.prototype.slice.call(document.querySelectorAll('.project[data-cat]'));
  var filterCount = document.getElementById('filterCount');

  function setFilter(filter) {
    var shown = 0;
    projects.forEach(function (card) {
      var cats = (card.getAttribute('data-cat') || '').split(/\s+/);
      var match = filter === 'all' || cats.indexOf(filter) !== -1;
      card.classList.toggle('is-filtered', !match);
      if (match) shown += 1;
    });
    if (filterCount) {
      filterCount.textContent = String(shown).padStart(2, '0') + ' PROJECT' + (shown === 1 ? '' : 'S');
    }
  }

  filterButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      filterButtons.forEach(function (item) {
        item.classList.toggle('is-active', item === button);
      });
      setFilter(button.getAttribute('data-filter') || 'all');
    });
  });

  /* Modal helpers */
  var openModal = null;
  var previousFocus = null;

  function showModal(modal) {
    if (!modal) return;
    closeModal(false);
    previousFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    openModal = modal;
    var focusable = modal.querySelector('button, a, video, [tabindex]');
    if (focusable) {
      window.setTimeout(function () { focusable.focus(); }, 80);
    }
  }

  function closeModal(restore) {
    if (!openModal) return;
    var modal = openModal;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (modal.id === 'videoModal') {
      var video = modal.querySelector('video');
      if (video) video.pause();
    }
    openModal = null;
    if (restore !== false && previousFocus) {
      previousFocus.focus();
    }
  }

  document.querySelectorAll('[data-modal-close]').forEach(function (button) {
    button.addEventListener('click', function () { closeModal(true); });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeModal(true);
      closeMenu();
    }
  });

  /* Video modal */
  var videoModal = document.getElementById('videoModal');
  var projectVideo = document.getElementById('projectVideo');
  var videoTitle = document.getElementById('videoModalTitle');

  document.querySelectorAll('[data-video-open]').forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      if (videoTitle) videoTitle.textContent = button.getAttribute('data-video-title') || '项目演示视频';
      showModal(videoModal);
      if (projectVideo) {
        projectVideo.currentTime = 0;
        var playPromise = projectVideo.play();
        if (playPromise && playPromise.catch) playPromise.catch(function () {});
      }
    });
  });

  /* Image lightbox */
  var imageModal = document.getElementById('imageModal');
  var lightboxImage = document.getElementById('lightboxImage');
  var imageModalTitle = document.getElementById('imageModalTitle');

  document.querySelectorAll('[data-lightbox]').forEach(function (button) {
    button.addEventListener('click', function () {
      var src = button.getAttribute('data-lightbox');
      var title = button.getAttribute('data-lightbox-title') || 'PROJECT SCREEN';
      var alt = button.getAttribute('data-lightbox-alt') || '';
      if (!src || !lightboxImage) return;
      lightboxImage.src = src;
      lightboxImage.alt = alt;
      if (imageModalTitle) imageModalTitle.textContent = title;
      showModal(imageModal);
    });
  });

  /* Copy email */
  var toast = document.getElementById('toast');
  var toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('is-show');
    }, 2200);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var area = document.createElement('textarea');
      area.value = text;
      area.style.position = 'fixed';
      area.style.opacity = '0';
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand('copy') ? resolve() : reject();
      } catch (error) {
        reject(error);
      } finally {
        document.body.removeChild(area);
      }
    });
  }

  document.querySelectorAll('[data-copy]').forEach(function (button) {
    button.addEventListener('click', function () {
      var text = button.getAttribute('data-copy');
      copyText(text).then(function () {
        showToast('已复制：' + text);
      }).catch(function () {
        showToast('复制失败，请手动选择邮箱');
      });
    });
  });

  /* Lazy iframe: only load report when scrolled close */
  document.querySelectorAll('iframe[data-src]').forEach(function (frame) {
    if (!('IntersectionObserver' in window)) {
      frame.src = frame.getAttribute('data-src');
      return;
    }
    var frameObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          frame.src = frame.getAttribute('data-src');
          frameObserver.unobserve(frame);
        }
      });
    }, { rootMargin: '500px' });
    frameObserver.observe(frame);
  });

  /* Make gallery buttons keyboard-open */
  document.querySelectorAll('[data-lightbox]').forEach(function (button) {
    if (button.tagName === 'BUTTON') return;
    button.setAttribute('role', 'button');
    button.setAttribute('tabindex', '0');
    button.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        button.click();
      }
    });
  });
})();
