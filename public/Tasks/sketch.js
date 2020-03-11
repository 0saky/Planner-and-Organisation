let tasks;
let categories;
const Priority = ["High Priority", "Medium Priority", "Low Priority", "Done"];

let Create_MainSketch = p => {
    p.setup = () => {


        p.canvas = p.createCanvas(p.windowWidth - 20, p.windowHeight - 20);

        create_buttons();

        getTasks();

        requestCategories();

    }

    p.draw = () => {

        draw_text();


    }
}

let Create_ScrollSketch = p => {
    p.setup = () => {

        let y = 0
        while (document.getElementById("ForCanvas" + y)) {
            y++;
        }
        console.log("Creating", y);

        p.canvas = p.createCanvas(mainSketch.width / 3 - 30, mainSketch.height - 55);

        let div = document.createElement("div");
        document.body.append(div);
        div.id = "ForCanvas" + y;
        p.priority = Priority[y]
        div.style = "position: absolute; left: " + (mainSketch.width / 3 * y + 10) + "px; top: " + 50 + "px; width: " + (mainSketch.width / 3 - 10) + "px; height: " + (mainSketch.height - 50) + "px; overflow: auto";

        p.canvas.parent("ForCanvas" + y);

    }

    p.draw = () => {

        p.background(31, 128, 52, 50);

        if (p.tasksprio) {
            drawTasks(p);
        }

    }
}

let mainSketch = new p5(Create_MainSketch);

let scrollSketchs = [];

for (let i = 0; i < 3; i++) {
    console.log("setup for:", i);
    scrollSketchs.push(new p5(Create_ScrollSketch))
}
