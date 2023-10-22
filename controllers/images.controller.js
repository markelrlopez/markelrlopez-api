const multer = require("multer");



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Especifica la carpeta donde se guardarán las imágenes
        cb(null, 'images/');
    },
    filename: function (req, file, cb) {
        // Genera un nombre único para la imagen
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
});

const upload = multer({ storage: storage });

exports.upload = upload.single("imagen");
