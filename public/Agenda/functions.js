function upDates() {
    dates[0] = new Date(date);
    dates[0].setDate(date.getDate() - Math.floor(numberofdays / 2))
    for (let i = 1; i < numberofdays; i++) {
        let temp = new Date(dates[i - 1]);
        temp.setDate(temp.getDate() + 1);
        dates[i] = new Date(temp);
    }
}

function create_DOMS() {

    let Head = document.createElement('div');
    Head.classList = "Head";
    Head.id = "Head";
    main.appendChild(Head);

    let titre = document.createElement('h1');
    Head.appendChild(titre);
    titre.textContent = "Agenda";
    titre.classList = "Title";

    let home = document.createElement('button');
    Head.appendChild(home);
    home.onclick = () => { window.location.href = '/..'; };
    home.textContent = "Home";

    let ManageCategories = document.createElement('button');
    Head.appendChild(ManageCategories);
    ManageCategories.onclick = () => { window.location.href = 'ManageCategories'; };
    ManageCategories.textContent = "ManageCategories";

    let CreateEvenement = document.createElement('button');
    Head.appendChild(CreateEvenement);
    CreateEvenement.onclick = () => { window.location.href = 'CreateEvenement'; };
    CreateEvenement.textContent = "CreateEvenement";

    let div = document.createElement('div');
    div.id = "HBouttons";
    div.classList = "Bouttons";
    main.appendChild(div);

    let button_pyear = document.createElement('button');
    div.appendChild(button_pyear);
    button_pyear.textContent = "<<<";


    center = document.createElement('div');
    div.appendChild(center);
    center.classList = "Hcenter";

    for (let i = 0; i < numberofdays; i++) {
        let p = document.createElement('p');
        p.classList = "parayear";
        p.classList = "parainfo";
        center.appendChild(p);
        parayears.push(p);
    }

    let button_nyear = document.createElement('button');
    div.appendChild(button_nyear);
    button_nyear.textContent = ">>>";


    let button_pmonths = document.createElement('button');
    div.appendChild(button_pmonths);
    button_pmonths.textContent = "<<";


    center = document.createElement('div');
    div.appendChild(center);
    center.classList = "Hcenter";

    for (let i = 0; i < numberofdays; i++) {
        let p = document.createElement('p');
        p.classList = "paramonths";
        p.classList = "parainfo";
        center.appendChild(p);
        paramonths.push(p);
    }

    let button_nmonths = document.createElement('button');
    div.appendChild(button_nmonths);
    button_nmonths.textContent = ">>";


    let button_pday = document.createElement('button');
    div.appendChild(button_pday);
    button_pday.textContent = "<";


    center = document.createElement('div');
    div.appendChild(center);
    center.classList = "Hcenter";

    for (let i = 0; i < numberofdays; i++) {
        let p = document.createElement('p');
        p.classList = "paradays";
        p.classList = "parainfo";
        center.appendChild(p);
        paradays.push(p);
    }

    let button_nday = document.createElement('button');
    div.appendChild(button_nday);
    button_nday.textContent = ">";

    button_pyear.onclick = pyear;
    button_nyear.onclick = nyear;
    button_pmonths.onclick = pmonths;
    button_nmonths.onclick = nmonths;
    button_pday.onclick = pday;
    button_nday.onclick = nday;

}

function pday() {

    date.setDate(date.getDate() - 1);
    console.log("Going 1 day back to ", date);
    upSync();
}

function nday() {
    date.setDate(date.getDate() + 1);
    console.log("Going 1 day on to ", date);
    upSync();

}

function pyear() {
    date.setFullYear(date.getFullYear() - 1);
    console.log("Going 1 year back to ", date);
    upSync();

}

function nyear() {
    date.setFullYear(date.getFullYear() + 1);
    console.log("Going 1 year on to ", date);
    upSync();

}

function pmonths() {
    date.setMonth(date.getMonth() - 1);
    console.log("Going 1 month back to ", date);
    upSync();

}

function nmonths() {
    date.setMonth(date.getMonth() + 1);
    console.log("Going 1 month on to ", date);
    upSync();

}

function upSync() {
    upDates();
    upHpara();
    SyncData();
}

function upHpara() {

    for (let i = 0; i < numberofdays; i++) {
        parayears[i].textContent = dates[i].getFullYear();
        let options = { month: "long" };
        let write = new Intl.DateTimeFormat(lang, options).format(dates[i]);
        paramonths[i].textContent = write;
        options = { weekday: "short", day: "numeric" };
        write = new Intl.DateTimeFormat(lang, options).format(dates[i]);
        paradays[i].textContent = write;
    }
}

function uplegend() {
    reset(legend);
    for (let i = 0; i < 24; i++) {
        let div = document.createElement('div');
        legend.appendChild(div);
        div.classList = "Lines";
        let height = i * calendar.clientHeight / 24;
        div.style = `height: ${height}px`;
        let time = document.createElement('p');
        time.textContent = i + ":00";
        time.classList = "time";
        time.style = `margin-top: ${height}px`;
        legend.appendChild(time);
    }
}

function reset(node) {
    while (node.childElementCount) {
        node.removeChild(node.firstChild);
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

async function SyncData() {

    console.log('Sending');

    const start_time = getfirstTime();
    const end_time = getEndTime();

    //console.log(start_time, end_time);

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

    evenements = [];

    for (let i = 0; i < received_data.length; i++) {
        evenements.push(received_data[i]);
    }
    console.log(evenements);

    DrawEvent();
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

function getfirstTime() {
    let temp = new Date(dates[0]);
    temp.setHours(0, 0, 0, 0);
    return Date.parse(temp);
}

function getEndTime() {
    let temp = new Date(dates[numberofdays - 1]);
    temp.setDate(temp.getDate() + 1);
    temp.setHours(0, 0, 0, 0);
    return Date.parse(temp);
}

function DrawEvent() {
    let DOMS = document.getElementsByClassName('day');
    for (let i = 0; i < numberofdays; i++) {
        let DOM = DOMS[i];
        reset(DOM);
        let day_start = new Date(dates[i]);
        day_start.setHours(0, 0, 0, 0);
        let day_end = new Date(day_start);
        day_end.setDate(day_start.getDate() + 1);
        for (let event of evenements) {
            if (Date.parse(event.starting) < Date.parse(day_end) && Date.parse(event.ending) > Date.parse(day_start)) {
                let div = document.createElement('div');
                div.classList = 'Event';
                div.className +=  " Event_tile";
                div.id = event.title;
               // div.onmouseover = () => { console.log(event) }
                let top = map(Date.parse(event.starting), Date.parse(day_start), Date.parse(day_end), 0, DOM.clientHeight);
                let bottom = map(Date.parse(event.ending), Date.parse(day_start), Date.parse(day_end), 0, DOM.clientHeight);
                let write = "";
                if (Date.parse(event.starting) < Date.parse(day_start)) {
                    top = 0;
                    write += "border-top-left-radius: 0px; border-top-right-radius: 0px; ";
                }
                if (Date.parse(event.ending) > Date.parse(day_end)) {
                    bottom = DOM.clientHeight;
                    write += "border-bottom-right-radius: 0px; border-bottom-left-radius: 0px; ";
                }
                height = bottom - top;
                top += document.getElementById('Head').clientHeight + document.getElementById('HBouttons').clientHeight;
                write += "top: " + top + "px; height: " + height + "px; width: " + DOM.clientWidth + "px; ";
                let color = getColor(event.category);
                write += "background-color: " + color + "; ";
                //console.log(write);
                div.style = write;
                DOM.appendChild(div);
                let titre = document.createElement('h5');
                titre.textContent = event.title;
                titre.classList = "ETitle";
             
                div.appendChild(titre);
                div.onclick = function Event_onClick () {
                   // console.log("Event click");
                    reset(event_info);
                    let div_info = document.createElement('div');
                    event_info.appendChild(div_info);
                    div_info.id = "Div_info";
                    div_info.classList = "Event_tile";
                    div_info.onclick = Div_info_onClick;
                    let top = div.offsetTop;
                    let left = div.offsetLeft + div.offsetWidth;
                    if (top + div_info.offsetHeight > calendar.offsetHeight) {
                        top = calendar.offsetHeight - div_info.offsetHeight;
                    }
                    if (left + div_info.offsetWidth > calendar.offsetWidth) {
                        left = div.offsetLeft - div_info.offsetWidth;
                    }
                    let write = "top: " + top + "px ; left: " + left + "px; ";
                    div_info.style = write;
                   // console.log(div);

                   let div_icons = document.createElement('div');
                   div_icons.id = "div_icons";
                   
                   div_info.appendChild(div_icons);

                   let icon_modify = document.createElement('div');
                   div_icons.appendChild(icon_modify);
                   icon_modify.id = "icon_modify";
                   icon_modify.classList = "icons";
                  
                   icon_modify.onclick = () => {
                       localStorage.clear();
                       localStorage.setItem("ToModify", JSON.stringify(event));
                       window.location.href = 'CreateEvenement';
                   }
                   icon_modify.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" ><path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L3 16.82V21h4.18L20.41 7.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"></path></svg>`
                   
                   let icon_delete = document.createElement('div');
                   div_icons.appendChild(icon_delete);
                   icon_delete.id = "icon_delete";
                   icon_delete.classList = "icons";
                  
                   icon_delete.onclick = () => {
                      console.log("delete this? ", event);
                      if (confirm(`Delete this? \n ${event.title}: \n ${event.category} \n ${event.starting} / ${event.ending}\n ${event.notes}`)) {
                        console.log("confirmed")
                        event.deleted = true;
                        savemodifiedevent(event);
                      } else {
                        console.log("aboard")
                      }
                   }
                   icon_delete.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" ><path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path><path d="M9 8h2v9H9zm4 0h2v9h-2z"></path></svg>`;
                  

                    let event_title = document.createElement('h3');
                    event_title.id = "info_title";
                 
                    div_info.appendChild(event_title);
                    event_title.textContent = event.title;
                    let options = {year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"};
                    let write2 = new Intl.DateTimeFormat(lang, options).format(new Date(event.starting));
                    write2 += " - ";
                    if(Date.parse(event.starting) < Date.parse(day_start) || Date.parse(event.ending) > Date.parse(day_end)){
                        write2 += new Intl.DateTimeFormat(lang, options).format(new Date(event.ending));
                    } else {
                        options = {hour: "2-digit", minute: "2-digit"};
                        write2 += new Intl.DateTimeFormat(lang, options).format(new Date(event.ending));
                    }
                    let inf_times = document.createElement('p');
                    inf_times.id = "inf_times";
                  
                    div_info.appendChild(inf_times);
                    inf_times.textContent = write2;

                    let inf_category = document.createElement('p');
                    div_info.appendChild(inf_category);
                    inf_category.id = "inf_category";
                    inf_category.textContent = event.category;

                    let div_notes = document.createElement('div');
                    div_notes.id = "div_notes";
                    div_info.appendChild(div_notes);

                    let inf_notes = document.createElement('p');
                    div_notes.appendChild(inf_notes);
                    inf_notes.id = "inf_notes";
                    inf_notes.textContent = event.notes;

                }
            }
        }
    }


}

function map(x, in_min, in_max, out_min, out_max) {
    let res = (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    //console.log(res);
    return res;
}

async function savemodifiedevent(event) {
    const sendoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    }
    const response = await fetch('/ModifiedEvenement', sendoptions);
    const json = await response.json();

    console.log(json);

    if (json.status == 'Sucessfuly receved') {
        SyncData();
    } else {alert("Somthing as went wrong")}
}