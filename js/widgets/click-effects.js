export class ClickSpreadCircle {
   constructor(el) {
      this.el = el;
      this.overlay = document.createElement('span');
      this.circle = document.createElement('span');
      this.x;
      this.y;

      this.init();
   }

   init() {
      if ( getComputedStyle(this.el).getPropertyValue('position') === 'static' ) {
         this.el.style.position = 'relative';
      }
      this.overlay.classList.add('click-spread-circle__overlay');
      this.circle.classList.add('click-spread-circle__overlay__circle');
      this.el.appendChild(this.overlay);
      this.overlay.appendChild(this.circle);
      this.setEvents();
   }

   animateCircle() {
      this.circle.animate(
         [
            {
               display: 'block',
               transform: `translate(-50%, -50%) scale(.4)`,
               opacity: 1,
            },
            {
               display: 'block',
               transform: `translate(-50%, -50%) scale(2)`,
               opacity: 0,
            }
         ],
         {
            duration: 400,
            delay: 0,
            fill: 'backwards'
         }
      )
   }

   setEvents() {
      this.el.addEventListener('click', e => {
         this.x = e.clientX - this.el.getBoundingClientRect().left;
         this.y = e.clientY - this.el.getBoundingClientRect().top;
         this.circle.style.setProperty('--circle-left', `${100 * this.x /this. el.offsetWidth}%`);
         this.circle.style.setProperty('--circle-top', `${100 * this.y / this.el.offsetHeight}%`);
         this.animateCircle();
      })
   }
}