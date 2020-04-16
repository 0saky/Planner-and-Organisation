const lang = /*"fr-FR";*/   "en-US";
let numberofdays;
let categories;
let date = new Date(Date.now());
let parayears = [];
let paramonths = [];
let paradays = [];
let dates = [];
let widthofDays = 250;
let evenements;
let magnet_force = 15;


localStorage.clear();

let main = document.getElementById("main");

numberofdays = 1;
while ((numberofdays + 2) * widthofDays < main.clientWidth) {
    numberofdays++;
}
dates = [numberofdays];

upDates();

create_DOMS();

upHpara();

let calendar = document.createElement('div');
calendar.id = "calendar";
main.appendChild(calendar);

let legend = document.createElement('div');
legend.classList = "legend";
calendar.appendChild(legend);
legend.onchange = uplegend();

let event_info = document.createElement('div');
event_info.id = "event_info";
calendar.appendChild(event_info);

for (let i = 0; i < numberofdays; i++) {
    let day = document.createElement('div');
    day.id = "day" + i;
    day.classList = "day";
    calendar.appendChild(day);
}

uplegend();

requestCategories();

SyncData();

main.addEventListener('click', function main_click(e) {
    //  console.log("e", e);

    if (e.target) {
        let target = e.target;
        let stay = true;
        let condition = false;


        do {
            if (target.id == "main") {
                stay = false;
            } else {
                if (target.classList) {
                    for (let c of target.classList) {
                        if (c == "Event_tile") {
                            condition = true;
                            stay = false;
                        }
                    }
                }
                target = target.parentNode;
            }
        } while (stay);


        if (!condition) {
            reset(document.getElementById('event_info'));


        }

    }

})



document.getElementById('calendar').addEventListener('dblclick', (e) => {

    console.log("e", e);

    let day;
    let X = e.clientX;
    let Y = e.clientY;

    for (let date of document.getElementsByClassName('day')) {
        if (date.offsetLeft < e.clientX && e.clientX < date.offsetLeft + date.clientWidth) {
            day = date;
        }
    }

    //console.log(day);

    if (day) {
        let shift = document.getElementById('Head').clientHeight + document.getElementById('HBouttons').clientHeight;

        let temp = map(Y, shift, main.clientHeight, Date.parse(day.day_start), Date.parse(day.day_end));
        //console.log("temp", temp);
        let starting = new Date(temp);
        starting = new Date(Date.parse(starting) + magnet(starting));
        let ending = new Date(starting);
        ending.setHours(ending.getHours() + 2);

        let event = {
            title: "",
            category: "",
            notes: "",
            starting: starting,
            ending: ending,
            id: "Tempo",
        }
        let id = evenements.length;
        evenements.push(event);

        event = evenements[id];

        DrawEvent();

    }




})



