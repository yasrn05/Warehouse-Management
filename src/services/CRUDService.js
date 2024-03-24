const connection = require("../config/database");

const getLogin = async (userName, password) => {
    let [results, fields] = await connection.query(
        `select * 
        from users 
        where userName = ? and password = ?
        `, [userName, password]);
    return results;
}
// Admin
const getListUsers = async () => {
    let [results, fields] = await connection.query(
        `select * 
        from users`
        );
    return results;
}
const createUser = async (name, phone, email, address, role, userName, password) => {
    let [results, fields] = await connection.query(
        `INSERT 
        INTO users 
        (name, phone, email, address, role, userName, password) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`
        ,[name, phone, email, address, role, userName, password]);
}
const editUserById = async(id, name, phone, email, address, role, userName, password) => {
    let [results, fields] = await connection.query(
        `UPDATE users
        SET name = ?, phone = ?, email = ?, address = ?, role = ?, userName = ?, password = ?
        WHERE id = ?
        `,[name, phone, email, address, role, userName, password, id]);
}
const deleteUserById = async (id) => {
    let [results, fields] = await connection.query(
        `DELETE 
        FROM users 
        WHERE id = ?`
        , [id]
    );
}
const getListPartners = async () => {
    let [results, fields] = await connection.query(
        `select * 
        from partners`
        );
    return results;
}
const createPartner = async (name, phone, email, address, role) => {
    let [results, fields] = await connection.query(
        `INSERT 
        INTO partners 
        (name, phone, email, address, role) 
        VALUES (?, ?, ?, ?, ?)`
        ,[name, phone, email, address, role]);
}
const editPartnerById = async(id, name, phone, email, address, role) => {
    let [results, fields] = await connection.query(
        `UPDATE partners
        SET name = ?, phone = ?, email = ?, address = ?, role = ?
        WHERE id = ?
        `,[name, phone, email, address, role, id]);
}
const deletePartnerById = async (id) => {
    let [results, fields] = await connection.query(
        `DELETE 
        FROM partners 
        WHERE id = ?`
        , [id]
    );
}
// Manager
const getListProducts = async () => {
    let [results, fields] = await connection.query(
        `select * 
        from products`
        );
    return results;
}
const createProduct = async (name, code, category, quantity, description) => {
    let [results, fields] = await connection.query(
        `INSERT 
        INTO products
        (name, code, category, quantity, description) 
        VALUES (?, ?, ?, ?, ?)`
        ,[name, code, category, quantity, description]);
}
const editProductById = async(id, name, code, category, quantity, description) => {
    let [results, fields] = await connection.query(
        `UPDATE products
        SET name = ?, code = ?, category = ?, quantity = ?, description = ?
        WHERE id = ?
        `,[name, code, category, quantity, description, id]);
}
const deleteProductById = async (id) => {
    let [results, fields] = await connection.query(
        `DELETE 
        FROM products
        WHERE id = ?`
        , [id]
    );
}
const getListInputs = async (idManager) => {
    let [results, fields] = await connection.query(
        `SELECT
	        inputs.id AS 'id',
            inputs.date AS 'date',
            inputs.address AS 'address',
            inputs.idShipper AS 'idShipper',
            CASE WHEN users.role = 'shipper' THEN users.name ELSE 'ID sai' END AS 'nameShipper',
            CASE WHEN users.role = 'shipper' THEN users.phone ELSE 'ID sai' END AS 'phoneShipper',
            inputs.idSupplier AS 'idSupplier',
            CASE WHEN partners.role = 'supplier' THEN partners.name ELSE 'ID sai' END AS 'nameSupplier',
            CASE WHEN partners.role = 'supplier' THEN partners.phone ELSE 'ID sai' END AS 'phoneSupplier',
            inputs.status AS 'status'
        FROM inputs
        JOIN users ON inputs.idShipper = users.id
        JOIN partners ON inputs.idSupplier = partners.id
        WHERE inputs.idManager = ?
        GROUP BY
            inputs.id, inputs.date, inputs.address, inputs.status, inputs.idShipper, inputs.idSupplier,
            users.name, users.phone, partners.name, partners.phone`
        ,[idManager]);
    return results;
}
const createInput = async (dateCreate, idShipperCreate, idManagerCreate, idSupplierCreate, addressCreate, statusCreate) => {
    let [results, fields] = await connection.query(
        `INSERT 
        INTO inputs
        (date, idShipper, idManager, idSupplier, address, status) 
        VALUES (?, ?, ?, ?, ?, ?)`
        ,[dateCreate, idShipperCreate, idManagerCreate, idSupplierCreate, addressCreate, statusCreate]);
}
const editInputById = async(id, idShipper, idSupplier, address, status) => {
    let [results, fields] = await connection.query(
        `UPDATE inputs
        SET idShipper = ?, idSupplier = ?, address = ?, status = ?
        WHERE id = ?
        `,[idShipper, idSupplier, address, status, id]);
}
const getInfoInput = async () => {

}

module.exports = {
    getLogin, 
    getListUsers, createUser, editUserById, deleteUserById,
    getListPartners, createPartner, editPartnerById, deletePartnerById,
    getListProducts, createProduct, editProductById, deleteProductById,
    getListInputs, createInput, editInputById, getInfoInput
}