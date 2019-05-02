require('express-async-errors');
const express = require('express');
const app = express();
const winston = require('winston');

winston.add(winston.transports.File, { filename: 'logfile.log' });

const port = process.env.PORT || 5000;

app.use(require('morgan')('tiny'));
require('./startup/unhandled')();
require('./startup/routes')(app);
require('./startup/logging')(app);
require('./startup/prod')(app);

app.listen(port, function () {
    winston.info(`Server started at port ${port}.`);
});

