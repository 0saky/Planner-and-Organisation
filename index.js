
//Run the server
const express = require('express');
const app = express();
app.listen(8080, () => console.log('Listening at port 3000'));
app.use(express.static('public'));
app.use(express.json());

const Datastore = require('nedb');
let database = new Datastore('database.db');
database.loadDatabase();

const CategoriesStore = require('nedb');
let categories = new CategoriesStore('Categories.db');
categories.loadDatabase();

const TasksStore = require('nedb');
let tasks = new TasksStore('Tasks.db');
tasks.loadDatabase();

app.post('/receveEvenements', (request, response) => {
    const receved = request.body;

    let start = new Date(receved.start_date);
    const end = new Date(receved.end_date);

    console.log("Receved a request : start = ", start, " end = ", end);

    let to_send = [];

    let data = database.getAllData();

    for (let i = 0; i < data.length; i++) {

        const time_start = new Date(data[i].evenement.starting);

        const time_end = new Date(data[i].evenement.ending);

        if (time_end > start && time_start < end) {
            if(!data[i].evenement.deleted){
                data[i].evenement.id = data[i]._id;
                to_send.push(data[i].evenement);
            }
        }
    }
    response.json({
        status: 'Sucessfuly receved this :',
        data: to_send
    });

    //console.log('Response send : ', to_send);
});

app.post('/addEvenements', (request, response) => {
    const receved = request.body;

    console.log(receved);

    database.insert({ time: Date.parse(new Date(Date.now())), evenement: receved })

    response.json({
        status: 'Sucessfuly receved',
    });

    //  console.log('Response send');
});

app.post('/ModifiedEvenement', (request, response) => {
    const receved = request.body;

    console.log(receved);

    const time = Date.parse(new Date(Date.now()))

    const evenement = {
        title: receved.title,
        starting: receved.starting,
        ending: receved.ending,
        category: receved.category,
        sub_categories: receved.sub_categories,
        notes: receved.notes,
        deleted: receved.deleted
    }

    database.update({ _id: receved.id }, { time: time, evenement: evenement }, {});

    response.json({
        status: 'Sucessfuly receved',
    });

    // console.log('Response send');
});

app.post('/ListOfCategories', (request, response) => {

    console.log("Receved a request for list of categories: ")
    let to_send = [];

    let data = categories.getAllData();

    for (let i = 0; i < data.length; i++) {

        data[i].category.id = data[i]._id;
        to_send.push(data[i].category);

    }
    response.json({
        status: 'Sucessfuly receved this :',
        data: to_send
    });

    //  console.log('Response list of categories send: ', to_send);
});



app.post('/addCategorie', (request, response) => {

    console.log("Receved a request to add en Evenement")


    const category = request.body;

    // console.log(category);


    categories.insert({ time: Date.parse(new Date(Date.now())), category });

    response.json({
        status: 'Sucessfuly receved',
    });

    //  console.log('Response send');
});

app.post('/addTask', (request, response) => {

    console.log("Receved a request to add a Task")


    const task = request.body;

    //  console.log(task);


    tasks.insert({ task });

    response.json({
        status: 'Sucessfuly receved',
    });

    // console.log('Response send');
});

app.post('/ListOfTasks', (request, response) => {

    console.log("Receved a request for list of categories: ")

    let to_send = [];

    let data = tasks.getAllData();

    for (let i = 0; i < data.length; i++) {

        data[i].task.id = data[i]._id;
        to_send.push(data[i].task);

    }
    response.json({
        data: to_send
    });

    //console.log('Response send : ', to_send);
});

app.post('/ModifiedCategory', (request, response) => {
    const receved = request.body.cat;

    console.log("Modifying a Category: ", receved);

    const time = Date.parse(new Date(Date.now()))

    const category = receved;

    categories.update({ _id: request.body.id }, { time: time, category: category }, {});

    response.json({
        status: 'Sucessfuly receved',
    });

    // console.log('Response send');
});

app.post('/idTaskdetails', (request, response) => {
    const receved = request.body.id;

    console.log("Getting Details idTask: ", receved);

    let task;

    tasks.find({ _id: receved }, function (err, docs) {
        if (err) return reject(err);
        if (docs) {

            task = docs[0].task;
            task.id = docs[0]._id;

            response.json({
                status: 'Sucessfuly receved',
                task: task
            });

            console.log('Response send', task);
        }


    });


})

app.post('/ModifyTask', (request, response) => {
    const receved = request.body;

    console.log("Modif Task: ", receved);

    const task = {
        title: receved.title,
        priority: receved.priority,
        category: receved.category,
        notes: receved.notes,
        CreationTime: receved.CreationTime
    }

    tasks.update({ _id: receved.id }, { task: task }, {});

    response.json({
        status: 'Sucessfuly receved',
    });

    // console.log('Response send');
});



app.post('/StatsOfCategories', (request, response) => {
    const receved = request.body;

    console.log("Stats of categories: ", receved.duration, new Date(receved.date));

    const Data = database.getAllData();
    const Categories = categories.getAllData();

    let datalist = [];
    let start = new Date(2020, 0, 19, 0, 0, 0, 0);
    let end;

    if (receved.duration == "All Time") {
        datalist = Data;
    } else {
        if (receved.duration == "Year") {
            start = new Date(receved.date);
            start.setUTCMonth(0);
            start.setUTCDate(1);
            start.setUTCHours(0);
            start.setUTCMinutes(0);
            start.setUTCSeconds(0);
            start.setUTCMilliseconds(0);
            end = new Date(Date.parse(start));
            end.setUTCFullYear(start.getUTCFullYear() + 1);
        } else if (receved.duration == "Month") {
            start = new Date(receved.date);
            start.setUTCDate(1);
            start.setUTCMonth(start.getUTCMonth()-1);
            start.setUTCHours(0);
            start.setUTCMinutes(0);
            start.setUTCSeconds(0);
            start.setUTCMilliseconds(0);
            end = new Date(Date.parse(start));
            end.setUTCMonth(end.getUTCMonth() + 1);
        } else if (receved.duration == "Week") {
            start = new Date(receved.date);
            start.setUTCDate(start.getUTCDate() - 6);
            start.setUTCHours(0);
            start.setUTCMinutes(0);
            start.setUTCSeconds(0);
            start.setUTCMilliseconds(0);
            end = new Date(Date.parse(start));
            end.setUTCDate(start.getUTCDate() + 7);
        } else if (receved.duration == "Day") {
            start = new Date(receved.date);
            start.setUTCDate(start.getUTCDate() - 1);
            start.setUTCHours(0);
            start.setUTCMinutes(0);
            start.setUTCSeconds(0);
            start.setUTCMilliseconds(0);
            end = new Date(Date.parse(start));
            end.setUTCDate(start.getUTCDate() + 1);
        }

        console.log("Start:", start, " End: ", end);

        for (let i = 0; i < Data.length; i++) {
            
            const time_start = new Date(Data[i].evenement.starting);
    
            const time_end = new Date(Data[i].evenement.ending);
    
            if (time_end > start && time_start < end) {
                datalist.push(Data[i]);
            }
        }
    }

    let categoriesArray = [];
    for (let cat of Categories) {
        let category = cat.category;
        category.cummulative = 0;
        category.numberOfEvent = 0;
        categoriesArray.push(category);
    }
    // console.log(categoriesArray);

    for (let eve of datalist) {
        const evenement = eve.evenement;
        if (evenement.category != undefined) {
            const time = new Date((Date.parse(new Date(evenement.ending)) - Date.parse(new Date(evenement.starting))));
            
            //  console.log(evenement.category + ": ", write);
            for (let category of categoriesArray) {
                if (evenement.category == category.name) {
                    category.cummulative += Date.parse(time);
                    category.numberOfEvent++;
                }
            }
        }

    }

    categoriesArray.sort((a, b) => parseFloat(b.cummulative) - parseFloat(a.cummulative));

    for (let category of categoriesArray) {
        category.cummulative += Date.parse(new Date(Date.UTC(2000, 0, 01, 0, 0, 0)));
        // let options = { timeZone: "UTC", year: "2-digit", month: "numeric", day: "numeric", hour12: false, hour: "numeric", minute: "2-digit" };
        let options = { timeZone: "UTC", year: "numeric", month: "long", day: "numeric", hour12: false, hour: "numeric", minute: "2-digit" };
        let lang = "en-US";
        let write = new Intl.DateTimeFormat(lang, options).format(category.cummulative);
        console.log(category.name + ": ", write, "with ", category.numberOfEvent, " events");
    }


    response.json({
        status: 'Sucessfuly receved',
        categories: categoriesArray,
        start_Date: start
    });

    // console.log('Response send');
});

