const connection = require("../config/database");

const getLogin = async (userName, password) => {
    let [results, fields] = await connection.query(
        `select * 
        from users 
        where userName = ? and password = ?
        `, [userName, password]);
    return results;
}
const getListUsers = async () => {
    let [results, fields] = await connection.query(
        'select * from users'
        );
    return results;
}
const createUser = async (name, phone, email, address, role, userName, password) => {
    let [results, fields] = await connection.query(
        `INSERT INTO users 
        (name, phone, email, address, role, userName, password) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`
        ,[name, phone, email, address, role, userName, password]);
}
const editUserById = async(id, name, phone, email, address, role, userName, password) => {
    let [results, fields] = await connection.query(
        `UPDATE users
        SET name = ?, phone = ?, email = ?, address = ?, role = ?,
            userName = ?, password = ?
        WHERE id = ?
        `,[name, phone, email, address, role, userName, password, id]);
}
const deleteUserById = async (id) => {
    let [results, fields] = await connection.query(
        'DELETE FROM users WHERE id = ?', [id]
    );
}


const getProductList = async () => {
    let [results, fields] = await connection.query(
        `select * from product`
    );
    return results;
}



module.exports = {
    getLogin, getListUsers, createUser,
    editUserById,
    deleteUserById
}