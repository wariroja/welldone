
const express = require('express');
const Datastore = require('nedb')
const path = require('path')
const app = express();
const cors = require('cors');
const { response } = require('express');
const database = new Datastore('database.db');
database.loadDatabase();
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors())
app.use(express.json())

app.get("/api", (req, res) => {
    console.log({req})
    res.set('Access-Control-Allow-Origin', '*');
    database.find({}, (err, data) => {
        if(err) {
            res.end()
            return
        }
        res.json(data)
    })
})

app.post("/api", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const data = req.body
    console.log(req.body)
    database.insert(data)
    console.log(res.body)
    res.end()
})
    
+



app.listen(9000, () => {
    console.log('listening on http://localhost:9000')
})

module.exports = app;