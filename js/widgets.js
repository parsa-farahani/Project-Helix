import 'https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js';
import * as clickEffect from './widgets/click-effects.js';
import {NormalSlider} from './widgets/normal-slider.js';
import {StickyScrollAnimated} from './widgets/sticky-scrollbased-animation.js';

// click effects
const clickSpreadCircles = document.querySelectorAll('.click-spread-circle');
clickSpreadCircles.forEach(el => {
   new clickEffect.ClickSpreadCircle(el);
})

// sliders
const sliders = document.querySelectorAll('.slider');
sliders.forEach(el => {
   new NormalSlider(el);
})

// sticky scrollbased-animation
const stickyScrollAnimateds = document.querySelectorAll('[data-sticky-scroll-animated]');

const stickyScrollAnimatedsKeyframes = [
   [
      // First Item
      [
         {
            opacity: 1,
            transform: 'scale(1)',
         },
         {
            opacity: 0,
            transform: 'scale(.7)',
         },
      ],
      // Second Item
      [
         {
            opacity: 1,
            transform: `translateY(calc(100% + 300px)) scale(.5)`,
         },
         {
            opacity: 1,
            transform: 'translateY(0%) scale(1)',
         },
         {
            opacity: 1,
            transform: 'translateY(0%) scale(1)',
         },
         {
            opacity: 1,
            transform: `translateY(-100%) scale(.5)`,
         },
      ],
      // Third Item
      [
         {
            opacity: 1,
            transform: 'translateX(calc(-100% + -2px))',
         },
         {
            opacity: 1,
            transform: 'translateX(0%)',
         },
         {
            opacity: 1,
            transform: 'translateX(0%)',
         },
      ]
   ],
]

stickyScrollAnimateds.forEach((el, i) => {
   new StickyScrollAnimated(el, el, stickyScrollAnimatedsKeyframes[i], 1000);
})