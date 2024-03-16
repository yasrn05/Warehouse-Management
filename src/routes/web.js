const express = require('express')
const session = require('express-session');
const {
    getHomePage, getLoginPage, getAbout, getUser, getAdminUsersPage, getMangerPage, getShipperPage,
    getLogout, postCreateUser,
    postEditUser, getEditUser,
    postLogin, getProduct,

    postCreateShipper,
    getUpdate, postUpdateUser, postDeleteUser, postRemoveUser
} = require('../controllers/homeController')
const router = express.Router()
router.use(session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: true
}));

router.get('/', getHomePage)
router.get('/about', getAbout)
router.get('/login', getLoginPage)
router.get('/user', getUser)
router.get('/adminUsers', getAdminUsersPage)
router.post('/postCreateUser', postCreateUser)


router.get('/editUser/:id', getEditUser)
router.post('/postEditUser', postEditUser)

router.get('/manager', getMangerPage)
router.get('/shipper', getShipperPage)
router.get('/logout', getLogout)
router.post('/postLogin', postLogin)

router.get('/product', getProduct)

router.get('/update/:id', getUpdate)
router.post('/createshipper', postCreateShipper)
router.post('/updateuser', postUpdateUser)
router.post('/deleteuser/:id', postDeleteUser)
router.post('/deleteuser', postRemoveUser)

module.exports = router;