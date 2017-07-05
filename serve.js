var path = require('path');
var express = require('express');
const port = require(path.resolve('./package.json')).config.port;

var app = express();

app.use('/revealjs/', express.static(path.join(__dirname, 'node_modules', 'reveal.js')));
app.use('/headjs/', express.static(path.join(__dirname, 'node_modules', 'headjs', 'dist', '1.0.0')));
app.use('/', express.static(path.join(__dirname, 'dist')));

app.listen(port, () => {
  console.log(`Serve on port ${port}`);
});