'use strict';
var audio = document.getElementById('audio');
var btnPlay = document.querySelector('.player-btn');
var audioList = {};

class CurrentRaggas {
    constructor() {
        this.time = undefined,
            this.playList = [],
            this.currentTrackIndex = 0,
            this.isTouched = false
    }

    getNextTrack() {
        var currentTrack = this.currentTrackIndex;
        if (currentTrack === this.playList.length - 1) {
            this.currentTrackIndex = 0;
        } else {
            this.currentTrackIndex++;
        }
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
    return AUDIO_SRC + currentRaggas.time + '/' + track;
}

function setExpirationTime(timeEnd) {
    var currentDate = new Date();
    var endDate = new Date(new Date().setHours(timeEnd, 0, 0, 0));
    var expirationTime = endDate.getTime() - currentDate.getTime();
    console.log('Expiration Time(ms): ', expirationTime);
    var timeOut = setTimeout(() => {
        console.log('Im in TimeOut!!!');
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
    if (!currentRaggas.isTouched) audio.src = getAudioTrack();
    audio.play();
    currentRaggas.touched();
}

var onBtnClick = (evt) => {
    evt.preventDefault();

    btnPlay.classList.toggle('player-btn--played');

    btnPlay.classList.contains('player-btn--played') ?
        playRaggas() :
        audio.pause()
};

var onAudioEnded = () => {
    currentRaggas.untouched();
    playRaggas();
};

export function play() {
    btnPlay.addEventListener('click', onBtnClick);
    audio.addEventListener('ended', onAudioEnded)
    fetchAudioList();
};