require('dotenv').config();

const User = require('../models/user');
const dbConnect = require('../config/nosql/mongodb');
const user = require('../data/user.json');

dbConnect();

const seedUsers = async () => {
    try {
        await User.deleteMany();
        console.log('Users están eliminados');

        await User.insertMany(user);
        console.log('Todos los usuarios están agregados');

        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
};

seedUsers();
