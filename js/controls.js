'use strict';

import {
    changeLang
} from './lang.js';

import {
    toggleVolume
} from './play.js';

var lang = document.querySelector('.controls__lang-btn');
var volume = document.querySelector('.controls__volume-btn');

export function initControls() {
    volume.addEventListener('click', () => {
        volume.classList.toggle('controls__volume-btn--mute');
        toggleVolume();
    });

    lang.addEventListener('click', () => {
        lang.classList.toggle('controls__lang-btn--en');
        changeLang();
    });
};