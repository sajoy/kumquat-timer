'use strict';

function Timer ( name, length ) {
    this.name = name || this.randomName();
    this.minutes = length / 60000;
    this.totalSeconds = length / 1000;
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
    console.log( this.name , ' is starting!' );

    this.clock.innerHTML = '<span id="minutes">' 
                           + twoPlaces( this.minutes.toString() )
                           + '</span>:<span>' + '00' + '</span>';
    
    this.countdown();
    Timer.current = this;
}

Timer.prototype.countdown = function () {
    var currentTimer = this;
    var runTime = currentTimer.totalSeconds;
    var clock = currentTimer.clock;

    this.currentTime = setInterval( function () {
        if ( runTime === 0 ) { currentTimer.stop(); }

        var mins = Math.floor( runTime/60 );
        var seconds = runTime%60;
        var secondsString = seconds === 60 ? '00' : twoPlaces( seconds.toString() );
        var minutesString = twoPlaces( mins.toString() );

        clock.innerHTML = '<span id="minutes">' + minutesString + 
                               '</span>:<span>' + secondsString + '</span>';

        runTime = runTime - 1;
    }, 1000 );
}

Timer.prototype.stop = function () {
    console.log( this.name , ' is over!' );

    Timer.current = null;
    clearInterval( this.currentTime );
}

function randomInt (min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}

function twoPlaces ( numStr ) {
    return numStr.length === 2 ? numStr : '0' + numStr;
}






var timersUl = document.getElementById( 'timers' );

if ( localStorage.timers ) {
    var timers = JSON.parse( localStorage.timers );
    timers.forEach( function ( timer ) {
        var timerObj = new Timer( timer.name, timer.length )
        Timer.all.push( timerObj );

        var timerLi = document.createElement( 'li' );

        var nameHeader = document.createElement( 'h2' );
        nameHeader.innerText = timer.name + ' (' + timer.minutes + ' minutes)';

        var startBtn = document.createElement( 'button' );
        startBtn.setAttribute( 'type', 'submit' );
        startBtn.innerHTML = 'Start';

        startBtn.addEventListener( 'click', function () {
            timerObj.start();
            document.getElementById( 'modal' ).classList.add( 'show' );
        });

        timerLi.appendChild( nameHeader );
        timerLi.appendChild( startBtn );
        timersUl.appendChild( timerLi );
    });
}

var form = document.getElementsByTagName( 'form' )[0];
form.addEventListener( 'submit', function ( event ) {
    event.preventDefault();
    var minutes = document.getElementsByTagName( 'input' )[0].value;
    var length = minutes * 60000;
    
    var timer = new Timer( name, length );
    timer.save();
});

var modalCloseBtn = document.getElementById( 'close-modal' );
modalCloseBtn.addEventListener( 'click', function ( event ) {
    document.getElementById( 'modal' ).classList.remove( 'show' );
    document.getElementById( 'countdown' ).innerHTML = '';

    if ( Timer.current ) { 
        Timer.current.stop();
    }
});
