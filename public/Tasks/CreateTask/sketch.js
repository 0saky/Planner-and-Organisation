let categories = {};
let checkbokes = [];
const Priority = ["High Priority", "Medium Priority", "Low Priority", "Done"];
let radios = [];

function setup(){
    
    createCanvas(windowWidth - 20, windowHeight - 20);

    create_buttons();

    create_inputs();
        
    requestCategories();

    create_radios()
}

function draw(){

    //background(255);

    draw_text();


}

