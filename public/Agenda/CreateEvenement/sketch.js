const lang = /*"fr-FR";*/   "en-US";
const categories = ["", "Sport", "Divertisment","Sleep", "In Class", "Transporation"]
let options;
const today = new Date( Date.now() );
let day = today;
let day_end =today;
let Modifying = false;
let myStorage;
let evenement = {};
let starting;
let ending;




function setup() {

    canvas = createCanvas(windowWidth - 20, windowHeight - 20);

    create_buttons();

    create_inputs();

    create_sliders();

    create_selecter();

    checkForModification();

}

function draw(){

    background(255);

    draw_text();

    
    
    refreshEvenement();

}