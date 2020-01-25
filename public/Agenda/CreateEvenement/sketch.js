const lang = /*"fr-FR";*/   "en-US";
const categories = ["", "Sport", "Divertisment","Sleep"]
let options;
const today = new Date( Date.now() );
let day = today;




function setup() {

    canvas = createCanvas(windowWidth - 20, windowHeight - 20);

    create_buttons();

    create_inputs();

    create_sliders();

    create_selecter();

}

function draw(){

    background(255);
    draw_text();
    
}