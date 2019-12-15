const express = require('express')
const sqlite3 = require('sqlite3').verbase();
const auth = require('./routes/a');
const dbInit = require('./initdb');

const app = express()
const port = 8080

dbInit.dbInit();

function getToken() {
    return 'ok'
}

app.get('/', (req, res) => res.send('Hallo world!'))

app.listen(port , () => console.log('Example app listening on port ${port}!'));

app.post('/', (req, res) => res.send('Hello world!'));

app.post('/get_token', function(req, res) {
    res.send('POST request to the homepage')
})

app.listen(post, () => console.log("Example app"));

