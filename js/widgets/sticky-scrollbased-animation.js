export class StickyScrollAnimated {
   constructor(container, subject, keyframes, scrollHeight) {
       // keyframes: [ [keyframes1], [keyframes2], ... ]
       this.container = container;
       this.subject = subject;
       this.items = this.container.querySelectorAll('.sticky-scroll-animated-cont__inner__item__animated');
       this.itemOptions = [];
       this.keyframes = keyframes;
       this.scrollHeight = scrollHeight;
       this.init = this.init.bind(this);
       this.setContainerHeight = this.setContainerHeight.bind(this);
       this.animate = this.animate.bind(this);

       this.init();
       this.animate();
   }

   setContainerHeight() {
       this.container.style.setProperty('--sticky-animateds-cont-height', `${this.items.length * window.innerHeight + window.innerHeight}px`)
   }

   init() {
       this.setContainerHeight();
       this.items.forEach((item, i) => {
           // we push an object for each one of the items, th item, its keyframes and its offsets
           // When the height of the element is more than 100vh, each 100% is 100vh of the element, which crossed the viewport
           let itemStartPercent = 100 + (i * 100);
           let itemEndPercent = itemStartPercent + 100;
           
           this.itemOptions.push(
               {
                   el: item,
                   keyframes: this.keyframes[i],
                   timing: {
                       fill: 'both',
                       timeline: new ViewTimeline( {subject: this.subject} ),
                       rangeStart: { rangeName: 'entry', offset: CSS.percent(itemStartPercent)},
                       rangeEnd: { rangeName: 'entry', offset: CSS.percent(itemEndPercent)},
                   }
               }
           )
       })
   }

   animate() {
       this.items.forEach((item, i) => {
           item.animate(
               this.itemOptions[i].keyframes,
               this.itemOptions[i].timing
           )
       })
   }
}