import.meta.glob(['../images/**', '../fonts/**']);

const toggleMenuButton = document.querySelector('#menu-toggle-button');
const containerMenu = document.querySelector('.nav-primary-mobile');

toggleMenuButton.addEventListener('click', () => {
  containerMenu.classList.toggle('active');
});
