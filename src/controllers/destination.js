import dataValidator from '../validation/dataValidator';

class destinationControllers{
	
	static updateParcelStatus (req, res) {
		if (!req.params.id) return res.status(400).send({'message': 'Missing user number'});

		const { error } = dataValidator.validateParcelCancelOrder(req.body);
		if(error) return res.status(404).send(error.details[0].message);

		const query = 'SELECT * FROM "SendIT".parcels where "id" = $1';
		const query1 = 'update "SendIT".parcels set "destinationAddress" = $1, "destinationCity" = $2, "destinationState" = $3, where id = $4';
		const values = [            
			req.body.destinationAddress,      
			req.body.destinationCity,
			req.body.destinationState
        ];

        db.one(query, id)
        .then( (data) => {
            if(data.parcelStatus !== "Delivered" || data.userId !== parseInt(req.params.id)) {
                return res.status(400).send("Sorry, you can't change the destination of this parcel order");  
            }    		
        })
        .catch( (err) => {
            res.status(400)
            .json({
                    status: 'fail',
                    message: err.message
            });	
        }); 

        db.none(query1, values[0], values[1], values[2], id)
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

export default destinationControllers;