const main = document.querySelector('.main');
// # section 1
const intro = document.querySelector('.intro');
const introGridBg = document.querySelector('.intro__bgs__grid');
// #section 3
const pointsAccordinItems = document.querySelectorAll('.points__accordion-cont__accordion__item');
// section 4
const mobileWrapper = document.querySelector('.mobile-layout__device-cont__mobile-wrapper');
// section 6
const latestProjectsItems = document.querySelectorAll('.latest-projects__list__item__inner');

// const pointsAccordinItems = document.querySelectorAll('.points__accordion-cont__accordion__item');
// intro-grid-bg clip-path move with mouse position
intro.addEventListener('mousemove', e => {
   const x = e.clientX - introGridBg.getBoundingClientRect().left;
   const y = e.clientY - introGridBg.getBoundingClientRect().top;
   introGridBg.style.setProperty('--mouse-x', `${x}px`);
   introGridBg.style.setProperty('--mouse-y', `${y}px`);
})

// sections 'active' state
const sections = document.querySelectorAll('section');

const sectionsObserveroption = {
   root: null,
   rootMargin: "0px 0px -200px",
   threshold: 0.0
}

const observeSections = (entries, observer) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         entry.target.classList.add('active');
      } else {
         entry.target.classList.remove('active');         
      }
   })
}

const observer = new IntersectionObserver(observeSections, sectionsObserveroption);

sections.forEach(el => {
   observer.observe(el);
})

// points accordion controls
document.addEventListener('click', e => {
   const {target} = e;
   if (target.closest('.points__accordion-cont__accordion__item__btn')) {
      const accordionBtn = target.closest('.points__accordion-cont__accordion__item__btn');
      (accordionBtn.getAttribute('aria-expanded') === 'false') ? accordionBtn.setAttribute('aria-expanded', true) : accordionBtn.setAttribute('aria-expanded', false);
      pointsAccordinItems.forEach((item, i) => {
         if (i === +accordionBtn.getAttribute('data-index')) {
            item.classList.toggle('active');
         } else {
            item.classList.remove('active');
         }
      })
   }
   if (target.closest('.process__slideshow-cont__inner__item__animated-1__btn')) {
      console.log('a')
      document.querySelector('.process__slideshow-cont__inner__item__animated-1').classList.toggle('dark');
   }

   // e.stopPropagation();
})

// mobile structure animation
mobileWrapper.animate(
   {
      transform: `translate(-50%, calc(-50% + 100px)) rotateX(50deg) rotateY(20deg) rotateZ(-45deg)`,
   },
   {
      duration: 500,
      fill: "both",
      easing: 'ease',
      timeline: new ViewTimeline(
         {
            subject: mobileWrapper
         }
      ),
      rangeStart: {rangeName: 'entry', offset: CSS.percent(10)},
      rangeEnd: {rangeName: 'entry', offset: CSS.percent(150)},
   }
)

// latest-projects items appearance
latestProjectsItems.forEach(item => {
   observer.observe(item);
})
