import Joi from 'joi';
import express from 'express';

const users = [
    { id: 1, Name: 'Emmanuel O.', phoneNumber: '08138015039', email: 'emmanueloboh04@gmail.com', username: 'Awesome Kelly', password: 'senSe001', category: 'admin' },
    { id: 2, Name: 'Michael O.', phoneNumber: '07063823938', email: 'kellyharper2k4@yahoo.com', username: 'Micky', password: 'obOh1999', category: 'user' },
    { id: 3, Name: 'Aaron O.', phoneNumber: '08053467873', email: 'awesomekelly04@outlook.com', username: 'Dreamer', password: 'aarOn002', category: 'user' }
];

const parcels = [
    { id: 1, parcelName: 'Television', parcelWeight: '12kg', parcelFee: 'N1,000', collectionAddress: 'JQ 17, FMW&H Qrts', collectionCity: 'Kaduna', collectionState: 'Kaduna', collectionDate: '8/11/2018', destinationAddress: 'Behind Police Signboard, Airport Road', destinationCity: 'Abuja', destinationState: 'FCT', userId: 2, parcelStatus: 'Delivered', currentLocationAddress: 'Behind Police Signboard, Airport Road', currentLocationAddress: 'Lugbe', currentLocationCity: 'Abuja', currentLocationState: 'FCT', dateOfUpdate: '8/11/2018', timeOfUpdate: '3:00pm'},
    { id: 2, parcelName: 'Stove', parcelWeight: '6kg', parcelFee: 'N1,000', collectionAddress: 'JQ 17, FMW&H Qrts', collectionCity: 'Kaduna', collectionState: 'Kaduna', collectionDate: '8/11/2018', destinationAddress: 'Behind Police Signboard, Airport Road', destinationCity: 'Abuja', destinationState: 'FCT', userId: 2, parcelStatus: 'On Transit', currentLocationAddress: 'Kaduna Road', currentLocationCity: 'Kaduna', currentLocationState: 'Kaduna', dateOfUpdate: '8/11/2018', timeOfUpdate: '3:00pm'},
    { id: 3, parcelName: 'Radio', parcelWeight: '13kg', parcelFee: 'N1,000', collectionAddress: 'JQ 17, FMW&H Qrts', collectionCity: 'Kaduna', collectionState: 'Kaduna', collectionDate: '8/11/2018', destinationAddress: 'Behind Police Signboard, Airport Road', destinationCity: 'Abuja', destinationState: 'FCT', userId: 2, parcelStatus: '', currentLocationAddress: 'Zuba', currentLocationAddress: 'Lugbe', currentLocationCity: 'Abuja', currentLocationState: 'FCT', dateOfUpdate: '8/11/2018', timeOfUpdate: '3:00pm'},
    { id: 4, parcelName: 'Laptop', parcelWeight: '3kg', parcelFee: 'N1,000', collectionAddress: 'JQ 17, FMW&H Qrts', collectionCity: 'Kaduna', collectionState: 'Kaduna', collectionDate: '8/11/2018', destinationAddress: 'Behind Police Signboard, Airport Road', destinationCity: 'Abuja', destinationState: 'FCT', userId: 3, parcelStatus: 'On Transit', currentLocationAddress: 'Garki', currentLocationCity: 'Abuja', currentLocationState: 'FCT', dateOfUpdate: '8/11/2018', timeOfUpdate: '3:00pm'},
    { id: 5, parcelName: 'Shoes', parcelWeight: '1kg', parcelFee: 'N1,000', collectionAddress: 'JQ 17, FMW&H Qrts', collectionCity: 'Kaduna', collectionState: 'Kaduna', collectionDate: '8/11/2018', destinationAddress: 'Behind Police Signboard, Airport Road', destinationCity: 'Abuja', destinationState: 'FCT', userId: 3, parcelStatus: 'Delivered', currentLocationAddress: 'Behind Police Signboard, Airport Road', currentLocationCity: 'Abuja', currentLocationState: 'FCT', dateOfUpdate: '8/11/2018', timeOfUpdate: '3:00pm'},
];

const app = express();
app.use(express.json());

class AppControllers{
	
	static getAllParcels(req, res) {
		res.send(parcels);
	}

	static getParcel (req, res) {
		const parcel = parcels.find(p => p.id === parseInt(req.params.id, 10));
		if(!parcel) return res.status(404).send('The parcel with the given ID was not found');
		res.send(parcel);
	}
	
	static getAllUsers (req, res) {
		res.send(users);
	}

	static getUser (req, res) {
		const user = users.find(u => u.id === parseInt(req.params.id, 10));
		if(!user) return res.status(404).send('The user with the given ID was not found');
		res.send(user);
	}

	static getUserParcels (req, res) {
		const user = users.find(u => u.id === parseInt(req.params.userId, 10));
		if(!user) return res.status(404).send('The user with the given ID was not found');
	   
		const userParcels = [];
		parcels.forEach(parcel => {
			if(parcel.userId === parseInt(req.params.userId, 10)){
				userParcels.push(parcel);
			}
		});
   
		if(!userParcels) return res.status(404).send('The parcel with the given ID was not found');
		res.send(userParcels);
   	}

	static updateUserStatus (req, res) {
		const parcel = parcels.find(p => p.id === parseInt(req.params.id, 10));
		if(!parcel) return res.status(404).send('The parcel with the given ID was not found');

		if(parcel.parcelStatus !== "" ) return res.status(404).send('Sorry, this parcel order has been processed and cannot be cancelled at this point.');

		const { error } = validateParcelCancelOrder(req.body);
		if(error) return res.status(404).send(error.details[0].message);

		parcel.parcelStatus = req.body.parcelStatus;
		res.send(parcel);
	}

	static createParcel (req, res) {
		const { error } = validateParcel(req.body);
		if(error) return res.status(404).send(error.details[0].message);
   
		const newParcel = {
			id: parcels.length + 1, 
			parcelName: req.body.parcelName,  
			parcelWeight: req.body.parcelWeight, 
			parcelFee: req.body.parcelFee, 
			collectionAddress: req.body.collectionAddress, 
			collectionCity: req.body.collectionCity, 
			collectionState: req.body.collectionState, 
			collectionDate: req.body.collectionDate, 
			destinationAddress: req.body.destinationAddress, 
			destinationCity: req.body.destinationCity, 
			destinationState: req.body.destinationState, 
			userId: req.body.userId, 
			parcelStatus: req.body.parcelStatus, 
			currentLocationAddress: req.body.currentLocationAddress, 
			currentLocationCity: req.body.currentLocationCity,
			currentLocationState: req.body.currentLocationState, 
			dateOfUpdate: req.body.dateOfUpdate, 
			timeOfUpdate: req.body.timeOfUpdate
		};
		parcels.push(newParcel);
		res.send(newParcel);
   }
}


function validateParcel(parcel){
 	const valid = Joi.string().min(3).required();
 	const schema = {
 		parcelName: valid,
 		parcelWeight: valid, 
 		parcelFee: valid, 
 		collectionAddress: valid, 
 		collectionCity: valid, 
 		collectionState: valid, 
 		collectionDate: valid, 
 		destinationAddress: valid,  
 		destinationCity: valid, 
 		destinationState: valid, 
 		userId: valid
 	};

 	return Joi.validate(parcel, schema);
}

function validateParcelCancelOrder(parcel){
 	const valid = Joi.string().min(3).required();
 	const schema = {
 		parcelStatus: valid
	};

 	return Joi.validate(parcel, schema);
}

export default AppControllers;