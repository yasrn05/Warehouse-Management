const express = require('express')
const session = require('express-session');
const {
    getHomePage, getLoginPage, getAbout, getUser,
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
router.get('/product', getProduct)

router.post('/postLogin', postLogin)

router.get('/update/:id', getUpdate)
router.post('/createshipper', postCreateShipper)
router.post('/updateuser', postUpdateUser)
router.post('/deleteuser/:id', postDeleteUser)
router.post('/deleteuser', postRemoveUser)

module.exports = router;