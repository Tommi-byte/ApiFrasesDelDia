const express = require('express');
const routes = express.Router();

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

module.exports = routes;
