const express = require('express')
const session = require('express-session');
const {
    getHomePage, getLoginPage, postLogin, getUser, getProfile, getLogout,
    getAdminUsersPage, postCreateUser, postEditUser, postDeleteUser, getAdminStarsPage,
    getAdminPartnersPage, postCreatePartner, postEditPartner, postDeletePartner,
    getMangerProductsPage, postCreateProduct, postEditProduct, getManagerInfoProductPage,
    getMangerInputsPage, postCreateInput, postEditInput, getManagerInfoInputPage, postCreateInfoInput, postEditInfoInput,
    getMangerOutputsPage, postCreateOutput, postEditOutput, getManagerInfoOutputPage, postCreateInfoOutput, postEditInfoOutput,
    getShipperInputsPage, getShipperOutputsPage
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
router.get('/adminStars', getAdminStarsPage)
// Manager
router.get('/managerProducts', getMangerProductsPage)
router.post('/postCreateProduct', postCreateProduct)
router.post('/postEditProduct', postEditProduct)
router.get('/managerInfoProduct/:id', getManagerInfoProductPage)
router.get('/managerInputs/:id', getMangerInputsPage)
router.post('/postCreateInput', postCreateInput)
router.post('/postEditInput', postEditInput)
router.get('/managerInfoInput/:id', getManagerInfoInputPage)
router.post('/postCreateInfoInput', postCreateInfoInput)
router.post('/postEditInfoInput', postEditInfoInput)
router.get('/managerOutputs/:id', getMangerOutputsPage)
router.post('/postCreateOutput', postCreateOutput)
router.post('/postEditOutput', postEditOutput)
router.get('/managerInfoOutput/:id', getManagerInfoOutputPage)
router.post('/postCreateInfoOutput', postCreateInfoOutput)
router.post('/postEditInfoOutput', postEditInfoOutput)
//Shipper
router.get('/shipperInputs/:id', getShipperInputsPage)
router.get('/shipperOutputs/:id', getShipperOutputsPage)

module.exports = router;