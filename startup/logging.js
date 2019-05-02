const errorMiddleware = require('../middleware/error');

module.exports = function (app) {
    app.use(errorMiddleware);
}
