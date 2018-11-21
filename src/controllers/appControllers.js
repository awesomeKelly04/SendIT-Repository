import express from 'express';
import bodyParser from 'body-parser';
import dataValidator from '../validation/dataValidator';
import AppData from '../Store/sendITData';
import Parcels from '../Model/parcels';
import Users from '../Model/users';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.text());

class AppControllers{
	
	static default(req, res) {
		res.send("Welcome To SendIT API");
	}

	static getAllParcels(req, res) {
		const text = 'SELECT * FROM "SendIT".parcels order by id asc';
		AppData.getAny(req, res, text);
	}

	static getParcel (req, res) {			
		if (!req.params.id) return res.status(400).send({'message': 'Missing parcel number'});
		
		const parcel = new Parcels();
		parcel.id = parseInt(req.params.id)
		const text = 'SELECT * FROM "SendIT".parcels where id = $1';
		AppData.getOne(req, res, text, parcel.id);		
	}
	
	static getAllUsers (req, res) {
		const text = 'SELECT * FROM "SendIT".users order by id asc';
		AppData.getAny(req, res, text);
	}

	static getUser (req, res) {
		if (!req.params.id) return res.status(400).send({'message': 'Missing user number'});
		
		const user = new Users();
		user.id = parseInt(req.params.id);
		const text = 'SELECT * FROM "SendIT".users where id = $1';
		AppData.getOne(req, res, text, user.id);
	}

	static getUserParcels (req, res) {
		if (!req.params.id) return res.status(400).send({'message': 'Missing user number'});
		
		const user = new Users();
		user.id = parseInt(req.params.id);
		const text = 'SELECT * FROM "SendIT".parcels where "userId" = $1 order by id asc';
		AppData.getAny(req, res, text, user.id);
   	}

	static updateParcelStatus (req, res) {
		if (!req.params.id) return res.status(400).send({'message': 'Missing user number'});

		const { error } = dataValidator.validateParcelCancelOrder(req.body);
		if(error) return res.status(404).send(error.details[0].message);

		const parcel = new Parcels();
		parcel.id = parseInt(req.params.id)
		parcel.parcelStatus = req.body.parcelStatus;

		const text = 'SELECT * FROM "SendIT".parcels where "id" = $1';
		const text1 = 'update "SendIT".parcels set "parcelStatus" = $1 where id = $2';
		const values = [
			parcel.parcelStatus, parcel.id
		];
		
		AppData.forUpdateParcelStatus (req, res, text, text1, values, parcel.id)
	}

	static createParcel (req, res) {
		const { error } = dataValidator.validateParcel(req.body);
		if(error) return res.status(404).send(error.details[0].message);		

		req.body.userId = parseInt(req.body.userId);
		const createQuery = 'INSERT INTO "SendIT".parcels ("parcelName", "parcelWeight", "parcelFee", "collectionAddress", "collectionCity", "collectionState", "collectionDate", "destinationAddress", "destinationCity", "destinationState",  "userId", "parcelStatus", "currentLocationAddress", "currentLocationCity", "currentLocationState", "dateOfUpdate", "timeOfUpdate")' +
		'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)';
		const values = [
			req.body.parcelName,
			req.body.parcelWeight,      
			req.body.parcelFee,
			req.body.collectionAddress,
			req.body.collectionCity,
			req.body.collectionState,
			req.body.collectionDate,
			req.body.destinationAddress,      
			req.body.destinationCity,
			req.body.destinationState,
			req.body.userId,
			req.body.parcelStatus,
			req.body.currentLocationAddress,
			req.body.currentLocationCity,      
			req.body.currentLocationState,
			req.body.dateOfUpdate,
			req.body.timeOfUpdate
		];

  		AppData.noneOperation (req, res, text, values);
   	}
}

export default AppControllers;