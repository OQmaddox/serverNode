const express = require('express');
const myconn = require('express-myconnection');
const { conexion } = require('../databases/dbmysql');
const cors = require('cors');



class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.database()
        this.midelware()
        this.router()
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`server on port ${this.port}`)
        })
    }

    midelware() {
        this.app.use(cors())
        this.app.use(express.json())
    }
    database() {
        this.app.use(conexion)
    }
    router() {
        this.app.use('/api', require('../routers/auth'))
    }
}

module.exports = Server