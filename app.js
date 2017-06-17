var timers = [];

function Timer ( name, length ) {
    this.name = name || this.randomName();
    this.length = length;

    console.log( 'made a new timer, fancy', this );
}

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

    return words[randomInt(0,words.length)] + '-' + words[randomInt(0,words.length)] + '-' + words[randomInt(0,words.length)];
}

Timer.prototype.start = function () {
    
    console.log( 'Timer is starting!' );
    console.time( 'timer' );
    var readableMinutes =  this.length/60000;
    
    setTimeout( function () {
        console.log( 'Timer is ending!' );
        console.timeEnd( 'timer' );
        alert('It has been ' + readableMinutes + ' minute(s).');
    }, this.length );

}

function randomInt (min, max) {
    return Math.floor( Math.random() * (max - min + 1) ) + min;
}









var form = document.getElementsByTagName( 'form' )[0];
form.addEventListener( 'submit', function ( event ) {
    event.preventDefault();
    var minutes = document.getElementsByTagName( 'input' )[0].value;
    var length = minutes * 60000;
    
    timers.push( new Timer( name, length ) );
});