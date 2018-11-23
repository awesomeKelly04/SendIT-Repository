import express from 'express';
import AppControllers from '../controllers/appControllers';
import UserCreateControllers from '../controllers/createUserControllers';
import UserLoginControllers from '../controllers/loginUserControllers';
import destinationControllers from '../controllers/destinationControllers';
import statusControllers from '../controllers/statusControllers';
import presentLocationControllers from '../controllers/presentLocationControllers';
import Auth from '../middleware/auth';

const router = express.Router();

router.get('/api/v1/parcels', AppControllers.getAllParcels);
router.get('/api/v1/parcels/:id', AppControllers.getParcel);
router.get('/api/v1/users', AppControllers.getAllUsers);
router.get('/api/v1/users/:id', AppControllers.getUser );
router.get('/api/v1/users/:id/parcels', AppControllers.getUserParcels );
router.put('/api/v1/parcels/:id/cancel', AppControllers.updateParcelStatus );
router.post('/api/v1/parcels', AppControllers.createParcel );
router.post('/auth/signup', UserCreateControllers.createUser );
router.post('/auth/login', UserLoginControllers.login );
router.put('/parcels/:parcelId/destination', destinationControllers.updateParcelDestination );
router.put('/parcels/:parcelId/status', statusControllers.updateStatus );
router.put('/parcels/:parcelId/presentLocation', presentLocationControllers.updatePresentLocation );
router.get('*', AppControllers.default);

export default router;
