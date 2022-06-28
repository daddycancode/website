const express = require('express');
const projects = express.Router();

projects.get('/', (request, response) => {
	response.render('projects/projects', {
		title: "Projects",
		css: "projects/projects"
	});
    response.end();
});

projects.get('/wordle', (request, response) => {
	response.render('projects/wordle', {
		title: "Wordle",
		css: "projects/wordle/wordle"
	});
    response.end();
});

module.exports = projects;