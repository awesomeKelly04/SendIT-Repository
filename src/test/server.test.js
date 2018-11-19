import server from '../server';

const serverInstance;

beforeEach( (done) => {
    serverInstance = server.run(done);
});

afterEach( (done) => {
    serverInstance.close(done);
});