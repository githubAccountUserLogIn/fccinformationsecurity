const express = require('express');
const app = express();

const helmet = require('helmet');

app.use(helmet.hidePoweredBy({setTo: 'PHP 4.2.0'})); // Hide "X-Powered-By" header
app.use(helmet.frameguard({action: 'deny'})); // deny framing
app.use(helmet.xssFilter()); // Enable XSS Filter middleware
app.use(helmet.noSniff()); // prevent MIME-sniffing
app.use(helmet.ieNoOpen()); // prevent IE users from executing downloads in the trusted site context










































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