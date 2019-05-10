import { fromEvent, interval, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

export class Slider {
    private readonly sliderDestroy$ = new Subject();
    private readonly target: HTMLElement;
    private readonly arrow: NodeListOf<HTMLElement>;
    private readonly sliderInner: HTMLElement;
    private readonly transitionSpeed = 300;
    private slideWidth: number;
    private currentSlide = 0;
    private allSlides: NodeListOf<HTMLElement>;
    private isAnimating = false;
    private nextSlideInterval$ = interval(5000).pipe(
        filter(() => !document.hidden)
    );

    constructor () {
        this.target = document.querySelector('.slider');
        this.arrow = document.querySelectorAll('.slider__arrow');
        this.target.parentElement.classList.add('slider-wrapper--loaded');
        this.sliderInner = this.target.querySelector('.slider-inner');
        this.init();
    }

    private init () {
        // add clones
        const cloneFirst = this.target.querySelector('.slide:first-child').cloneNode(true);
        const cloneLast = this.target.querySelector('.slide:last-child').cloneNode(true);
        this.sliderInner.appendChild(cloneFirst);
        this.sliderInner.insertBefore(cloneLast, this.sliderInner.firstChild);

        this.gotoSlide(1);
        this.allSlides = this.sliderInner.querySelectorAll('.slide');

        this.sliderInner.style.width = `${this.allSlides.length * 100}%`;
        this.allSlides.forEach(slide => {
            slide.style.width = `${100 / this.allSlides.length}%`;
        });

        this.addEventListeners();
        this.updateDimension();
        this.nextSlideInterval$
            .pipe(takeUntil(this.sliderDestroy$))
            .subscribe(() => this.arrow[1].click()); // right arrow click
    }

    private updateDimension () {
        this.slideWidth = this.target.querySelector('.slide:first-child')['offsetWidth'];
        this.updateInnerLeftPosition();
    }

    private updateInnerLeftPosition () {
        this.sliderInner.style.left = -this.slideWidth * this.currentSlide + 'px';
    }

    private leftArrowClick () {
        if (this.currentSlide == 1) {
            this.currentSlide = this.allSlides.length - 1;
            this.updateInnerLeftPosition();
        }
        setTimeout(() => this.gotoSlide(-1), 20);
    }

    private rightArrowClick () {
        if (this.currentSlide === this.allSlides.length - 2) {
            this.currentSlide = 0;
            this.updateInnerLeftPosition();
        }
        setTimeout(() => this.gotoSlide(1), 20);
    }

    private addEventListeners () {
        fromEvent(window, 'resize')
            .pipe(takeUntil(this.sliderDestroy$))
            .subscribe(() => this.updateDimension());

        fromEvent(this.arrow, 'click').pipe(
            filter(() => !this.isAnimating),
            map(e => e.target['classList'].contains('slider__arrow--left')),
            takeUntil(this.sliderDestroy$)
        )
            .subscribe(isArrowLeft => isArrowLeft ? this.leftArrowClick() : this.rightArrowClick());
    };

    private gotoSlide (increase: number) {
        this.currentSlide += increase;
        this.sliderInner.style.transition = `left ${this.transitionSpeed / 1000}s`;
        this.updateInnerLeftPosition();
        this.isAnimating = true;
        setTimeout(() => {
            this.sliderInner.style.transition = '';
            this.isAnimating = false;
        }, this.transitionSpeed);
    };

    destroy () {
        this.sliderDestroy$.next();
        this.sliderDestroy$.complete();
    }
}
