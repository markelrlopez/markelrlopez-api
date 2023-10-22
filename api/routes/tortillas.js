const express = require('express');
const router = express.Router();
const dbConnection = require('../../db');

const imagesController = require("../../controllers/images.controller");

router.get('/', (req, res, next) => {
    const query = 'SELECT * FROM Tortilla';

    dbConnection.query(query, (err, results) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            res.status(500).json({
                error: 'Error interno del servidor'
            });
        } else {
            res.status(200).json({
                message: 'Consulta GET exitosa',
                data: results
            });
        }
    });

})
router.get('/:tortillaId', (req, res, next) => {
    const tortillaId = req.params.tortillaId;
    const query = `SELECT * FROM Tortilla WHERE id=${tortillaId}`;

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

// Ruta POST para agregar una tortilla con una imagen
router.post('/', imagesController.upload ,(req, res, next) => {
    console.log(req)
    const { email, nombreBar, nota, precio, longitud, latitud} = req.body;
    const imagen = req.files[0].filename; // Nombre del archivo de imagen subido
    


    const query = 'INSERT INTO Tortilla (email, nombreBar, nota, precio, longitud, latitud, imagen) VALUES (?, ?, ?, ?, ?, ?, ?)';
    dbConnection.query(query, [email, nombreBar, nota, precio, longitud, latitud, imagen], (err, result) => {
        if (err) {
            console.error('Error al insertar en la base de datos:', err);
            res.status(500).json({
                error: 'Error interno del servidor'
            });
        } else {
            res.status(201).json({
                createdEncuestaId: `Tortilla creada con el id ${result.insertId}`
            });
            console.log(`Tortilla creada con el id ${result.insertId}`)
        }
    });
});


module.exports = router;