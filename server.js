const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');

const routes = require('./routes');

const app = express();
app.set('port', process.env.PORT || 9000)
const dboptions = {
    host: 'bbllm2j0vjqbag4k7rrb-mysql.services.clever-cloud.com',
    port: 3306,
    user: 'unpghdu84erzmx9y',
    password: 'b3sNVfPyLz8m1iPyIkl2',
    database: 'bbllm2j0vjqbag4k7rrb'
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