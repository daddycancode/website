const sqlite3 = require('sqlite3').verbose();

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
})

const createTable = () => {
    console.log('Creating database nodelogin ...');
    const table = `
        CREATE TABLE IF NOT EXISTS nodelogin (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        password TEXT)
    `;
    db.run(table);
    const insertData = () => {
        console.log("Inserting default data ...")
        db.run('INSERT INTO nodelogin (username, password) VALUES (\'test\', \'password\')');
    }
    db.run(table, insertData);
}

db.close();
