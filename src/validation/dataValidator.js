import Joi from 'joi';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const validateParcel = (parcel) => { 
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