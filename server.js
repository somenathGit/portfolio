const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5173;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.pdf': 'application/pdf'
};

function requestHandler(req, res) {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    const headers = {
      'Content-Type': contentType,
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Access-Control-Allow-Origin': '*'
    };

    if (ext === '.pdf') {
      headers['Content-Disposition'] = 'inline; filename="' + path.basename(filePath) + '"';
    }

    res.writeHead(200, headers);

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

function listenOnPort(port) {
  const s = http.createServer(requestHandler);
  s.listen(port, '0.0.0.0', () => {
    console.log(`⚡ Dev Server active at:`);
    console.log(`   > http://localhost:${port}/`);
    console.log(`   > http://127.0.0.1:${port}/\n`);
  });
  s.on('error', (err) => {
    if (err.code !== 'EADDRINUSE') {
      console.error(`Port ${port} error:`, err);
    }
  });
  return s;
}

// Single constant port: 5173
listenOnPort(PORT);
