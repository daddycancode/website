const express = require('express');
const account = express.Router();

account.get('/', (request, response) => {
	if (request.session.loggedin) {
		response.render('account/account', {
			title: "Account",
			css: "account/account",
            name: request.session.username
        });
	} else {
		response.redirect('/login');
	}
    response.end();
});

module.exports = account;