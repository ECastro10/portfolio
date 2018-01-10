/**
 * Created by emanuel on 6/26/17.
 */
var SinePlaying = false;
var sine_node;
var sine_gain_node;
var SawtoothPlaying = false;
var sawtooth_node;
var sawtooth_gain_node;
var SquarePlaying = false;
var square_node;
var square_gain_node;
var TrianglePlaying = false;
var triangle_node;
var triangle_gain_node;
var sanitized = false;

function prepareFrequency(){
    if (sanitized == true) {
        var useFrequency = $('#frequency_number').val();
        useFrequency = (parseInt(useFrequency)).toFixed(2);
        return useFrequency;
    } else{
        alert("Invalid Input")
    }
}

function PlaySine() {

    if (SinePlaying == false) {
        var note_context = new AudioContext();
        sine_node = note_context.createOscillator();
        sine_gain_node = note_context.createGain();
        sine_node.frequency.value = prepareFrequency();
        sine_node.type = 'sine';
        sine_gain_node.gain.value = 0;
        sine_node.connect(sine_gain_node);
        sine_node.connect(note_context.destination);
        sine_gain_node.value = .3;
        sine_node.start();
        SinePlaying = true;

    } else {
        sine_node.stop();
        SinePlaying = false;
    }

}

function PlaySawtooth(){

    if (SawtoothPlaying == false) {
        var note_context = new AudioContext();
        sawtooth_node = note_context.createOscillator();
        sawtooth_gain_node = note_context.createGain();
        sawtooth_node.frequency.value = prepareFrequency();
        sawtooth_node.type = 'sawtooth';
        sawtooth_gain_node.gain.value = 0;
        sawtooth_node.connect(sawtooth_gain_node);
        sawtooth_node.connect(note_context.destination);
        sawtooth_gain_node.value = 0.3;
        sawtooth_node.start();
        SawtoothPlaying = true;

    } else {
        sawtooth_node.stop();
        SawtoothPlaying = false;
    }

}

function PlaySquare(){

    if (SquarePlaying == false) {
        var note_context = new AudioContext();
        square_node = note_context.createOscillator();
        square_gain_node = note_context.createGain();
        square_node.frequency.value = prepareFrequency();
        square_node.type = 'square';
        square_gain_node.gain.value = 0;
        square_node.connect(square_gain_node);
        square_node.connect(note_context.destination);
        square_gain_node.value = 0.3;
        square_node.start();
        SquarePlaying = true;

    } else {
        square_node.stop();
        SquarePlaying = false;
    }

}

function PlayTriangle(){

    if (TrianglePlaying == false) {
        var note_context = new AudioContext();
        triangle_node = note_context.createOscillator();
        triangle_gain_node = note_context.createGain();
        triangle_node.frequency.value = prepareFrequency();
        triangle_node.type = 'triangle';
        triangle_gain_node.gain.value = 0;
        triangle_node.connect(triangle_gain_node);
        triangle_node.connect(note_context.destination);
        triangle_gain_node.value = 0.3;
        triangle_node.start();
        TrianglePlaying = true;

    } else {
        triangle_node.stop();
        TrianglePlaying = false;
    }

}

function sanitizeThis() {
    //Using regex to make sure that the input >= 10 <= 100000
    //If there are decimals it needs at least one number after the decimal point.
    const regex = /^([1-9][0-9]{1,4})(\.[0-9]{1,2})?$/g;
    const currFrequency = $('#frequency_number').val();
    var message = $('#message_bro');

    if (!!currFrequency.match(regex) == false){

        message.html("INVALID! example: 500 or 325.23");
        message.css("color", "red");
        sanitized = false;
    } else{
        message.css("color", "greenyellow");
        message.html("VALID INPUT");
        sanitized = true;
    }
}

$('#frequency_number').val("");
