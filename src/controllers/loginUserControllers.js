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

class UserLoginController {
  
  //Login   
    static login(req, res) {
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

export default UserLoginController;

