const express = require('express')
const app = express()
const ambulances = require('./data/ambulances.json')
var bodyParser = require('body-parser')

// parse application/x-xxx-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/ambulances', (req, res) => {
    res.status(200).json(ambulances)
    // res.send("Ambulances list")
})
app.get('/ambulances/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const ambulance = ambulances.find(ambulance => ambulance.id === id)
    res.status(200).json(ambulance)
})
app.post('/ambulances/create', (req, res) => {
    console.log(req.body)
    ambulances.push(req.body)
    res.status(201).json(ambulances)
})
app.put('/ambulances/:id', (req, res) => {
    const id = parseInt(req.params.id)
    let ambulance = ambulances.find(ambulance => ambulance.id === id);
    ambulance.name = req.body.name;
    ambulance.name = req.body.matr;
    ambulance.name = req.body.date;
    res.status(303).json(ambulance)
})
app.delete('/ambulances/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let ambulance = ambulances.find(ambulance => ambulance.id === id);
    ambulances.splice(ambulances.indexOf(ambulance), 1);

    res.status(200).json(ambulances)
})


app.listen(8080, () => { console.log("Server started"); })