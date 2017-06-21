/**
 * Created by emanuel on 6/1/17.
 */

function populatizeThisPage(){
    var wrapperElement = $('#wrapper');
    var tileSpace = $('#tile_div');
    var wrapperHeight = wrapperElement.height();
    var wrapperWidth = wrapperElement.width();
    var divHeight = tileSpace.height();
    var divWidth = tileSpace.width();
    var remainingSquares;

    // console.log("Screen Object", screen);
    // console.log("Screen Avail Ht: ", screen.availHeight);
    // console.log("Screen Avail width: ", screen.availWidth);
    //
    // console.log("div for tiles ht: ", tileSpace.height());
    // console.log("div for tiles width: ", tileSpace.width());
    //
    // console.log("wrapper ht: ", $('#wrapper').height());
    // console.log("wrapper width: ", $('#wrapper').width());

    while ((wrapperHeight - divHeight) >= 100 ){
        divHeight = tileSpace.height();
        divWidth = tileSpace.width();
        // var widthDiff = wrapperWidth - divWidth;
        // var heightDiff = wrapperHeight - divHeight;

        // console.log("Height Diff: ", heightDiff);
        // console.log("Width Diff: ", widthDiff);
        tileSpace.append('<div class="square" onmouseover="this.style.backgroundColor = getRandomColor()" ' +
            'onmouseout="backwardsYo($(this))"></div>');
    }
    //Formula to fill in remainder of squares on bottom row
    //Here's how it works, you take the width of the div, divide it by the width dimension of the square
    //Round that number down and then subtract it by two since it always creates two squares at the bottom.
    remainingSquares = (Math.floor(divWidth / 52) - 2);
    // console.log(remainingSquares);
    // console.log(divWidth);

    //Now we take the number of the remaining squares and "make it so"
    for (var i = 1; i <= remainingSquares; i++){
        tileSpace.append('<div class="square" onmouseover="this.style.backgroundColor = getRandomColor() " ' +
            'onmouseout="backwardsYo($(this))"></div>');
    }
    $('#populate_this_page').fadeOut(700);
    $('#static_greeting').fadeOut(700);
}


function backwardsYo(element){
    setTimeout(function(){
        element.css("background-color", "white");
    }, 500);
}



function getRandomColor(){
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}