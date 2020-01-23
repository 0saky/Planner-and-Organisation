//Run the server
const express = require('express');
const app = express();
app.listen(3000, () => console.log('Listening at port 3000'));
app.use(express.static('public'));
app.use(express.json())

const Datastore = require('nedb');


let database = new Datastore('database.db');
database.loadDatabase();

app.post('/receveEvenements', (request, response) => {
    const data = request.body.time;
    
    database.insert({time: data});
    response.json({
        status: 'Sucessfuly receved this :',
        times: database.getAllData()
    });
    console.log(database.getAllData());
    console.log('Response send')
})