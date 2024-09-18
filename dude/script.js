document.addEventListener("DOMContentLoaded", () => {
    const sound = document.querySelector('.muted');
    sound.addEventListener('click', () => {
        sound.classList.toggle('off');
    });

    const toggleActiveElement = (allElements) => (activeElement) => {
        if (activeElement !== undefined) {
            [...allElements].forEach((el) => {
                if (el.classList.contains('active')) {
                    el.classList.remove('active');
                }
            });
            allElements[activeElement].classList.add('active');
        }
    };

    //screen slider
    let currScreen = 0;
    const nextScreenBtn = document.querySelectorAll('.btn_agree');
    const screens = document.querySelectorAll('.screen');

    const toggleActiveScreen = toggleActiveElement(screens);

    toggleActiveScreen(0);

    nextScreenBtn.forEach((btn, i) => {
        btn.addEventListener('click', () => {
            currScreen === screens.length - 1 ? (currScreen = 0) : currScreen++;
            toggleActiveScreen(currScreen);
        });
    });

    //hero slider
    const heroesContainer = document.querySelector('.hero-slider__list'),
        sliderWrapper = document.querySelector('.hero-slider'),
        heroes = document.getElementsByClassName('hero-slider__item'),
        heroArrowNext = document.querySelector('.hero-slider__btn_next'),
        heroArrowPrev = document.querySelector('.hero-slider__btn_prev');

    const toggleActiveHero = toggleActiveElement(heroes);

    heroesContainer.style.transform = `translateX(-${100 / heroes.length}%)`;
    toggleActiveHero(1);

    const moveSlide = (direction) => {
        if (direction === 'next') {
            heroesContainer.style.transition = 'transform 0.2s ease';
            heroesContainer.style.transform = `translateX(-${100 * 2 / heroes.length}%)`;

            setTimeout(() => {
                heroesContainer.appendChild(heroes[0]); 
                heroesContainer.style.transition = 'none';
                heroesContainer.style.transform = `translateX(-${100 / heroes.length}%)`;
                toggleActiveHero(1);
            }, 200);
        }
        if (direction === 'prev') {
            heroesContainer.style.transition = 'transform 0.2s ease';
            heroesContainer.style.transform = 'translateX(0%)';
             
            setTimeout(() => {
                heroesContainer.insertBefore(heroes[heroes.length - 1], heroes[0]);
                heroesContainer.style.transition = 'none';
                heroesContainer.style.transform = `translateX(-${(100) / heroes.length}%)`;
                toggleActiveHero(1);
            }, 200);
        }
    };

    heroArrowNext.addEventListener('click', () => moveSlide('next'));
    heroArrowPrev.addEventListener('click', () => moveSlide('prev'));

    let startX, distX;
    const minDistance = 50;

    sliderWrapper.addEventListener('touchstart', function (e) {
        const touchObj = e.changedTouches[0];
        startX = touchObj.pageX;
    });

    sliderWrapper.addEventListener('touchend', function (e) {
        const touchObj = e.changedTouches[0];
        distX = touchObj.pageX - startX;
        
        if (Math.abs(distX) >= minDistance) {
            distX < 0 ? moveSlide('next') : moveSlide('prev');
        }
    });

    sliderWrapper.addEventListener('mousedown', function (e) {
        startX = e.pageX;
    });

    sliderWrapper.addEventListener('mouseup', function (e) {
        distX = e.pageX - startX;
        if (Math.abs(distX) >= minDistance) {
            distX < 0 ? moveSlide('next') : moveSlide('prev');
        } 
    });

})