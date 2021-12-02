const moment = require("moment")
const jwt = require('jwt-simple')
const getAllUser = (req) => {
        return new Promise((res, rej) => {
            req.getConnection((err, conn) => {
                if (err) return res(err)

                conn.query('SELECT * FROM usuarios', (err, rows) => {
                    if (err) return res(err)
                    res({
                        data: rows,
                        msg: 'Consulta completa'
                    })
                })
            })
        })
    }
    /**Metodo para la creacion de nuevos usuarios */
const newUser = (req) => {
    return new Promise((res, rej) => {
        try {
            const { usuario, password } = req.body
            const estado = true
            req.getConnection((err, conn) => {
                if (err) return res({ error: err, msg: 'error' })

                conn.query('insert into usuarios set ?', { usuario: usuario, password: password, estado: estado }, (err, rows) => {
                    if (err) return res({ error: err, msg: 'error' })
                    res({
                        data: rows,
                        msg: 'Insercion correcta'
                    })
                })
            })
        } catch (error) {
            res({
                error,
                msg: 'ERROR'
            })
        }
    })
}

const getByUser = (req) => {
    const { usuario } = req.body
    return new Promise((res, rej) => {
        req.getConnection((err, conn) => {
            if (err) return res(err)

            conn.query('SELECT * FROM usuarios where usuario = ? ', usuario, (err, rows) => {
                if (err) return res(err)
                if (rows[0]) {
                    res({
                        data: rows[0],
                        msg: 'Consulta completa',
                        status: true
                    })
                } else {
                    res({
                        data: rows[0],
                        msg: 'No existe el usuario',
                        status: false
                    })
                }
            })
        })
    })
}

const crearToken = (usuario) => {
    let payload = {
        userId: usuario.id,
        userName: usuario.usuario,
        createdAt: moment().unix(),
        expiresAt: moment().add(1, 'day').unix()
    }
    return jwt.encode(payload, process.env.TOKEN_KEY)
}



module.exports = {
    getAllUser,
    newUser,
    getByUser,
    crearToken
}