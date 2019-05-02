const winston = require('winston');

module.exports = function (err, req, res, next) {
    winston.error('Internal server error', err.message);
    res.status(500).send('Internal server error: '+err.message);
}