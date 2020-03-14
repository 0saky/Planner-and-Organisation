function create_buttons() {

    button_home = createButton('Home');
    button_home.position(250, 20);
    button_home.attribute('onclick', "window.location.href = '/..';");

    button_Tasks = createButton('Tasks');
    button_Tasks.position(330, 20);
    button_Tasks.attribute('onclick', "window.location.href = '..';");

    button_save = createButton('Save');
    button_save.position(200, 450);
    button_save.mousePressed(fxnSave);
    button_save.type = "submit";

}

function fxnSave() {

    console.log("That a save!");

    let Task = {
        title: input_title.value(),
        priority: null,
        category: selecter_category.value(),
        notes: input_notes.value(),
        CreationTime: new Date(Date.now()),
    }

    for (let i of radios) {
        if (i.checked) {
            Task.priority = i.value;
        }
    }


    console.log(Task);

    if(Modifying){
        fxnSendModif(Task);
    }else {
        fxnSend(Task);
    }
    

}

function create_inputs() {

    input_title = createInput('');
    input_title.position(70, 60);
    input_title.changed(title_input);
    input_title.size(300, 30);

    input_notes = createInput('');
    input_notes.position(70, 400);
    input_notes.changed(notes_input);
    input_notes.size(300, 30);


}

function title_input() {
    console.log("Title is: ", this.value());
}

function notes_input() {
    console.log("The notes are: ", this.value());
}

function create_selecter() {
    selecter_category = createSelect();
    selecter_category.position(110, 195);
    update_selecter();
}
function fnxcategory(){
    console.log("Category: ", this.value());
}

async function update_selecter() {

    for (let category of categories) {
        selecter_category.option(category.name);
    }
    selecter_category.changed(fnxcategory);
}

function create_radios() {

    for (let i = 0; i < Priority.length; i++) {

        let radio = document.createElement("input");
        document.body.append(radio);
        radio.style = "position: absolute; left: " + (i * 120 + 50) + "px; top: " + 350 + "px";
        radio.type = "radio";
        radio.id = "radio_" + Priority[i];
        radio.name = "Priority";
        radio.value = Priority[i];
        radios.push(radio);

        fill(0);
        textSize(15);
        text(Priority[i], (i * 120 + 62), 356);

    }


}

function draw_text() {

    textSize(30);
    noStroke();
    fill(0);

    text("Create New Task", 0, 30);

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

    create_selecter();

}

async function fxnSend(Task) {
    console.log("Sending");

    const sendoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Task)
    }
    const response = await fetch('/addTask', sendoptions);
    const json = await response.json();

    console.log(json);

    if (json.status = "Sucessfuly receved") {
        window.location.href = '..';
    }

}

async function checkForModification() {
    myStorage = window.localStorage;
    //console.log(myStorage);
    if (myStorage.length > 0) {

        console.log('Modifiyng an evenement');

        Modifying = true;

        const toModify = localStorage.getItem('ToModify');

        idTask = JSON.parse(toModify);
        console.log("Task : ", idTask);

        const task = await requestTask(idTask);
        setButtonValues(task);

    } else {

        console.log('Creating an evenement');

    }


}

async function requestTask(idTask){

    console.log("Getting details");
    const data = {id: idTask}
    const sendoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('/idTaskdetails', sendoptions);
    const json = await response.json();

    console.log(json);

    return json.task;
    
}

function setButtonValues(task){
    console.log(task);
    input_title.value(task.title);
    input_notes.value(task.notes);
    selecter_category.value(task.category);
    
}

async function fxnSendModif(Task){

    console.log("Sending");

    Task.id = idTask;

    const sendoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(Task)
    }
    const response = await fetch('/ModifyTask', sendoptions);
    const json = await response.json();

    console.log(json);

    if (json.status = "Sucessfuly receved") {
        localStorage.clear();
        window.location.href = '..';
    }
}