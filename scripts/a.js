
const sqlite3 = require('sqlite3');
let db = new sqlite3.Database(':memory')

client = JSON.parse();

function checkAccounts(){

}







db.serialize(function() {
    db.run(`CREATE TABLE [IF NOT EXISTS] auth.token {
        id data_type PRIMARY KEY,
        token TEXT NOT NULL, 
        exp_date TEXT NOT NULL'
    });
})
function getToken() {return 'ok'}

function refreshToken(){}

exports.getToken = getToken();
exports.refresh = 


