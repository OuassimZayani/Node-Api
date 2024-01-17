const express = require('express')
const app = express()
const ambulances = require('./data/ambulances.json')

app.get('/ambulances',(req,res)=>{
    res.status(200).json(ambulances)
    // res.send("Ambulances list")
})
// app.get("/get", () => { console.log("object"); })
app.listen(8080, () => { console.log("Server started"); })