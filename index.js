
//Run the server
const express = require('express');
const app = express();
app.listen(3000, () => console.log('Listening at port 3000'));
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
    start.setDate(start.getDate() - 1);
    const end = new Date(receved.end_date);

    console.log("Receved a request : start = ", start, " end = ", end);

    let to_send = [];

    let data = database.getAllData();

    for (let i = 0; i < data.length; i++) {

        const time_start = new Date(data[i].evenement.starting);

        const time_end = new Date(data[i].evenement.ending);

        if (time_end > start && time_start < end) {
            data[i].evenement.id = data[i]._id;
            to_send.push(data[i].evenement);
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
        notes: receved.notes
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

    console.log("Stats of categories: ", receved);

    const Data = database.getAllData();
    const Categories = categories.getAllData();

    let categoriesArray = [];
    for (let cat of Categories) {
        let category = cat.category;
        category.cummulative = 0;
        category.numberOfEvent = 0;
        categoriesArray.push(category);
    }
    // console.log(categoriesArray);

    for (let eve of Data) {
        const evenement = eve.evenement;
        if (evenement.category != undefined) {
            const time = new Date((Date.parse(new Date(evenement.ending)) - Date.parse(new Date(evenement.starting))));
            let options = { hour12: false, hour: "numeric", minute: "2-digit" }
            let lang = "en-US";
            let write = new Intl.DateTimeFormat(lang, options).format(time);
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
        categories: categoriesArray
    });

    // console.log('Response send');
});

