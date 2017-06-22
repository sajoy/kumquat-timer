'use strict';

function Timer ( name, minutes, seconds ) {
    this.name = name || this.randomName();
    this.minutes = twoPlaces( minutes );
    this.seconds = twoPlaces( seconds );
    this.totalTime = parseInt( this.minutes ) * 60 + parseInt( this.seconds );
}

Timer.all = [];
Timer.current = null;

Timer.prototype.clock = document.getElementById( 'countdown' );

Timer.prototype.randomName = function () {
    var words = ['art', 'bee', 'corner', 'danger', 'eagle',
        'frequent', 'glue', 'happy', 'monkey'];

    var max = words.length - 1;
    return words[randomInt(0, max)] + '-' 
           + words[randomInt(0, max)] + '-' 
           + words[randomInt(0, max)];
}

Timer.prototype.save = function () {
    Timer.all.push( this );
    localStorage.timers = JSON.stringify( Timer.all );
}

Timer.prototype.start = function () {
    
    document.getElementById( 'modal' ).classList.add( 'show' );
    console.log( this.name , ' is starting!' );

    this.clock.innerHTML = '<span id="minutes">' 
                           + this.minutes
                           + '</span>:<span>' + this.seconds + '</span>';
    
    this.countdown();
    Timer.current = this;
}

Timer.prototype.countdown = function () {
    var currentTimer = this;
    var runTime = currentTimer.totalTime;
    var clock = currentTimer.clock;

    this.currentTime = setInterval( function () {
        runTime = runTime - 1;
        if ( runTime === 0 ) { currentTimer.complete(); }

        var mins = Math.floor( runTime/60 );
        var seconds = runTime%60;

        var secondsString = seconds === 60 ? '00' : twoPlaces( seconds );
        var minutesString = twoPlaces( mins );

        clock.innerHTML = '<span id="minutes">' + minutesString + 
                               '</span>:<span>' + secondsString + '</span>';

    }, 1000 );
}

Timer.prototype.complete = function () {
    window.open( 'https://media.giphy.com/media/5Ff4rP8zrUNSo/giphy.gif' );
    this.stop();
}

Timer.prototype.stop = function () {
    console.log( this.name , ' is over!' );
    clearInterval( this.currentTime );
}

Timer.prototype.end = function () {
    Timer.current = null;
}

Timer.prototype.addToDom = function () {
    var timerLi = document.createElement( 'li' );

    var nameHeader = document.createElement( 'h2' );
    nameHeader.classList.add( 'clock' );
    nameHeader.innerText = twoPlaces( this.minutes ) + ':' + twoPlaces( this.seconds );

    var startBtn = document.createElement( 'button' );
    startBtn.setAttribute( 'type', 'submit' );
    startBtn.setAttribute( 'title', 'start timer' );
    startBtn.innerHTML = randEmoji();
    startBtn.addEventListener( 'click', this.start.bind( this ) );

    timerLi.appendChild( nameHeader );
    timerLi.appendChild( startBtn );
    timersUl.appendChild( timerLi );
}





var timersUl = document.getElementById( 'timers' );
var collectingFruit;

if ( localStorage.timers ) {
    document.getElementById( 'empty-state' ).classList.remove( 'show' );

    var timers = JSON.parse( localStorage.timers );
    timers.forEach( function ( timer ) {
        var timerObj = new Timer( timer.name, timer.minutes, timer.seconds )
        Timer.all.push( timerObj );
        timerObj.addToDom();
    });
}

var form = document.getElementsByTagName( 'form' )[0];
form.addEventListener( 'submit', function ( event ) {
    event.preventDefault();
    var minInput = document.getElementById( 'minutes' );
    var secInput = document.getElementById( 'seconds' );
    var minutes = minInput.value;
    var seconds = secInput.value;
    
    if ( !isValidTime( minutes, seconds ) ) { 
        alert( 'Try again, buster.' );
        return;
    }

    var timer = new Timer( name, minutes, seconds );
    timer.save();
    timer.addToDom();

    minInput.value = 'XX';
    secInput.value = 'XX';
    secInput.blur();
    minInput.blur();
});

var modalCloseBtn = document.getElementById( 'close-modal' );
modalCloseBtn.addEventListener( 'click', function ( event ) {
    document.getElementById( 'modal' ).classList.remove( 'show' );
    document.getElementById( 'countdown' ).innerHTML = '';

    if ( Timer.current ) { 
        Timer.current.stop();
        Timer.current.end();
    }
});

var restartBtn = document.getElementById( 'restart-timer' );
restartBtn.addEventListener( 'click', function ( event ) {
    if ( Timer.current ) { 
        Timer.current.stop();
        Timer.current.start();
    }
});

var kumquat = document.getElementById( 'surprise' );
kumquat.addEventListener( 'click', function ( event ) {
    if ( collectingFruit ) {
        clearInterval( collectingFruit );
        collectingFruit = false;
    } else {
        surprise();
    }
});





function randomInt (min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}

function twoPlaces ( num ) {
    var numStr = num.toString();
    return numStr.length === 2 ? numStr : '0' + numStr;
}

function randEmoji () {
    var emojis = [ '🍉', '🥝', '🍍' ];
    return emojis[randomInt(0,2)];
}

function isValidTime ( minutes, seconds ) {
    var minNum = parseInt( minutes ); 
    var secNum = parseInt( seconds );

    var overZero = minNum + secNum !== 0;
    var underSixty = secNum < 60;

    return overZero && underSixty;
}

function surprise () {
    collectingFruit = setInterval( function () {
        var fruitbowl = document.getElementById( 'fruit-bowl' );
        fruitbowl.classList.add( 'show' );

        var newEle = document.createElement( 'div' );
        newEle.innerHTML = randEmoji();
        newEle.style.left = randomInt(0, window.innerWidth) + 'px';

        fruitbowl.appendChild( newEle );
    }, 1000 );
}