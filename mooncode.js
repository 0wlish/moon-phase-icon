const SWIDTH = 31;
const SHEIGHT = 31;
const BORDER = 1;
const SPACER = 1;

function spritePosToImagePos(row, col) {
    return {
        x: (
            BORDER + col * (SPACER + SHEIGHT)
        ),
        y: (
            BORDER + row * (SPACER + SHEIGHT)
        )
    }
}

//console.log(`A sprite at position (0, 1) has pixel coordinates ${spritePosToImagePos(0, 1).x}, ${spritePosToImagePos(0, 1).y}`); //testing


// select the canvas and get
// its 2d context
var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

//var spriteSheetSrc = 'moonphase.png';
// create a new image from the spritesheet
var image = new Image();
image.src = 'moonphase.png';
//image.crossOrigin = true;

//extract frames
var newM = spritePosToImagePos(0,0); //new moon
var waxC = spritePosToImagePos(0,1); //waxing crescent
var firstQ = spritePosToImagePos(0,2); //first quarter
var waxG = spritePosToImagePos(0,3); //waxing gibbous
var fullM = spritePosToImagePos(1,0); //full moon
var wanG = spritePosToImagePos(1,1); //waning gibbous
var lastQ = spritePosToImagePos(1,2); //last quarter
var wanC = spritePosToImagePos(1,3); //waning crescent

var frame;
function animate() {
    switch(getMoonPhase()) {
        case 0:
            frame = newM;
            break;
        case 1:
            frame = waxC;
            break;
        case 2:
            frame = firstQ;
            break;
        case 3:
            frame = waxG;
            break;
        case 4:
            frame = fullM;
            break;
        case 5:
            frame = wanG;
            break;
        case 6:
            frame = lastQ;
            break;
        case 7:
            frame = wanC;
    }
    context.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    context.drawImage(
        image,
        frame.x,
        frame.y,
        SWIDTH,
        SHEIGHT,
        0,
        0,
        SWIDTH,
        SHEIGHT
    );
}
function getMoonPhase() {
    //returns number 0..7 based on current moon phase
    //full length of synodic month: 29.530588861
    //increment: 1.230441203 (synodic/24)
    const date = new Date();
    var daysFromEpoch = date.getTime() * 0.000000011574;
    var ageOfPhase = (daysFromEpoch - 6.751535545) % 29.530588861;
    console.log('age of phase:'); //testing
    console.log(ageOfPhase);
    if (ageOfPhase <= 1.230441203 && ageOfPhase > 28.300147670) {
        return 0; //newM
    } else if (ageOfPhase <= 6.152206015) {
        return 1; //waxC
    } else if (ageOfPhase <= 8.613088421) {
        return 2; //firstQ
    } else if (ageOfPhase <= 13.534852230) {
        return 3; //waxG
    } else if (ageOfPhase <= 15.995735640) {
        return 4; //fullM
    } else if (ageOfPhase <= 20.917500450) {
        return 5; //wanG
    } else if (ageOfPhase <= 23.378382860) {
        return 6; //lastQ
    } else {
        return 7; //wanC
    }
}
image.onload = function() {
    animate();
};
