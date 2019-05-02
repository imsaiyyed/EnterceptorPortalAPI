var whitelist = ['https://localhost:3000'];
var fs = require('fs');

module.exports.corsOptions = {
    origin: function (origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: false
};

