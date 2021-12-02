const { Router } = require('express');
const { getAllUser, newUser, getByUser, crearToken } = require('../models/users/users')
const bcrypt = require('bcrypt');
const { result, eq } = require('lodash');
const { checkToken } = require('../midelwares/midelwareAuth');
const router = Router()

router.get('/', async(req, res) => {
    res.send(await getAllUser(req))
})
router.post('/', async(req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10)
    res.send(await newUser(req))
})
router.get('/login', async(req, res) => {
    const usuario = await getByUser(req)
    if (usuario.status === true) {
        // res.send(usuario)
        const equal = bcrypt.compareSync(req.body.password, usuario.data.password)
        if (equal) {

            res.send({
                succesfull: crearToken(usuario.data),
                msg: 'Autenticacion correcta'
            })
        } else {
            res.send({
                msg: 'Error de autenticacion'
            })
        }
    } else {
        res.send(usuario)
    }

})
router.get('/test', checkToken, (req, res) => {
    res.send('test')
})

module.exports = router