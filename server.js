const mysql = require('mysql2/promise');
const myconn = require('express-myconnection');
const cors = require('cors');
const express = require('express');
const { createPool } = require('mysql2');
const routes = express.Router();


const app = express();
app.set('port', process.env.PORT || 9000)

async function main() {
    const conn = await createPool({
        host: 'aws.connect.psdb.cloud',
        user: '7dabj8xmed6ocd5olppr',
        password: 'pscale_pw_OuKd3ETQM3hrpAuMYMYlk30Zlkw0EmT8Iv6rHn8upNw',
        database: 'mysqltest',
        ssl: {
            rejectUnauthorized: false,
        }
    });

    try {
        // Crear una conexión a la base de datos

        // Realizar operaciones con la base de datos aquí
        routes.get('/obtener-frases', (req, res) => {
            req.getConnection((err, conn) => {
                if (err) return res.send(err);
                conn.query('SELECT * FROM frases;', (error, rows) => {
                    if (err) return res.send(err);
                    res.json(rows);
                });
            })
        })

        routes.get('/obtener-frase/:id', (req, res) => {
            req.getConnection((err, conn) => {
                if (err) return res.send(err);
                conn.query('SELECT * FROM frases WHERE id = ?;', [req.params.id], (error, rows) => {
                    if (err) return res.send(err);
                    res.json(rows);
                });
            })
        })

        routes.post('/agregar-frases', (req, res) => {
            req.getConnection((err, conn) => {
                if (err) return res.send(err);
                console.log(req.body);
                conn.query('INSERT INTO frases set ?', [req.body], (err, rows) => {
                    if (err) return res.send(err);
                    res.send('Frase Registrada con exito');
                });
            })
        })

        routes.put('/actualizar-frases/:id', (req, res) => {
            req.getConnection((err, conn) => {
                if (err) return res.send(err);
                console.log(req.body);
                conn.query('UPDATE  frases set ? WHERE id = ?', [req.body, req.params.id], (err, rows) => {
                    if (err) return res.send(err);
                    res.send('Frase Actualizado con exito');
                });
            })
        })

        routes.delete('/eliminar-frases/:id', (req, res) => {
            req.getConnection((err, conn) => {
                if (err) return res.send(err);
                console.log(req.body);
                conn.query('DELETE FROM frases WHERE id = ?', [req.params.id], (err, rows) => {
                    if (err) return res.send(err);
                    res.send('Frase Eliminada con exito');
                });
            })
        })

        //------------- MIDDLEWARES -------------------------- //
        app.use(express.json());
        app.use(cors());
        // Configurar CORS para permitir solicitudes desde http://localhost:8100
        app.use(cors({
            origin: '*',
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
        }));
        // ------------- ROUTES -------------------------- //
        app.get('/', (req, res) => {
            res.send('Welcome to my API');
        })

        app.use('/api', routes);

        // ------------- Server Running -------------------------- //
        app.listen(app.get('port'), () => {
            console.log('El servidor esta corriendo por el puerto', app.get('port'));
        });



        module.exports = routes;
        console.log('exitosa conexion');

        // Cerrar la conexión cuando hayas terminado
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
    }
}

main();

// const dboptions = {
//     host: 'aws.connect.psdb.cloud',
//     port: 3306,
//     user: '7dabj8xmed6ocd5olppr',
//     password: 'pscale_pw_OuKd3ETQM3hrpAuMYMYlk30Zlkw0EmT8Iv6rHn8upNw',
//     database: 'mysqltest'
// }

