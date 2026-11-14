
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

// 화면에 나타날 때 애니메이션
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

// 모바일 메뉴
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

// 프로젝트별 상세 설명
const projectDetails = {
  malllab: {
    introduction:
      'Java와 Spring Boot를 기반으로 제작한 개인 온라인 쇼핑몰 프로젝트입니다. JavaScript로 사용자 화면의 동작을 구현하고, SQL과 MySQL을 이용해 상품 데이터를 관리했습니다.',

    technologies: [
      'Java',
      'JavaScript',
      'SQL',
      'MySQL',
      'Spring Boot'
    ],

    features: [
      '상품 목록 및 상세 정보 조회',
      '남성 / 여성 카테고리별 상품 분류',
      '상품 상세 페이지 구현',
      '의류 사이즈 선택 및 상품 수량 변경',
      '장바구니 담기 및 수량 관리',
      '주문 단계 화면 구현',
      '데이터베이스 연동을 통한 상품 데이터 관리'
    ],

    learning:
      'Java 기반 백엔드와 JavaScript 프론트엔드가 데이터를 주고받는 구조를 이해하고, SQL을 활용해 데이터베이스를 연동하는 과정을 경험했습니다.'
  }
};

// 프로젝트 상세 팝업 생성
const modal = document.createElement('div');
modal.className = 'project-modal';
modal.innerHTML = `
  <div class="project-modal-content">
    <button class="project-modal-close" aria-label="팝업 닫기">&times;</button>
    <div class="project-modal-image"></div>
    <div class="project-modal-body">
      <p class="project-modal-number"></p>
      <h2 class="project-modal-title"></h2>

      <section class="project-modal-section">
        <h3>프로젝트 소개</h3>
        <p class="project-modal-introduction"></p>
      </section>

      <section class="project-modal-section">
        <h3>사용 기술</h3>
        <div class="project-modal-tags"></div>
      </section>

      <section class="project-modal-section">
        <h3>주요 구현 내용</h3>
        <ul class="project-modal-features"></ul>
      </section>

      <section class="project-modal-section">
        <h3>프로젝트를 통해 배운 점</h3>
        <p class="project-modal-learning"></p>
      </section>
    </div>
  </div>
`;

document.body.appendChild(modal);

const closeButton = modal.querySelector('.project-modal-close');

// 팝업 열기
function openProjectModal(card) {
  const title = card.querySelector('.project-info h3')?.textContent.trim() || '프로젝트';
  const infoParagraphs = card.querySelectorAll('.project-info > p');
  const number = infoParagraphs[0]?.textContent.trim() || '';
  const description = infoParagraphs[1]?.textContent.trim() || '';
  const tags = [...card.querySelectorAll('.tags span')]
    .map(tag => tag.textContent.trim());

  const image = card.querySelector('.project-img img');
  const imageArea = modal.querySelector('.project-modal-image');

  const key = card.dataset.project;
  const detail = projectDetails[key] ||
    (key === 'shop' ? projectDetails.malllab : null);

  modal.querySelector('.project-modal-number').textContent = number;
  modal.querySelector('.project-modal-title').textContent = title;

  modal.querySelector('.project-modal-introduction').textContent =
    detail?.introduction || description || '프로젝트 소개를 준비하고 있습니다.';

  // 이미지 표시
  imageArea.innerHTML = '';

  if (image) {
    const modalImage = document.createElement('img');
    modalImage.src = image.src;
    modalImage.alt = image.alt || title;
    imageArea.appendChild(modalImage);
    imageArea.style.display = 'block';
  } else {
    imageArea.style.display = 'none';
  }

  // 사용 기술
  const technologyArea = modal.querySelector('.project-modal-tags');
  technologyArea.innerHTML = '';

  const technologies = detail?.technologies || tags;

  technologies.forEach(technology => {
    const tag = document.createElement('span');
    tag.textContent = technology;
    technologyArea.appendChild(tag);
  });

  const featureArea = modal.querySelector('.project-modal-features');
  featureArea.innerHTML = '';

  const features = detail?.features || [
    '프로젝트에 사용한 기술을 바탕으로 기능을 구현했습니다.',
    '프로젝트의 구체적인 구현 내용은 실제 작업 내역에 맞춰 정리할 예정입니다.'
  ];

  features.forEach(feature => {
    const li = document.createElement('li');
    li.textContent = feature;
    featureArea.appendChild(li);
  });

 
  modal.querySelector('.project-modal-learning').textContent =
    detail?.learning ||
    '프로젝트를 진행하며 사용 기술과 개발 과정을 경험했습니다.';

  modal.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeProjectModal() {
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');
}


document.querySelectorAll('.project-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.setAttribute('tabindex', '0');

  card.addEventListener('click', () => {
    openProjectModal(card);
  });

  card.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProjectModal(card);
    }
  });
});


closeButton.addEventListener('click', closeProjectModal);


modal.addEventListener('click', event => {
  if (event.target === modal) {
    closeProjectModal();
  }
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && modal.classList.contains('active')) {
    closeProjectModal();
  }
});
