'use strict';
import {
    updateAudioInfo,
    wrapAudioInfo,
    toggleInfoActive,
    toggleTextPlayed
} from './audio-info.js';

import {
    debounce
} from './debounce.js';

var audio = document.getElementById('audio');
var btnPlay = document.querySelector('.player-btn');
var audioList = {};
var CLICK_INTERVAL = 500;

class CurrentRaggas {
    constructor() {
        this.time = undefined,
            this.playList = [],
            this.currentTrackIndex = 0,
            this.currentTrack = undefined,
            this.isTouched = false
    }

    getNextTrack() {
        var currentTrack = this.currentTrackIndex;
        if (currentTrack === this.playList.length - 1) {
            this.currentTrackIndex = 0;
        } else {
            this.currentTrackIndex++;
        }

        this.currentTrack = this.playList[currentTrack];

        return this.playList[currentTrack];
    }

    touched() {
        this.isTouched = true;
    }

    untouched() {
        this.isTouched = false;
    }
}
var currentRaggas = new CurrentRaggas();
var AUDIO_SRC = './src/audio/';

function fetchAudioList() {
    fetch('/src/audio/audio.json')
        .then(response => response.json())
        .then(json => {
            audioList = json;
            currentRaggas.playList = getPlayList(new Date());
        });
}

function getAudioTrack() {
    var track = currentRaggas.getNextTrack();
    console.log('Get New Track: ', track)
    return AUDIO_SRC + currentRaggas.time + '/' + track;
}

function setExpirationTime(timeEnd) {
    var currentDate = new Date();
    var endDate = new Date(new Date().setHours(timeEnd, 0, 0, 0));
    var expirationTime = endDate.getTime() - currentDate.getTime();
    console.log('Expiration Time(ms): ', expirationTime);
    var timeOut = setTimeout(() => {
        clearTimeout(timeOut);
        currentRaggas = new CurrentRaggas();
        currentRaggas.playList = getPlayList(new Date());
    }, expirationTime);
};

function getPlayList(date) {
    var hour = date.getHours();
    for (var key in audioList) {
        var [start, end] = key.split('-');
        if (hour >= start && hour < end) {
            currentRaggas.time = key;
            console.log('Current playlist: ', currentRaggas.time)
            setExpirationTime(end);
            return audioList[key].sort(() => Math.random() - 0.5);
        }
    }
};

function playRaggas() {
    if (!currentRaggas.isTouched) {
        audio.src = getAudioTrack();
        wrapAudioInfo(currentRaggas.currentTrack);
    } else {
        toggleInfoActive('PLAY');
    };
    audio.play();
    currentRaggas.touched();
}

var onBtnClick = (evt) => {
    evt.preventDefault();

    btnPlay.classList.toggle('player-btn--played');

    if (btnPlay.classList.contains('player-btn--played')) {
        playRaggas();
    } else {
        audio.pause();
        toggleInfoActive('PAUSE');
    }

    toggleTextPlayed();
};

var onAudioEnded = () => {
    currentRaggas.untouched();
    playRaggas();
};

export function play() {
    btnPlay.addEventListener('click', debounce(onBtnClick, CLICK_INTERVAL));
    audio.addEventListener('ended', onAudioEnded);
    audio.addEventListener('timeupdate', () => {
        updateAudioInfo(audio.currentTime, audio.duration);
    });
    fetchAudioList();
};

export function toggleVolume() {
    if (audio.volume) {
        audio.volume = 0;
    } else {
        audio.volume = 1;
    }
};