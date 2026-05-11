document.addEventListener('DOMContentLoaded', () => {

    initCarousels();
    initProjectButtons();
    initSidebar();
    initInfoCards();

});

/*MOBILE CHECK*/

function isMobile() {
    return window.innerWidth <= 430;
}

/*CAROUSELS*/

function initCarousels() {

    initCarousel(
        '.projects-slider',
        '.projects-list',
        '.project-card'
    );

    initCarousel(
        '.achievements-slider',
        '.achievements-list',
        '.achievements-card'
    );

}

function initCarousel(wrapperSelector, listSelector, cardSelector) {

    const wrapper = document.querySelector(wrapperSelector);
    const slider = document.querySelector(listSelector);
    const cards = document.querySelectorAll(cardSelector);

    if (!wrapper || !slider || !cards.length) return;

    let currentIndex = 0;
    let startX = 0;

    function moveTo(index) {

        if (isMobile()) return;

        const card = cards[index];

        if (!card) return;

        if (index === 0) {

            slider.style.transform = 'translateX(0px)';

        } else if (index === cards.length - 1) {

            const maxTranslate =
                slider.scrollWidth - wrapper.offsetWidth;

            slider.style.transform =
                `translateX(-${maxTranslate}px)`;

        } else {

            const cardRect = card.getBoundingClientRect();
            const wrapperRect = wrapper.getBoundingClientRect();

            const cardCenter =
                cardRect.left + cardRect.width / 2;

            const wrapperCenter =
                wrapperRect.left + wrapperRect.width / 2;

            const diff = cardCenter - wrapperCenter;

            const matrix =
                new DOMMatrix(getComputedStyle(slider).transform);

            const currentX = matrix.m41;

            slider.style.transform =
                `translateX(${currentX - diff}px)`;

        }

        cards.forEach(card =>
            card.classList.remove('active')
        );

        card.classList.add('active');

        currentIndex = index;
    }

    cards.forEach((card, index) => {

        card.addEventListener('click', () => {

            if (isMobile()) return;

            moveTo(index);

        });

    });

    wrapper.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });

    wrapper.addEventListener('touchend', e => {

        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;

        if (Math.abs(diff) < 50) return;

        if (diff > 0 && currentIndex < cards.length - 1) {
            moveTo(currentIndex + 1);
        }

        if (diff < 0 && currentIndex > 0) {
            moveTo(currentIndex - 1);
        }

    });

    window.addEventListener('resize', () => {

        if (isMobile()) {

            slider.style.transform = 'none';

        } else {

            moveTo(currentIndex);

        }

    });

    moveTo(0);

}

/*PROJECT BUTTONS*/

function initProjectButtons() {

    const buttons =
        document.querySelectorAll('.project-card_btn');

    buttons.forEach(button => {

        const card = button.closest('.project-card');

        if (!card) return;

        button.addEventListener('mousedown', () => {
            card.classList.add('no-click-anim');
        });

        ['mouseup', 'mouseleave'].forEach(event => {

            button.addEventListener(event, () => {
                card.classList.remove('no-click-anim');
            });

        });

        button.addEventListener('click', e => {
            e.stopPropagation();
        });

    });

}

/*SIDEBAR*/

function initSidebar() {

    const header =
        document.querySelector('.mobile-header');

    const sidebarWrapper =
        document.querySelector('.sidebar-wrapper');

    if (!header || !sidebarWrapper) return;

    header.addEventListener('click', () => {
        sidebarWrapper.classList.toggle('active');
    });

}

/*INFO CARDS*/

function initInfoCards() {

    const buttons =
        document.querySelectorAll('.info-btn');

    buttons.forEach(button => {

        button.addEventListener('click', () => {

            const card =
                button.closest('.info-card');

            const about =
                card?.querySelector('.info-about');

            if (!card || !about) return;

            const isActive =
                card.classList.toggle('active');

            about.style.maxHeight = isActive
                ? `${about.scrollHeight}px`
                : '0px';

            button.childNodes[0].textContent =
                isActive
                    ? 'Скрыть'
                    : 'Подробнее';

        });

    });

}