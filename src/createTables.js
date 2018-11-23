import { Pool } from 'pg';
import { connectionString } from './db';

const pool = new Pool({ 
  connectionString
});

pool.on('connect', () => {
  console.log('connected to the db');
});

pool.on('remove', () => {
  console.log('client removed');
  // process.exit(0);
});

/**
 * Create Tables
 */
const createTables = async () => {
  const queryString = `
    CREATE TABLE IF NOT EXISTS 
        users (
          "id" UUID PRIMARY KEY,
          "firstName" VARCHAR(128) NOT NULL,
          "lastName" VARCHAR(128) NOT NULL, 
          "email" VARCHAR(128) UNIQUE NOT NULL,         
          "phoneNumber" VARCHAR(128) NOT NULL,          
          "username" VARCHAR(128) NOT NULL,
          "password" VARCHAR(128) NOT NULL,
          "category" VARCHAR(128),
          "createdDate" TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS 
      parcels (
        "id" UUID PRIMARY KEY,
        "parcelName" VARCHAR(128) NOT NULL,
        "parcelWeight" VARCHAR(12) NOT NULL,
        "parcelFee" VARCHAR(12) NOT NULL,
        "collectionAddress" VARCHAR(128) NOT NULL,
        "collectionCity" VARCHAR(28) NOT NULL,
        "collectionState" VARCHAR(28) NOT NULL,
        "collectionDate" TIMESTAMP NOT NULL,
        "destinationAddress" VARCHAR(128) NOT NULL,
        "destinationCity" VARCHAR(28) NOT NULL,
        "destinationState" VARCHAR(28) NOT NULL,
        "userId" UUID NOT NULL,
        "parcelStatus" VARCHAR(28),
        "currentLocationAddress" VARCHAR(128),
        "currentLocationCity" VARCHAR(28),
        "currentLocationState" VARCHAR(28),
        "dateOfUpdate" TIMESTAMP,
        "timeOfUpdate" TIMESTAMP,
        FOREIGN KEY ("userId") REFERENCES users (id) ON DELETE CASCADE
    );
  `;
  const result = await pool.query(queryString);
  console.log(result); 
}

/**
 * Drop Tables
 */
const dropTables = async () => {
  const queryString = `
  DROP TABLE IF EXISTS parcels;
  DROP TABLE IF EXISTS users;
  `;

  const result = await pool.query(queryString);
  console.log(result);
}



const migrate = async () => {
  await dropTables();
  createTables();
}

migrate();