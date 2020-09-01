(function() {

  let navButton = document.querySelector('#nav-menu-button');
  let navUl = document.querySelector('.nav-ul');

  function toggleMobileMenu() {
    navUl.classList.toggle('hide-ul');
  }

  navButton.onclick = toggleMobileMenu;
}());