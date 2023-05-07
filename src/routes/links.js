const express = require('express');
const router = express.Router();
const pool = require('../database')
const { isLoggedIn, isNotLoggedIn } = require('../lib/auths');

function comprobarPalabra(dato) {
    if (dato == "1") {
        return true;
    } else {
        return false;
    }
}

function comprobarPalabra2(dato) {
    if (dato == "2") {
        return true;
    } else {
        return false;
    }
}

function comprobarPalabra3(dato) {
    if (dato == "3") {
        return true;
    } else {
        return false;
    }
}

function comprobarPalabra4(dato) {
    if (dato >= 4) {
        return true;
    } else {
        return false;
    }
}
router.get('/agregar', isLoggedIn, (req, res) => {
    res.render('links/add');
});
router.post('/agregar', isLoggedIn, async(req, res) => {
    const { Nombre_hbs, Pedido_hbs, Cantidad_hbs, Papas_hbs } = req.body;
    const newPedido = {
        nombre_ordenes: Nombre_hbs,
        pedido_ordenes: Pedido_hbs,
        catidad_ordenes: Cantidad_hbs,
        papas_ordenes: Papas_hbs,
        user_id: req.user.id
    };
    await pool.query('insert into ordenes set ?', [newPedido]);
    req.flash('Correctamente', 'Orden agregada correctamente');
    res.redirect('/linker/linkear');
});


router.get('/linkear', isLoggedIn, async(req, res) => {
    const links = await pool.query('SELECT * FROM ordenes WHERE user_id = ?', [req.user.id]);
    const primera = await pool.query('SELECT * FROM ordenes WHERE user_id=? LIMIT 1', [req.user.id]);
    const segunda = await pool.query('SELECT * FROM ordenes WHERE user_id=? LIMIT 1, 1', [req.user.id]);
    const tercera = await pool.query('SELECT * FROM ordenes WHERE user_id=? LIMIT 2, 1', [req.user.id]);
    const vacio = await pool.query('SELECT NULLIF(COUNT(*), 0) as tabla_vacia FROM ordenes WHERE user_id=?', [req.user.id]);
    for (let index = 0; index < links.length; index++) {
        const element = links[index].id;
        const nose = await pool.query('UPDATE ordenes SET tiempoAtras = TIMESTAMPDIFF(SECOND, created_at, NOW()) where id=? AND user_id=?', [element, req.user.id])
    }
    const trasformar = vacio[0].tabla_vacia;
    let transformado = '' + trasformar;
    let esIgual = comprobarPalabra(transformado);
    let esIgual2 = comprobarPalabra2(transformado);
    let esIgual3 = comprobarPalabra3(transformado);
    let esIgual4 = comprobarPalabra4(trasformar);
    res.render('links/list', {
        lista: links,
        first: primera[0],
        second: segunda[0],
        third: tercera[0],
        Nothing: transformado,
        VF1: esIgual,
        VF2: esIgual2,
        VF3: esIgual3,
        VF4: esIgual4
    });
});
router.get('/json', isLoggedIn, async(req, res) => {
    const links2 = await pool.query('select title_lin from links where user_id_lin=?', [req.user.id]);
    res.json(links2);
});

router.get('/delete/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM ordenes WHERE id = ?', [id]);
    res.redirect('/linker/linkear');
});

router.get('/editar/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM ordenes WHERE id = ?', [id]);
    console.log(links[0])
    res.render('links/edit', { lista: links[0] });
});

router.post('/editar/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const { Nombre_hbs, Pedido_hbs, Cantidad_hbs, Papas_hbs } = req.body;
    const newPedido = {
        nombre_ordenes: Nombre_hbs,
        pedido_ordenes: Pedido_hbs,
        catidad_ordenes: Cantidad_hbs,
        papas_ordenes: Papas_hbs,
    };
    await pool.query('UPDATE ordenes set ? WHERE id = ?', [newPedido, id]);
    req.flash('Correctamente', 'Orden editada correctamente');
    res.redirect('/linker/linkear');
});

module.exports = router;