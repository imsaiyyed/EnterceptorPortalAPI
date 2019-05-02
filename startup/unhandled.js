const winston = require('winston');

module.exports = function () {

    process.on('uncaughtException', (ex) => {
        winston.error('Uncaught exception occurred!!', ex.message);
        process.exit(1);
    });
    process.on('unhandledRejecion', ex => { throw ex });

}