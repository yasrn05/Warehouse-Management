const connection = require('../config/database');
const {
    getLogin, 
    getListUsers, createUser, editUserById, deleteUserById,
    getListPartners, createPartner, editPartnerById, deletePartnerById
} = require('../services/CRUDService');

const getHomePage = (req, res) => {
    res.render('home.ejs')
}
const getLoginPage = (req, res) => {
    if (req.session.user) {
        res.redirect('/user')
    } else {
        res.render('login.ejs')
    }
}
const postLogin = async (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;
    let results = await getLogin(userName, password);
    if (results && results.length > 0) {
        let user = results[0];
        req.session.user = user;
        req.session.role = Object.values(user)[Object.values(user).length - 1];
        res.redirect('/user');
    } else {
        res.redirect('/login');
    }
}
const getUser = async (req, res) => {
    if (req.session.role == 'admin') {
        res.redirect('/adminUsers');
    } else if (req.session.role == 'manager') {
        res.redirect('/manager');
    } else if (req.session.role == 'shipper') {
        res.redirect('/shipper');
    } else {
        res.redirect('/login');
    }
}
const getLogout = (req,res) => {
    req.session.role = false;
    req.session.user = false;
    res.redirect('/');
}

const getAdminUsersPage = async (req,res) => {
    if (req.session.role == 'admin') {
        let results = await getListUsers();
        return res.render('adminUsers.ejs', {
            admin : req.session.user,
            listUser : results
        });
    } else {
        res.redirect('/login');
    }
}
const postCreateUser = async (req, res) => {
    let name = req.body.nameCreate;
    let phone = req.body.phoneCreate;
    let email = req.body.emailCreate;
    let address = req.body.addressCreate;
    let role = req.body.roleCreate;
    let userName = req.body.userNameCreate;
    let password = req.body.passwordCreate;
    await createUser(name, phone, email, address, role, userName, password);
    res.redirect('/adminUsers');
}
const postEditUser = async (req,res) => {
    let id = req.body.idEdit;
    let name = req.body.nameEdit;
    let phone = req.body.phoneEdit;
    let email = req.body.emailEdit;
    let address = req.body.addressEdit;
    let role = req.body.roleEdit;
    let userName = req.body.userNameEdit;
    let password = req.body.passwordEdit;
    await editUserById(id, name, phone, email, address, role, userName, password);
    res.redirect('/adminUsers');
}
const postDeleteUser = async (req, res) => {
    const id = req.params.id;
    await deleteUserById(id);
    res.redirect('/adminUsers');
}
const getAdminPartnersPage = async (req,res) => {
    if (req.session.role == 'admin') {
        let results = await getListPartners();
        return res.render('adminPartners.ejs', {
            admin : req.session.user,
            listPartner : results
        });
    } else {
        res.redirect('/login');
    }
}
const postCreatePartner = async (req, res) => {
    let name = req.body.nameCreate;
    let phone = req.body.phoneCreate;
    let email = req.body.emailCreate;
    let address = req.body.addressCreate;
    let role = req.body.roleCreate;
    await createPartner(name, phone, email, address, role);
    res.redirect('/adminPartners');
}
const postEditPartner = async (req,res) => {
    let id = req.body.idEdit;
    let name = req.body.nameEdit;
    let phone = req.body.phoneEdit;
    let email = req.body.emailEdit;
    let address = req.body.addressEdit;
    let role = req.body.roleEdit;
    await editPartnerById(id, name, phone, email, address, role);
    res.redirect('/adminPartners');
}
const postDeletePartner = async (req, res) => {
    const id = req.params.id;
    await deletePartnerById(id);
    res.redirect('/adminPartners');
}

const getMangerPage = (req,res) => {
    if (req.session.role == 'manager') {
        res.render('manager.ejs', {user : req.session.user});
    } else {
        res.redirect('/login');
    }
}
const getProduct = async () => {
    let results = await getProductList();
    return res.render('product.ejs', {listProduct: results})
}

module.exports = {
    getHomePage, getLoginPage, postLogin, getUser, getLogout, 
    getAdminUsersPage, postCreateUser, postEditUser, postDeleteUser,
    getAdminPartnersPage, postCreatePartner, postEditPartner, postDeletePartner,
    
    getProduct, getMangerPage
}