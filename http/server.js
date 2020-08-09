const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
  const file = req.url === '/' ? 'index.html' : req.url;
  const filePath = path.join(__dirname, 'public', file);
  const extname = path.extname(filePath);

  const allowedFilesTypes = ['.html', '.css', '.js'];
  const allowed = allowedFilesTypes.find(item => item === extname);

  if(!allowed) return;

  fs.readFile(
    filePath,
    (error, content) => {
      if(error) { throw error; }

      res.end(content);
    }
  );

}).listen(3000, () => console.log("server is running"));

