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
    const response = await fetch('/StatsOfCategories', sendoptions);
    const json = await response.json();
    categories = json.categories;

}
function map(x, in_min, in_max, out_min, out_max){
    if(x <= in_min)return out_min;
    else if(x >= in_max)return out_max;
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
        rect.style = "background-color: "+category.color+"; height: 30px; width: "+ w + "px ;";
        div.appendChild(rect);
        let p = document.createElement('small');
        
        let lang = "en-US";
        const date = new Date(totaltime);
        let write = "";
        if(date.getUTCFullYear() != 2000){
            let options = { timeZone: "UTC", year: "numeric" };
            write += new Intl.DateTimeFormat(lang, options).format(date) + " year, ";
        }
        if( date.getUTCMonth() != 0){
            let options = { timeZone: "UTC", month: "long" };
            write += new Intl.DateTimeFormat(lang, options).format(date) + " month, ";
        }
        if ( date.getUTCDate() != 0){
            let options = { timeZone: "UTC", day: "numeric" };
            write += new Intl.DateTimeFormat(lang, options).format(date) + " day, ";
        } 
        if (date.getUTCHours() != 0){
            let options = { timeZone: "UTC", hour12: false, hour: "numeric", };
            write += new Intl.DateTimeFormat(lang, options).format(date) + " hour, ";
        }
        if (date.getUTCMinutes() != 0){
            let options = { timeZone: "UTC",  minute: "2-digit" };
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