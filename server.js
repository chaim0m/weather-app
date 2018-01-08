var express = require('express');
var app = express();
app.use(express.static('node_modules'));
app.use(express.static('public'))
app.get('/', function(request, response){
  response.send('Helloooooooo');
});
app.listen(8000);
console.log('server is running')
