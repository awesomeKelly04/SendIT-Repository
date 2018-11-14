const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const users = [
	{ id: 1, Name: 'Emmanuel O.', phoneNumber: '08138015039', email: 'emmanueloboh04@gmail.com', username: 'Awesome Kelly', password: 'senSe001', category: 'admin' },
	{ id: 2, Name: 'Michael O.', phoneNumber: '07063823938', email: 'kellyharper2k4@yahoo.com', username: 'Micky', password: 'obOh1999', category: 'user' },
	{ id: 3, Name: 'Aaron O.', phoneNumber: '08053467873', email: 'awesomekelly04@outlook.com', username: 'Dreamer', password: 'aarOn002', category: 'user' }
];

const parcels = [
	{ id: 1, parcelName: 'Television', parcelValue: 'N54,000.00', parcelWeight: '12kg', parcelLength: '12cm', parcelwidth: '12cm', parcelheight: '12cm', parcelFee: 'N1,000', collectionAddressLine1: 'JQ 17, FMW&H Qrts', collectionAddressLine2: 'Barnawa', collectionCity: 'Kaduna', collectionState: 'Kaduna', collectionDate: '8/11/2018', destinationAddressLine1: 'Behind Police Signboard, Airport Road', destinationAddressLine2: 'Lugbe', destinationCity: 'Abuja', destinationState: 'FCT', userId: 2, parcelStatus: 'Delivered', currentLocationAddressLine1: 'Behind Police Signboard, Airport Road', currentLocationAddressLine2: 'Lugbe', currentLocationCity: 'Abuja', currentLocationState: 'FCT', dateOfUpdate: '8/11/2018', timeOfUpdate: '3:00pm'},
	{ id: 2, parcelName: 'Stove', parcelValue: 'N5,000.00', parcelWeight: '6kg', parcelLength: '12cm', parcelwidth: '12cm', parcelheight: '12cm', parcelFee: 'N1,000', collectionAddressLine1: 'JQ 17, FMW&H Qrts', collectionAddressLine2: 'Barnawa', collectionCity: 'Kaduna', collectionState: 'Kaduna', collectionDate: '8/11/2018', destinationAddressLine1: 'Behind Police Signboard, Airport Road', destinationAddressLine2: 'Lugbe', destinationCity: 'Abuja', destinationState: 'FCT', userId: 2, parcelStatus: 'On Transit', currentLocationAddressLine1: 'Kaduna Road', currentLocationAddressLine2: '', currentLocationCity: 'Kaduna', currentLocationState: 'Kaduna', dateOfUpdate: '8/11/2018', timeOfUpdate: '3:00pm'},
	{ id: 3, parcelName: 'Radio', parcelValue: 'N44,000.00', parcelWeight: '13kg', parcelLength: '12cm', parcelwidth: '12cm', parcelheight: '12cm', parcelFee: 'N1,000', collectionAddressLine1: 'JQ 17, FMW&H Qrts', collectionAddressLine2: 'Barnawa', collectionCity: 'Kaduna', collectionState: 'Kaduna', collectionDate: '8/11/2018', destinationAddressLine1: 'Behind Police Signboard, Airport Road', destinationAddressLine2: 'Lugbe', destinationCity: 'Abuja', destinationState: 'FCT', userId: 2, parcelStatus: '', currentLocationAddressLine1: 'Zuba', currentLocationAddressLine2: 'Lugbe', currentLocationCity: 'Abuja', currentLocationState: 'FCT', dateOfUpdate: '8/11/2018', timeOfUpdate: '3:00pm'},
	{ id: 4, parcelName: 'Laptop', parcelValue: 'N154,000.00', parcelWeight: '3kg', parcelLength: '12cm', parcelwidth: '12cm', parcelheight: '12cm', parcelFee: 'N1,000', collectionAddressLine1: 'JQ 17, FMW&H Qrts', collectionAddressLine2: 'Barnawa', collectionCity: 'Kaduna', collectionState: 'Kaduna', collectionDate: '8/11/2018', destinationAddressLine1: 'Behind Police Signboard, Airport Road', destinationAddressLine2: 'Lugbe', destinationCity: 'Abuja', destinationState: 'FCT', userId: 3, parcelStatus: 'On Transit', currentLocationAddressLine1: 'Garki', currentLocationAddressLine2: 'Lugbe', currentLocationCity: 'Abuja', currentLocationState: 'FCT', dateOfUpdate: '8/11/2018', timeOfUpdate: '3:00pm'},
	{ id: 5, parcelName: 'Shoes', parcelValue: 'N15,000.00', parcelWeight: '1kg', parcelLength: '12cm', parcelwidth: '12cm', parcelheight: '12cm', parcelFee: 'N1,000', collectionAddressLine1: 'JQ 17, FMW&H Qrts', collectionAddressLine2: 'Barnawa', collectionCity: 'Kaduna', collectionState: 'Kaduna', collectionDate: '8/11/2018', destinationAddressLine1: 'Behind Police Signboard, Airport Road', destinationAddressLine2: 'Lugbe', destinationCity: 'Abuja', destinationState: 'FCT', userId: 3, parcelStatus: 'Delivered', currentLocationAddressLine1: 'Behind Police Signboard, Airport Road', currentLocationAddressLine2: 'Lugbe', currentLocationCity: 'Abuja', currentLocationState: 'FCT', dateOfUpdate: '8/11/2018', timeOfUpdate: '3:00pm'},
];

app.get('/api/v1/parcels', (req, res) => {
	res.send(parcels);
});

app.get('/api/v1/parcels/:id', (req, res) => {
	const parcel = parcels.find(p => p.id === parseInt(req.params.id, 10));
	if(!parcel) return res.status(404).send('The parcel with the given ID was not found');
	res.send(parcel);
});

app.get('/api/v1/users', (req, res) => {
	res.send(users);
});

app.get('/api/v1/users/:id', (req, res) => {
	const user = users.find(u => u.id === parseInt(req.params.id, 10));
	if(!user) return res.status(404).send('The user with the given ID was not found');
	res.send(user);
});

app.get('/api/v1/users/:userId/parcels', (req, res) => {
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
});

app.put('/api/v1/parcels/:id/cancel', (req, res) => {
	const parcel = parcels.find(p => p.id === parseInt(req.params.id, 10));
	if(!parcel) return res.status(404).send('The parcel with the given ID was not found');

	if(parcel.parcelStatus !== "" ) return res.status(404).send('Sorry, this parcel order has been processed and cannot be cancelled at this point.');

	const { error } = validateParcelCancelOrder(req.body);
	if(error) return res.status(404).send(error.details[0].message);

	parcel.parcelStatus = req.body.parcelStatus;
	res.send(parcel);
});

app.post('/api/v1/parcels', (req, res) => {
	const { error } = validateParcel(req.body);
	if(error) return res.status(404).send(error.details[0].message);

	const newParcel = {
		id: parcels.length + 1, 
		parcelName: req.body.parcelName, 
		parcelValue: req.body.parcelValue, 
		parcelWeight: req.body.parcelWeight, 
		parcelLength: req.body.parcelLength, 
		parcelwidth: req.body.parcelwidth, 
		parcelheight: req.body.parcelheight, 
		parcelFee: req.body.parcelFee, 
		collectionAddressLine1: req.body.collectionAddressLine1, 
		collectionAddressLine2: req.body.collectionAddressLine2, 
		collectionCity: req.body.collectionCity, 
		collectionState: req.body.collectionState, 
		collectionDate: req.body.collectionDate, 
		destinationAddressLine1: req.body.destinationAddressLine1, 
		destinationAddressLine2: req.body.destinationAddressLine2, 
		destinationCity: req.body.destinationCity, 
		destinationState: req.body.destinationState, 
		userId: req.body.userId, 
		parcelStatus: req.body.parcelStatus, 
		currentLocationAddressLine1: req.body.currentLocationAddressLine1, 
		currentLocationAddressLine2: req.body.currentLocationAddressLine2, 
		currentLocationCity: req.body.currentLocationCity,
		currentLocationState: req.body.currentLocationState, 
		dateOfUpdate: req.body.dateOfUpdate, 
		timeOfUpdate: req.body.timeOfUpdate
	};
	parcels.push(newParcel);
	res.send(newParcel);
});

module.exports = app;

function validateParcel(parcel){
	const valid = Joi.string().min(3).required();
	const schema = {
		parcelName: valid,
		parcelWeight: valid, 
		parcelFee: valid, 
		collectionAddressLine1: valid, 
		collectionAddressLine2: valid, 
		collectionCity: valid, 
		collectionState: valid, 
		collectionDate: valid, 
		destinationAddressLine1: valid, 
		destinationAddressLine2: valid, 
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