'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _appRouter = require('./router/appRouter');

var _appRouter2 = _interopRequireDefault(_appRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 8800;
var app = (0, _express2.default)();

var run = function run(callback) {
    app.use(_bodyParser2.default.json());
    app.use(_appRouter2.default);

    var server = app.listen(PORT, function () {
        console.log('started');

        if (callback) {
            callback();
        }
    });

    server.on('close', function () {
        console.log('closed');
    });

    return server;
};

if (require.main === module) {
    run();
}

exports.run = run;