const express = require('express');
const app = express();

const helmet = require('helmet');

app.use(helmet.hidePoweredBy({setTo: 'PHP 4.2.0'})); // Hide "X-Powered-By" header
app.use(helmet.noCache());

const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(helmet({
  xssFilter: true, // Enable XSS Filter middleware
  noSniff: true, // prevent MIME-sniffing
  ieNoOpen: true, // prevent IE users from executing downloads in the trusted site context
  dnsPrefetchControl: false, // enforce HSTS for a specified duration and require all subsequent requests to be made over HTTPS.
  frameguard: {
    action: 'deny'// deny framing
  },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // Allow resources to be loaded from the same origin ('self')
      scriptSrc: ["'self'", 'trusted-cdn.com'] // Allow scripts to be loaded from the same origin and 'trusted-cdn.com'
    }
  },
  hsts:{
    maxAge: ninetyDaysInSeconds,
    force: true
  }
}));










































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