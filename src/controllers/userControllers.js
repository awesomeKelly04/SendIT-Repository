import moment from 'moment';
import Helper from '../controllers/helper';
import dataValidator from '../validation/dataValidator';
import AppData from '../Store/sendITData';
import express from 'express';
import bodyParser from 'body-parser';
import db from '../db';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.text());

class User {
  
  //Create
  static createUser (req, res) {
    const { error } = dataValidator.validateUserCreate(req.body);
		if(error) {
            return res.status(404).json(error.details[0].message);
        }

    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).json({ 'message': 'Please enter a valid email address' });
    }  

    const hashPassword = Helper.hashPassword(req.body.password);

    const createQuery = 'INSERT INTO "SendIT".users("firstName", "lastName", "email", "phoneNumber", "username", "password", "category", "createdAt")' +
    'VALUES($1, $2, $3, $4, $5, $6, $7, $8)';
    const values = [
        req.body.firstName,
        req.body.lastName,      
        req.body.email,
        req.body.phoneNumber,
        req.body.username,
        hashPassword,
        req.body.category,
        '18/11/2018'
    ];    

    AppData.noneOperation (req, res, createQuery, values);    
    getData(req, res);
}

  //Login   
    static async login(req, res) {
    if (!req.body.email) {
      return res.status(400).json({'message': 'Missing values'});
    }

    const { error } = dataValidator.validateUserCreate(req.body.password);
		if(error) return res.status(404).json(error.details[0].message);

    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).json({ 'message': 'Please enter a valid email address' });
    }
    // getOne (req, res, query, id)
    const text = 'SELECT * FROM "SendIT".users WHERE email = $1';
    const querryText = req.body.email;
    try {
      const { rows } = await db.query(text, [querryText]);

      if (!rows[0]) {
        return res.status(400).json({'message': 'The username or email you provided is incorrect'});
      }

      if(!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json({ 'message': 'The password you provided is incorrect' });
      }

      const jwtoken = Helper.generateToken(rows[0].id);
      return res.status(200).json({ jwtoken });
    } 
    catch(error) {
      return res.status(400).json(error)
    }
  }
}

const getData = async (req, res) => { 
    const newUserQuery = 'select id from "SendIT".users order by id DESC LIMIT 1'; 
    const data = await AppData.getAll(req, res, newUserQuery);
    const token = Helper.generateToken(data); 
    res.status(201).json({ token });
}

export default User;