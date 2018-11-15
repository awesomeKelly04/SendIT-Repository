import server from '../server';

var serverInstance;

beforeEach(function (done) {
    serverInstance = server.run(done);
});

afterEach(function (done) {
    serverInstance.close(done);
});