/**
 * Created by emanuel on 5/24/17.
 */
//For createChord()
var notesArray = ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'];
var stringsArray = ['E', 'A', 'D', 'G', 'B', 'E'];

//For createChord() and findShape()
var major = [0, 4, 7];
var minor = [0, 3, 7];
var diminished = [0, 3, 6];
var augmented = [0, 4, 8];
var sus2 = [0, 2, 7];
var sus4 = [0, 5, 7];
var major7 = [0, 4, 7, 11];
var minor7 = [0, 3, 7, 10];
var minor7b5 = [0, 3, 6, 10];
var dom7 = [0, 4, 7, 10];

var rootNote;
var quality;
var shapesDictionary = {};
var currentSpellingCombos;
var shapeCounter = 0;
var permutationsDone = false;
var spellingArray;
var nextButton = $('#next');
var prevButton = $('#previous');

var tempArray = [];
var sixthString = [];
var fifthString = [];
var fourthString = [];
var thirdString = [];
var secondString = [];
var firstString = [];

tempArray.push(document.getElementsByClassName('six'));
sixthString = tempArray[0];
tempArray = [];

tempArray.push(document.getElementsByClassName('five'));
fifthString = tempArray[0];
tempArray = [];

tempArray.push(document.getElementsByClassName('four'));
fourthString = tempArray[0];
tempArray = [];

tempArray.push(document.getElementsByClassName('three'));
thirdString = tempArray[0];
tempArray = [];

tempArray.push(document.getElementsByClassName('two'));
secondString = tempArray[0];
tempArray = [];

tempArray.push(document.getElementsByClassName('one'));
firstString = tempArray[0];
tempArray = [];


resetColors();
resetOptions();

function createChord() {
    //This function takes the user selection and actually creates the spelling of a chord "Gasp! Magical..."
    //It takes the root note, creates a chromatic scale, and then applies the formula.
    //It then returns the spelling
    var arrayForConstruction;
    var spelledArray = [];
    var chordFormula;

    if (typeof rootNote == "undefined" || typeof quality == "undefined") {
        alert("You must choose a Root Note and a Quality.");
        nextButton.hide();
        exit();
    } else if (rootNote == "" || quality == "") {
        alert("You must choose a Root Note and a Quality.");
        nextButton.hide();
        exit();
    }

    for (var startingNote = 0; startingNote < notesArray.length; startingNote++) {
        if (notesArray[startingNote] == rootNote) {
            arrayForConstruction = (notesArray.slice(startingNote).concat(notesArray.slice(0, startingNote + 1)));
        }
    }

    switch (quality) {
        case "major":
            chordFormula = major;
            break;
        case "minor":
            chordFormula = minor;
            break;
        case "augmented":
            chordFormula = augmented;
            break;
        case "diminished":
            chordFormula = diminished;
            break;
        case "sus2":
            chordFormula = sus2;
            break;
        case "sus4":
            chordFormula = sus4;
            break;
        case "major7":
            chordFormula = major7;
            break;
        case "minor7":
            chordFormula = minor7;
            break;
        case "minor7b5":
            chordFormula = minor7b5;
            break;
        case "dom7":
            chordFormula = dom7;
            break;
        default:
            console.log("Defaulting B****!");
            break;
        }
        for (var note = 0; note < chordFormula.length; note++) {
            spelledArray.push(arrayForConstruction[chordFormula[note]]);
        }
    return spelledArray;
}

function updateCurrentChoice() {
    //This function updates the display of what is currently selected as a chord

    rootNote = $('#root').val();
    quality = $('#quality').val();
    $('#current_choice').html(rootNote + " " + quality);
    resetColors();
    nextButton.hide();
    prevButton.hide();
    shapesDictionary = {};
    shapeCounter = 0;
    permutationsDone = false;
}

function findShape() {
    //This functions job is to regularly update the current shape name, if that current shape
    //does not exist as a key in shapesDictionary, create that object inside of the shapesDictionary
    //and give it some temporary values for shapeRegulator() to evaluate.
    var currentChoice;
    var currentShape = "shape" + String(shapeCounter);
    var preventInfinity = 0;

    //These conditional statements make sure that the user cannot find shapes without a root note and a chord quality.
    if (typeof currentSpellingCombos[0] == "undefined") {
        return false;

    } else if (typeof (shapesDictionary[currentShape]) == "undefined"){
        shapesDictionary[currentShape] = shapeObject();
    }

    //This console.log tells you the length of the keys in an object
    // console.log(Object.keys(shapesDictionary).length);

    masterloop:
    while (currentSpellingCombos[0].length > 0) {

        for (var i = 6; i > 0; i--) {

            if (typeof shapesDictionary[currentShape][i] == "string") {

                var guitarString;
                switch (i) {
                    case 6:
                        guitarString = sixthString;
                        break;
                    case 5:
                        guitarString = fifthString;
                        break;
                    case 4:
                        guitarString = fourthString;
                        break;
                    case 3:
                        guitarString = thirdString;
                        break;
                    case 2:
                        guitarString = secondString;
                        break;
                    case 1:
                        guitarString = firstString;
                        break;
                    default:
                        console.log("Defaulting B****!");
                        break;
                }

                if (i == 1){
                    preventInfinity++;

                } else if (preventInfinity == 5){
                    currentSpellingCombos.splice(0,1);

                    //This line makes sure that the computer does not try to find a shape for an empty array.
                    if (currentSpellingCombos.length == 0){
                        console.log(currentSpellingCombos);
                        nextButton.hide();
                        return false;
                    }

                    shapesDictionary[currentShape] = shapeObject();

                }

                for (var j = 0; j < guitarString.length; j++){

                    if (guitarString[j].innerHTML == currentSpellingCombos[0][0]){

                        currentChoice = guitarString[j];

                        if (determineNextNote(currentChoice, shapesDictionary[currentShape]) == true) {

                            shapesDictionary[currentShape][i] = parseInt(currentChoice.id.slice(2));

                            currentSpellingCombos[0].splice(0, 1);
                            break;

                        } else {
                            break;
                        }
                    }

                }


            }

        }
}
    currentSpellingCombos.splice(0,1);
    return currentShape;
}

function shapeRegulator(){
    //First this function runs resetColors() to clear the current colors off the fretboard.
    //Second, this function runs resetOptions() to simply do it now rather than later.
    //It then runs the permute function to create all possible spelling variations.
    //This function also contains the logic for what the current shape's fate will be. It helps prevent duplicate shapes
    resetColors();
    resetOptions();
    var shapeToEvaluate;

    if (permutationsDone == false) {
        spellingArray = createChord();
        currentSpellingCombos = permute(spellingArray);
        permutationsDone = true;
    }

    if (currentSpellingCombos.length == 0 || typeof shapesDictionary["shape" + String(shapeCounter)] == "object"){
        lightItUp("shape" + String(shapeCounter));

    } else{
        shapeToEvaluate = findShape();

        if (shapeToEvaluate == false) {
            nextButton.hide();
delete shapesDictionary["shape" + String(shapeCounter)];
            shapeCounter--;
            shapeRegulator();

        } else if (preventDuplicateShape(shapeToEvaluate) == false) {

            //Delete the current shapeObject and start anew from the next combo in the array
            delete shapesDictionary[shapeToEvaluate];

            if (currentSpellingCombos.length == 0){
                shapeCounter--;
                shapeRegulator();

            } else {
                shapeRegulator();
            }

        } else {
            lightItUp(shapeToEvaluate);
        }
    }
}

function lightItUp(chordShapeKey){
    // This function is used to "light up" the correct notes in the chord shape.
    //Straightforward, for loop numbers 1 through 6, those are the strings and the keys.
    //Take the key and if it has a numerical value pair, concatenate with a "_" and cast it as a string
    //to find this element on the DOM. Then change the background-color to red.
    for (var string = 1; string < 7; string++) {

            if (typeof shapesDictionary[chordShapeKey][string] == "string"){

            } else{
                var idToLightUp = "#" + String(string) + "_" + String(shapesDictionary[chordShapeKey][string]);
                $(idToLightUp).css("background-color", "red");
            }
        }
}

function resetColors(){
    //This function resets all the "lit" up squares to their original values.
    $('.square').css("background-color", "white");
    $('.open_strings').css("background-color", "gray");
}

function resetOptions(){
    //Resets the options such as root name and chord quality
    document.getElementById('root').selectedIndex = 0;
    document.getElementById('quality').selectedIndex = 0;
}

function shapeObject(){
    //This function returns a blank template that is meant to be used as a value for a key in the shapesDictionary
    return {6:"", 5:"", 4:"", 3:"", 2:"", 1:""};
}

function preventDuplicateShape(currentShapeKey) {
    //This function is used to prevent a duplicate shape.

    if (shapeCounter == 0) {

    } else {

        for (var shape = 0; shape < shapeCounter; shape++) {
            var shapeToCompare = shapesDictionary["shape" + String(shape)];
            if (shapeToCompare[6] == shapesDictionary[currentShapeKey][6] &&
                shapeToCompare[5] == shapesDictionary[currentShapeKey][5] &&
                shapeToCompare[4] == shapesDictionary[currentShapeKey][4] &&
                shapeToCompare[3] == shapesDictionary[currentShapeKey][3] &&
                shapeToCompare[2] == shapesDictionary[currentShapeKey][2] &&
                shapeToCompare[1] == shapesDictionary[currentShapeKey][1]) {
                return false;
            }
        }
    }
    return true;
}

function determineNextNote(currentNote, currentShape){
//    This function determines whether the next note is physically possible or not.
    var currentNoteFret = parseInt(currentNote.id.slice(2));

    for (var i = 6; i > 0; i--){

        if ((typeof currentShape[i]) == "string"){

        } else{
            if (Math.abs(currentNoteFret - currentShape[i]) > 3){

                return false;
            }
        }
    }
    return true;
}


//The following function permute is not my own.
//le_m posted this code snippet on stack overflow on the "permutations-in-javascript" thread.
function permute(permutation) {
  var length = permutation.length,
      result = new Array([0, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600][length]),
      c = new Array(length).fill(0),
      i = 1,
      j = 1;

  result[0] = permutation.slice();
  while (i < length) {
    if (c[i] < i) {
      var k = (i % 2) ? c[i] : 0,
          p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result[j] = permutation.slice();
      ++j;
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}

prevButton.click(function(){
    shapeCounter--;
    if (shapeCounter == 0) {
        prevButton.fadeOut(1);
    } else if (shapeCounter < Object.keys(shapesDictionary).length){
        nextButton.fadeIn(1);
    }
    shapeRegulator();
});

nextButton.click(function(){
    shapeCounter++;
    if (currentSpellingCombos.length == 1 && shapeCounter == Object.keys(shapesDictionary).length) {
        nextButton.fadeOut(1);
    } else if (currentSpellingCombos.length == 0 && shapeCounter == Object.keys(shapesDictionary).length -1) {
        nextButton.fadeOut(1);
    } else if (shapeCounter == 1) {
        prevButton.fadeIn(1);
    }
    shapeRegulator();
});

$('#generate_button').click(function(){
    nextButton.fadeIn(1);
});
