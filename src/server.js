require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const dbConnect = require('./config/nosql/mongodb');
const user = require('./routes/userRouter');
const errorMiddleware = require('./middlewares/errors');

// Handle uncaught Exception
// Manejo Excepción no detectada
process.on('uncaughtException', (err) => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Apagando del servidor debido a una excepción no detectada');
    process.exit(1);
});

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'storage')));
app.use(cors());

// DB Conexión
dbConnect();

// Routes
app.use('/api', user);

// Middleware para ErrorHandlers
app.use(errorMiddleware);

// Servidor
const port = process.env.PORT || 4000;
const Server = app.listen(port, () => {
    console.log(
        `Servidor corriendo en http://localhost:${port} in ${process.env.NODE_ENV} mode`
    );
});

// Handle Unhandled Promise rejections
// Manejar el rechazo de Promesa no manejado
process.on('unhandledRejection', (err) => {
    console.log(`ERROR: ${err.message}`);
    console.log(
        'Cerrar el servidor debido al rechazo de Promesa no controlada'
    );
    Server.close(() => {
        process.exit(1);
    });
});
