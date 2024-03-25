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
const getInfoProduct = async (idProduct) => {
    let [results, fields] = await connection.query(
        `SELECT
	        inputs.id AS 'id',
            inputs.date AS 'date',
            inputs.address AS 'address',
            partners.name AS 'nameSupplier',
            partners.phone AS 'phoneSupplier'
        FROM inputInfo
        JOIN inputs ON inputInfo.idInput = inputs.id
        JOIN partners ON inputs.idSupplier = partners.id
        WHERE inputInfo.idProduct = ?
        GROUP BY
            inputs.id, inputs.date, inputs.address,
            partners.name, partners.phone`
        ,[idProduct]);
    return results;
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
const getInfoInput = async (idInput) => {
    let [results, fields] = await connection.query(
        `SELECT
            inputInfo.id AS 'id',
            inputInfo.idProduct AS 'idProduct',
            products.name AS 'nameProduct',
            products.category AS 'categoryProduct',
            products.code AS 'codeProduct',
            inputInfo.quantity AS 'quantity',
            inputInfo.price AS 'price',
            inputInfo.status AS 'status'
        FROM inputInfo
        JOIN products ON inputInfo.idProduct = products.id
        WHERE inputInfo.idInput = ?
        GROUP BY
            inputInfo.id, inputInfo.quantity, inputInfo.price, inputInfo.status, inputInfo.idProduct, inputInfo.idInput,
            products.name, products.category, products.code `
        ,[idInput]);
    return results;
}
const createInfoInput = async (idInput, idProduct, quantity, price, status) => {
    let [results, fields] = await connection.query(
        `INSERT 
        INTO inputInfo
        (idInput, idProduct, quantity, price, status) 
        VALUES (?, ?, ?, ?, ?)`
        ,[idInput, idProduct, quantity, price, status]);
}
const editInfoInputById = async(id, idProduct, quantity, price, status) => {
    let [results, fields] = await connection.query(
        `UPDATE inputInfo
        SET idProduct = ?, quantity = ?, price = ?, status = ?
        WHERE id = ?
        `,[idProduct, quantity, price, status, id]);
}
const getListOutputs = async (idManager) => {
    let [results, fields] = await connection.query(
        `SELECT
	        outputs.id AS 'id',
            outputs.date AS 'date',
            outputs.address AS 'address',
            outputs.idShipper AS 'idShipper',
            CASE WHEN users.role = 'shipper' THEN users.name ELSE 'ID sai' END AS 'nameShipper',
            CASE WHEN users.role = 'shipper' THEN users.phone ELSE 'ID sai' END AS 'phoneShipper',
            outputs.idCustomer AS 'idCustomer',
            CASE WHEN partners.role = 'customer' THEN partners.name ELSE 'ID sai' END AS 'nameCustomer',
            CASE WHEN partners.role = 'customer' THEN partners.phone ELSE 'ID sai' END AS 'phoneCustomer',
            outputs.status AS 'status'
        FROM outputs
        JOIN users ON outputs.idShipper = users.id
        JOIN partners ON outputs.idCustomer = partners.id
        WHERE outputs.idManager = ?
        GROUP BY
            outputs.id, outputs.date, outputs.address, outputs.status, outputs.idShipper, outputs.idCustomer,
            users.name, users.phone, partners.name, partners.phone`
        ,[idManager]);
    return results;
}
const createOutput = async (dateCreate, idShipperCreate, idManagerCreate, idCustomerCreate, addressCreate, statusCreate) => {
    let [results, fields] = await connection.query(
        `INSERT 
        INTO outputs
        (date, idShipper, idManager, idCustomer, address, status) 
        VALUES (?, ?, ?, ?, ?, ?)`
        ,[dateCreate, idShipperCreate, idManagerCreate, idCustomerCreate, addressCreate, statusCreate]);
}
const editOutputById = async(id, idShipper, idCustomer, address, status) => {
    let [results, fields] = await connection.query(
        `UPDATE outputs
        SET idShipper = ?, idCustomer = ?, address = ?, status = ?
        WHERE id = ?
        `,[idShipper, idCustomer, address, status, id]);
}
const getInfoOutput = async (idOutput) => {
    let [results, fields] = await connection.query(
        `SELECT
            outputInfo.id AS 'id',
            outputInfo.idProduct AS 'idProduct',
            products.name AS 'nameProduct',
            products.category AS 'categoryProduct',
            products.code AS 'codeProduct',
            outputInfo.quantity AS 'quantity',
            outputInfo.price AS 'price',
            outputInfo.status AS 'status'
        FROM outputInfo
        JOIN products ON outputInfo.idProduct = products.id
        WHERE outputInfo.idOutput = ?
        GROUP BY
            outputInfo.id, outputInfo.quantity, outputInfo.price, outputInfo.status, outputInfo.idProduct, outputInfo.idOutput,
            products.name, products.category, products.code `
        ,[idOutput]);
    return results;
}
const createInfoOutput = async (idOutput, idProduct, quantity, price, status) => {
    let [results, fields] = await connection.query(
        `INSERT 
        INTO outputInfo
        (idOutput, idProduct, quantity, price, status) 
        VALUES (?, ?, ?, ?, ?)`
        ,[idOutput, idProduct, quantity, price, status]);
}
const editInfoOutputById = async(id, idProduct, quantity, price, status) => {
    let [results, fields] = await connection.query(
        `UPDATE outputInfo
        SET idProduct = ?, quantity = ?, price = ?, status = ?
        WHERE id = ?
        `,[idProduct, quantity, price, status, id]);
}

module.exports = {
    getLogin, 
    getListUsers, createUser, editUserById, deleteUserById,
    getListPartners, createPartner, editPartnerById, deletePartnerById,
    getListProducts, createProduct, editProductById, getInfoProduct,
    getListInputs, createInput, editInputById, getInfoInput, createInfoInput, editInfoInputById,
    getListOutputs, createOutput, editOutputById, getInfoOutput, createInfoOutput, editInfoOutputById
}