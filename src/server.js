const express = require('express');
const bodyParser = require('body-parser');
const usersRoute = require('./routes/users');
const expenseRoute = require('./routes/expense');
const incomeRoute = require('./routes/incomes');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const bodyValidator = require('./middlewares/bodyValidator');
const cors = require('cors');


const HOST = '0.0.0.0';
const PORT = 5001;


const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// Enabling CORS
const corsHeaders = {
    origin: [
        'http://localhost:3000',
    ],
    methods: 'GET,POST,OPTIONS,PUT,DELETE',
    preflightContinue: false,
    allowedHeaders: ['Content-Type', 'Authorization', 'Host', 'X-Requested-With'],
    credentials: true,
};
app.use(cors(corsHeaders));

app.get('/test', (req, res) => {
    res.send('expense-managment');
});

app.use('/api/v1/users/:id(\\d+)', usersRoute);
//app.use() is intended for binding middleware to application
app.use(
    '/api/v1/users',
    (req, res, next) => {
        bodyValidator.validate(req, res, next);
    },
    usersRoute,
);

app.use('/api/v1/:user_id(\\d+)/expenses/:id(\\d+)/', expenseRoute);

app.use(
    '/api/v1/:user_id(\\d+)/expenses/',
    (req, res, next) => {
        bodyValidator.validate(req, res, next);
    },
    expenseRoute,
);

app.use('/api/v1/:user_id(\\d+)/incomes/:id(\\d+)/', incomeRoute);

app.use(
    '/api/v1/:user_id(\\d+)/incomes',
    (req, res, next) => {
        bodyValidator.validate(req, res, next);
    },
    incomeRoute,
);

app.use(`/api/v1/expense_mng/swagger`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/*', (req, res) => {
    res.status(404).json({
        description: 'Invalid endpoint - url does not exist',
        status: 404,
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
