
const topbar = document.querySelector('.topbar');
const reveals = document.querySelectorAll('.reveal');
const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav');

// 스크롤 시 상단 메뉴 스타일 변경
window.addEventListener('scroll', () => {
  if (topbar) {
    topbar.classList.toggle('scrolled', window.scrollY > 20);
  }
});

// 화면 등장 애니메이션
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');

    if (open) {
      nav.style.display = 'flex';
      nav.style.position = 'absolute';
      nav.style.top = '78px';
      nav.style.left = '0';
      nav.style.right = '0';
      nav.style.padding = '20px 5vw';
      nav.style.flexDirection = 'column';
      nav.style.background = 'rgba(11,13,16,.96)';
      nav.style.borderBottom = '1px solid rgba(255,255,255,.1)';
    } else {
      nav.removeAttribute('style');
    }
  });

  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');

      if (window.innerWidth <= 900) {
        nav.removeAttribute('style');
      }
    });
  });
}
