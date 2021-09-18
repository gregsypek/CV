const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");
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

const data = fs.readFileSync(
	`${__dirname}/dev-data/personal_data.json`,
	"utf-8"
);
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
	const { pathname } = url.parse(req.url, true);
	const langHtml = dataObj.languages;
	const langList = langHtml.map((el) => replaceTemplate(tempLang, el)).join("");
	const tempLeft = tempOverview.replace("{%LANGUAGES%}", langList);
	if (pathname === "/") {
		// console.log(langHtml);
		res.writeHead(200, {
			"Content-type": "text/html",
		});
		let output = replaceTemplate(tempLeft, dataObj);
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
