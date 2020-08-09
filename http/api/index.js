const http = require('http');
const data = require('./urls.json');
const URL = require('url');
const fs = require('fs');
const path = require('path');

function writeFile(cb) {
  fs.writeFile(
    path.join(__dirname, 'urls.json'),
    JSON.stringify(data, null, 2),
    error => {
      if(error) throw error;

      cb(JSON.stringify({ message: 'updated' }));
    }
  );
}

http.createServer((req, res) => {
  const { name, url, del } = URL.parse(req.url, true).query;

  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*'
  });

  //all resources
  if(!name || !url) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.end(JSON.stringify(data));
  }

  if(del) {
    data.urls = data.urls.filter(
      item => String(item.url) !== String(url)
    );

    return writeFile((message) => res.end(message));
  }

  data.urls.push({ name, url });

  return writeFile((message) => res.end(message));

}).listen(3333, () => console.log("api is running"));
