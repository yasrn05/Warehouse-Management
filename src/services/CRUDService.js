const connection = require("../config/database");

const getLogin = async (userName, password) => {
    let [results, fields] = await connection.query(
        `select * 
        from users 
        where userName = ? and password = ?
        `, [userName, password]);
    return results;
}
const getProductList = async () => {
    let [results, fields] = await connection.query(
        `select * from product`
    );
    return results;
}


const getACCShipper = async () => {
    let [results, fields] = await connection.query('select * from ACC_Shipper');
    return results;
}
const updateUserById = async (user, pass, userId) => {
    let [results, fields] = await connection.query(
        `UPDATE ACC_Shipper
        SET user = ?, pass = ?
        WHERE id = ?
        `,[user, pass, userId]);
}
const deleteUserById = async (id) => {
    let [results, fields] = await connection.query(
        'DELETE FROM ACC_Shipper WHERE id = ?', [id]
    );
}

module.exports = {
    getLogin,
    getACCShipper, updateUserById, deleteUserById
}