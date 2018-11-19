import Joi from 'joi';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const validateParcel = (parcel) => { 
    const valid = Joi.string().min(3).required();
    const validId = Joi.number().min(1).required();
    const leaveEmpty = Joi.any();
     const schema = {
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
    return Joi.validate(parcel, schema);
};

const validateParcelCancelOrder = (parcel) => { 
    const valid = Joi.string().min(3).required();
     const schema = {
         parcelStatus: valid
    };

     return Joi.validate(parcel, schema);
};

export default {
    validateParcel, validateParcelCancelOrder
};