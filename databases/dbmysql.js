const mysql = require('mysql')
const myconn = require('express-myconnection')


dbOptions = {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'reportes'
};

const conexion = myconn(mysql, dbOptions, 'single')

module.exports = {
    conexion
}