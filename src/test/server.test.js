import server from '../server';

var serverInstance;

beforeEach( (done) => {
    serverInstance = server.run(done);
});

afterEach( (done) => {
    serverInstance.close(done);
});