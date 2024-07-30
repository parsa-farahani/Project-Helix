// elements
const dockNav = document.querySelector('.header__dock-nav__menu');
const dockNavShrinkBtn = document.querySelector('.header__dock-nav__menu__shrink-btn');
const dockNavUserInfo = dockNav.querySelector('.header__dock-nav__menu__user__user-cont__info-cont');
const dockNavUserLogout = dockNav.querySelector('.header__dock-nav__menu__user__user-cont__logout-cont');
const dockNavSearchInp = dockNav.querySelector('.header__dock-nav__menu__header__search-form__inner__inp');
const dockNavSearchCancelBtn = dockNav.querySelector('.header__dock-nav__menu__header__search-form__inner__btns-cont__cancel-btn');
const dockNavSearchGoBtn = dockNav.querySelector('.header__dock-nav__menu__header__search-form__inner__btns-cont__go-btn');

// * General
// keyboard click
window.addEventListener('keydown', e => {
   if (e.code !== 'Enter') return;
   const {target} = e;
   if (
      target.tabIndex !== -1 &&
      !target.matches('a') &&
      !target.matches('button')
   ) {
      target.click();
   }
})

// * Dock Nav
document.addEventListener('click', e => {
   const {target} = e;

   if (target.closest('.header__dock-nav__mobile-bar__menu-btn')) {
      const closest = target.closest('.header__dock-nav__mobile-bar__menu-btn');
      toggleDockNav(closest);
   }
   if (target.closest('.header__dock-nav__menu__close-btn')) {
      const closest = target.closest('.header__dock-nav__menu__close-btn');
      toggleDockNav(closest);
   }

   if (target.closest('.header__dock-nav__menu__shrink-btn')) {
      toggleDockNavExpansion();
   }
   
   if (target.closest('.header__dock-nav__menu__header__search-form__inner') && !target.closest('button')) {
      if (dockNav.classList.contains('expanded')) return;
      const closest = target.closest('.header__dock-nav__menu__header__search-form__inner');
      toggleDockNavExpansion();
      closest.querySelector('input').focus();
   }

   if (target.closest('.header__dock-nav__menu__header__search-form__inner__btns-cont__cancel-btn')) {
      clearDockNavSearchInp();
   }

   if (target.closest('.back-to-top-btn')) {
      window.scrollTo({
         top: 0,
         behavior: 'smooth'
      });
   }

   if (target.closest('.next-btn')) {
      const btn = target.closest('.next-btn');
      scrollToTarget(btn);
   }

   e.stopPropagation();
})

dockNavSearchInp.addEventListener('focus', e => {
   if (dockNav.classList.contains('expanded')) return;
   const {target} = e;
   toggleDockNavExpansion();
})

dockNavSearchInp.addEventListener('input', e => {
   const {target} = e;
   checkDockNavSearchInpBtns();
})

function toggleDockNav(btn) {
   dockNav.classList.toggle('active');
   (btn.getAttribute('aria-expanded') === 'false') ? btn.setAttribute('aria-expanded', true) : btn.setAttribute('aria-expanded', false);
}

function toggleDockNavExpansion() {
   if (dockNav.classList.contains('expanded')) {
      dockNav.classList.remove('expanded');
      dockNavUserInfo.tabIndex = -1;
      dockNavUserLogout.tabIndex = -1;
      dockNavShrinkBtn.setAttribute('aria-expanded', false);
   } else {
      dockNav.classList.add('expanded');
      dockNavUserInfo.tabIndex = 0;
      dockNavUserLogout.tabIndex = 0;
      dockNavShrinkBtn.setAttribute('aria-expanded', true);
   }
}

function checkDockNavSearchInpBtns() {
   if (
      dockNavSearchInp.value !== "" &&
      dockNavSearchInp.value !== null &&
      dockNavSearchInp.value !== undefined
   ) {
      dockNavSearchCancelBtn.classList.add('active');
      dockNavSearchGoBtn.classList.add('active');
      dockNavSearchCancelBtn.tabIndex = 0;
      dockNavSearchGoBtn.tabIndex = 0;
   } else {
      dockNavSearchCancelBtn.classList.remove('active');
      dockNavSearchGoBtn.classList.remove('active');
      dockNavSearchCancelBtn.tabIndex = -1;
      dockNavSearchGoBtn.tabIndex = -1;
   }
}

function clearDockNavSearchInp() {
   dockNavSearchInp.value = "";
   checkDockNavSearchInpBtns();
}

function scrollToTarget(btn) {
   console.log(btn)
   const target = document.getElementById(btn.getAttribute('data-target'));
   const desScrollY = target.offsetTop;
   window.scrollTo({
      top: desScrollY,
      behavior: 'smooth'
   })
}