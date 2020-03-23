async function requestCategories() {

    console.log('Sending data: ', date);


    const data = {
        duration: selecter.value,
        date: Date.parse(date)
    };
    const sendoptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    const response = await fetch('/StatsOfCategories', sendoptions);
    const json = await response.json();
    categories = json.categories;

    console.log("json: ", json);
    let options = {day:"numeric", year: "numeric", month: "long",  }
    let lang = "en-US";

    let write = new Intl.DateTimeFormat(lang, options).format(new Date(json.start_Date));

    let h1 = document.getElementById('H1');
    h1.innerText = "Stats since :" + write;

}
function map(x, in_min, in_max, out_min, out_max) {
    if (x <= in_min) return out_min;
    else if (x >= in_max) return out_max;
    else {
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }
}

function Draw_Categories() {
    for (let category of categories) {
        const totaltime = category.cummulative;
        let div = document.getElementById(category.name);
        let a = document.createElement('a');
        a.textContent = category.name;
        div.appendChild(a);
        let rect = document.createElement('div');
        // let time_past = Date.parse(new Date(Date.now())) - Date.parse(new Date(Date.UTC(2020, 1, 01, 19, 0, 0))) + Date.parse(new Date(Date.UTC(2000, 0, 01, 0, 0, 0)));
        // const w = map(totaltime, Date.parse(new Date(Date.UTC(2000, 0, 01, 0, 0, 0))), time_past, 0, 1500);

        const w = map(totaltime, Date.parse(new Date(Date.UTC(2000, 0, 01, 0, 0, 0))), categories[0].cummulative, 0, 1500);
        console.log(category.name, w);
        rect.style = "background-color: " + category.color + "; height: 30px; width: " + w + "px ;";
        div.appendChild(rect);
        let p = document.createElement('small');

        let lang = "en-US";
        const date = new Date(totaltime);
        let write = "";
        if (date.getUTCFullYear() != 2000) {
            let options = { timeZone: "UTC", year: "numeric" };
            write += new Intl.DateTimeFormat(lang, options).format(date) + " year, ";
        }
        if (date.getUTCMonth() != 0) {
            let options = { timeZone: "UTC", month: "long" };
            write += new Intl.DateTimeFormat(lang, options).format(date) + " month, ";
        }
        if (date.getUTCDate() != 1) {
            let options = { timeZone: "UTC", day: "numeric" };
            date.setUTCDate(date.getUTCDate()-1);
            write += new Intl.DateTimeFormat(lang, options).format(date) + " day, ";
        }
        if (date.getUTCHours() != 0) {
            let options = { timeZone: "UTC", hour12: false, hour: "numeric", };
            write += new Intl.DateTimeFormat(lang, options).format(date) + " hour, ";
        }
        if (date.getUTCMinutes() != 0) {
            let options = { timeZone: "UTC", minute: "2-digit" };
            write += new Intl.DateTimeFormat(lang, options).format(date) + " mins";
        }

        p.textContent = write;
        p.style = "color: white;";
        let insert = document.createElement('div');
        insert.style = "text-align: center; padding: 5px;";
        insert.appendChild(p);
        rect.appendChild(insert);
    }
}

function div_categories(){
    for (let i = 0; i < categories.length; i++) {
        console.log("Making div: " + categories[i].name)
        let div = document.createElement('div');
        div.id = categories[i].name;
        div.style = "margin-bottom: 8px!important;";
        document.getElementById('main').appendChild(div);
    }
}

function delete_Dom(){
    const myNode = document.getElementById("main");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
}

async function fct_pre() {
    console.log("Called previous");
    switch (selecter.value) {
        case "Day":
            date.setDate(date.getDate() - 1);
            break;
        case "Week":
            date.setDate(date.getDate() - 7);
            break;
        case "Month":
            date.setMonth(date.getMonth() - 1);
            break;
        case "Year":
            date.setFullYear(date.getFullYear() - 1);
            break;
        default:
            break;
    }
    requestCategories().then(function () {
        div_categories();
    }
    ).then(function(){
        Draw_Categories();
    })
    delete_Dom();
}
async function fct_nex() {
    console.log("Called next");
    switch (selecter.value) {
        case "Day":
            date.setDate(date.getDate() + 1);
            break;
        case "Week":
            date.setDate(date.getDate() + 7);
            break;
        case "Month":
            date.setMonth(date.getMonth() + 1);
            break;
        case "Year":
            date.setFullYear(date.getFullYear() + 1);
            break;
        default:
            break;
    }
    requestCategories().then(function () {
        div_categories();
    }
    ).then(function(){
        Draw_Categories();
    })
    delete_Dom();
}
async function fct_sel(){
    console.log("Called selecter");
    requestCategories().then(function () {
        div_categories();
    }
    ).then(function(){
        Draw_Categories();
    })
    delete_Dom();
}