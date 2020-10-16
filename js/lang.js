'use strict';

var html = document.querySelector('html');

export function getElementsInLang(selector) {
    var lang = html.getAttribute('lang');
    var elements = document.querySelectorAll(selector + '.lang--' + lang);

    if (elements.length > 1) {
        return elements;
    } else {
        return elements[0];
    }
}

export function changeLang() {
    var currentLang = html.getAttribute('lang');
    var lang;

    if (currentLang === 'ru') {
        lang = 'en';
    } else {
        lang = 'ru';
    }

    html.setAttribute('lang', lang);
};