function create_buttons() {

    button_home = mainSketch.createButton('Home');
    button_home.position(120, 20);
    button_home.attribute('onclick', "window.location.href = '/..';");

    button_createTask = mainSketch.createButton('Create New Task');
    button_createTask.position(180, 20);
    button_createTask.attribute('onclick', "window.location.href = 'CreateTask';");

}

function draw_text() {

    mainSketch.textSize(30);
    mainSketch.noStroke();
    mainSketch.fill(0);

    mainSketch.text("Tasks", 0, 30);

}

async function getTasks() {

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

    const received_data = json.data;

    tasks = received_data;

    console.log(tasks);

    for (let task of tasks) {
        console.log(task.title, task.priority);

    }



    for (let i = 0; i < 4; i++) {
        scrollSketchs[i].tasksprio = [];
        for (let task of tasks) {
            if (task.priority == Priority[i]) {
                // console.log(task.priority);
                scrollSketchs[i].tasksprio.push(task);
            }
        }
    }
    

    
    

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

}

async function getColor(init) {
    for (let category of categories) {
        if (category.name == init) {
            //console.log(category.color);
            return category.color;
        }
    }

    return 0;
}

async function drawTasks(p) {
    //console.log("priority", this);
    if ((p.tasksprio.length) * 105 + 5 > p.height) {
        p.resizeCanvas(p.width-7, (p.tasksprio.length + 1) * 105 + 5);
    }

    p.background(31, 128, 52, 255);
    p.positions = [];


    for (let i = 0; i < p.tasksprio.length; i++) {
        p.rectMode(p.CORNER);
        p.noStroke();
        const color = await getColor(p.tasksprio[i].category);
        p.fill(color);
        let x = 5;
        let y = (105 * i) + 5;
        let w = p.width - 10;
        let h = 100;
        p.rect(x, y, w, h, 10);
        p.positions.push({ 
            id: p.tasksprio[i].id,
            x: x,
            y: y,
            w: w,
            h: h
        });
        p.fill(255);
        p.stroke(0);
        p.textSize(20);
        p.text(p.tasksprio[i].title, 20, (105 * i) + 25);
        
    }


}


async function asyncgo(){
    requestCategories().then(function() {
        
        getTasks().then( function(){
            
            for(p of scrollSketchs){
                drawTasks(p);
                
            }
        });
    }

    );
}

function Click(){
    
    for(let p of scrollSketchs){
        //  console.log(p.priority, p.mouseX, p.mouseY, p.positions);
        for(let position of p.positions){
            if(p.mouseX > position.x && p.mouseX < position.x + position.w && p.mouseY > position.y && p.mouseY < position.y + position.h){
                console.log("modify: ", position.id);
                localStorage.clear();
                localStorage.setItem("ToModify", JSON.stringify(position.id));
                window.location.href = 'CreateTask';
            }
        }
        
    }
}