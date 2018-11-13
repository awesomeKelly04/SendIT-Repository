const request = require('request');
const server = require("../server");
const expect    = require("chai").expect;

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

describe('api', function () {
    it('should return all percels', function (done) {
        request.get('http://localhost:8800/api/v1/parcels', function (error, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return percel with the id 2', function (done) {
        request.get('http://localhost:8800/api/v1/parcels/2', function (error, response) {   
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should fail on percel with the id 20', function (done) {
        request.get('http://localhost:8800/api/v1/parcels/20', function (error, response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    it('should return all users', function (done) {
        request.get('http://localhost:8800/api/v1/users', function (error, response) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return user with the id 3', function (done) {
        request.get('http://localhost:8800/api/v1/users/3', function (error, response) {   
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should fail on user with the id 20', function (done) {
        request.get('http://localhost:8800/api/v1/users/20', function (error, response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

     it('should return all parcels of user with the id 3', function (done) {
        request.get('http://localhost:8800/api/v1/users/3/parcels', function (error, response) {   
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

     it('should fail when there is no parcels of user with the id 30', function (done) {
        request.get('http://localhost:8800/api/v1/users/30/parcels', function (error, response) {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    it('should return a parcel with the id 3 and its parcelStatus showing cancel', function (done) {
        request.put('http://localhost:8800/api/v1/parcels/3/cancel', {json: true, body: { "parcelStatus": "cancel"}}, function (error, response) {  
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return a new parcel on POST', function (done) {
        request.put('http://localhost:8800/api/v1/parcels/3/cancel', {json: true, body: { "parcelStatus": "" }}, function (error, response) {  
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    it('should return a new parcel on POST', function (done) {
        request.post('http://localhost:8800/api/v1/parcels', {json: true, body: {"id": parcels.length + 1, "parcelName": "Fan", "parcelValue": "N8000", 
        "parcelWeight": "23kg", "parcelLength": "", "parcelwidth": "", "parcelheight": "", "parcelFee": "N800", "collectionAddressLine1": "No 3, Block road", "collectionAddressLine2": "Narayi", 
		"collectionCity": "Kaduna", "collectionState": "Kaduna", "collectionDate": "09/11/2018", "destinationAddressLine1": "No 2", 
		"destinationAddressLine2": "Wuse", "destinationCity": "Abuja", "destinationState": "FCT", "userId": 2, "parcelStatus": "", "currentLocationAddressLine1": "", 
        "currentLocationAddressLine2": "", "currentLocationCity": "","currentLocationState": "", "dateOfUpdate": "", "timeOfUpdate": ""}}, function (error, response) {  
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    it('should fail on a new parcel on POST', function (done) {
        request.post('http://localhost:8800/api/v1/parcels', {json: true, body: {"id": 6, "parcelName": "", 
        "parcelWeight": "", "parcelFee": "", "collectionAddressLine1": "", "collectionAddressLine2": "", 
		"collectionCity": "", "collectionState": "", "collectionDate": "", "destinationAddressLine1": "", 
		"destinationAddressLine2": "", "destinationCity": "", "destinationState": "", "userId": 0}}, function (error, response) {  
            expect(response.statusCode).to.equal(404);
            done();
        });
    });
});