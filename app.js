'use strict';

function Timer ( name, length ) {
    this.name = name || this.randomName();
    this.length = length;
    this.minutes = length/60000;

    console.log( 'made a new timer, fancy', this );
}

Timer.all = [];

Timer.prototype.randomName = function () {
    var words = [
        'art',
        'bee',
        'corner',
        'danger',
        'eagle',
        'frequent',
        'glue',
        'happy',
        'monkey'
    ];

    var max = words.length - 1;
    return words[randomInt(0, max)] + '-' + words[randomInt(0, max)] + '-' + words[randomInt(0, max)];
}

Timer.prototype.save = function () {
    Timer.all.push( this );
    localStorage.timers = JSON.stringify( Timer.all );
}

Timer.prototype.start = function () {
    
    console.log( 'Timer is starting!' );
    console.time( 'timer' );
    var readableMinutes =  this.minutes;
    
    setTimeout( function () {
        console.log( 'Timer is ending!' );
        console.timeEnd( 'timer' );
        alert('It has been ' + readableMinutes + ' minute(s).');
    }, this.length );

}

function randomInt (min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}






var timersUl = document.getElementById( 'timers' );

if ( localStorage.timers ) {
    var timers = JSON.parse( localStorage.timers );
    timers.forEach( function ( timer ) {
        Timer.all.push( new Timer( timer.name, timer.length ) );
       
        var li = document.createElement( 'li' );

        var nameHeader = document.createElement( 'h2' );
        nameHeader.innerText = timer.name + ' (' + timer.minutes + ' minutes)';

        var startBtn = document.createElement( 'button' );
        startBtn.setAttribute( 'type', 'submit' );
        startBtn.innerHTML = 'Start';

        li.appendChild( nameHeader );
        li.appendChild( startBtn );
        timersUl.appendChild( li );
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