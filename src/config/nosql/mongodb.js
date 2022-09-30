const mongoose = require('mongoose');

const dbConnect = () => {
    const DB_URI = process.env.DB_URI;
    mongoose.connect(
        DB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err) => {
            if (!err) {
                console.log('MongoDB conectado');
            } else {
                console.log('***** ERROR DE CONEXION ****');
            }
        }
    );
};

module.exports = dbConnect;
