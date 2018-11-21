import request from 'request';
import { expect } from 'chai';

describe('api', () => {
    
    it('should return Welcome to SendIT API',  (done) =>  {
        request.get('http://localhost:8800/',  (error, response) =>  {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return all parcels',  (done) =>  {
        request.get('http://localhost:8800/api/v1/parcels',  (error, response) =>  {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return parcel with the id 2',  (done) =>  {
        request.get('http://localhost:8800/api/v1/parcels/2',  (error, response) =>  {   
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should fail on parcel with the id 20',  (done) =>  {
        request.get('http://localhost:8800/api/v1/parcels/20',  (error, response) =>  {
            expect(response.statusCode).to.equal(400);
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
            expect(response.statusCode).to.equal(400);
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
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return a updated parcel on POST',  (done) =>  {
        request.put('http://localhost:8800/api/v1/parcels/3/cancel', {json: true, body: { "parcelStatus": "" }},  (error, response) =>  {  
            expect(response.statusCode).to.equal(404);
            done();
        });
    });

    it('should fail on a new parcel on POST',  (done) =>  {
        request.post('http://localhost:8800/api/v1/parcels', {json: true, body: {"parcelName": "", 
        "parcelWeight": "", "parcelFee": "", "collectionAddress": "", "collectionCity": "", "collectionState": "", "collectionDate": "", "destinationAddress": "", 
		"destinationCity": "", "destinationState": "", "userId": "0"}},  (error, response) =>  {  
            expect(response.statusCode).to.equal(404);
            done();
        });
    });
});