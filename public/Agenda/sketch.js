
const lang = /*"fr-FR";*/   "en-US";
const numberofdays = 6;
let evenements = [];
let day;
let options;
let canvas;
let days_long;
let days_array;
//Number of miliseconds in a day;
const increment = 86400000;
let sync = false;


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

    draw_past();

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

    

    draw_now();

    draw_text();

    
    if(!sync){
        SyncData();
        sync = true;
    }
    
}




