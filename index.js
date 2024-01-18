const express = require('express');
const app = express();
const ambulances = require('./data/ambulances.json');
const bodyParser = require('body-parser');
const fs = require('fs');

// parse application/x-xxx-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Function to read the JSON file
function readDataFromFile() {
    const rawData = fs.readFileSync('./data/ambulances.json');
    return JSON.parse(rawData);
}

// Function to write data to the JSON file
function writeDataToFile(data) {
    fs.writeFileSync('./data/ambulances.json', JSON.stringify(data, null, 2));
}

app.get('/ambulances', (req, res) => {
    res.status(200).json(ambulances);
});

app.get('/ambulances/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const ambulance = ambulances.find(ambulance => ambulance.id === id);
    res.status(200).json(ambulance);
});

app.post('/ambulances', (req, res) => {
    const newAmbulance = req.body;
    ambulances.push(newAmbulance);

    // Write the updated data back to the JSON file
    writeDataToFile(ambulances);

    res.status(201).json(ambulances);
});

app.put('/ambulances/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let ambulance = ambulances.find(ambulance => ambulance.id === id);

    // Update the ambulance properties
    ambulance.name = req.body.name;
    ambulance.matr = req.body.matr;
    ambulance.date = req.body.date;

    // Write the updated data back to the JSON file
    writeDataToFile(ambulances);

    res.status(303).json(ambulance);
});

app.delete('/ambulances/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let ambulance = ambulances.find(ambulance => ambulance.id === id);
    ambulances.splice(ambulances.indexOf(ambulance), 1);

    // Write the updated data back to the JSON file
    writeDataToFile(ambulances);

    res.status(200).json(ambulances);
});

app.listen(8080, () => {
    console.log('Server started');
});
