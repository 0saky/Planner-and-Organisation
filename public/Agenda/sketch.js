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

localStorage.clear();

let main = document.getElementById("main");

numberofdays=1;
while((numberofdays+2)*widthofDays < main.clientWidth){
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

for(let i = 0; i < numberofdays; i++){
    let day = document.createElement('div');
    day.id = "day"+i;
    day.classList = "day";
    calendar.appendChild(day);
}

uplegend();

requestCategories();

SyncData();







