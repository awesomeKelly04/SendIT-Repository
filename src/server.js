import express from 'express';
import bodyParser from 'body-parser';
import appAPI from './router/appRouter';
// import http from 'http';
const PORT = process.env.PORT || 8800;
const app = express();


const run = (callback) => {
    app.use(bodyParser.json());
    app.use('/', appAPI);

    var server = app.listen(PORT, () => {
        console.log('started');

        if (callback) {
            callback();
        }
    });

    server.on('close', () => {
        console.log('closed');
    });

    return server;
}

if (require.main === module) {
    run();
}

exports.run = run;


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use('/', appAPI);

// // *** server config *** //
// var server = http.createServer(app);
// server.listen(PORT, () => {
//   console.log("Node server running on http://localhost:8800");
// });

// module.exports = app;