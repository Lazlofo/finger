const http = require('http')
	, fs = require("fs")
	, url = require('url')
	, path = require('path')
	, mime = require('./mime.js');

// server
http.createServer((req, res) => {
	let pathname = url.parse(req.url).pathname
		, extname = '';

	if (req.url.search('api') !== -1) { // api
		console.log(req.url);
		let opts = null
			, res_data = ""
			, new_req = null;

		opts = {
			hostname: '120.55.105.197',
			port: 80,
			path: 'http:/' + req.url,
			method: 'GET',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
		new_req = http.request(opts, (new_res) => {
			console.log('STATUS: ' + new_res.statusCode);
			new_res.setEncoding('utf8');
			new_res.on('data', (chunk) => {
				res_data += chunk;
			});
			new_res.on('end', () => {
				res.writeHead(200, { 'Content-Type': 'text/json' });
				res.write(res_data);
				res.end();
			});
		});

		new_req.on('error', (e) => { console.log('ERR:' + e.message); });
		new_req.end();
	} else { // file
		if (pathname === '/') { pathname = '/index.html'; }
		if (pathname === '/favicon.ico') {
			res.writeHead(404, { 'Content-Type': 'text/plain' });
			res.end();
		} else {
			extname = path.extname(pathname).slice(1);

			fs.readFile(pathname.slice(1), function (err, data) {
				if (err) {
					res.writeHead(404, { 'Content-Type': 'text/plain' });
				} else {
					res.writeHead(200, { 'Content-Type': mime[extname] || 'text/plain' });
					res.write(data);
				}
				res.end();
			});
		}
	}
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');
