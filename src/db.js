import pgPromise from 'pg-promise';
import promise from 'bluebird';

const options = {
    promiseLib: promise
};

const pgp = pgPromise(options);
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:Awesome$0088@localhost:5432/senditdb';
const db = pgp(connectionString);

export default db;