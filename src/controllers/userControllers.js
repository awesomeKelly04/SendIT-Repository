// import moment from 'moment';
// import Helper from '../controllers/helper';
// import express from 'express';
// import bodyParser from 'body-parser';
// import db from '../db';

// const app = express();
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.text());

// class User {
  
//   //Create
//   static create(req, res) {
//     const { error } = dataValidator.validateUserCreate(req.body);
// 		if(error) return res.status(404).send(error.details[0].message);

//     if (!Helper.isValidEmail(req.body.email)) {
//       return res.status(400).send({ 'message': 'Please enter a valid email address' });
//     }

//     const hashPassword = Helper.hashPassword(req.body.password);

//     const createQuery = `INSERT INTO
//       "SendIT".users(firstName, lastName, email, phoneNumber, username, password, category, createdDate)
//       VALUES($1, $2, $3, $4, $5, $6, $7, $8)
//       returning *`;
//     const values = [
//       req.body.firstName,
//       req.body.lastName,      
//       req.body.email,
//       req.body.phoneNumber,
//       req.body.username,
//       hashPassword,
//       req.body.category,
//       moment(new Date())
//     ];

//     try {
//       const { rows } = db.one(createQuery, values);
//       const token = Helper.generateToken(rows[0].id);
//       return res.status(201).send({ token });
//     } 
//     catch(error) {
//       if (error.routine === '_bt_check_unique') {
//         return res.status(400).send({ 'message': 'Username already exist' })
//       }
//       return res.status(400).send(error);
//     }
//   }

//   //Login   
//   static login(req, res) {
//     if (!req.body.username || !req.body.email) {
//       return res.status(400).send({'message': 'Missing values'});
//     }

//     const { error } = dataValidator.validateUserCreate(req.body.password);
// 		if(error) return res.status(404).send(error.details[0].message);

//     if (!Helper.isValidEmail(req.body.email)) {
//       return res.status(400).send({ 'message': 'Please enter a valid email address' });
//     }

//     const text = 'SELECT * FROM "SendIT".users WHERE email = $1';
//     const querryText = req.body.username || req.body.email;
//     try {
//       const { rows } = db.one(text, [querryText]);

//       if (!rows[0]) {
//         return res.status(400).send({'message': 'The username or email you provided is incorrect'});
//       }

//       if(!Helper.comparePassword(rows[0].password, req.body.password)) {
//         return res.status(400).send({ 'message': 'The password you provided is incorrect' });
//       }

//       const jwtoken = Helper.generateToken(rows[0].id);
//       return res.status(200).send({ jwtoken });
//     } 
//     catch(error) {
//       return res.status(400).send(error)
//     }
//   }
// }

// export default User;