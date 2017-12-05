var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var port = process.env.PORT || 5000;

var pool = require('./modules/pool',pool)

var companies = require('./routes/companies')
var cars = require('./routes/car')

app.use(express.static('server/public'));
app.use(bodyParser.json());

app.use('/car', cars);
app.use('/companies', companies);

app.listen(port, function(){
    console.log('listening on port', port);  
});