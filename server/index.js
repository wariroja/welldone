const express = require('express')
const app = express()
const datastore = require('nedb')
const path = require('path')
const cors = require('cors')
app.set("views", path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.listen(8080, () => console.log('listening at 8080'))
app.use(express.static('public')); //allows express to host static file
app.use(express.json());

//request = all information from the client
const database = new datastore('database.db');
database.loadDatabase()

app.use(cors())
app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
      if (err) {
        response.end();
        return;
      }
      console.log('response, fromback', data)
      response.send(data);
    });
    response.send('ho')
  });


app.post('/api', (request, response) => {
    console.log(request, response)
    const data = request.body //object
    console.log({data})
    const timestamp = Date.now();
    if(data.body){
        data.timestamp = timestamp
    }
    database.insert(data)
    response.json(data)
    
    console.log('datafrompost', response)
} )

module.exports = app;