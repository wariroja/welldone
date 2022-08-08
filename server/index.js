const express = require('express')
const app = express()
const datastore = require('nedb')
app.listen(3000, () => console.log('listening at 3000'))
app.use(express.static('public')); //allows express to host static file
app.use(express.json({limit: '1mb'})) // to make app understanding data as json 


//request = all information from the client
const database = new datastore('database.db');
database.loadDatabase()


app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
      if (err) {
        response.end();
        return;
      }
      console.log('response, fromback', data)
      response.send(data);
    });
  });


app.post('/api', (request, response) => {
    const data = request.body
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data)
    response.json(data)
    console.log('datafrompost', response)
} )
