document.addEventListener("DOMContentLoaded", () => {
    const sound = document.querySelector('.muted');
    sound.addEventListener('click', () => {
        sound.classList.toggle('off');
    });

    const toggleActiveElement = (allElements) => (activeElement) => {
        if (allElements?.length && activeElement !== undefined) {
            allElements.forEach((el) => {
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
    let currSlide = 0;
    const heroesContainer = document.querySelector('.hero-slider__list'),
        heroes = document.querySelectorAll('.hero-slider__item'),
        heroArrowNext = document.querySelector('.hero-slider__btn_next'),
        heroArrowPrev = document.querySelector('.hero-slider__btn_prev');

    const toggleActiveHero = toggleActiveElement(heroes);

    toggleActiveHero(0);

    heroArrowNext.addEventListener('click', () => {
        currSlide === heroes.length - 1 ? (currSlide = 0) : currSlide++;
        toggleActiveHero(currSlide);
        heroesContainer.style.transform = `translateX(-${(currSlide * 100) / 3}%)`;
    });

    heroArrowPrev.addEventListener('click', () => {
        currSlide === 0 ? currSlide = heroes.length - 1 : currSlide--;
        toggleActiveHero(currSlide);
        heroesContainer.style.transform = `translateX(-${(currSlide * 100) / 3}%)`;
    });
})