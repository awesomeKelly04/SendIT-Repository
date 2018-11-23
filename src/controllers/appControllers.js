import dataValidator from '../validation/dataValidator';
import AppData from '../Store/sendITData';


class AppControllers{
	
	static default(req, res) {
		res.send("Welcome To SendIT API");
	}	

	static getAllParcels(req, res) {
		const query = 'SELECT * FROM "SendIT".parcels order by id asc';
		AppData.getAll(req, res, query);
	}

	static getParcel (req, res) {			
		if (!req.params.id) {
			return res.status(400).send({
				'message': 'Missing parcel number'
			});
		}
	
		const query = 'SELECT * FROM "SendIT".parcels where id = $1';
		AppData.getOne(req, res, query, parseInt(req.params.id));		
	}
	
	static getAllUsers (req, res) {
		const query = 'SELECT * FROM "SendIT".users order by id asc';
		AppData.getAll(req, res, query);
	}

	static getUser (req, res) {
		if (!req.params.id) return res.status(400).send({'message': 'Missing user number'});
		
		const query = 'SELECT * FROM "SendIT".users where id = $1';
		AppData.getOne(req, res, query, parseInt(req.params.id));
	}

	static getUserParcels (req, res) {
		if (!req.params.id) return res.status(400).send({'message': 'Missing user number'});
		
		const query = 'SELECT * FROM "SendIT".parcels where "userId" = $1 order by id asc';
		AppData.getAny(req, res, query, parseInt(req.params.id));
   	}

	static updateParcelStatus (req, res) {
		if (!req.params.id) return res.status(400).send({'message': 'Missing user number'});

		const { error } = dataValidator.validateParcelCancelOrder(req.body);
		if(error) return res.status(404).send(error.details[0].message);

		const query = 'SELECT * FROM "SendIT".parcels where "id" = $1';
		const query1 = 'update "SendIT".parcels set "parcelStatus" = $1 where id = $2';
		const values = [
			req.body.parcelStatus, parseInt(req.params.id)
		];
		
		AppData.forUpdateParcelStatus (req, res, query, query1, values, parseInt(req.params.id))
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

  		AppData.noneOperation (req, res, createQuery, values);
   	}
}

export default AppControllers;