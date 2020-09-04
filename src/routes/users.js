const express = require('express');
const router = express.Router({ mergeParams: true });
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

router.post('/login', async (req, res) => {
    try {
        console.log(req.body.email)
        const user = await usersService.getUser(req.body.email, req.body.password);
        const response = new Response(STATUS.OK, 'user logged in successfully');
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

