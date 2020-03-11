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



    for (let i = 0; i < 3; i++) {
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

function getColor(init) {

    for (let category of categories) {
        if (category.name == init) {
            //console.log(category.color);
            return category.color;
        }
    }

    return 0;
}

function drawTasks(p) {
    //console.log("priority", this);

    for (let i = 0; i < p.tasksprio.length; i++) {
        p.rectMode(p.CORNER);
        p.noStroke();
        p.fill(getColor(p.tasksprio[i].categories));
        p.rect(5, (105 * i) + 5, p.width - 10, 100, 10);
        p.fill(255);
        p.stroke(0);
        p.textSize(20);
        p.text(p.tasksprio[i].title, 20, (105 * i) + 25);
        if ((i + 1) * 105 + 5 > p.height) {
            p.resizeCanvas(p.width, (i + 2) * 105 + 5);
        }
    }


}