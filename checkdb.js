const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

let db = new sqlite3.Database('./sqlite3.db', (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('Connected to sqlite3 db.');
        readDB((err) => {
            if (err) {
                console.log(err.message);
            }
        });

    }
})

const readDB = () => {
    console.log("Read data from nodelogin ...");
    db.all("SELECT * FROM nodelogin", function(err, rows) {
        rows.forEach((row) => {
            console.log(row.id + " : " + row.username + " : " + row.password);
        });
    });
}

db.close();
