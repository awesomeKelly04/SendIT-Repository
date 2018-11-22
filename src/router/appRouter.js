import express from 'express';
import AppControllers from '../controllers/appControllers';
import userControllers from '../controllers/userControllers';
import Auth from '../middleware/auth';

const router = express.Router();

router.get('/', AppControllers.default);
router.get('/api/v1/parcels', Auth.verifyToken, AppControllers.getAllParcels);
router.get('/api/v1/parcels/:id', Auth.verifyToken, AppControllers.getParcel);
router.get('/api/v1/users', Auth.verifyToken, AppControllers.getAllUsers);
router.get('/api/v1/users/:id', Auth.verifyToken, AppControllers.getUser );
router.get('/api/v1/users/:id/parcels', Auth.verifyToken, AppControllers.getUserParcels );
router.put('/api/v1/parcels/:id/cancel', Auth.verifyToken, AppControllers.updateParcelStatus );
router.post('/api/v1/parcels', Auth.verifyToken, AppControllers.createParcel );
router.post('/auth/signup', userControllers.createUser );
router.post('/auth/login', userControllers.login );
router.put('/api/v1/parcels/<parcelId>/destination', Auth.verifyToken, AppControllers.updateParcelStatus );
router.put('/api/v1/parcels/<parcelId>/status', Auth.verifyToken, AppControllers.updateParcelStatus );
router.put('/api/v1/parcels/<parcelId>/presentLocation', Auth.verifyToken, AppControllers.updateParcelStatus );

export default router;
