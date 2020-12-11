const express    = require('express');
const path       = require('path');
const routes     = require('./routes/routes');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose')
const app        = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/prueba-usuarios')
	.then(db => console.log('conectado'))
	.catch(err => console.log(err))

app.use(routes);

app.set('port', 3000);
app.set('view engine', 'ejs');

app.listen(app.get('port'), ()=> {
	console.log('run in port:', app.get('port'))
});
