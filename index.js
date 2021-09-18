const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");

////Server

const template = fs.readFileSync(`${__dirname}/templates/`);

const server = http.createServer((req, res) => {
	const { query, pathname } = url.parse(req.url, true);

	if (pathname === "/") {
		res.writeHead(200, {
			"Content-type": "text/html",
		});
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
