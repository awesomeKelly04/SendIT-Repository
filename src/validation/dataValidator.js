import Joi from 'joi';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(express.json());
app.use(bodyParser.json());

const validateParcel = (parcel) => { 
    const valid = Joi.string().min(3).required();
    const validId = Joi.number().min(1).required();
    const userChoice = Joi.any();
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
        userId: validId,          
        parcelStatus: userChoice, 
        currentLocationAddress: userChoice, 
        currentLocationCity: userChoice,
        currentLocationState: userChoice, 
        dateOfUpdate: userChoice, 
        timeOfUpdate: userChoice
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

// const validateUserCreate = (user) => {
//     const valid = Joi.string().min(3).required();
//     const validPassword = Joi.string().min(6).required();
//     const userChoice = Joi.any();
//      const schema = {
//         firstName: valid, 
//         lastName: valid, 
//         email: valid, 
//         phoneNumber: valid, 
//         username: valid, 
//         password: validPassword, 
//         category: valid, 
//         createdDate: userChoice
//      };
//     return Joi.validate(user, schema);
// }

// const validateUserLogin = (user) => {
//     const valid = Joi.string().min(6).required();
//      const schema = {
//         password: valid
//      };
//     return Joi.validate(user, schema);
// }

export default {
    validateParcel, 
    validateParcelCancelOrder 
    // validateUserCreate, 
    // validateUserLogin
};