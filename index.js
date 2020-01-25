
//Run the server
const express = require('express');
const app = express();
app.listen(3000, () => console.log('Listening at port 3000'));
app.use(express.static('public'));
app.use(express.json())

const Datastore = require('nedb');
let database = new Datastore('database.db');
database.loadDatabase();

/*
let evenements = [
    {
        title: "Watching videos",
        starting: "2020-01-25T11:00:00",
        ending:"2020-01-25T12:35:00",
        category:"Divertisment"
    },
    {
        title:"Doing push-ups",
        starting:"2020-01-24T14:30:00",
        ending:"2020-01-24T15:00:00",
        category:"Sport"
    },
    {
        title:"Sleeping",
        starting:"2020-01-23T22:46:00",
        ending:"2020-01-24T10:15:00",
        category:"Sleep"
    }
]


for(let i = 0; i < evenements.length; i++){
    database.insert({time: Date.parse(new Date(Date.now())), evenement: evenements[i]})
}
*/



app.post('/receveEvenements', (request, response) => {
    const receved = request.body;



    const start = receved.start_date;
    const end = receved.end_date;

    console.log("Receved a request : start = ", new Date(start), " end = ", new Date(end));

    let to_send = [];

    let data = database.getAllData();

    for (let i = 0; i < data.length; i++) {

        const time_start = Date.parse(new Date(data[i].evenement.starting));
        const time_end = Date.parse(new Date(data[i].evenement.ending));

        if (time_end > start && time_start < end) {
            to_send.push(data[i].evenement);
        }
    }
    response.json({
        status: 'Sucessfuly receved this :',
        data: to_send
    });

    console.log('Response send : ', to_send);
});

app.post('/addEvenements', (request, response) => {
    const receved = request.body;

    console.log(receved);

    database.insert({time: Date.parse(new Date(Date.now())), evenement: receved})

    response.json({
        status: 'Sucessfuly receved',
    });

    console.log('Response send');
})