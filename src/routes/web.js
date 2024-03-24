const express = require('express')
const session = require('express-session');
const {
    getHomePage, getLoginPage, postLogin, getUser, getProfile, getLogout,
    getAdminUsersPage, postCreateUser, postEditUser, postDeleteUser,
    getAdminPartnersPage, postCreatePartner, postEditPartner, postDeletePartner,
    getMangerProductsPage, postCreateProduct, postEditProduct, postDeleteProduct,
    getMangerInputsPage, postCreateInput, postEditInput, getManagerInfoInputPage
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
router.get('/profile', getProfile)
router.get('/logout', getLogout)
// Admin
router.get('/adminUsers', getAdminUsersPage)
router.post('/postCreateUser', postCreateUser)
router.post('/postEditUser', postEditUser)
router.post('/postDeleteUser/:id', postDeleteUser)
router.get('/adminPartners', getAdminPartnersPage)
router.post('/postCreatePartner', postCreatePartner)
router.post('/postEditPartner', postEditPartner)
router.post('/postDeletePartner/:id', postDeletePartner)
// Manager
router.get('/managerProducts', getMangerProductsPage)
router.post('/postCreateProduct', postCreateProduct)
router.post('/postEditProduct', postEditProduct)
router.post('/postDeleteProduct/:id', postDeleteProduct)
router.get('/managerInputs/:id', getMangerInputsPage)
router.post('/postCreateInput', postCreateInput)
router.post('/postEditInput', postEditInput)
router.get('/managerInfoInput/:id', getManagerInfoInputPage)

module.exports = router;