const express = require('express');
const projects = express.Router();

projects.get('/', (request, response) => {
	response.render('projects/projects', {
		title: "Projects",
		css: "projects/projects"
	});
    response.end();
});

module.exports = projects;