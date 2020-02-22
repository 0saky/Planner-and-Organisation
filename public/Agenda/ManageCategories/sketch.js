let categories = {};
let positions = {};

function setup(){

    canvas = createCanvas(windowWidth - 20, windowHeight - 20);

    create_buttons();

    requestCategories();

    console.log(categories);


}