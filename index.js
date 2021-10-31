const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");
const replaceTemplateProjects = require("./modules/replaceTemplateProjects");
const path = require("path");

////Server

const tempOverview = fs.readFileSync(
	`${__dirname}/templates/template-overview.html`,
	"utf-8"
);
const tempLang = fs.readFileSync(
	`${__dirname}/templates/template-lang.html`,
	"utf-8"
);
const tempProjects = fs.readFileSync(
	`${__dirname}/templates/template-projects.html`,
	"utf-8"
);

const personalData = fs.readFileSync(
	`${__dirname}/dev-data/personal_data.json`,
	"utf-8"
);
const projectsData = fs.readFileSync(
	`${__dirname}/dev-data/projects.json`,
	"utf-8"
);

const personalDataObj = JSON.parse(personalData);
const projectsDataObj = JSON.parse(projectsData);

const server = http.createServer((req, res) => {
	const { pathname } = url.parse(req.url, true);
	const langHtml = personalDataObj.languages;
	const langList = langHtml.map((el) => replaceTemplate(tempLang, el)).join("");
	const tempLeft = tempOverview.replace("{%LANGUAGES%}", langList);
	const projectHtml = projectsDataObj
		.map((el) => replaceTemplateProjects(tempProjects, el))
		.join("");

	if (pathname === "/") {
		res.writeHead(200, {
			"Content-type": "text/html",
		});
		let output = replaceTemplate(tempLeft, personalDataObj);
		output = output.replace("{%PROJECTS%}", projectHtml);
		res.end(output);
	} else if (req.url.match(".png$")) {
		const imagePath = path.join(__dirname, "public", req.url);
		const fileStream = fs.createReadStream(imagePath);
		res.writeHead(200, { "Content-Type": "image/png" });
		fileStream.pipe(res);
	} else {
		res.writeHead(404, {
			"Content-type": "text/html",
		});
		res.end("<h1>Strony nie odnaleziono</h1>");
	}
});

server.listen(8000, "127.0.0.1", () => {
	console.log("Listening to requests on port 8000");
});
