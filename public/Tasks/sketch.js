let tasks;
let categories;
const Priority = ["High Priority", "Medium Priority", "Low Priority", "Done"];

let Create_MainSketch = p => {
    p.setup = () => {

        localStorage.clear();

        p.canvas = p.createCanvas(p.windowWidth + p.windowWidth/3, p.windowHeight - 40);

        create_buttons();        

        asyncgo();

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

        p.canvas = p.createCanvas(mainSketch.width / 4 - 20, mainSketch.height - 30);

        let div = document.createElement("div");
        document.body.append(div);
        div.id = "ForCanvas" + y;
        p.priority = Priority[y]
        div.style = "position: absolute; left: " + (mainSketch.width / 4 * y + 10) + "px; top: " + 50 + "px; width: " + (mainSketch.width / 4 - 10) + "px; height: " + (mainSketch.height - 30) + "px; overflow: auto";

        p.canvas.parent("ForCanvas" + y);

        p.canvas.mouseReleased(Click);

    }

    p.draw = () => {
        
    }
}

let mainSketch = new p5(Create_MainSketch);

let scrollSketchs = [];

for (let i = 0; i < 4; i++) {
    console.log("setup for:", i);
    scrollSketchs.push(new p5(Create_ScrollSketch))
}
