'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_express2.default.json());
app.use(_bodyParser2.default.json());

var validateParcel = function validateParcel(parcel) {
    var valid = _joi2.default.string().min(3).required();
    var validId = _joi2.default.number().min(1).required();
    var leaveEmpty = _joi2.default.any();
    var schema = {
        id: validId,
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
        userId: validId,
        parcelStatus: leaveEmpty,
        currentLocationAddress: leaveEmpty,
        currentLocationCity: leaveEmpty,
        currentLocationState: leaveEmpty,
        dateOfUpdate: leaveEmpty,
        timeOfUpdate: leaveEmpty
    };
    return _joi2.default.validate(parcel, schema);
};

var validateParcelCancelOrder = function validateParcelCancelOrder(parcel) {
    var valid = _joi2.default.string().min(3).required();
    var schema = {
        parcelStatus: valid
    };

    return _joi2.default.validate(parcel, schema);
};

exports.default = {
    validateParcel: validateParcel, validateParcelCancelOrder: validateParcelCancelOrder
};