import express from 'express';
import bodyParser from 'body-parser';
import sendITData from '../Store/sendITData';
import dataValidator from '../validation/dataValidator';
const parcels = sendITData.parcels;
const users = sendITData.users;

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.text());

class AppControllers{
	
	static default(req, res) {
		res.send("Welcome To SendIT API");
	}

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

		const { error } = dataValidator.validateParcelCancelOrder(req.body);
		if(error) return res.status(404).send(error.details[0].message);

		parcel.parcelStatus = req.body.parcelStatus;
		res.send(parcel);
	}

	static createParcel (req, res) {
		const { error } = dataValidator.validateParcel(req.body);
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

export default AppControllers;