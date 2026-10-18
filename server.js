const http = require('http');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const types = { '.css': 'text/css', '.js': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml' };
http.createServer((req, res) => {
  const requested = req.url === '/' ? '/index.html' : decodeURIComponent(req.url.split('?')[0]);
  const file = path.normalize(path.join(root, requested));
  if (!file.startsWith(root)) return res.writeHead(403).end();
  fs.readFile(file, (error, data) => {
    if (error) return res.writeHead(404).end('Not found');
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'text/html' });
    res.end(data);
  });
}).listen(process.env.PORT || 4173, () => console.log('Portfolio ready at http://localhost:4173'));
