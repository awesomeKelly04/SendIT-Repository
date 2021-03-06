import jwt from 'jsonwebtoken';
import db from '../db';

class Auth {

  //Verify Token   
  static verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if(!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM "SendIT".users WHERE id = $1';
      const { rows } = db.any(text, [decoded.userId]);
      if(!rows[0]) {
        return res.status(400).send({ 'message': 'The token you provided is invalid' });
      }
      console.log(decoded);
      req.user = { id: decoded.userId };
      next();
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default Auth;