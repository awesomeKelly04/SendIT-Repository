import request from 'request';
import { expect } from 'chai';

describe('api', () => {
    it('should return all percels',  (done) =>  {
        request.get('http://localhost:8800/api/v1/parcels',  (error, response) =>  {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return percel with the id 2',  (done) =>  {
        request.get('http://localhost:8800/api/v1/parcels/2',  (error, response) =>  {   
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should fail on percel with the id 20',  (done) =>  {
        request.get('http://localhost:8800/api/v1/parcels/20',  (error, response) =>  {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    it('should return all users',  (done) =>  {
        request.get('http://localhost:8800/api/v1/users',  (error, response) =>  {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return user with the id 3',  (done) =>  {
        request.get('http://localhost:8800/api/v1/users/3',  (error, response) =>  {   
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should fail on user with the id 20',  (done) =>  {
        request.get('http://localhost:8800/api/v1/users/20',  (error, response) =>  {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

     it('should return all parcels of user with the id 3',  (done) =>  {
        request.get('http://localhost:8800/api/v1/users/3/parcels',  (error, response) =>  {   
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

     it('should fail when there is no parcels of user with the id 30',  (done) =>  {
        request.get('http://localhost:8800/api/v1/users/30/parcels',  (error, response) =>  {
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    it('should return a parcel with the id 3 and its parcelStatus showing cancel',  (done) =>  {
        request.put('http://localhost:8800/api/v1/parcels/3/cancel', {json: true, body: { "parcelStatus": "cancel"}},  (error, response) =>  {  
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return a new parcel on POST',  (done) =>  {
        request.put('http://localhost:8800/api/v1/parcels/3/cancel', {json: true, body: { "parcelStatus": "" }},  (error, response) =>  {  
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    it('should return a new parcel on POST',  (done) =>  {
        request.post('http://localhost:8800/api/v1/parcels', {json: true, body: {"id": 6, "parcelName": "Fan", "parcelValue": "N8000", 
        "parcelWeight": "23kg", "parcelLength": "", "parcelwidth": "", "parcelheight": "", "parcelFee": "N800", "collectionAddress": "No 3, Block road, Narayi", 
		"collectionCity": "Kaduna", "collectionState": "Kaduna", "collectionDate": "09/11/2018", "destinationAddress": "No 2, Wuse", 
		"destinationCity": "Abuja", "destinationState": "FCT", "userId": 2, "parcelStatus": "", "currentLocationAddress": "", 
        "currentLocationCity": "","currentLocationState": "", "dateOfUpdate": "", "timeOfUpdate": ""}},  (error, response) =>  {  
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should fail on a new parcel on POST',  (done) =>  {
        request.post('http://localhost:8800/api/v1/parcels', {json: true, body: {"id": 6, "parcelName": "", 
        "parcelWeight": "", "parcelFee": "", "collectionAddress": "", "collectionCity": "", "collectionState": "", "collectionDate": "", "destinationAddress": "", 
		"destinationCity": "", "destinationState": "", "userId": 0}},  (error, response) =>  {  
            expect(response.statusCode).to.equal(404);
            done();
        });
    });
});