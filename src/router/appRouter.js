import express from 'express';
import AppControllers from '../controllers/appControllers';

const router = express.Router();

router.get('/', AppControllers.default);

router.get('/api/v1/parcels', AppControllers.getAllParcels);

router.get('/api/v1/parcels/:id', AppControllers.getParcel);

router.get('/api/v1/users', AppControllers.getAllUsers);

router.get('/api/v1/users/:id', AppControllers.getUser );

router.get('/api/v1/users/:id/parcels', AppControllers.getUserParcels );

router.put('/api/v1/parcels/:id/cancel', AppControllers.updateParcelStatus );

router.post('/api/v1/parcels', AppControllers.createParcel );

export default router;
