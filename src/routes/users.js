const express = require('express');
const router = express.Router({ mergeParams: true });
const { Pool } = require('pg');
const usersService = require('../services/usersService');
const { handleError } = require('../utils/handleError');
const Response = require('../utils/response');
const { STATUS } = require('../utils/constants');

router.get('/', async (req, res) => {
    try {
        const allUsers = await usersService.getUsers();
        const response = new Response(STATUS.OK, 'users list', allUsers);
        res.status(200).send(response);
    } catch (e) {
        handleError(req, res, e);
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, last_name, password, email, phone } = req.body;
        const newUser = await usersService.addUser(req);
        const output = {
            name,
            last_name,
        };
        const response = new Response(STATUS.OK, `User ${name} was addedd`, output);
        res.status(201).send(response);
    } catch (e) {
        handleError(req, res, e);
    }
});

// users can update anything apart from id .all the rest must be send eventhough its not changed   todo - route for password
//router.put('/:id(\\d+)', async (req, res) => {
router.put('/', async (req, res) => {
    try {
        const { name, last_name, email, phone } = req.body;
        const updateResult = await usersService.updateUser(req);

        const resultOutput = {
            name,
            last_name,
        };
        const response = new Response(STATUS.OK, `User ${name} was modified`, resultOutput);
        res.status(200).send(response);
    } catch (e) {
        handleError(req, res, e);
    }
});

router.delete('/', async (req, res) => {
    try {
        const removeResult = await usersService.removeUser(req.params.id);
        const response = new Response(STATUS.OK, 'user was removed');
        res.status(200).send(response);
    } catch (e) {
        handleError(req, res, e);
    }
});

module.exports = router;

// users can update anything apart from id .all the rest must be send eventhough its not changed   todo - route for password
// router.put('/:idss(\\d+)', (req, res) => {
//     id = req.params.id;
//     const { name, last_name, email, phone } = req.body;

//     const resultOutput = {
//         name,
//         last_name,
//     };

//     db.query(
//         'UPDATE users SET name = $1, last_name = $2 ,email = $3 ,phone = $4  WHERE id = $5',
//         [name, last_name, email, phone, id],
//         (error, data) => {
//             if (error) {
//                 throw error;
//             }
//             res.status(200).send(`User modified : ${JSON.stringify(resultOutput)}`);
//         },
//     );
// });

// router.delete('/:id(\\d+)', (req, res) => {
//     id = req.params.id;
//     console.log(id);
//     db.query('DELETE FROM users WHERE id = $1', [id], (error, data) => {
//         if (error) {
//             throw error;
//         }
//         res.status(200).send('user was remove');
//     });
// });

// router.post('/jsb', (req, res) => {
//     const { name, last_name, password, email, phone } = req.body;
//     db.query(
//         'INSERT INTO users (last_name,name,password,email,phone) VALUES ($1, $2,$3,$4,$5)',
//         [last_name, name, password, email, phone],
//         (error, data) => {
//             if (error) {
//                 throw error;
//             }
//             const output = {
//                 name,
//                 last_name,
//             };
//             res.status(201).json(`User added : ${JSON.stringify(output)}`); // todo fix "\""
//         },
//     );
// });
