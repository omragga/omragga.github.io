'use strict';

var aboutBtn = document.querySelector('.about__expanded-btn');
var aboutText = document.querySelector('.about__text-wrapper');
var timeOutId = undefined;
var timeOut = 30000;

export function aboutAddListener() {
    if (aboutBtn) {
        aboutBtn.addEventListener('click', (evt) => {
            evt.preventDefault();
            aboutText.classList.toggle('about__text-wrapper--active');
            clearTimeout(timeOutId);
            timeoutId = setTimeout(() => {
                aboutText.classList.remove('about__text-wrapper--active');
            }, timeOut);
        });
    }
    document.addEventListener('DOMContentLoaded', () => {
        timeOutId = setTimeout(() => {
            aboutText.classList.remove('about__text-wrapper--active');
            aboutBtn.classList.add('about__expanded-btn--active');
        }, timeOut);
    })
};