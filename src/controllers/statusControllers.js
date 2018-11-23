import dataValidator from '../validation/dataValidator';
import db from '../db';

class statusControllers{
	
	static updateStatus (req, res) {
		if (!req.params.parcelId) return res.status(400).send({'message': 'Missing user number'});

		const { error } = dataValidator.validateParcelStatusOrder(req.body);
		if(error) return res.status(404).send(error.details[0].message);

		const query = 'SELECT * FROM "SendIT".parcels where "id" = $1';
		const query1 = 'update "SendIT".parcels set "parcelStatus" = $1, "dateOfUpdate" = $2, "timeOfUpdate" = $3 where "id" = $4';
		const values = [
            req.body.parcelStatus,
            new Date().toDateString(),
            new Date().getTime().toString(),
            parseInt(req.params.parcelId)
        ];

        db.one(query, parseInt(req.params.parcelId))
        .then( (data) => {
            if(data.parcelStatus === "Delivered") {
                return res.status(400).send("Sorry, you can't change the status of this parcel order");  
            }    		
        })
        .catch( (err) => {
            res.status(400)
            .json({
                    status: 'fail',
                    message: err.message
            });	
        }); 

        db.none(query1, values)
        .then( () => {
                res.status(200)
            .json({
                status: 'success'
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

export default statusControllers;