
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

    stroke(150);
    line(0, y, 40, y);
    line(20, y - 20, 20, y + 20);

    positions["addCategory"] = [80, y - 30, 300, y];


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

    const myNode = document.getElementById("Addcategory");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }


    noStroke();
    textSize(35);
    text("Category title: ", 500, 50);

    input_title = createInput('');
    input_title.position(500, 80);
    input_title.size(300, 30);
    input_title.changed(title_input);
    input_title.id("input_title")
    document.getElementById("Addcategory").appendChild(document.getElementById("input_title"));

    textSize(25);
    text("Color :", 500, 150);

    CategoryColor = createColorPicker('#ff0000');
    CategoryColor.position(600, 150);
    CategoryColor.input(giveCatColor);
    CategoryColor.id("CategoryColor")
    document.getElementById("Addcategory").appendChild(document.getElementById("CategoryColor"));

    text("Add a sub-category: ", 500, 200);
    input_SubTitle = createInput('');
    input_SubTitle.position(750, 200);
    input_SubTitle.changed(subcategory_input);
    input_SubTitle.id("input_SubTitle")
    document.getElementById("Addcategory").appendChild(document.getElementById("input_SubTitle"));

    SubCatColor = createColorPicker('#ff0000');
    SubCatColor.position(900, 200);
    SubCatColor.input(giveSubColor);
    SubCatColor.id("SubCatColor")
    document.getElementById("Addcategory").appendChild(document.getElementById("SubCatColor"));

    button_save = createButton('Save');
    button_save.position(600, 500);
    button_save.mousePressed(fxnSave);
    button_save.id("button_save")
    document.getElementById("Addcategory").appendChild(document.getElementById("button_save"));

    if (modify) {

        subcategoriesColors = [];
        subcategoriestitles = [];
        subcategories = [];

        let category = categoryModif;
        console.log(category);
        input_title.value(category.name);
        CategoryColor.value(category.color);
        if (category.sub) {
            subcategories = category.sub;
        }
        displaySub();

    }

}

function title_input() {
    console.log('Title is: ', this.value());
}

function subcategory_input() {
    console.log('Sub category: ', this.value());
}

function giveCatColor() {
    console.log("Category Color is: " + this.value());
}

function giveSubColor() {
    console.log("Sub Color is: " + this.value());
}

function fxnSave() {
    subcategories_update();
    if (modify) {
        savemodif();
    } else {
        addCategory(input_title.value(), CategoryColor.value());
    }

}

async function addCategory(name, color) {
    const ToSend = { name: name, color: color, sub: [] };
    if (input_SubTitle.value()) {
        categoryModif.sub.push({ title: input_SubTitle.value(), color: SubCatColor.value() });
    }
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
    if (input_SubTitle.value()) {
        subcategories.push({ title: input_SubTitle.value(), color: SubCatColor.value() });
    }
    let send = {
        cat: {
            name: input_title.value(),
            color: CategoryColor.value(),
            sub: subcategories
        },
        id: categoryModif.id
    };

    console.log("Saving this: ", send);

    const sendoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(send)
    }
    const response = await fetch('/ModifiedCategory', sendoptions);
    const json = await response.json();

    console.log(json);

    if (json.status == 'Sucessfuly receved') {
        window.location.href = '..';
    }

}

function displaySub() {
    for (let i = 0; i < subcategories.length; i++) {
        const sub = subcategories[i];
        const x = 500;
        const y = 250 + i * 30;

        let zert = createInput(sub.title);
        zert.position(x, y);
        zert.changed(subexistcategory_input);
        zert.id("zert"+i)
        document.getElementById("Addcategory").appendChild(document.getElementById("zert"+i));
        subcategoriestitles.push(zert);

        let hjkds = createColorPicker(sub.color);
        hjkds.position(x + (sub.title.length) * 20, y);
        hjkds.input(giveSubexistColor);
        hjkds.id("hjkds"+i)
        document.getElementById("Addcategory").appendChild(document.getElementById("hjkds"+i));
        subcategoriesColors.push(hjkds);

    }
}

function subexistcategory_input() {
    console.log("Exist sub title:", this.value());
}

function giveSubexistColor() {
    console.log("Exist sub color:", this.value());
}

function subcategories_update() {
    for (let i = 0; i < subcategories.length; i++) {
        subcategories[i] = {
            title: subcategoriestitles[i].value(),
            color: subcategoriesColors[i].value()
        }
    }
}