/**
 * Created by emanuel on 8/2/17.
 */
var counter = 1;

function prevImage() {
    if (counter > 1) {
        counter--;
        changeImage();
    } else if (counter == 1) {
        counter = 4;
        changeImage();
    }
}

function nextImage() {
    if (counter < 4) {
        counter ++;
        changeImage();
    } else if (counter == 4) {
        counter = 1;
        changeImage();
    }
}

function changeImage() {

    var imageSource;

    switch (counter) {

        case 1:
            imageSource = "PM_sensor/prototype_full.jpg";
            break;
        case 2:
            imageSource = "PM_sensor/prototype_housing.jpg";
            break;
        case 3:
            imageSource = "PM_sensor/prototype_innards.jpg";
            break;
        case 4:
            imageSource = "PM_sensor/prototype_screen.jpg";
            break;
        default:
            imageSource = "PM_sensor/prototype_full.jpg";
            break;

    }

    $('#sensor_image').attr('src', imageSource);
}