const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');

const routes = require('./routes');

const app = express();
app.set('port', process.env.PORT || 9000)
const dboptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'frasesdeldia'
}

// ------------- MIDDLEWARES -------------------------- //
app.use(myconn(mysql, dboptions, 'single'));
app.use(express.json());

// ------------- ROUTES -------------------------- //
app.get('/', (req, res) => {
    res.send('Welcome to my API');
})

app.use('/api', routes);

// ------------- Server Running -------------------------- //
app.listen(app.get('port') , () => {
    console.log('El servidor esta corriendo por el puerto', app.get('port'));
} );