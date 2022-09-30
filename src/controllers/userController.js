const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Crear un Nuevo Docente
exports.newDocente = catchAsyncErrors(async (req, res, next) => {
    const docente = await User.create(req.body);

    if (!docente) {
        res.status(400).json({ msg: 'El docente ya existe' });
    }

    res.status(201).json({ msg: 'Docente ingresado correctamente', docente });
});

// Obtener todos los usuarios
exports.getUsers = catchAsyncErrors(async (req, res, next) => {
    const resultPorPage = 20;
    const userCount = await User.countDocuments();

    const apiFeatures = new APIFeatures(
        User.find({ role: 'estudiante' }),
        req.query
    )
        .search()
        .filter()
        .pagination(resultPorPage);

    const users = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: users.length,
        userCount,
        users,
    });
});

//Obtener un usuario
exports.getUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new ErrorHandler('User not found', 404));

    return res.status(200).json({
        success: true,
        user,
    });
});

// Actualizar usuario
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    let user = await User.findById(req.params.id);

    if (!user) return next(new ErrorHandler('User not found', 404));

    user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user,
    });
});

// Eliminar usuario
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new ErrorHandler('User not found', 404));

    await user.remove();

    res.status(200).json({
        success: true,
        message: 'Usuario removido',
    });
});
