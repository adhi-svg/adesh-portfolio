// Core DOM references
const navLinks = document.querySelectorAll('.nav-links a');
const navUnderline = document.querySelector('.nav-underline');
const sections = document.querySelectorAll('section[id]');
const revealItems = document.querySelectorAll('.reveal');
const filters = document.querySelectorAll('.filter');
const techPills = document.querySelectorAll('.tech-pill');
const projectCards = document.querySelectorAll('.project-card');
const modal = document.getElementById('detailModal');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTags = document.getElementById('modalTags');
const modalFeatures = document.getElementById('modalFeatures');
const modalLinks = document.getElementById('modalLinks');
const contactForm = document.getElementById('contactForm');
const toast = document.getElementById('toast');
const avatar = document.querySelector('.avatar');

// Modal data for projects
const projectDetails = {
  fyxion: {
    title: 'FYXION (Main Project)',
    description:
      'A service marketplace concept that connects users with technicians using clear request flows, status updates, and role-based dashboards.',
    tags: ['Workflow', 'UI/UX', 'Integration'],
    features: [
      'Ticket creation and assignment flow for technicians.',
      'Unified user dashboard to track request status.',
      'Designed wireframes with usability focus.'
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/adhi-svg' },
      { label: 'Live', href: '#' }
    ]
  },
  stock: {
    title: 'AI Stock Price Prediction (LSTM)',
    description:
      'Time-series forecasting pipeline with preprocessing, training, and evaluation for short-term stock movement insights.',
    tags: ['Python', 'LSTM', 'Data'],
    features: [
      'Scaled and windowed time-series data.',
      'Trained and evaluated LSTM model.',
      'Clear visual reporting of predictions.'
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/adhi-svg' },
      { label: 'Live', href: '#' }
    ]
  },
  'tech-ui': {
    title: 'Technician Frontend',
    description:
      'Separate UI layout inspired by modern delivery apps to help technicians manage tickets quickly.',
    tags: ['HTML', 'CSS', 'UX'],
    features: [
      'Status chips and quick filters.',
      'Mobile-first layout for on-the-go updates.',
      'Clean card-based request list.'
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/adhi-svg' },
      { label: 'Live', href: '#' }
    ]
  },
  landing: {
    title: 'Responsive Landing Page',
    description:
      'A small frontend build with a bold hero, feature grid, and smooth call-to-action flow.',
    tags: ['HTML', 'CSS', 'Responsive'],
    features: [
      'Modular sections for easy reuse.',
      'Readable typography and spacing.',
      'Optimized for mobile and desktop.'
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/adhi-svg' },
      { label: 'Live', href: '#' }
    ]
  },
  todo: {
    title: 'To-Do App',
    description:
      'A simple productivity tool using LocalStorage so tasks stay across refreshes.',
    tags: ['JavaScript', 'LocalStorage', 'UI'],
    features: [
      'Instant add/remove actions.',
      'Persistence without a backend.',
      'Minimal layout for focus.'
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/adhi-svg' },
      { label: 'Live', href: '#' }
    ]
  },
  weather: {
    title: 'Weather UI',
    description:
      'API-ready weather layout with forecast cards and calm dark theme.',
    tags: ['CSS', 'UI', 'API'],
    features: [
      'Forecast cards with placeholder icons.',
      'Clean typography for temperature data.',
      'Ready for API hook-up.'
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/adhi-svg' },
      { label: 'Live', href: '#' }
    ]
  }
};

// Modal data for tech stack
const techDetails = {
  HTML: {
    description: 'Semantic markup for clean, accessible layouts.',
    used: 'Landing pages, project cards, responsive sections.'
  },
  CSS: {
    description: 'Modern layout, grid systems, and animations.',
    used: 'Portfolio UI, component styling, hover effects.'
  },
  JavaScript: {
    description: 'Interactive UI behaviors and data handling.',
    used: 'Filters, modals, LocalStorage apps.'
  },
  Bootstrap: {
    description: 'Rapid UI scaffolding and responsive components.',
    used: 'Prototype dashboards and layout testing.'
  },
  'Responsive UI': {
    description: 'Layouts that adapt across devices.',
    used: 'Landing pages and app screens.'
  },
  Python: {
    description: 'Scripting, data handling, and AI projects.',
    used: 'LSTM forecasting and automation tasks.'
  },
  FastAPI: {
    description: 'Lightweight backend framework learning.',
    used: 'Planned API services for portfolio apps.'
  },
  'Node.js': {
    description: 'Backend basics and async server logic.',
    used: 'Small API experiments.'
  },
  'REST APIs': {
    description: 'Designing endpoints and clean data flows.',
    used: 'Frontend data integration.'
  },
  MongoDB: {
    description: 'NoSQL data modeling and CRUD basics.',
    used: 'Full-stack app planning.'
  },
  Django: {
    description: 'Full-stack Python web framework for rapid development.',
    used: 'Learning backend structure, routing, and templating.'
  },
  MySQL: {
    description: 'Relational database fundamentals.',
    used: 'Basic queries and schema practice.'
  },
  'Git/GitHub': {
    description: 'Version control and collaborative workflow.',
    used: 'Tracking portfolio and AI projects.'
  },
  'VS Code': {
    description: 'Primary editor for coding and debugging.',
    used: 'Daily development and testing.'
  },
  Vercel: {
    description: 'Simple frontend deployment platform.',
    used: 'Static portfolio hosting.'
  },
  Render: {
    description: 'Basic deployment learning for APIs.',
    used: 'Experimented with backend hosting.'
  },
  Docker: {
    description: 'Container basics for reproducible environments.',
    used: 'Learning through small demos.'
  },
  Linux: {
    description: 'Command line fundamentals and scripting.',
    used: 'Daily CLI practice.'
  }
};

// Move the nav underline smoothly
function updateUnderline(link) {
  if (!link) {
    return;
  }
  const rect = link.getBoundingClientRect();
  const parentRect = link.parentElement.getBoundingClientRect();
  navUnderline.style.width = `${rect.width}px`;
  navUnderline.style.transform = `translateX(${rect.left - parentRect.left}px)`;
}

// Scrollspy logic
function setActiveLink() {
  let currentSection = sections[0];
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120) {
      currentSection = section;
    }
  });
  const id = currentSection.id;
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.section === id);
  });
  updateUnderline(document.querySelector('.nav-links a.active'));
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector(link.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((btn) => btn.classList.remove('active'));
    filter.classList.add('active');
    const target = filter.dataset.filter;
    techPills.forEach((pill) => {
      const category = pill.dataset.category;
      pill.style.display = target === 'all' || category === target ? 'inline-flex' : 'none';
    });
  });
});

// Open shared modal
function openModal(data) {
  modalTitle.textContent = data.title;
  modalDescription.textContent = data.description;
  modalTags.innerHTML = '';
  data.tags.forEach((tag) => {
    const span = document.createElement('span');
    span.textContent = tag;
    modalTags.appendChild(span);
  });
  modalFeatures.innerHTML = '';
  data.features.forEach((feature) => {
    const li = document.createElement('li');
    li.textContent = feature;
    modalFeatures.appendChild(li);
  });
  modalLinks.innerHTML = '';
  data.links.forEach((link) => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.label;
    a.target = link.href.startsWith('http') ? '_blank' : '_self';
    a.rel = link.href.startsWith('http') ? 'noopener' : '';
    modalLinks.appendChild(a);
  });
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

techPills.forEach((pill) => {
  pill.addEventListener('click', () => {
    const tech = pill.dataset.tech;
    const detail = techDetails[tech];
    openModal({
      title: tech,
      description: detail.description,
      tags: ['Tech'],
      features: [`Where I used it: ${detail.used}`],
      links: []
    });
  });
});

projectCards.forEach((card) => {
  card.addEventListener('click', () => {
    const key = card.dataset.project;
    openModal(projectDetails[key]);
  });
});

modalBackdrop.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  toast.classList.add('show');
  contactForm.reset();
  setTimeout(() => toast.classList.remove('show'), 2400);
});

// Fallback if profile image missing
function checkAvatar() {
  const img = avatar.querySelector('img');
  img.addEventListener('error', () => {
    avatar.classList.add('fallback-active');
  });
}

checkAvatar();
setActiveLink();
window.addEventListener('scroll', setActiveLink);
window.addEventListener('resize', () => updateUnderline(document.querySelector('.nav-links a.active')));
