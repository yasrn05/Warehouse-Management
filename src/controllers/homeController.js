const connection = require('../config/database');
const {
    getLogin, getListUsers, getUserById, editUserById,
    getProductList,
    getACCShipper, updateUserById, deleteUserById
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
const getMangerPage = (req,res) => {
    if (req.session.role == 'manager') {
        res.render('manager.ejs', {user : req.session.user});
    } else {
        res.redirect('/login');
    }
}
const getShipperPage = (req,res) => {
    if (req.session.role == 'shipper') {
        res.render('shipper.ejs', {user : req.session.user});
    } else {
        res.redirect('/login');
    }
}
const getLogout = (req,res) => {
    req.session.role = false;
    req.session.user = false;
    res.redirect('/');
}
const getEditUser = async (req, res) => {
    const userId = req.params.id;
    results = await getUserById(userId);
    let user = results && results.length > 0 ? results[0] : {};
    res.render('editUser.ejs', {userEdit : user});
}
const postEditUser = async (req,res) => {
    let id = req.body.id;
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let address = req.body.address;
    let role = req.body.role;
    let userName = req.body.userName;
    let password = req.body.password;
    await editUserById(id, name, phone, email, address, role, userName, password);
    res.redirect('/adminUsers');
}


const getProduct = async () => {
    let results = await getProductList();
    return res.render('product.ejs', {listProduct: results})
}
const getAbout = async (req, res) => {
    let results = await getACCShipper();
    return res.render('about.ejs', {listUser: results} )
}
const getUpdate = async (req, res) => {
    const userId = req.params.id;
    let [results, fields] = await connection.query('select * from ACC_Shipper where id = ?', [userId]);
    let user = results && results.length > 0 ? results[0] : {};
    res.render('update.ejs', {userEdit : user});
}
const postCreateShipper = async (req, res) => {
    let user = req.body.user;
    let pass = req.body.password;
    let [results, fields] = await connection.query(
        `INSERT INTO ACC_Shipper (user, pass) VALUES (?, ?)`,[user, pass]);
    res.redirect('/about');
}
const postUpdateUser= async (req, res) => {
    let user = req.body.user;
    let pass = req.body.password;
    let userId = req.body.userId;
    await updateUserById(user, pass, userId);
    res.redirect('/about');
}

const postDeleteUser = async (req, res) => {
    const userId = req.params.id;
    let [results, fields] = await connection.query('select * from ACC_Shipper where id = ?', [userId]);
    let user = results && results.length > 0 ? results[0] : {};
    res.render('delete.ejs', {userEdit : user})
}
const postRemoveUser = async (req, res) => {
    const id = req.body.userId;
    await deleteUserById(id);
    res.redirect('/about');
}


module.exports = {
    getHomePage, getLoginPage, getUser, getAdminUsersPage, getMangerPage, getShipperPage,
    postLogin, getLogout, getEditUser, postEditUser,
    getProduct,

    postCreateShipper, getUpdate, postUpdateUser,
    updateUserById, postDeleteUser, postRemoveUser, getAbout
}