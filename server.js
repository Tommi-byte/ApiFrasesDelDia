const cors = require('cors');
const express = require('express');
const { createPool } = require('mysql2/promise');
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

