const express = require('express');
const router = express.Router();
const dbConnection = require('../../db');

router.get('/', (req, res, next) => {
    const query = 'SELECT * FROM Usuario';

    dbConnection.query(query, (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.status(500).json({
                error: 'Error interno del servidor'
            });
        } else {
            res.status(200).json({
                data: results
            });
        }
    });

})
router.get('/:userEmail', (req, res, next) => {
    const userEmail = req.params.userEmail;
    const query = `SELECT Usuario.id,Usuario.email,pregunta,respuesta FROM Usuario INNER JOIN Encuesta ON Usuario.email=Encuesta.email WHERE Usuario.email=${userEmail}`;

    dbConnection.query(query, [userEmail],(err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.status(500).json({
                error: 'Error interno del servidor'
            });
        } else {
            res.status(200).json({
                data: results
            });
        }
    });

})

router.post('/:userEmail', (req, res, next) => {
    const email = req.params.userEmail;

    const query = 'INSERT INTO Usuario (email) VALUES (?)'; 

    dbConnection.query(query, [email], (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos:', err);
            res.status(500).json({
                error: 'Error interno del servidor'
            });
        } else {
            res.status(201).json({
                createdEncuestaId: `Usuario creado con el id ${result.insertId}`
            });
        }
    });
});



module.exports = router;