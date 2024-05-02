const express = require('express');
const app = express();

const helmet = require('helmet');
app.use(
  helmet({
    hidePoweredBy: {setTo: 'PHP 4.2.0'}, // Hide "X-Powered-By" header
    frameguard: {action: 'deny'}, // deny framing
    xssFilter: true, // Enable XSS Filter middleware
    noSniff: true // prevent MIME-sniffing
  })
);












































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});