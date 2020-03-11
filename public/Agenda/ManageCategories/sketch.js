let categories;
let positions = {};
let modify = false;
let categoryModif;

function setup() {

    canvas = createCanvas(windowWidth - 20, windowHeight - 20);

    create_buttons();

    requestCategories();

    console.log(categories);


}