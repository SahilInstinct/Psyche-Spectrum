
const hamburger = document.getElementById('hamburger');
const sideMenu = document.getElementById('side-menu');
const closeBtn = document.getElementById('close-btn');

hamburger.addEventListener('click', () => {
  sideMenu.style.right = '0';
});

closeBtn.addEventListener('click', () => {
  sideMenu.style.right = '-100%';
});


