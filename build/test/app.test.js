'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _chai = require('chai');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('api', function () {
    it('should return all percels', function (done) {
        _request2.default.get('http://localhost:8800/api/v1/parcels', function (error, response) {
            (0, _chai.expect)(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return percel with the id 2', function (done) {
        _request2.default.get('http://localhost:8800/api/v1/parcels/2', function (error, response) {
            (0, _chai.expect)(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should fail on percel with the id 20', function (done) {
        _request2.default.get('http://localhost:8800/api/v1/parcels/20', function (error, response) {
            (0, _chai.expect)(response.statusCode).to.equal(404);
            done();
        });
    });

    it('should return all users', function (done) {
        _request2.default.get('http://localhost:8800/api/v1/users', function (error, response) {
            (0, _chai.expect)(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return user with the id 3', function (done) {
        _request2.default.get('http://localhost:8800/api/v1/users/3', function (error, response) {
            (0, _chai.expect)(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should fail on user with the id 20', function (done) {
        _request2.default.get('http://localhost:8800/api/v1/users/20', function (error, response) {
            (0, _chai.expect)(response.statusCode).to.equal(404);
            done();
        });
    });

    it('should return all parcels of user with the id 3', function (done) {
        _request2.default.get('http://localhost:8800/api/v1/users/3/parcels', function (error, response) {
            (0, _chai.expect)(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should fail when there is no parcels of user with the id 30', function (done) {
        _request2.default.get('http://localhost:8800/api/v1/users/30/parcels', function (error, response) {
            (0, _chai.expect)(response.statusCode).to.equal(404);
            done();
        });
    });

    it('should return a parcel with the id 3 and its parcelStatus showing cancel', function (done) {
        _request2.default.put('http://localhost:8800/api/v1/parcels/3/cancel', { json: true, body: { "parcelStatus": "cancel" } }, function (error, response) {
            (0, _chai.expect)(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should return a updated parcel on POST', function (done) {
        _request2.default.put('http://localhost:8800/api/v1/parcels/3/cancel', { json: true, body: { "parcelStatus": "" } }, function (error, response) {
            (0, _chai.expect)(response.statusCode).to.equal(404);
            done();
        });
    });

    it('should return a new parcel on POST', function (done) {
        _request2.default.post('http://localhost:8800/api/v1/parcels', { json: true, body: { "id": "6", "parcelName": "Fan", "parcelValue": "N8000",
                "parcelWeight": "23kg", "parcelLength": "", "parcelwidth": "", "parcelheight": "", "parcelFee": "N800", "collectionAddress": "No 3, Block road, Narayi",
                "collectionCity": "Kaduna", "collectionState": "Kaduna", "collectionDate": "09/11/2018", "destinationAddress": "No 2, Wuse",
                "destinationCity": "Abuja", "destinationState": "FCT", "userId": "2", "parcelStatus": "", "currentLocationAddress": "",
                "currentLocationCity": "", "currentLocationState": "", "dateOfUpdate": "", "timeOfUpdate": "" } }, function (error, response) {
            (0, _chai.expect)(response.statusCode).to.equal(200);
            done();
        });
    });

    it('should fail on a new parcel on POST', function (done) {
        _request2.default.post('http://localhost:8800/api/v1/parcels', { json: true, body: { "id": "6", "parcelName": "",
                "parcelWeight": "", "parcelFee": "", "collectionAddress": "", "collectionCity": "", "collectionState": "", "collectionDate": "", "destinationAddress": "",
                "destinationCity": "", "destinationState": "", "userId": "0" } }, function (error, response) {
            (0, _chai.expect)(response.statusCode).to.equal(404);
            done();
        });
    });
});