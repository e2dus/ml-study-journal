// ===========================
// ML Study Journal - Script
// ===========================

// ===========================
// Particle Background
// ===========================
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    const colors = ['#63b3ed', '#9f7aea', '#4fd1c7', '#f687b3', '#68d391'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.opacity = Math.random() * 0.4 + 0.05;
    this.pulse = Math.random() * Math.PI * 2;
    this.pulseSpeed = Math.random() * 0.02 + 0.005;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.pulse += this.pulseSpeed;
    this.currentOpacity = this.opacity + Math.sin(this.pulse) * 0.1;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.currentOpacity);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 6;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function initParticles() {
  particles = [];
  const count = Math.floor((canvas.width * canvas.height) / 12000);
  for (let i = 0; i < Math.min(count, 120); i++) {
    particles.push(new Particle());
  }
}

function drawConnections() {
  ctx.save();
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        ctx.globalAlpha = (1 - dist / 100) * 0.06;
        ctx.strokeStyle = '#63b3ed';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  ctx.restore();
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}

resizeCanvas();
initParticles();
animateParticles();
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

// ===========================
// Hamburger Menu
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

document.querySelectorAll('#nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ===========================
// Scroll Reveal
// ===========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${index * 0.05}s`;
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===========================
// Progress Bar Animation
// ===========================
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fills = entry.target.querySelectorAll('.topic-progress-fill');
      fills.forEach(fill => {
        const targetWidth = fill.dataset.width;
        setTimeout(() => { fill.style.width = targetWidth; }, 200);
      });
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.topic-card').forEach(card => {
  const fill = card.querySelector('.topic-progress-fill');
  if (fill) {
    fill.style.width = '0%';
  }
  progressObserver.observe(card);
});

// ===========================
// Counter Animation
// ===========================
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + (el.dataset.suffix || '');
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('[data-count]');
      counters.forEach(counter => {
        animateCounter(counter, parseInt(counter.dataset.count));
      });
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) counterObserver.observe(heroStats);

// ===========================
// Topic Modal
// ===========================
const modalData = {
  supervised: {
    title: '지도 학습 (Supervised Learning)',
    subtitle: '레이블된 데이터로 학습하여 예측 모델을 구축하는 방법',
    content: `
      <h4>📌 핵심 개념</h4>
      <ul>
        <li>입력(X)과 출력(y) 쌍의 데이터로 모델 훈련</li>
        <li>분류(Classification)와 회귀(Regression)로 구분</li>
        <li>훈련/검증/테스트 셋 분리의 중요성</li>
      </ul>
      <h4>🔧 주요 알고리즘</h4>
      <ul>
        <li><code>Linear Regression</code> — 연속값 예측</li>
        <li><code>Logistic Regression</code> — 이진 분류</li>
        <li><code>Decision Tree</code> — 규칙 기반 분류/회귀</li>
        <li><code>SVM</code> — 마진 최대화 분류</li>
        <li><code>Random Forest</code> — 앙상블 방법</li>
        <li><code>XGBoost</code> — 그래디언트 부스팅</li>
      </ul>
      <h4>📊 평가 지표</h4>
      <ul>
        <li>분류: Accuracy, Precision, Recall, F1, ROC-AUC</li>
        <li>회귀: MSE, RMSE, MAE, R²</li>
      </ul>
    `
  },
  unsupervised: {
    title: '비지도 학습 (Unsupervised Learning)',
    subtitle: '레이블 없이 데이터의 패턴과 구조를 찾는 방법',
    content: `
      <h4>📌 핵심 개념</h4>
      <ul>
        <li>레이블 없는 데이터에서 숨겨진 패턴 발견</li>
        <li>클러스터링, 차원 축소, 밀도 추정</li>
        <li>데이터 탐색적 분석(EDA)에 유용</li>
      </ul>
      <h4>🔧 주요 알고리즘</h4>
      <ul>
        <li><code>K-Means</code> — 중심 기반 클러스터링</li>
        <li><code>DBSCAN</code> — 밀도 기반 클러스터링</li>
        <li><code>PCA</code> — 주성분 분석 (차원 축소)</li>
        <li><code>t-SNE</code> — 시각화용 차원 축소</li>
        <li><code>Autoencoder</code> — 딥러닝 기반 차원 축소</li>
      </ul>
      <h4>📊 응용</h4>
      <ul>
        <li>고객 세분화, 이상 탐지, 추천 시스템</li>
        <li>특성 추출 전처리 단계</li>
      </ul>
    `
  },
  deeplearning: {
    title: '딥러닝 (Deep Learning)',
    subtitle: '신경망을 기반으로 복잡한 패턴을 학습하는 방법',
    content: `
      <h4>📌 핵심 개념</h4>
      <ul>
        <li>다층 신경망(Multi-layer Neural Network)</li>
        <li>역전파(Backpropagation)와 경사하강법(SGD)</li>
        <li>활성화 함수: ReLU, Sigmoid, Softmax</li>
      </ul>
      <h4>🔧 주요 아키텍처</h4>
      <ul>
        <li><code>CNN</code> — 이미지 처리</li>
        <li><code>RNN / LSTM</code> — 시계열 데이터</li>
        <li><code>Transformer</code> — NLP, 최신 비전</li>
        <li><code>GAN</code> — 이미지 생성</li>
        <li><code>ResNet, VGG, BERT, GPT</code></li>
      </ul>
      <h4>🛠 프레임워크</h4>
      <ul>
        <li><code>PyTorch</code> — 연구 중심, 동적 그래프</li>
        <li><code>TensorFlow/Keras</code> — 배포 중심</li>
      </ul>
    `
  },
  preprocessing: {
    title: '데이터 전처리 (Preprocessing)',
    subtitle: '모델 성능을 극대화하기 위한 데이터 준비 과정',
    content: `
      <h4>📌 핵심 개념</h4>
      <ul>
        <li>"Garbage in, garbage out" — 데이터 품질이 핵심</li>
        <li>결측치, 이상치, 불균형 데이터 처리</li>
      </ul>
      <h4>🔧 주요 기법</h4>
      <ul>
        <li><code>StandardScaler</code> — 평균 0, 분산 1 정규화</li>
        <li><code>MinMaxScaler</code> — 0~1 범위 스케일링</li>
        <li><code>OneHotEncoding</code> — 범주형 변수 처리</li>
        <li><code>SMOTE</code> — 불균형 데이터 오버샘플링</li>
        <li><code>SimpleImputer</code> — 결측치 대체</li>
      </ul>
      <h4>📊 특성 공학 (Feature Engineering)</h4>
      <ul>
        <li>파생 변수 생성, 다항 특성, 상호작용 항</li>
        <li>SelectKBest, VarianceThreshold로 특성 선택</li>
      </ul>
    `
  },
  evaluation: {
    title: '모델 평가 (Model Evaluation)',
    subtitle: '모델의 일반화 성능을 정확하게 측정하는 방법',
    content: `
      <h4>📌 핵심 개념</h4>
      <ul>
        <li>과적합(Overfitting) vs 과소적합(Underfitting)</li>
        <li>편향-분산 트레이드오프(Bias-Variance Tradeoff)</li>
        <li>데이터 누수(Data Leakage) 방지</li>
      </ul>
      <h4>🔧 검증 기법</h4>
      <ul>
        <li><code>Hold-out</code> — Train/Val/Test 분리</li>
        <li><code>K-Fold CV</code> — K겹 교차 검증</li>
        <li><code>Stratified K-Fold</code> — 클래스 비율 유지</li>
        <li><code>GridSearchCV</code> — 하이퍼파라미터 튜닝</li>
      </ul>
      <h4>📊 정규화 기법</h4>
      <ul>
        <li>L1 (Lasso), L2 (Ridge), Elastic Net</li>
        <li>Dropout, Batch Normalization (딥러닝)</li>
        <li>Early Stopping</li>
      </ul>
    `
  },
  nlp: {
    title: '자연어 처리 (NLP)',
    subtitle: '텍스트 데이터를 이해하고 처리하는 방법',
    content: `
      <h4>📌 핵심 개념</h4>
      <ul>
        <li>토큰화(Tokenization), 정제, 정규화</li>
        <li>단어 임베딩: 의미를 벡터로 표현</li>
        <li>언어 모델(Language Model)의 발전</li>
      </ul>
      <h4>🔧 주요 기법 / 모델</h4>
      <ul>
        <li><code>TF-IDF</code> — 단어 중요도 계산</li>
        <li><code>Word2Vec</code> — 단어 벡터 학습</li>
        <li><code>BERT</code> — 양방향 트랜스포머</li>
        <li><code>GPT</code> — 생성형 언어 모델</li>
        <li><code>HuggingFace</code> — 사전 학습 모델 허브</li>
      </ul>
      <h4>📊 응용</h4>
      <ul>
        <li>감성 분석, 텍스트 분류, 기계 번역</li>
        <li>질의응답, 요약, 챗봇</li>
      </ul>
    `
  }
};

const modalOverlay = document.getElementById('modal-overlay');
const modalTitle = document.getElementById('modal-title');
const modalSubtitle = document.getElementById('modal-subtitle');
const modalContent = document.getElementById('modal-content');
const modalClose = document.getElementById('modal-close');

document.querySelectorAll('.topic-card[data-modal]').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.dataset.modal;
    const data = modalData[key];
    if (data) {
      modalTitle.textContent = data.title;
      modalSubtitle.textContent = data.subtitle;
      modalContent.innerHTML = data.content;
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
});

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ===========================
// Smooth Navbar Shadow on Scroll
// ===========================
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// ===========================
// Active Nav Link Highlight
// ===========================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--accent-blue)';
    }
  });
});
