'use strict';

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serverInstance;

beforeEach(function (done) {
    serverInstance = _server2.default.run(done);
});

afterEach(function (done) {
    serverInstance.close(done);
});