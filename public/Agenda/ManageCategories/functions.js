
function create_buttons() {

    button_home = createButton('Home');
    button_home.position(50, 20);
    button_home.attribute('onclick', "window.location.href = '/..';");

    button_Agenda = createButton('Agenda');
    button_Agenda.position(130, 20);
    button_Agenda.attribute('onclick', "window.location.href = '..';");
}

async function requestCategories() {

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

function create_visualisation() {

    const nombreCat = Object.keys(categories).length;

    let i = 0;

    for (category of categories) {

        // console.log("making: " + category.name);

        const y = (i + 1) * (height / (nombreCat + 2));

        const color = category.color;

        fill(0);
        noStroke();
        textSize(25);
        text(category.name, 80, y);

        fill(color);
        ellipse(0, y, 80);

        positions[category.name] = [0, y - 40, 500, y + 40];

        i++;
    }

    const y = (nombreCat + 1) * (height / (nombreCat + 2));

    fill(0);

    textSize(25);
    text("add a new: Category", 80, y);

    text("Sub-category", 350, y);

    stroke(150);
    line(0, y, 40, y);
    line(20, y - 20, 20, y + 20);

    positions["addCategory"] = [80, y - 30, 300, y];
    positions["addSub-category"] = [350, y - 30, 500, y];


}


function mouseReleased() {
    let i = 0;
    for (const object in positions) {
        const x = mouseX;
        const y = mouseY;

        const position = positions[object];

        if (x > position[0] && y > position[1] && x < position[2] && y < position[3]) {

            background(255);
            create_visualisation();

            if (object == "addCategory") {
                create_Addcategory();

            } else {
                modify = true;
                categoryModif = categories[i];
                create_Addcategory();
                

            }



        }
        i++;
    }
}

function create_Addcategory() {

    noStroke();
    textSize(35);
    text("Category title: ", 500, 50);

    input_title = createInput('');
    input_title.position(500, 80);
    input_title.size(300, 30);
    input_title.changed(title_input);

    textSize(25);
    text("Color :", 500, 150);

    colorpicker = createColorPicker('#ff0000');
    colorpicker.position(600, 150);
    colorpicker.input(givecolor);

    button_save = createButton('Save');
    button_save.position(600, 300);
    button_save.mousePressed(fxnSave);

    if (modify) {
        let category = categoryModif;
        console.log(category);
        input_title.value(category.name);
        colorpicker.value(category.color);
    }

}

function title_input() {
    console.log('Title is: ', this.value());
}

function givecolor() {
    console.log("Color is: " + this.value());
}

function fxnSave() {
    if (modify) {
        savemodif();
    } else {
        addCategory(input_title.value(), colorpicker.value());
    }

}

async function addCategory(name, color) {

    const ToSend = { category: name, color: color };
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

    if (json.status == 'Sucessfuly receved') {
        window.location.href = '..';
    }


}

async function savemodif() {
    categoryModif.name = input_title.value();
    categoryModif.color = colorpicker.value();
    console.log("Saving this: ", categoryModif);

    const sendoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryModif)
    }
    const response = await fetch('/ModifiedCategory', sendoptions);
    const json = await response.json();

    console.log(json);

    if (json.status == 'Sucessfuly receved') {
        window.location.href = '..';
    }

}