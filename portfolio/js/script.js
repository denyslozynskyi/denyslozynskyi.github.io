document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    const menuClose = document.querySelector('.menu__close');
    const progressItems = Array.from(document.querySelectorAll('.progress-item'));

    hamburger.addEventListener('click', () => {
        menu.classList.add('active');
    });

    menuClose.addEventListener('click', () => {
        menu.classList.remove('active');
    });

    progressItems.forEach( (item) => {
        let percents = item.querySelector('.progress__percents').innerHTML;
        let progressLine = item.querySelector('.progress-item__progress');
        
        progressLine.style.width = percents;
    });
});