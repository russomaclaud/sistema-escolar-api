const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        codigo: {
            type: Number,
            unique: true,
            minLength: [4, 'El código no debe ser menor de 4 números'],
            trim: true,
            required: [true, 'Por favor ingresa un código'],
        },
        numero_documento: {
            type: Number,
            min: 6,
            unique: true,
            trim: true,
            required: [true, 'Por favor ingresa un número de identificación'],
        },
        nombre: {
            type: String,
            minLength: [3, 'El nombre no debe ser menos de 3 caracteres'],
            maxLength: [50, 'El nombre no puede exceder los 50 caracteres'],
            trim: true,
            lowercase: true,
            required: [true, 'Por favor ingresa el nombre'],
        },
        apellido: {
            type: String,
            minLength: [3, 'El apellido no debe ser menos de 3 caracteres'],
            maxLength: [50, 'El apellido no puede exceder los 50 caracteres'],
            trim: true,
            lowercase: true,
            required: [true, 'Por favor ingresa el apellido'],
        },
        telefono_fijo: {
            type: String,
            minLength: [6, 'El teléfono fijo no debe de ser menor a 6 números'],
            maxLength: [15, 'El teléfono fijo no debe ser mayor a 15 números'],
            trim: true,
        },
        celular: {
            type: String,
            minLength: [
                6,
                'Númer del celular no debe de ser menor a 6 números',
            ],
            maxLength: [15, 'Númer del celular no debe ser mayor a 15 números'],
            trim: true,
        },
        correo: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            required: [true, 'Por favor ingresa un correo'],
        },
        direccion: {
            type: String,
            min: [19, 'La dirección no debe ser menor de 19 caracteres'],
            maxLength: [100, 'La dirección no debe ser mayor a 100 caracteres'],
        },
        experiencia_laboral: {
            type: String,
            trim: true,
        },
        formacion_academica: {
            type: String,
            trim: true,
        },
        fecha_exp: {
            type: Date,
            required: [true, 'Selecciona una fecha'],
        }, // año, mes, día
        fecha_nacimiento: { type: Date },
        fecha_inscripcion: { type: Date },
        fecha_expulsion: { type: Date },
        certificado: {
            type: String,
            enum: {
                values: ['si', 'no'],
                message:
                    'Por favor seleccione la opción correcta si tiene certificado',
            },
        },
        password: {
            type: String,
            minLength: [6, 'El password no debe ser menor a 6 caracteres'],
        },
        responsabilidad_economica: {
            type: String,
            enum: ['si', 'no'],
        },
        subsidio: {
            type: String,
            enum: ['si', 'no'],
        },
        interno: {
            type: String,
            enum: ['si', 'no'],
        },
        resguardo: {
            type: String,
            trim: true,
        },
        estudiante_Cabeza_familia: {
            type: String,
            enum: ['si', 'no'],
        },
        hijo_madre_cabeza_familia: {
            type: String,
            enum: ['si', 'no'],
        },
        hijo_veterano_fuerza_publica: {
            type: String,
            enum: ['si', 'no'],
        },
        hijo_heroe_nacion: {
            type: String,
            enum: ['si', 'no'],
        },
        imagen: {
            type: String,
            default: 'user_default.png',
        },
        estado_civil: {
            type: String,
            enum: {
                values: [
                    'soltero',
                    'casado',
                    'divorciado',
                    'viudo',
                    'union libre',
                ],
                message: 'Por favor seleccione el estado civil correcto',
            },
        },
        genero: {
            type: String,
            required: [true, 'Selecione un genero'],
            enum: {
                values: ['Femenino', 'Masculino', 'No tiene idea'],
                message: 'Por favor selecciona el genero correcto',
            },
        },
        grupo_sanguineo: {
            type: String,
            required: [true, 'Seleccione un grupo sanguineo'],
            enum: {
                values: ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB-', 'AB+'],
                message: 'Por favor seleccione el grupo sanguineo correcto',
            },
        },
        role: {
            type: String,
            required: [true, 'Seleccione un rol'],
            enum: {
                values: ['lider', 'docente', 'papitos', 'estudiante', 'admin'],
                mesage: 'Por favor seleciona el rol correcto',
            },
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model('User', userSchema);
