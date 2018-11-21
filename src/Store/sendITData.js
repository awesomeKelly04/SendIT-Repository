import express from 'express';
import bodyParser from 'body-parser';
import db from '../db';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.text());

class AppData{

	static getAny(req, res, text){
        db.any(text)
        .then( (data) => {
                res.status(200)
            .json({
                status: 'success',
                data: data
            });
        })
        .catch( (err) => {
            res.status(400)
            .json({
                status: 'fail',
                message: err.message
            });	
        });
    }

    static getAny(req, res, text, id){
        db.any(text, id)
        .then( (data) => {
                res.status(200)
            .json({
                status: 'success',
                data: data
            });
        })
        .catch( (err) => {
            res.status(400)
            .json({
                status: 'fail',
                message: err.message
            });	
        });
    }

	static getOne (req, res, text, id) {
		db.one(text, id)
    	.then( (data) => {
      		res.status(200)
        	.json({
				status: 'success',
				data: data
        	});
    	})
    	.catch( (err) => {
			res.status(400)
        	.json({
          		status: 'fail',
          		message: err.message
        	});	
    	});
    }

    static noneOperation (req, res, text, values) {
		db.none(text, values)
    	.then( () => {
      		res.status(200)
        	.json({
				status: 'success',
				data: data
        	});
    	})
    	.catch( (err) => {
			res.status(400)
        	.json({
          		status: 'fail',
          		message: err.message
        	});	
    	});
    }
    
	static forUpdateParcelStatus (req, res, text, text1, values, id) {
		db.one(text, id)
    	.then( (data) => {
			if(data.parcelStatus !== "") return res.status(400).send("Sorry, you can't cancel parcel order");      		
    	})
    	.catch( (err) => {
			res.status(400)
        	.json({
          		status: 'fail',
          		message: err.message
        	});	
    	});

		noneOperation (req, res, text1, values);
    }
}

export default AppData;