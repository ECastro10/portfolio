/**
 * Created by emanuel on 5/31/17.
 */

function addToList(){
    var item = $('#input_area').val();

    $('#notifier').html("Added!");
    $('#notifier').fadeIn(500);
    $('#notifier').fadeOut(300);

    $('#malleable_list').append('<li>' + item + '</li>');
    $('#input_area').val("");
}

function shuffleThatShit(){


    //The following 4 lines are based on Fisher-Yates shuffle provided Alexey Lebedev on Stack Overflow
    var ul = document.querySelector('ul');
    for (var i = ul.children.length; i >= 0; i--){
        ul.appendChild(ul.children[Math.random() * i | 0])
    }

    $('#notifier').html("Shuffled!");
    $('#notifier').fadeIn(500);
    $('#notifier').fadeOut(300);
}