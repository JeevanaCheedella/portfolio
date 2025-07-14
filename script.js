// Smooth scroll for nav links
document.querySelectorAll('nav a.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetID = link.getAttribute('href').slice(1);
    document.getElementById(targetID).scrollIntoView({ behavior: 'smooth' });
  });
});

// Update active nav link on scroll
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('nav a.nav-link');
window.addEventListener('scroll', () => {
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href').slice(1) === currentSection);
  });
});

// Animate progress bars when skills section comes into view
const skillsSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.progress-bar-inner');
let skillsAnimated = false;

function animateSkills() {
  if (!skillsAnimated) {
    progressBars.forEach(bar => {
      const width = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
    skillsAnimated = true;
  }
}

// Detect when skills section is visible
function onScroll() {
  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    animateSkills();
    window.removeEventListener('scroll', onScroll);
  }
}

window.addEventListener('scroll', onScroll);

// Contact form submission handler (front-end only)
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', e => {
  e.preventDefault();
  status.textContent = 'Sending message...';
  setTimeout(() => {
    status.textContent = 'Thank you for your message! I will get back to you soon.';
    form.reset();
  }, 1500);
});
