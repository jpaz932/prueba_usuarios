const express = require('express');
const router  = express.Router();
const User    = require('../models/User');

router.get('/', async (req, res) => {

    const usuarios = await User.find();
    res.render('index', {usuarios});

});

router.post('/crear-usuario', async (req, res) => {

    const user = new User(req.body);
    await user.save();

    const usuarios = await User.find();

    res.render('usuarios', {usuarios});

});

router.post('/validate-user', async (req, res) => {

    const usuarios = await User.find(
        {
            $or: [
                {'email': req.body.email},
                {'documento': req.body.documento}
            ]
        }
    );

    if(usuarios.length > 0)
        res.send('false');
    else
        res.send('true');

});

router.post('/show-user', async (req, res) => {

    const usuario = await User.findById(req.body.id);

    res.render('usuario', {usuario});

});

router.post('/validate-update-user', async (req, res) => {

    const usuarios = await User.find(
        {
            $and: [
                { '_id': { $ne: req.body.id } }
            ],
            $or: [
                {'email': req.body.email},
                {'documento': req.body.documento}
            ]
        }
    );

    if(usuarios.length > 0)
        res.send('false');
    else
        res.send('true');

});

router.post('/editar-usuario', async (req, res) => {

    const usuario = await User.updateOne({'_id': req.body.id}, req.body);

    const usuarios = await User.find();
    res.render('usuarios', {usuarios});

});


module.exports = router;
