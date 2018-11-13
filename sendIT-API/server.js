function run(callback) {
    const express = require('express');
    const bodyParser = require('body-parser');

    const appAPI = require('./app');
    const app = express();

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