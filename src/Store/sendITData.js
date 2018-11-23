import db from '../db';

class AppData{
	static getAll(req, res, query){
        db.any(query)
        .then( (data) => {
            return res.status(200)
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

    static getAny(req, res, query, id){
        db.any(query, id)
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

	static getOne (req, res, query, id) {
		db.one(query, id)
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

    static noneOperation (req, res, query, values, id) {
		db.none(query, values, id)
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
    
	static forUpdateParcelStatus (req, res, query, query1, values, id) {
		db.one(query, id)
    	.then( (data) => {
			if(data.parcelStatus === "Delivered") return res.status(400).send("Sorry, you can't cancel parcel order");      		
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

export default AppData;