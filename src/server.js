import express from 'express';
import bodyParser from 'body-parser';
import appAPI from './router/appRouter';

const app = express();

function run(callback) {
    
    app.use(bodyParser.json());
    app.use(appAPI);

    var server = app.listen(8800, function () {
        console.log('started');

        if (callback) {
            callback();
        }
    });

    server.on('close', function () {
        console.log('closed');
    });

    return server;
}

if (require.main === module) {
    run();
}

exports.run = run;