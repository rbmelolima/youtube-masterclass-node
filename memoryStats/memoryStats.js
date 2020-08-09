const os = require('os');
const log = require('./logger');

setInterval(() => {
  const { freemem, totalmem } = os;
  const total = parseInt(totalmem() / 1024 / 1024);
  const mem = parseInt(freemem() / 1024 / 1024);
  const percent = parseInt((mem / total) * 100);

  const date = new Date();

  const stats = {
    free: `${ mem }MB`,
    total: `${ total }MB`,
    usage: `${ percent }%`,
    timestamp: date.toLocaleString()
  };

  console.clear();
  console.log("----- Memory Stats -----");
  console.table(stats);

  log(`${ JSON.stringify(stats) }\n\n`);

}, 5000);

