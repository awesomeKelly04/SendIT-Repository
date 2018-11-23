import Helper from './helperControllers';
import dataValidator from '../validation/dataValidator';
import AppData from '../Store/sendITData';
import express from 'express';
import bodyParser from 'body-parser';
import db from '../db';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.text());

class UserCreateController {
  
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
    'VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *';
    const values = [
        req.body.firstName,
        req.body.lastName,      
        req.body.email,
        req.body.phoneNumber,
        req.body.username,
        hashPassword,
        req.body.category,
        new Date().toDateString()
    ];    

    AppData.noneOperation (req, res, createQuery, values);    
    getData(req, res);
  }  
}

const getData = async (req, res) => { 
    const newUserQuery = 'select id from "SendIT".users order by id DESC LIMIT 1'; 
    const data = await AppData.getAll(req, res, newUserQuery);    
    const token = Helper.generateToken(data); 
    res.status(201).json({ token });
}

export default UserCreateController;