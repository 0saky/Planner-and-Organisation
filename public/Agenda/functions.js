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

    //console.log('Sending');

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
    //   console.log(evenements);

    DrawEvent();
}

async function requestCategories() {

    //console.log('Sending');


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


    //console.log(received_data);

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
    let shift = document.getElementById('Head').clientHeight + document.getElementById('HBouttons').clientHeight;
    for (let i = 0; i < numberofdays; i++) {
        let DOM = DOMS[i];
        reset(DOM);
        let day_start = new Date(dates[i]);
        day_start.setHours(0, 0, 0, 0);
        let day_end = new Date(day_start);
        day_end.setDate(day_start.getDate() + 1);
        DOM.day_start = day_start;
        DOM.day_end = day_end;
        for (let event of evenements) {
            if (Date.parse(event.starting) < Date.parse(day_end) && Date.parse(event.ending) > Date.parse(day_start)) {
                let div = document.createElement('div');
                div.classList = 'Event';
                div.className += " Event_tile";
                div.id = event.id;
                // div.onmouseover = () => { console.log(event) }
                let top;
                let height;
                event.starting = new Date(event.starting);
                event.ending = new Date(event.ending);

                function updateposition() {
                    top = map(Date.parse(event.starting), Date.parse(day_start), Date.parse(day_end), 0, DOM.clientHeight);
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
                    // console.log(event.title, "height init", height);
                    top += shift;
                    write += "top: " + top + "px; height: " + height + "px; width: " + DOM.clientWidth + "px; ";
                    let color = getColor(event.category);
                    write += "background-color: " + color + "; ";
                    //console.log(write);
                    div.style = write;
                }

                updateposition();
                DOM.appendChild(div);

                let div_hd = document.createElement('div');
                div.appendChild(div_hd);

                let titre = document.createElement('h5');
                titre.textContent = event.title;
                titre.classList = "ETitle";

                div_hd.appendChild(titre);

                let div_time = document.createElement('p');
                div_hd.appendChild(div_time);
                div_time.id = "div_time";

                updateTimes();

                function updateTimes() {
                    let op = { hour: "2-digit", minute: "2-digit" };

                    let times = new Intl.DateTimeFormat(lang, op).format(new Date(event.starting));
                    times += " - ";
                    times += new Intl.DateTimeFormat(lang, op).format(new Date(event.ending));
                    div_time.textContent = times;
                }

                function Give_event_Info() {

                    reset(event_info);

                    let div_info = document.createElement('div');
                    event_info.appendChild(div_info);
                    div_info.id = "Div_info";
                    div_info.classList = "Event_tile";

                    let top = div.offsetTop;
                    let left = div.offsetLeft + div.offsetWidth;
                    if (top + div_info.offsetHeight > calendar.offsetHeight) {
                        top = calendar.offsetHeight - div_info.offsetHeight;
                    }
                    if (left + div_info.offsetWidth > calendar.offsetWidth) {
                        left = div.offsetLeft - div_info.offsetWidth;
                    }
                    if (left < 0) {
                        left = 0;
                    }

                    let write = "top: " + top + "px ; left: " + left + "px; ";
                    div_info.style = write;


                    let div_icons = document.createElement('div');
                    div_icons.id = "div_icons";

                    div_info.appendChild(div_icons);

                    let icon_modify = document.createElement('div');
                    div_icons.appendChild(icon_modify);
                    icon_modify.id = "icon_modify";
                    icon_modify.classList = "icons";

                    icon_modify.onclick = () => {

                        reset(div_info);

                        let input_title = document.createElement('input');
                        input_title.id = "input_title";
                        input_title.defaultValue = event.title;
                        input_title.onchange = () => {
                            event.title = input_title.value;
                        }
                        div_info.appendChild(input_title);

                        let selecter = document.createElement('select');
                        for(let cat of categories){
                            let op = document.createElement('option');
                            op.value = cat.name;
                            op.textContent = cat.name;
                            selecter.appendChild(op);
                        }
                        div_info.appendChild(selecter);
                        console.log("event.category", event.category);
                        selecter.value = event.category;
                        selecter.onchange = () => {
                            event.category = selecter.value;
                        }

                        let input_notes = document.createElement('input');
                        input_notes.id = "input_notes";
                        input_notes.defaultValue = event.notes;
                        input_notes.onchange = () => {
                            event.notes = input_notes.value;
                        }
                        div_info.appendChild(input_notes);

                        let button_save = document.createElement('button');
                        div_info.appendChild(button_save);
                        button_save.id = "button_save";
                        button_save.textContent = "Save";
                        button_save.onclick = () => {
                            if(event.id == "Tempo"){
                                SavenewEvent(event);
                            } else {
                                savemodifiedevent(event);
                            }
                        
                            
                        }
                        let button_furtherEdit = document.createElement('button');
                            button_furtherEdit.id = "button_furtherEdit";
                            button_furtherEdit.textContent = "Further Edits";
                            button_furtherEdit.onclick = () => {
                                localStorage.clear();
                             localStorage.setItem("ToModify", JSON.stringify(event));
                            window.location.href = 'CreateEvenement';
                            }
                            div_info.appendChild(button_furtherEdit)

                        
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
                    let options = { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" };
                    let write2 = new Intl.DateTimeFormat(lang, options).format(new Date(event.starting));
                    write2 += " - ";
                    if (Date.parse(event.starting) < Date.parse(day_start) || Date.parse(event.ending) > Date.parse(day_end)) {
                        write2 += new Intl.DateTimeFormat(lang, options).format(new Date(event.ending));
                    } else {
                        options = { hour: "2-digit", minute: "2-digit" };
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

                div.addEventListener('mousedown', mouveEvent);

                let isResizing = false;
                let MouveY;
                let MouveX;
                let initX;
                let initY;
                let orstart = event.starting;
                let orend = event.ending;


                function mouveEvent(e) {
                    window.addEventListener('mousemove', mouvemouse);
                    window.addEventListener('mouseup', mouseup);
                    let move = false;

                    initY = e.clientY;
                    initX = e.clientX;




                    function mouvemouse(e) {

                        if (!isResizing) {

                            move = true;

                            div.className += " cursor_move ";

                            MouveY = initY - e.clientY;
                            MouveX = initX - e.clientX;

                            updateEventMove(e);

                        }
                    }

                    function mouseup(e) {
                        window.removeEventListener('mousemove', mouvemouse);
                        window.removeEventListener('mouseup', mouseup);

                        div.classList.remove("cursor_move");
                        // console.log("move", move);

                        if (!move) {
                            Give_event_Info();
                        } if (isResizing) {

                        } else if (event.id != "Tempo") {

                            savemodifiedevent(event);
                        }
                    }
                }

                let div_resize = document.createElement('div');
                div_resize.id = "div_resize";
                div.appendChild(div_resize);
                div_resize.addEventListener("mousedown", (e) => {

                    //  console.log("isResizing");

                    isResizing = true;

                    initX = e.clientX;
                    initY = e.clientY;

                    window.addEventListener("mousemove", mousemovet);
                    window.addEventListener("mouseup", mouseupt);

                    function mousemovet(e) {
                        MouveX = initX - e.clientX;
                        MouveY = initY - e.clientY;

                        updateEvent();

                    }

                    function mouseupt(e) {
                        console.log("mouseupt")
                        window.removeEventListener("mousemove", mousemovet);
                        window.removeEventListener("mouseup", mouseupt);
                        isResizing = false;
                        if (event.id != "Tempo") {
                            savemodifiedevent(event);
                        }

                    }

                });

                function updateEvent() {

                    let another = map(-MouveY, 0, DOM.clientHeight, 0, Date.parse(day_end) - Date.parse(day_start));

                    event.ending = new Date(Date.parse(orend) + another);

                    event.ending = new Date(Date.parse(event.ending) + magnet(event.ending));


                    updateTimes();

                    updateposition();

                }

                function updateEventMove(e) {

                    let difference = map(-MouveY, 0, DOM.clientHeight, 0, Date.parse(day_end) - Date.parse(day_start));

                    event.starting = new Date(Date.parse(orstart) + difference);
                    event.ending = new Date(Date.parse(orend) + difference);

                    let mag = magnet(event.starting);
                    event.starting = new Date(Date.parse(event.starting) + mag);
                    event.ending = new Date(Date.parse(event.ending) + mag);

                    if (e.clientX < DOM.offsetLeft || e.clientX > DOM.offsetLeft + DOM.clientWidth) {
                        let day_difference = new Date(0);
                        //console.log("day_difference", day_difference);
                        for (let day of document.getElementsByClassName("day")) {
                            if (day.offsetLeft < e.clientX && e.clientX < day.offsetLeft + day.clientWidth) {
                                day_difference = new Date(day.day_start - DOM.day_start)
                                //console.log(day_difference.getDate());
                            }
                        }
                        event.starting = new Date(Date.parse(event.starting) + Date.parse(day_difference));
                        event.ending = new Date(Date.parse(event.ending) + Date.parse(day_difference));

                        console.log(Date.parse(event.starting));

                        DrawEvent();

                    }

                    updateTimes();

                    updateposition();

                }

                


            }
        }
        let now = new Date();
        if (Date.parse(now) > Date.parse(day_start) && Date.parse(now) < Date.parse(day_end)) {
            let y = map(Date.parse(now), Date.parse(day_start), Date.parse(day_end), 0, DOM.clientHeight);
            y += shift;
            let div_now = document.createElement('div');
            DOM.appendChild(div_now);
            div_now.id = "div_now";
            div_now.style = `top: ${y}px; width: ${DOM.clientWidth}px; `;
            div_now.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 237.43 12.44"><defs><style>.cls-1{fill:red;stroke:red;stroke-miterlimit:10;}</style></defs><title>Asset 1</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polygon class="cls-1" points="15.93 6.22 1.93 1.22 6.93 6.22 1.93 11.22 15.93 6.22"/><line class="cls-1" x1="15.93" y1="6.22" x2="237.43" y2="6.22"/></g></g></svg>`;
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

    //console.log(json);

    if (json.status == 'Sucessfuly receved') {
        SyncData();
    } else { alert("Somthing as went wrong") }
}

function magnet(date) {

    let newd = new Date(date);
    newd.setMinutes(Math.floor(newd.getMinutes() / magnet_force) * magnet_force, 0, 0);

    return Date.parse(newd) - Date.parse(date);
}

async function SavenewEvent(event){

    data = {
        title: event.title,
        starting: new Date(event.starting),
        ending: new Date(event.ending),
        notes: event.notes,
        category: event.category
    }

    const sendoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('/addEvenements', sendoptions);
    const json = await response.json();

    console.log(json);

    if (json.status == 'Sucessfuly receved') {
        SyncData();
    }


}