const express = require('express')
const session = require('express-session');
const {
    getHomePage, getLoginPage, postLogin, getUser, getLogout,
    getAdminUsersPage, postCreateUser, postEditUser, postDeleteUser,

    getMangerPage,
    getProduct
} = require('../controllers/homeController')
const router = express.Router()
router.use(session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: true
}));

router.get('/', getHomePage)
router.get('/login', getLoginPage)
router.post('/postLogin', postLogin)
router.get('/user', getUser)
router.get('/logout', getLogout)

router.get('/adminUsers', getAdminUsersPage)
router.post('/postCreateUser', postCreateUser)
router.post('/postEditUser', postEditUser)
router.post('/postDeleteUser/:id', postDeleteUser)

router.get('/manager', getMangerPage)

router.get('/product', getProduct)

module.exports = router;