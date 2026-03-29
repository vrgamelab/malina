const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5500;

const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    filePath = path.join(__dirname, filePath);

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 - File Not Found</h1>');
        } else {
            const ext = path.extname(filePath);
            let contentType = 'text/html';
            if (ext === '.css') contentType = 'text/css';
            if (ext === '.js') contentType = 'text/javascript';

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Server also available on all interfaces at http://${HOST}:${PORT}/`);
    console.log('Press Ctrl+C to stop the server');
});
