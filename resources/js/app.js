import.meta.glob(['../images/**', '../fonts/**']);
import './blocks/team/TeamStyles.module.css';
import './blocks/post/PostStyles.module.css';

const toggleMenuButton = document.querySelector('#menu-toggle-button');
const containerMenu = document.querySelector('.nav-primary-mobile');
const header = document.querySelector('#headbanner');

toggleMenuButton.addEventListener('click', () => {
  header.classList.toggle('active');
});

function updateHeaderBackground() {
  if (window.scrollY > 0) {
    // User has scrolled - add black background
    header.classList.add('scrolled');
  } else {
    // User is at top - remove black background
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateHeaderBackground);

window.addEventListener('load', updateHeaderBackground);
