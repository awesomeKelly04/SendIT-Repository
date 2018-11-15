import request from 'request';
import { expect } from 'chai';
import sendItData from '../store/sendITData';
const parcels = sendItData.parcels;

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