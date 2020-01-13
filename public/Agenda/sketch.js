

const lang = /*"fr-FR";*/   "en-US";
const numberofdays = 6;
let evenements = [{
    title: "Working",
    starting: "2020-01-13T08:24:00",
    ending: "2020-01-13T10:45:00",
},
{
    title: "Sleeping",
    starting: "2020-01-10T13:46:00",
    ending: "2020-01-10T17:15:00",
}
]
let day;
let options;
let canvas;
let days_long;
let days_array;
//Number of miliseconds in a day;
const increment = 86400000;


function setup() {
    //Creating Canvas
    canvas = createCanvas(windowWidth - 20, windowHeight - 20);
    // background(220);

    //Get current date
    date = new Date(Date.now());

    create_buttons();


}

function draw() {

    background(255);

    days_long = [];
    days_array = [];

    for (let i = 0; i < numberofdays; i++) {

        const vardate = new Date(Date.parse(date) + (i - floor(numberofdays / 2)) * increment);
        days_array.push(vardate);
        let day = [];
        //Store it in diffrent variables
        options = { year: "numeric" }
        day.push(new Intl.DateTimeFormat(lang, options).format(vardate));
        options = { month: "long" }
        day.push(new Intl.DateTimeFormat(lang, options).format(vardate));
        options = { weekday: "long", day: "numeric" }
        day.push(new Intl.DateTimeFormat(lang, options).format(vardate));

        days_long.push(day);
        // console.log(day);
    }
    // console.log(days_long);

    //recuper premier et dernier de chaque
    let years = [0];
    let months = [0];

    for (let j = 1; j < days_long.length - 1; j++) {
        if (days_long[j][0] != days_long[j - 1][0]) {
            years.push(j);
        }
        if (days_long[j][1] != days_long[j - 1][1]) {
            months.push(j);
        }
    }
    years.push(numberofdays - 1);
    months.push(numberofdays - 1);
    // console.log("years : " + years);
    // console.log("months : "+ months);
    let conty = 0;
    let contm = 0;

    textAlign(CENTER);
    push();
    translate(150, 0);

    for (let k = 0; k < numberofdays; k++) {
        const column = k * width / numberofdays;
        if (k == floor((years[conty] + years[conty + 1]) / 2)) {

            conty++;
            contm++;

            textSize(25);
            noStroke();
            fill(0);
            text(days_long[k][0], column, 30);
            text(days_long[k][1], column, 60);
            text(days_long[k][2], column, 90);

        } else if (k == floor((months[contm] + months[contm + 1]) / 2)) {

            contm++;

            textSize(25);
            noStroke();
            fill(0);
            text(days_long[k][1], column, 60);
            text(days_long[k][2], column, 90);

        } else {

            textSize(25);
            noStroke();
            fill(0);
            text(days_long[k][2], column, 90);

        }
    }
    pop();


    conty = 0;
    contm = 0;
    for (let l = 0; l < numberofdays; l++) {
        //console.log(l);
        draw_clumnlines(l, days_long[l][2].includes("Monday"), (days_long[l][2].includes("1 ") && !(days_long[l][2].includes("11") || days_long[l][2].includes("21") || days_long[l][2].includes("31"))));
    }

    draw_rowlines();

    draw_past();

    draw_now();



}




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
}

function pday() {
    date = new Date(Date.parse(date) - increment);
}

function nday() {
    date = new Date(Date.parse(date) + increment);
}


function pyear() {

    date = new Date(date.getFullYear() - 1, 0, 1);

}
function nyear() {

    date = new Date(date.getFullYear() + 1, 0, 1);

}

function pmonths() {

    date = new Date(date.getFullYear(), date.getMonth() - 1, 1);

}
function nmonths() {

    date = new Date(date.getFullYear(), date.getMonth() + 1, 1);

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
            //console.log(start_time);
            if (sameDate(test_date, start_time) || sameDate(test_date, end_time)) {

                //console.log("Evenement a afficher : " + start_time + "Jusqu'a :" + end_time);

                const midnight = new Date(test_date.getFullYear(), test_date.getMonth(), test_date.getDate(), 0, 0, 0, 0);
                const next_day = new Date(test_date.getFullYear(), test_date.getMonth(), test_date.getDate() + 1, 0, 0, 0, 0);
                const py = map(Date.parse(start_time), Date.parse(midnight), Date.parse(next_day), 70, height);
                const ny = map(Date.parse(end_time), Date.parse(midnight), Date.parse(next_day), 70, height);
                
                noStroke();
                fill(0, 0, 255);
                rectMode(CORNERS);
                
                rect(i * (width / numberofdays) + 40, py, (i + 1) * (width / numberofdays) + 40, ny, 20);
            }
        }
    }
}

function sameDate(date1, date2) {
    if (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate()) {
        return true;
    }
    return false;
}