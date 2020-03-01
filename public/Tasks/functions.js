function create_buttons(){

    button_home = mainSketch.createButton('Home');
    button_home.position(120, 20);
    button_home.attribute('onclick', "window.location.href = '/..';");

    button_createTask = mainSketch.createButton('Create New Task');
    button_createTask.position(180, 20);
    button_createTask.attribute('onclick', "window.location.href = 'CreateTask';");

}

function draw_text(){

    mainSketch.textSize(30);
    mainSketch.noStroke();
    mainSketch.fill(0);

    mainSketch.text("Tasks", 0, 30);

}

async function getTasks(){

    console.log('Sending');
    
        const data = {};
        const sendoptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(data)
        }
       const response = await fetch('/ListOfTasks', sendoptions);
       const json = await response.json();

       console.log(json);

       const received_data = json.data;

       tasks = received_data;

       console.log(tasks);

       for(let i = 0; i < 3; i++){
        scrollSketchs[i].tasksprio = [];
        for(let task of tasks){
            if(task.priority = Priority[i]){
                scrollSketchs[i].tasksprio.push(task);
            }
        }
       }

}

function drawTasks(priority){
   // console.log("priority", priority);

    

}