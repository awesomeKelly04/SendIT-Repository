import express from 'express';
import bodyParser from 'body-parser';
import pgPromise from 'pg-promise';
import promise from 'bluebird';
import dataValidator from '../validation/dataValidator';
import Parcels from '../Model/parcels';
import Users from '../Model/users';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.text());

const options = {
  promiseLib: promise
};

const pgp = pgPromise(options);
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:Awesome$0088@localhost:5432/senditdb';
const db = pgp(connectionString);

class AppControllers{
	
	static default(req, res, next) {
		res.send("Welcome To SendIT API");
	}

	static getAllParcels(req, res, next) {
		db.any('select * from "SendIT".parcels order by id asc')
		.then((data) => {
			res.status(200)
			.json({
				status: 'success',
				data: data,
				message: 'Retrieved ALL Parcels'
			});
		})
		.catch((err) => {
			res.status(400)
        	.json({
          		status: 'fail',
          		message: err.message
        	});	
		});
	}

	static getParcel (req, res, next) {
		const parcel = new Parcels();
		parcel.id = parseInt(req.params.id)
  		db.one('select * from "SendIT".parcels where id = $1', parcel.id)
    	.then((data) => {
      		res.status(200)
        	.json({
          		status: 'success',
          		data: data,
          		message: 'Retrieved ONE Parcel'
        	});
    	})
    	.catch((err) => {
			res.status(400)
        	.json({
          		status: 'fail',
          		message: err.message + ' Please check your parcel number.'
        	});			  
    	});
	}
	
	static getAllUsers (req, res, next) {
		db.any('select * from "SendIT".users order by id asc')
		.then((data) => {
			res.status(200)
			.json({
				status: 'success',
				data: data,
				message: 'Retrieved ALL Users'
			});
		})
		.catch((err) => {
			res.status(400)
        	.json({
          		status: 'fail',
          		message: err.message
        	});	
		});
	}

	static getUser (req, res, next) {
		const user = new Users();
		user.id = parseInt(req.params.id);
  		db.one('select * from "SendIT".users where id = $1', user.id)
    	.then((data) => {
      		res.status(200)
        	.json({
          		status: 'success',
          		data: data,
          		message: 'Retrieved ONE User'
        	});
    	})
    	.catch((err) => {
			res.status(400)
        	.json({
          		status: 'fail',
          		message: err.message + ' Please check user id.'
        	});	
    	});
	}

	static getUserParcels (req, res, next) {
		const user = new Users();
		user.id = parseInt(req.params.userId);
  		db.any('select * from "SendIT".parcels where "userId" = $1 order by id asc', user.id)
    	.then((data) => {
			if([]){
				res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'No user with id'
				});
			}
			else{
				res.status(200)
				.json({
					status: 'success',
					data: data,
					message: 'Retrieved ALL User parcels'
				});
			}      		
    	})
    	.catch((err) => {
			res.status(400)
        	.json({
          		status: 'fail',
          		message: err.message
        	});	
    	});
   	}

	static updateParcelStatus (req, res, next) {
		const { error } = dataValidator.validateParcelCancelOrder(req.body);
		if(error) return res.status(404).send(error.details[0].message);

		const parcel = new Parcels();
		parcel.id = parseInt(req.params.id);
		parcel.parcelStatus = req.body.parcelStatus;
		db.none('update "SendIT".parcels set "parcelStatus" = $1 where id=$2',
    		[parcel.parcelStatus, parcel.id])
			.then( () => {
			res.status(200)
			.json({
				status: 'success',
				message: 'Updated parcel'
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

	static createParcel (req, res, next) {
		const { error } = dataValidator.validateParcel(req.body);
		if(error) return res.status(404).send(error.details[0].message);
		
		req.body.userId = parseInt(req.body.userId);
  		db.none('insert into "SendIT".parcels ("parcelName", "parcelWeight", "parcelFee", "collectionAddress", "collectionCity", "collectionState", "collectionDate", "destinationAddress", "destinationCity", "destinationState",  "userId", "parcelStatus", "currentLocationAddress", "currentLocationCity", "currentLocationState", "dateOfUpdate", "timeOfUpdate")' +
      	'values(${parcelName}, ${parcelWeight}, ${parcelFee}, ${collectionAddress}, ${collectionCity}, ${collectionState}, ${collectionDate}, ${destinationAddress}, ${destinationCity}, ${destinationState}, ${userId}, ${parcelStatus}, ${currentLocationAddress}, ${currentLocationCity}, ${currentLocationState}, ${dateOfUpdate}, ${timeOfUpdate})',
    	req.body)
    	.then( () => {
      		res.status(200)
        	.json({
          		status: 'success',
          		message: 'Created new parcel'
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
}

export default AppControllers;