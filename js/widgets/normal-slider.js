export class NormalSlider {
   constructor(slider) {
      this.slider = slider;
      this.sliderContext = this.slider.closest('.slider-context');
      this.sliderInner = this.slider.querySelector('.slider__inner');
      this.sliderItems = Array.from(this.slider.querySelectorAll('.slider__inner__item'));
      this.itemsCount;
      this.sliderProgress;
      this.slideDuration;
      this.animationTimeout;
      this.translateUnit;
      this.activeIndex;
      this.mainDirection;
      this.crntTranslateX;
      this.sliderTimeout;
      this.isSliding;
      this.sliderExtControls = [];
      this.sliderExtActivables = [];
      this.dotBtns = [];
      this.auto;
      this.initSlider = this.initSlider.bind(this);
      this.animateSlider = this.animateSlider.bind(this);
      this.setEvents = this.setEvents.bind(this);
      this.setActiveDotBtn = this.setActiveDotBtn.bind(this);

      this.initSlider();

   }

   initSlider() {
      this.slider.setAttribute('data-animated', true);
      const duplicatedItem = this.sliderItems[0].cloneNode(true);
      this.sliderInner.appendChild( duplicatedItem );
      this.sliderItems.push(duplicatedItem);
      this.itemsCount = this.sliderItems.length;
      this.slideDuration = +this.slider.getAttribute('data-duration') || 1000;
      this.animationTimeout = +this.slider.getAttribute('data-timeout') || 2000;
      this.translateUnit = 100 / (this.itemsCount);
      // let wholeTranslateXAmount = (itemsCount - 1) * translateUnit;
      this.activeIndex = 0;
      this.mainDirection = this.slider.getAttribute('data-direction') || 'l';
      this.crntTranslateX = (this.mainDirection === 'l') ? 0 : -100;
      this.isSliding = false;

      this.sliderInner.style.transition = `transform ${this.slideDuration}ms`;

      // Preventing unwanted drag
      this.slider.setAttribute('draggable', false);
      this.slider.ondragstart = () => {return false};
      this.sliderInner.setAttribute('draggable', false);
      this.sliderInner.ondragstart = () => {return false};
      this.sliderItems.forEach(item => {
         item.setAttribute('draggable', false);
         item.ondragstart = () => {return false};
         item.querySelector('img').setAttribute('draggable', false);
         item.querySelector('img').ondragstart = () => {return false};
      })
      
      // external controls
      if (this.sliderContext) {
         this.sliderExtActivables = this.sliderContext.querySelectorAll('.slider-ext-activable');
         this.sliderExtControls = this.sliderContext.querySelectorAll('.slider-ext-control');
         this.sliderExtControls.forEach(controler => {
            controler.addEventListener('click', e => {
               const index = +controler.getAttribute('data-index');
               if (this.isSliding || index === this.activeIndex) return;
               clearTimeout(this.sliderTimeout);
               this.animateSlider(index);
               (accordionBtn.getAttribute('aria-expanded') === 'false') ? accordionBtn.setAttribute('aria-expanded', true) : accordionBtn.setAttribute('aria-expanded', false) ;
            })
         })
         // slider progress
         if (this.sliderContext.querySelector('.slider-progress')) {
            this.sliderProgress = this.sliderContext.querySelector('.slider-progress');
            this.sliderProgress.style.setProperty('--slider-progress-dur', `${this.animationTimeout}ms`);
         }
      }

      if (this.slider.hasAttribute('data-autoplay')) {
         this.auto = true;
         const prevIndex = (this.activeIndex - 1 + this.itemsCount) % this.itemsCount;
         const nextIndex = (this.activeIndex + 1) % (this.itemsCount);
         this.animateSlider((this.mainDirection === 'l') ? nextIndex : prevIndex);
      } else {
         this.auto = false;
      }

      if (this.slider.getAttribute('data-controls') === 'all') {
         createArrowButtons.call(this);
         createDotButtons.call(this, this.itemsCount - 1);
      } else if (this.slider.getAttribute('data-controls') === 'arrows') {
         createArrowButtons.call(this);
      } else if (this.slider.getAttribute('data-controls') === 'dots') {
         createDotButtons.call(this, this.itemsCount - 1);
      }

      

      function createArrowButtons() {
         const prevBtn = document.createElement('button');
         prevBtn.setAttribute('type', 'button');
         prevBtn.classList.add('slider__arrow-btn', 'slider__arrow-btn--prev');
         const prevIcon = document.querySelector('template').content.querySelector('.slider__arrow-btn__icon--prev').cloneNode(true);
         prevBtn.appendChild(prevIcon);
         const nextBtn = document.createElement('button');
         nextBtn.setAttribute('type', 'button');
         nextBtn.classList.add('slider__arrow-btn', 'slider__arrow-btn--next');
         const nextIcon = document.querySelector('template').content.querySelector('.slider__arrow-btn__icon--next').cloneNode(true);
         nextBtn.appendChild(nextIcon);
         this.slider.append(prevBtn, nextBtn);
      }

      function createDotButtons(num) {
         const dotBtnsCont = document.createElement('div');
         dotBtnsCont.classList.add('slider__dot-btns');
         for (let i = 0; i < num; i++) {
            const dotBtn = document.createElement('button');
            dotBtn.setAttribute('data-index', i);
            dotBtn.classList.add('slider__dot-btn');
            dotBtnsCont.appendChild(dotBtn);
            this.dotBtns.push(dotBtn);
         }
         this.slider.appendChild(dotBtnsCont);
         this.setActiveDotBtn(this.activeIndex);
      }

      this.setEvents();
   }


   setActiveDotBtn(index) {
      this.dotBtns.forEach(btn => {
         if (btn.getAttribute('data-index') == index) {
            btn.classList.add('active');
         } else {
            btn.classList.remove('active');
         }
      })
   }

   setActiveExtControl(index) {
      this.sliderExtActivables.forEach((el, i) => {
         if (index === i) {
            el.classList.add('active');
         } else {
            el.classList.remove('active');
         }
      })
   }

   animateSlider(desIndex) {
      if (this.isSliding || this.activeIndex === desIndex) return;
      this.isSliding = true;
      clearTimeout(this.sliderTimeout);
      let translationDistance = -1 * (desIndex - this.activeIndex) * this.translateUnit;

      const dir = ((desIndex - this.activeIndex) > 0) ? 'l' : 'r' ;

      if (this.sliderProgress) {
         const sliderProgressInner = this.sliderProgress.querySelector('.points__accordion__progress-cont__progressbar__inner');
         sliderProgressInner.animate(
            {
               width: ['0%', '100%']
            },
            {
               delay: this.slideDuration,
               duration: this.animationTimeout,
               easing: 'linear',
               fill: 'forwards'
            }
         )
      }

      if (this.activeIndex === 0 && desIndex === (this.itemsCount - 1) ) {
         this.sliderInner.style.transition = `transform 0s`;
         this.sliderInner.style.transform = `translateX(-${100 - this.translateUnit}%)`;
         // crntTranslateX = -100 + translateUnit;
         translationDistance = this.translateUnit;
         this.crntTranslateX = -(100 - this.translateUnit);
         this.activeIndex = this.itemsCount - 1;
         desIndex = this.itemsCount - 2;
      }

      if ( this.activeIndex === (this.itemsCount - 1) && desIndex === 0 ) {
         this.sliderInner.style.transition = `transform 0s`;
         this.sliderInner.style.transform = `translateX(0%)`;
         this.crntTranslateX = 0;
         translationDistance = -1 * this.translateUnit;
         this.activeIndex = 0;
         desIndex = 1;
      }

      setTimeout(() => {
         this.crntTranslateX = this.crntTranslateX + translationDistance;
         this.sliderInner.style.transition = `transform ${this.slideDuration}ms ease-in-out`;
         this.sliderInner.style.transform = `translateX(${this.crntTranslateX}%)`;  
         this.activeIndex = desIndex;
         
         this.setActiveDotBtn(this.activeIndex % (this.itemsCount - 1));
         if (this.sliderExtControls) {
            this.setActiveExtControl(this.activeIndex % (this.itemsCount - 1));
         }

         this.sliderItems.forEach((item, i) => {
            if (i === this.activeIndex) {
               item.classList.add('active');
            } else {
               item.classList.remove('active');
            }
         })
         
         setTimeout(() => {
            this.isSliding = false;
         }, this.slideDuration)
      }, 0)


      if ( dir === 'l' && desIndex === (this.itemsCount - 1) ) {
         setTimeout(() => {
            clearTimeout(this.sliderTimeout);
            this.sliderInner.style.transition = `transform 0s`;
            this.sliderInner.style.transform = `translateX(0%)`;
            this.crntTranslateX = 0;
            this.activeIndex = 0;
         }, this.slideDuration)
      }

      if ( dir === 'r' && desIndex === 0 ) {
         setTimeout(() => {
            clearTimeout(this.sliderTimeout);
            this.sliderInner.style.transition = `transform 0s`;
            this.sliderInner.style.transform = `translateX(-${100 - this.translateUnit}%)`;
            this.crntTranslateX = -100 + this.translateUnit;
            this.activeIndex = this.itemsCount - 1;
         }, this.slideDuration)
      }

      if (this.auto) {
         setTimeout(() => {
            const prevIndex = (this.activeIndex - 1 + this.itemsCount) % this.itemsCount;
            const nextIndex = (this.activeIndex + 1) % (this.itemsCount);
            this.sliderTimeout = setTimeout(this.animateSlider.bind(this, (this.mainDirection === 'l') ? nextIndex : prevIndex), this.animationTimeout)
         }, this.slideDuration);
      }
   }

   setEvents() {
      // slider button controls
      document.addEventListener('click', e => {
         if (e.target.closest('.slider__arrow-btn--prev')) {
            if (this.isSliding) return;
            clearTimeout(this.sliderTimeout);
            const index = (this.activeIndex - 1 + this.itemsCount) % this.itemsCount;
            this.animateSlider(index);
         }

         if (e.target.closest('.slider__arrow-btn--next')) {
            if (this.isSliding) return;
            clearTimeout(this.sliderTimeout);
            const index = (this.activeIndex + 1) % (this.itemsCount);
            this.animateSlider(index);
         }

         if (e.target.closest('.slider__dot-btn')) {
            if (this.isSliding) return;
            clearTimeout(this.sliderTimeout);
            const index = +e.target.closest('.slider__dot-btn').getAttribute('data-index');
            this.animateSlider(index);
         }
      })

      // slider drag controls
      let isPointerDown = false;
      let pointerLastX;
      let pointerXDiff;
      let canSlide = true;
      this.slider.addEventListener('mousedown', (e) => {
         isPointerDown = true;
         pointerLastX = e.pageX - this.slider.offsetLeft;
      })
      this.slider.addEventListener('mouseup', (e) => {
         isPointerDown = false;
         canSlide = true;
      })
      this.slider.addEventListener('mouseout', (e) => {
         isPointerDown = false;
         canSlide = true;
      })
      this.slider.addEventListener('mousemove', (e) => {
         if (!isPointerDown) return;
         let crntX = e.pageX - slider.offsetLeft;
         pointerXDiff = crntX - pointerLastX;
         if (Math.abs(pointerXDiff) > 200 && canSlide) {
            canSlide = false;
            const index = (pointerXDiff < 0) ? (this.activeIndex + 1) % (this.itemsCount) : (this.activeIndex - 1 + this.itemsCount) % this.itemsCount;
            clearTimeout(this.sliderTimeout);
            this.animateSlider(index);
         }
      })
      this.slider.addEventListener('touchstart', (e) => {
         isPointerDown = true;
         pointerLastX = e.touches[0].pageX - this.slider.offsetLeft;
      })
      this.slider.addEventListener('touchend', (e) => {
         isPointerDown = false;
         canSlide = true;
      })
      this.slider.addEventListener('touchmove', (e) => {
         if (!isPointerDown) return;
         let crntX = e.touches[0].pageX - this.slider.offsetLeft;
         pointerXDiff = crntX - pointerLastX;
         if (Math.abs(pointerXDiff) > 200 && canSlide) {
            canSlide = false;
            const index = (pointerXDiff < 0) ? (this.activeIndex + 1) % (this.itemsCount) : (this.activeIndex - 1 + this.itemsCount) % this.itemsCount;
            clearTimeout(this.sliderTimeout);
            this.animateSlider(index);
         }
      })
   }
}