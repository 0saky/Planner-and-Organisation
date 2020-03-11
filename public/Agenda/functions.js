//import { text } from "express";

function draw_clumnlines(i, bool1, bool2) {

    const column = (i - 0.5) * width / numberofdays + 165;
    stroke(0);
    if (bool2) {
        strokeWeight(5);
        line(column, 15, column, height);
    } else if (bool1) {
        strokeWeight(5);
        line(column, 70, column, height);
    } else {
        strokeWeight(3);
        line(column, 70, column, height);
    }
}

function draw_rowlines() {

    for (let i = 1; i < 6; i++) {
        const y = map(map(i, 0, 6, 0, 24), 0, 24, 70, height);
        stroke(0, 0, 0, 50);
        strokeWeight(4);

        line(40, y, width, y);

        noStroke();
        textSize(20)
        textAlign(LEFT);
        fill(0);
        text(i * 4 + "h", 0, y);

    }
}

function draw_text() {

    textSize(30);
    noStroke();
    fill(0);

    text("Agenda", 0, 30);


}

function create_buttons() {

    button_pyear = createButton('Prévious');
    button_pyear.position(15, 15);
    button_pyear.mousePressed(pyear);

    button_nyear = createButton('Next');
    button_nyear.position(width - 30, 15);
    button_nyear.mousePressed(nyear);

    button_pmonths = createButton('Prévious');
    button_pmonths.position(15, 45);
    button_pmonths.mousePressed(pmonths);

    button_nmonths = createButton('Next');
    button_nmonths.position(width - 30, 45);
    button_nmonths.mousePressed(nmonths);

    button_pday = createButton('Prévious');
    button_pday.position(15, 75);
    button_pday.mousePressed(pday);

    button_nday = createButton('Next');
    button_nday.position(width - 30, 75);
    button_nday.mousePressed(nday);

    button_home = createButton('Home');
    button_home.position(120, 20);
    button_home.attribute('onclick', "window.location.href = '/..';");

    button_createEvenement = createButton('Create New Evenement');
    button_createEvenement.position(180, 20);
    button_createEvenement.attribute('onclick', "window.location.href = 'CreateEvenement';");

    button_createEvenement = createButton('Manage Categories');
    button_createEvenement.position(350, 20);
    button_createEvenement.attribute('onclick', "window.location.href = 'ManageCategories';");


}




function pday() {
    date = new Date(Date.parse(date) - increment);
    SyncData();
}

function nday() {
    date = new Date(Date.parse(date) + increment);
    SyncData();
}


function pyear() {

    date = new Date(date.getFullYear() - 1, 0, 1);
    SyncData();

}
function nyear() {

    date = new Date(date.getFullYear() + 1, 0, 1);
    SyncData();

}

function pmonths() {

    date = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    SyncData();

}
function nmonths() {

    date = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    SyncData();

}

function draw_now() {
    const now = new Date(Date.now());

    for (let i = 0; i < numberofdays; i++) {
        if (sameDate(days_array[i], now)) {

            const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
            const next_day = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
            const y = map(Date.parse(now), Date.parse(midnight), Date.parse(next_day), 70, height);
            strokeWeight(5);
            stroke(255, 0, 0);
            line(i * (width / numberofdays) + 40, y, (i + 1) * (width / numberofdays) + 40, y);
        }
    }
}

function draw_past() {
    for (let i = 0; i < numberofdays; i++) {
        const test_date = days_array[i];

        for (let j = 0; j < evenements.length; j++) {
            // console.log(evenements[j].starting);
            start_time = new Date(evenements[j].starting);
            end_time = new Date(evenements[j].ending);

            const midnight = new Date(test_date.getFullYear(), test_date.getMonth(), test_date.getDate(), 0, 0, 0, 0);
            const next_day = new Date(test_date.getFullYear(), test_date.getMonth(), test_date.getDate() + 1, 0, 0, 0, 0);
            //console.log(start_time);
            if (Date.parse(start_time) < Date.parse(next_day) && Date.parse(end_time) > Date.parse(midnight)) {

                //console.log("Evenement a afficher : " + start_time + "Jusqu'a :" + end_time);
                let a = 20;
                let b = 20;


                if (Date.parse(start_time) < Date.parse(midnight)) {
                    start_time = midnight;
                    a = 30;
                }
                if (Date.parse(end_time) > Date.parse(next_day)) {
                    end_time = next_day;
                    b = 00;

                }

                const py = map(Date.parse(start_time), Date.parse(midnight), Date.parse(next_day), 70, height);
                const ny = map(Date.parse(end_time), Date.parse(midnight), Date.parse(next_day), 70, height);

                evenements_onpagePosition.push({
                    evenement_id: j,
                    px: i * (width / numberofdays) + 40,
                    py: py,
                    nx: (i + 1) * (width / numberofdays) + 40,
                    ny: ny
                })

            }
        }
    }
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

async function drawrect() {
    noStroke();

    for (let i = 0; i < evenements_onpagePosition.length; i++) {

        const color = getColor(evenements[evenements_onpagePosition[i].evenement_id].category);

        fill(color);

        rectMode(CORNERS);

        const position = evenements_onpagePosition[i];

        rect(position.px, position.py, position.nx, position.ny, 20, 20, 20, 20);
    }

}

function sameDate(date1, date2) {
    if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()) {
        return true;
    }
    return false;
}

async function SyncData() {

    console.log('Sending');

    const start_time = getfirstTime();
    const end_time = getEndTime();


    const data = {
        start_date: start_time,
        end_date: end_time
    }
    const sendoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('/receveEvenements', sendoptions);
    const json = await response.json();

    const received_data = json.data;

    for (let i = 0; i < received_data.length; i++) {
        evenements.push(received_data[i]);
    }
    console.log(evenements);

}

function getfirstTime() {
    let temp = new Date(days_array[0]);
    temp.setHours(0);
    temp.setMinutes(0);
    return Date.parse(temp);
}

function getEndTime() {
    let temp = new Date(Date.parse(days_array[numberofdays - 1]) + 86400000);

    temp.setHours(0);
    temp.setMinutes(0);
    return Date.parse(temp);

}

function mouse_over() {
    // console.log(mouseX, mouseY);
    for (let i = 0; i < evenements_onpagePosition.length; i++) {
        const position = evenements_onpagePosition[i];

        if (mouseX > position.px && mouseX < position.nx && mouseY > position.py && mouseY < position.ny) {
            //console.log(evenements[position.evenement_id]);
            return evenements[position.evenement_id];

        }
    }

    return "NaN";

}

function mouse_overEvenementInfo() {
    const response = mouse_over();
    //console.log("checking");
    if (response != "NaN") {
        //console.log("On a evenement")
        draw_evenementInfo(response);
    }
}

function mouseReleased() {
    const response = mouse_over();
    if (response != "NaN") {
        //console.log("Going to modify : ", response);
        localStorage.clear();
        localStorage.setItem("ToModify", JSON.stringify(response));
        window.location.href = 'CreateEvenement';
    }
}

function draw_evenementInfo(Evenement_description) {
    console.log(Evenement_description);
    translate(mouseX, mouseY);

    let rect_length = Evenement_description.title.length * 15;
    if (rect_length < 100) {
        rect_length = 100;
    }

    rectMode(CORNER);
    fill(255, 255, 255, 210);
    rect(0, 0, rect_length, 100, 10, 10);

    fill(0);
    textSize(20);
    text(Evenement_description.title, 20, 20);
    textSize(15);

    options = { hour: "2-digit", minute: "2-digit" }
    let start_time_Event = new Date(Evenement_description.starting);
    let end_time_Event = new Date(Evenement_description.ending);
    let write = new Intl.DateTimeFormat(lang, options).format(start_time_Event);
    text(write, 20, 45);
    write = new Intl.DateTimeFormat(lang, options).format(end_time_Event);
    text(write, 20, 60);

    textSize(15);
    text(Evenement_description.notes, 20, 80);

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
