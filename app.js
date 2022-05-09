// Website
const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const fs = require('fs');
const path = require('path');
const app = express();
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('./sqlite3.db', (err) => { if (err) { console.log(err.message); } else { console.log('Connected to sqlite3 db.'); } });
const md5 = require('md5');

app.use(session({
	secret: 'secret',
    //cookie: { maxAge: 60000 },
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
app.use(flash());
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
	response.render('home', {
		title: "Home",
		css: "home"
	});
    response.end();
});

app.get('/login', (request, response) => {
    if (request.session.loggedin) {
		response.redirect('/account');
	} else {
		//response.sendFile(path.join(__dirname + '/templates/login.html'));
        const mess = request.flash('info');
        response.render('login', {
			title: "Login",
			css: "login",
            message: mess
        });
	}
});

app.post('/login', (request, response) => {
	let username = request.body.username;
	let password = request.body.password;
	if (username && password) {
		db.all('SELECT * FROM nodelogin WHERE username = ? AND password = ?', [username, md5(password)], (err, results) => {
			if (err) throw err;
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/account');
			} else {
                request.flash('info', 'Incorrect username OR password');
			    response.redirect('/login');
			}
			response.end();
		});
	} else {
		response.redirect('/login');
		response.end();
	}
});

app.get('/account', (request, response) => {
	if (request.session.loggedin) {
		response.render('account', {
			title: "Account",
			css: "account",
            name: request.session.username
        });
	} else {
		response.redirect('/');
	}
    response.end();
});

app.get('/logout', (request, response) => {
    if (request.session) {
        request.session.destroy(err => {
            if (err) {
                response.status(400).send('Unable to log out');
            } else {
                response.redirect('/');
            }
        });
    } else {
        response.redirect('/');
        response.end();
    }
});

app.get('/img', (request, response) => {
	const x = path.join(__dirname + '/static/images/' + request.query.img + '.jpg');
	if (fs.existsSync(x)) {
		response.sendFile(x);
	} else {
		response.render('404');
	}
})

app.get('*', (request, response) => {
	response.render('404', {
		title: "404",
		css: "404"
	});
    response.end();
});

app.listen(3000, () => console.log('Listening at 3000.'));
