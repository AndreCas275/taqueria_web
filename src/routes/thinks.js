const express = require('express');
const router = express.Router();
const pool = require('../database')
const { isLoggedIn, isNotLoggedIn } = require('../lib/auths');

router.get('/agregar', isLoggedIn, (req, res) => {
    res.render('think/add');
});
router.post('/agregar', isLoggedIn, async(req, res) => {
    const { pensamiento_hbs } = req.body;
    const newThink = {
        description_thi: pensamiento_hbs,
        user_id_thi: req.user.id
    }
    await pool.query('insert into thinks set ?', [newThink])
    req.flash('Correctamente', 'Tu pensamiento se guardo satisfactoriamente')
    res.redirect('/pensamientos/thinkear');
});

router.get('/thinkear', isLoggedIn, async(req, res) => {
    const thinks = await pool.query('select*from thinks where user_id_thi=?', [req.user.id]);
    res.render('think/spontaneo', { listar: thinks });
});

router.get('/delete/:id_thi', isLoggedIn, async(req, res) => {
    const { id_thi } = req.params;
    console.log(id_thi)
    await pool.query('delete from thinks where id_thi=?', [id_thi]);
    req.flash('Correctamente', 'Pensamiento eliminado correctamente');
    res.redirect('/pensamientos/thinkear');
});

router.get('/editar/:id_thi', isLoggedIn, async(req, res) => {
    const { id_thi } = req.params;
    const thinks = await pool.query('select * from thinks where id_thi=?', [id_thi]);
    res.render('think/edit', { lista: thinks[0] });
});
router.post('/editar/:id_thi', isLoggedIn, async(req, res) => {
    const { id_thi } = req.params;
    const { description_hbs } = req.body;
    const newThink = {
        description_thi: description_hbs
    };
    await pool.query('update thinks set ? where id_thi=?', [newThink, id_thi]);
    req.flash('Correctamente', 'Pensamiento editado correctamente');
    res.redirect('/pensamientos/thinkear');
});

module.exports = router;