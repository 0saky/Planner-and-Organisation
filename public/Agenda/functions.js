
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

    button_sync = createButton('Sync');
    button_sync.position(width/2, 20);
    button_sync.mousePressed(SyncData);
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
            if (Date.parse(start_time) < Date.parse(next_day) && Date.parse(end_time) > Date.parse(midnight) ) {

                //console.log("Evenement a afficher : " + start_time + "Jusqu'a :" + end_time);
                let a = 20;
                let b = 20;


                if(Date.parse(start_time) < Date.parse(midnight)){
                    start_time = midnight;
                    a = 0; 
                }
                if(Date.parse(end_time) > Date.parse(next_day)){
                    end_time = next_day;
                    b = 0;
                }
               
                const py = map(Date.parse(start_time), Date.parse(midnight), Date.parse(next_day), 70, height);
                const ny = map(Date.parse(end_time), Date.parse(midnight), Date.parse(next_day), 70, height);
                
                noStroke();
               
                fill(255, 255, 0);

                if(evenements[j].category == "Sleep"){
                    fill(0, 0, 255);
                } else if(evenements[j].category == "Work"){
                    fill(255, 0, 0);
                } else if(evenements[j].category == "Divertisment"){
                    fill(255, 0, 255);
                } else if(evenements[j].category == "Sport"){
                    fill(0, 255, 0);
                }

                rectMode(CORNERS);
                
                rect(i * (width / numberofdays) + 40, py, (i + 1) * (width / numberofdays) + 40, ny, a, a, b, b);
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

async function SyncData(){

    console.log('Sending');

    const start_time = getfirstTime();
    const end_time = getEndTime();

    timeset = Date.parse(new Date(Date.now()));
   

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

       for(let i = 0; i < received_data.length; i++){
           evenements.push(received_data[i]);
       }
       console.log(evenements);
       
}

function getfirstTime() {
    return Date.parse(days_array[0]);
}

function getEndTime() {
    return Date.parse(days_array[numberofdays-1]);
}