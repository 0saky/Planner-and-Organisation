    function create_buttons(){

    button_home = createButton('Home');
    button_home.position(250, 20);
    button_home.attribute('onclick', "window.location.href = '/..';");

    button_Tasks = createButton('Tasks');
    button_Tasks.position(330, 20);
    button_Tasks.attribute('onclick', "window.location.href = '..';");

    button_save = createButton('Save');
    button_save.position(200, 450);
    button_save.mousePressed(fxnSave);
    button_save.type="submit";

}

function fxnSave(){    

    console.log("That a save!");

    

    let Task = {
        title: input_title.value(),
        priority: null,
        categories: [],
        CreationTime: new Date(Date.now()),
    }

    for(let i of radios){
        if(i.checked){
            Task.priority = i.value;
        }
    }

    for(let i of checkbokes){
        if(i.checked){
            Task.categories.push(i.value);
        }
    }
    console.log(Task);

    fxnSend(Task);

}

function create_inputs(){

    input_title = createInput('');
    input_title.position(70, 60);
    input_title.changed(title_input);
    input_title.size(300, 30);

    input_notes = createInput('');
    input_notes.position(70, 400);
    input_notes.changed(notes_input);
    input_notes.size(300, 30);


}

function title_input(){
    console.log("Title is: ", this.value());
}

function notes_input(){
    console.log("The notes are: ", this.value());
}

function Create_Checkboxes(){

    for (let i = 0; i < categories.length; i++){
        
        let checkbox = document.createElement("input");
        document.body.append(checkbox);
        checkbox.style = "position: absolute; left: "+ 80 + "px; top: " + (i*20+130) + "px";
        checkbox.type = "checkbox";
        checkbox.id = "Checkbox_" + categories[i].name;
        checkbox.name = "Category";
        checkbox.value = categories[i].name;
        checkbokes.push(checkbox);

        fill(0);
        textSize(15);
        text(categories[i].name, 100, i*20+135);
        
    }

}

function create_radios() {

    for (let i = 0; i < Priority.length; i++){
        
        let radio = document.createElement("input");
        document.body.append(radio);
        radio.style = "position: absolute; left: "+ (i*120+50) + "px; top: " + 350 + "px";
        radio.type = "radio";
        radio.id = "radio_" + Priority[i];
        radio.name = "Priority";
        radio.value = Priority[i];
        radios.push(radio);

        fill(0);
        textSize(15);
        text(Priority[i], (i*120+62), 356);
        
    }


}

function draw_text(){

    textSize(30);
    noStroke();
    fill(0);

    text("Create New Task", 0, 30);

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

       Create_Checkboxes();
      
}

async function fxnSend(Task){
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

   if(json.status = "Sucessfuly receved"){
       window.location.href = '..';
   }

}