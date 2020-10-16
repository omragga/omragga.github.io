'use strict';

import {
    toggleTransparentText
} from './audio-info.js';

import {
    getElementsInLang
} from './lang.js';


export function aboutAddObserver() {
    var options = {
        rootMargin: '-50%',
        threshold: 0
    }
    var callback = function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                toggleTransparentText();
            }
        });
    };

    var observer = new IntersectionObserver(callback, options);
    var target = getTarget();

    observer.observe(target);
};

function getTarget() {
    var texts = getElementsInLang('.about__text');
    return texts[texts.length - 1];
}