const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

let db = new sqlite3.Database('./sqlite3.db', (err) => {
    if (err) {
        console.log(err.message);
    } else {
        console.log('Connected to sqlite3 db.');
        createTable((err) => {
            if (err) {
                console.log(err.message);
            }
        });
    }
});

const createTable = () => {
    console.log('Creating database nodelogin ...');
    db.run(`
        CREATE TABLE IF NOT EXISTS nodelogin (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT)
    `, (err) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log('Inserting default data ...');
            const insert = 'INSERT INTO nodelogin (username, password) VALUES (?, ?)';
            const details = ["test", md5("password")];
            db.run(insert, details);
        }
    });
};

db.close();
