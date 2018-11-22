import dotenv from 'dotenv';
import pgPromise from 'pg-promise';
import promise from 'bluebird';

dotenv.config();

// preparing the connecting string 
let connectionString;
if(process.env.NODE_ENV === 'test') {
    connectionString = process.env.TEST_DATABASE_URL;
} else if(process.env.NODE_ENV === 'production') {
    connectionString = process.env.DATABASE_URL;
} else {
    connectionString = process.env.DATABASE_URL;
}

const options = {
    promiseLib: promise
};

const pgp = pgPromise(options);
const db = pgp(connectionString);

export { connectionString };
export default db;