const connection = require('../config/database');
const {
    getLogin, 
    getListUsers, createUser, editUserById, deleteUserById,
    getListPartners, createPartner, editPartnerById, deletePartnerById,
    getListProducts, createProduct, editProductById, getInfoProduct, getAdminStars,
    getListInputs, createInput, editInputById, getInfoInput, createInfoInput, editInfoInputById,
    getListOutputs, createOutput, editOutputById, getInfoOutput, createInfoOutput, editInfoOutputById,
    getListShipperInputs, getListShipperOutputs
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
        req.session.role = user.role;
        res.redirect('/user');
    } else {
        res.redirect('/login');
    }
}
const getUser = async (req, res) => {
    if (req.session.role == 'admin') {
        res.redirect('/adminUsers');
    } else if (req.session.role == 'manager') {
        res.redirect('/managerProducts');
    } else if (req.session.role == 'shipper') {
        let idShipper = req.session.user.id
        res.redirect('/shipperInputs/' + idShipper);
    } else {
        res.redirect('/login');
    }
}
const getProfile = (req, res) => {
    if (req.session.role) {
        return res.render('profile.ejs', {
            user : req.session.user
        });
    } else {
        res.redirect('/login');
    }
}
const getLogout = (req,res) => {
    req.session.role = false;
    req.session.user = false;
    res.redirect('/');
}
// Admin
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
    if (req.session.role == 'admin') {
        res.redirect('/adminUsers');
    } else if (req.session.role == 'manager') {
        res.redirect('/logout');
    } else if (req.session.role == 'shipper') {
        res.redirect('/logout');
    }
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
const getAdminStarsPage = async (req, res) => {
    if (req.session.role == 'admin') {
        let results = await getAdminStars();
        return res.render('adminStars.ejs', {
            admin : req.session.user,
            listStars : results
        });
    } else {
        res.redirect('/login');
    }
}
// Manager
const getMangerProductsPage = async (req,res) => {
    if (req.session.role == 'manager') {
        let results = await getListProducts();
        return res.render('managerProducts.ejs', {
            manager : req.session.user,
            listProducts : results
        });
    } else {
        res.redirect('/login');
    }
}
const postCreateProduct = async (req, res) => {
    let name = req.body.nameCreate;
    let code = req.body.codeCreate;
    let category = req.body.categoryCreate;
    let quantity = req.body.quantityCreate;
    let description = req.body.descriptionCreate;
    await createProduct(name, code, category, quantity, description);
    res.redirect('/managerProducts');
}
const postEditProduct = async (req,res) => {
    let id = req.body.idEdit;
    let name = req.body.nameEdit;
    let code = req.body.codeEdit;
    let category = req.body.categoryEdit;
    let quantity = req.body.quantityEdit;
    let description = req.body.descriptionEdit;
    await editProductById(id, name, code, category, quantity, description);
    res.redirect('/managerProducts');
}
const getManagerInfoProductPage = async (req, res) => {
    if (req.session.role == 'manager') {
        const idProduct = req.params.id;
        req.session.idProduct = req.params.id;
        let results = await getInfoProduct(idProduct);
        return res.render('managerInfoProduct.ejs', {
            manager : req.session.user,
            idProduct : req.params.id,
            infoProduct : results
        });
    } else {
        res.redirect('/login');
    }
}
const getMangerInputsPage = async (req,res) => {
    if (req.session.role == 'manager') {
        const idManager = req.params.id;
        let results = await getListInputs(idManager);
        return res.render('managerInputs.ejs', {
            manager : req.session.user,
            listInputs : results
        });
    } else {
        res.redirect('/login');
    }
}
const postCreateInput = async (req, res) => {
    let dateCreate = req.body.dateCreate;
    let idShipperCreate = req.body.idShipperCreate;
    let idManagerCreate = req.body.idManagerCreate;
    let idSupplierCreate = req.body.idSupplierCreate;
    let addressCreate = req.body.addressCreate;
    let statusCreate = req.body.statusCreate;
    await createInput(dateCreate, idShipperCreate, idManagerCreate, idSupplierCreate, addressCreate, statusCreate);
    let idManager = req.session.user.id;
    res.redirect('/managerInputs/' + idManager);
}
const postEditInput = async (req,res) => {
    let id = req.body.idEdit;
    let idShipper = req.body.idShipperEdit;
    let idSupplier = req.body.idSupplierEdit;
    let address = req.body.addressEdit;
    let status = req.body.statusEdit;
    await editInputById(id, idShipper, idSupplier, address, status);
    let idManager = req.session.user.id;
    res.redirect('/managerInputs/' + idManager);
}
const getManagerInfoInputPage = async (req, res) => {
    if (req.session.role == 'manager') {
        const idInput = req.params.id;
        req.session.idInput = req.params.id;
        let results = await getInfoInput(idInput);
        return res.render('managerInfoInput.ejs', {
            manager : req.session.user,
            idInput : req.params.id,
            infoInput : results
        });
    } else {
        res.redirect('/login');
    }
}
const postCreateInfoInput = async (req, res) => {
    let idInput = req.body.idInput;
    let idProduct = req.body.idProduct;
    let quantity = req.body.quantity;
    let price = req.body.price;
    let status = req.body.status;
    await createInfoInput(idInput, idProduct, quantity, price, status);
    res.redirect('/managerInfoInput/' + idInput);
}
const postEditInfoInput = async (req,res) => {
    let id = req.body.idEdit;
    let idProduct = req.body.idProduct;
    let quantity = req.body.quantity;
    let price = req.body.price;
    let status = req.body.statusEdit;
    await editInfoInputById(id, idProduct, quantity, price, status);
    if (req.session.role == 'manager') {
        let idInput = req.session.idInput;
        res.redirect('/managerInfoInput/' + idInput);
    } else if (req.session.role == 'shipper') {
        let idShipper = req.session.user.id;
        res.redirect('/shipperInputs/' + idShipper);
    }
}
const getMangerOutputsPage = async (req,res) => {
    if (req.session.role == 'manager') {
        const idManager = req.params.id;
        let results = await getListOutputs(idManager);
        return res.render('managerOutputs.ejs', {
            manager : req.session.user,
            listOutputs : results
        });
    } else {
        res.redirect('/login');
    }
}
const postCreateOutput = async (req, res) => {
    let dateCreate = req.body.dateCreate;
    let idShipperCreate = req.body.idShipperCreate;
    let idManagerCreate = req.body.idManagerCreate;
    let idCustomerCreate = req.body.idCustomerCreate;
    let addressCreate = req.body.addressCreate;
    let statusCreate = req.body.statusCreate;
    await createOutput(dateCreate, idShipperCreate, idManagerCreate, idCustomerCreate, addressCreate, statusCreate);
    let idManager = req.session.user.id;
    res.redirect('/managerOutputs/' + idManager);
}
const postEditOutput = async (req,res) => {
    let id = req.body.idEdit;
    let idShipper = req.body.idShipperEdit;
    let idCustomer = req.body.idCustomerEdit;
    let address = req.body.addressEdit;
    let status = req.body.statusEdit;
    await editOutputById(id, idShipper, idCustomer, address, status);
    let idManager = req.session.user.id;
    res.redirect('/managerOutputs/' + idManager);
}
const getManagerInfoOutputPage = async (req, res) => {
    if (req.session.role == 'manager') {
        const idOutput = req.params.id;
        req.session.idOutput = req.params.id;
        let results = await getInfoOutput(idOutput);
        return res.render('managerInfoOutput.ejs', {
            manager : req.session.user,
            idOutput : req.params.id,
            infoOutput : results
        });
    } else {
        res.redirect('/login');
    }
}
const postCreateInfoOutput = async (req, res) => {
    let idOutput = req.body.idOutput;
    let idProduct = req.body.idProduct;
    let quantity = req.body.quantity;
    let price = req.body.price;
    let status = req.body.status;
    await createInfoOutput(idOutput, idProduct, quantity, price, status);
    res.redirect('/managerInfoOutput/' + idOutput);
}
const postEditInfoOutput = async (req,res) => {
    let id = req.body.idEdit;
    let idProduct = req.body.idProduct;
    let quantity = req.body.quantity;
    let price = req.body.price;
    let status = req.body.statusEdit;
    await editInfoOutputById(id, idProduct, quantity, price, status);
    if (req.session.role == 'manager') {
        let idOutput = req.session.idOutput;
        res.redirect('/managerInfoOutput/' + idOutput);
    } else if (req.session.role == 'shipper') {
        let idShipper = req.session.user.id;
        res.redirect('/shipperOutputs/' + idShipper);
    }
}
//Shipper
const getShipperInputsPage = async (req, res) => {
    if (req.session.role == 'shipper') {
        const idShipper = req.params.id;
        let results = await getListShipperInputs(idShipper);
        return res.render('shipperInputs.ejs', {
            shipper : req.session.user,
            listInputs : results
        });
    } else {
        res.redirect('/login');
    }
}
const getShipperOutputsPage = async (req, res) => {
    if (req.session.role == 'shipper') {
        const idShipper = req.params.id;
        let results = await getListShipperOutputs(idShipper);
        return res.render('shipperOutputs.ejs', {
            shipper : req.session.user,
            listOutputs : results
        });
    } else {
        res.redirect('/login');
    }
}

module.exports = {
    getHomePage, getLoginPage, postLogin, getUser, getProfile, getLogout, 
    getAdminUsersPage, postCreateUser, postEditUser, postDeleteUser, getAdminStarsPage,
    getAdminPartnersPage, postCreatePartner, postEditPartner, postDeletePartner,
    getMangerProductsPage, postCreateProduct, postEditProduct, getManagerInfoProductPage,
    getMangerInputsPage, postCreateInput, postEditInput, getManagerInfoInputPage, postCreateInfoInput, postEditInfoInput,
    getMangerOutputsPage, postCreateOutput, postEditOutput, getManagerInfoOutputPage, postCreateInfoOutput, postEditInfoOutput,
    getShipperInputsPage, getShipperOutputsPage
}