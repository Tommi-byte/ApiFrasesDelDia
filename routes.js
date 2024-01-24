const express = require('express');
const routes = express.Router();


// MÉTODOS FRASES DEL DIA
routes.get('/obtener-frases', (req, res) => {
    req.getConnection( (err, conn) => {
        if(err) return res.send(err);
        conn.query('SELECT * FROM frases;', (error, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    } )
})

routes.get('/obtener-frase/:id', (req, res) => {
    req.getConnection( (err, conn) => {
        if(err) return res.send(err);
        conn.query('SELECT * FROM frases WHERE id = ?;', [req.params.id] , (error, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    } )
})

routes.post('/agregar-frases', (req, res) => {
    req.getConnection( (err, conn) => {
        if(err) return res.send(err);
        console.log(req.body);
        conn.query('INSERT INTO frases set ?', [req.body] ,(err, rows) => {
            if(err) return res.send(err);
            res.send('Frase Registrada con exito');
        });
    } )
})



routes.put('/actualizar-frases/:id', (req, res) => {
    req.getConnection( (err, conn) => {
        if(err) return res.send(err);
        console.log(req.body);
        conn.query('UPDATE  frases set ? WHERE id = ?', [req.body,req.params.id] ,(err, rows) => {
            if(err) return res.send(err);
            res.send('Frase Actualizado con exito');
        });
    } )
})

routes.delete('/eliminar-frases/:id', (req, res) => {
    req.getConnection( (err, conn) => {
        if(err) return res.send(err);
        console.log(req.body);
        conn.query('DELETE FROM frases WHERE id = ?', [req.params.id] ,(err, rows) => {
            if(err) return res.send(err);
            res.send('Frase Eliminada con exito');
        });
    } )
})

// MÉTODOS ASIGNATURAS
routes.get('/obtener-asignaturas', (req, res) => {
    req.getConnection( (err, conn) => {
        if(err) return res.send(err);
        conn.query('SELECT * FROM asignatura;', (error, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    } )
})

routes.get('/obtener-inscripciones/:uid', (req, res) => {
    req.getConnection( (err, conn) => {
        if(err) return res.send(err);
        conn.query('SELECT * FROM inscripciones WHERE estudiante_id = ?;', [req.params.uid] , (error, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    } )
})



routes.get('/obtener-asistencia/:uid/:idAsignatura', (req, res) => {
    req.getConnection( (err, conn) => {
        if(err) return res.send(err);
        conn.query('SELECT * FROM asistencia WHERE uid_estudiante = ? AND id_asignatura = ? ;', [req.params.uid, req.params.idAsignatura] , (error, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    } )
})


routes.get('/obtener-detalle-asignatura/:id', (req, res) => {
    req.getConnection( (err, conn) => {
        if(err) return res.send(err);
        conn.query('SELECT * FROM asignatura WHERE id = ?;', [req.params.id] , (error, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    } )
})

routes.post('/agregar-asistencia', (req, res) => {
    req.getConnection( (err, conn) => {
        if(err) return res.send(err);

        const datosAsistencia = req.body;

        if (!datosAsistencia || !datosAsistencia.fecha || !datosAsistencia.estado ||  !datosAsistencia.uid_estudiante || !datosAsistencia.id_asignatura) {
            return res.status(400).json({ error: 'Datos de asistencia incompletos' });
        }

        conn.query('INSERT INTO asistencia set ?;', [req.body] , (error, rows) => {
            if(err) return res.send(err);
            res.json(rows);
        });
    } )
})








module.exports = routes;
