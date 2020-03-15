const lang = /*"fr-FR";*/   "en-US";
let categories = {};
let options;
const today = new Date(Date.now());
let dayStart = today;
let dayEnd = today;
let Modifying = false;
let myStorage;
let evenement = {};
let starting;
let ending;
let AddcategoryDiv;
let subcategoriescheckboxes = [];
let textToDraw = [];




function setup() {

    canvas = createCanvas(windowWidth - 20, windowHeight - 20);

    requestCategories();

    create_buttons();

    create_inputs();

    create_sliders();

    create_selecter();

    checkForModification();



    AddcategoryDiv = document.createElement('div');
    document.body.appendChild(AddcategoryDiv);
    AddcategoryDiv.id = "Addcategory";

}

function draw() {

    background(255);

    draw_text();

    refreshEvenement();

}