import db from '../db';

class presentLocationControllers{
	
	static updatePresentLocation (req, res) {
		if (!req.params.parcelId) return res.status(400).send({'message': 'Missing user number'});

		const query = 'SELECT * FROM "SendIT".parcels where "id" = $1';
        const query1 = 'update "SendIT".parcels set "currentLocationAddress" = $1, ' +
        '"currentLocationCity" = $2, "currentLocationState" = $3, "dateOfUpdate" = $4,' + 
        '"timeOfUpdate" = $5 where "id" = $6';
		const values = [
            req.body.currentLocationAddress,
            req.body.currentLocationCity, 
            req.body.currentLocationState,
            new Date().toDateString(),
            new Date().getTime().toString(),
            parseInt(req.params.parcelId)
        ];

        db.one(query, parseInt(req.params.parcelId))
        .then( (data) => {
            if(data.parcelStatus === "Delivered") {
                return res.status(400).send("Sorry, this parcel order is already delivered");  
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

export default presentLocationControllers;