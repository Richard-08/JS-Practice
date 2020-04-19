/* Elements */
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.previous')

/**
 * * <-----------------Slider Class------------------------> 
*/

class Slider {
    constructor(slides, delay, interval) {
        this.slides = slides;
        this.delay = delay;
        this.interval = interval;
        this.sliderInterval;
    }

    nextSlide() {
        setTimeout(() => {
            const activeSlide = document.querySelector('.slide.active');
            activeSlide.classList.toggle('active');

            if (activeSlide.nextElementSibling) {
                activeSlide.nextElementSibling.classList.toggle('active');
            } else {
                this.slides[0].classList.toggle('active');
            }
        }, this.delay);
    }

    prevSlide() {
        setTimeout(() => {
            const activeSlide = document.querySelector('.slide.active');
            activeSlide.classList.toggle('active');

            if (activeSlide.previousElementSibling) {
                activeSlide.previousElementSibling.classList.toggle('active');
            } else {
                this.slides[this.slides.length - 1].classList.toggle('active');
            }
        }, this.delay);
    }

    startShow() {
        this.sliderInterval = setInterval(() => {
            this.nextSlide();
        }, this.interval);
    }

    clearSliderInterval() {
        clearInterval(this.sliderInterval);
    }
}

/**
 * * =============== New slider ====================
 */

const mySlider = new Slider(slides, 500, 5000);

mySlider.startShow();


/**
 * * =============== Slider control buttons listener ====================
 */

nextBtn.addEventListener('click', () => {
    mySlider.nextSlide();
    mySlider.clearSliderInterval();
    mySlider.startShow();
});

previousBtn.addEventListener('click', () => {
    mySlider.prevSlide();
    mySlider.clearSliderInterval();
    mySlider.startShow();
});