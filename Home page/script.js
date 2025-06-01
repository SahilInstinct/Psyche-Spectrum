const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('side-menu');
const closeBtn = document.getElementById('close-btn');

// Open menu
hamburger.addEventListener('click', () => {
  sideMenu.style.right = '0';
  sideMenu.setAttribute('aria-hidden', 'false');
  hamburger.setAttribute('aria-expanded', 'true');
});

// Close menu
closeBtn.addEventListener('click', () => {
  sideMenu.style.right = '-100%';
  sideMenu.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!sideMenu.contains(e.target) && !hamburger.contains(e.target)) {
    sideMenu.style.right = '-100%';
    sideMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});
