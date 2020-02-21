


function create_buttons() {

    button_home = createButton('Home');
    button_home.position(50, 20);
    button_home.attribute('onclick', "window.location.href = '/..';");

    button_Agenda = createButton('Agenda');
    button_Agenda.position(130, 20);
    button_Agenda.attribute('onclick', "window.location.href = '..';");
}

async function requestCategories(){

    console.log('Sending');

    
        const data = {};
        const sendoptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(data)
        }
       const response = await fetch('/ListOfCategories', sendoptions);
       const json = await response.json();

       const received_data = json.data;

       
       console.log(received_data);

       categories = received_data;

       create_visualisation();
      
}

function getColor(category){
    
    if(category == "Sleep"){
        return color(0, 0, 255);
    } else if (category == "Sport"){
        return color(0, 255, 0);
    } else if (category == "In Class"){
        return color(255, 0, 255);
    } else if (category == "Divertisment"){
        return color(0, 255, 255);
    } else if (category == "Work"){
        return color(255, 255, 0);
    } else if (category == "Transporation"){
        return color(127, 0, 127);
    } else if (category == "Exam"){
        return color(255, 0, 0);
    }
    return color(0);
}

function create_visualisation() {

    for(let i = 0; i < categories.length; i++){

        console.log("making: " + categories[i]);

        const y = (i+1)*(height/(categories.length+2));

        const color = getColor(categories[i]);

        fill(0);
        noStroke();
        textSize(25);
        text(categories[i], 80, y);

        fill(color);
        ellipse(0, y, 80);

        positions[categories[i]] = [0, y-40, 500, y+40];
    }

    const y = (categories.length+1)*(height/(categories.length+2));

    fill(0);

    textSize(25);
    text("add a new: Category", 80, y);

    text("Sub-category", 350, y);

    stroke(150);
    line(0, y, 40, y);
    line(20, y-20, 20, y+20);

    positions["addCategory"] = [80, y-30, 300, y];
    positions["addSub-category"] = [350, y-30, 500, y];
    

}


function mouseReleased() {
    for (const object in positions){
        const x = mouseX;
        const y = mouseY;

        const position = positions[object];

        if(x > position[0] && y > position[1] && x < position[2] && y < position[3]){

            background(255);
            create_visualisation();

            if(object == "addCategory"){
                create_Addcategory();
                
            } else {
            stroke(0);
            textSize(50);
            text(object, 550, height/2);
            }



        }
    }
}

function create_Addcategory(){
    
    noStroke();
    textSize(35);
    text("Category title: ", 500, 50);

    input_title = createInput('');
    input_title.position(500, 80);
    input_title.size(300, 30);
    input_title.changed(title_input);

    textSize(25);
   // text("Color :", 500, 150);
    
   button_save = createButton('Save');
   button_save.position(600, 150);
   button_save.mousePressed(fxnSave);

}

function title_input(){
    console.log('Title is: ', this.value());
}

function fxnSave(){

addCategory(input_title.value());

}

async function addCategory(data) {

    const ToSend = {in: data};
    console.log('Sending : ', ToSend);
    const sendoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ToSend)
    }
    const response = await fetch('/addCategorie', sendoptions);
    const json = await response.json();

    console.log(json);

    if(json.status == 'Sucessfuly receved'){
        window.location.href = '..';
    }


}