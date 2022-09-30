const express = require('express');

const router = express.Router();

const {
    newDocente,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController');

router.route('/user').get(getUsers);
router.route('/user/:id').get(getUser);
router.route('/admin/user').post(newDocente);
router.route('/admin/user/:id').put(updateUser);
router.route('/admin/user/:id').delete(deleteUser);

module.exports = router;
