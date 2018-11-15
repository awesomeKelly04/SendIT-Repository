import express from 'express';
import AppControllers from '../controllers/appControllers';

const router = express.Router();

router.get('/api/v1/parcels', AppControllers.getAllParcels);

router.get('/api/v1/parcels/:id', AppControllers.getParcel);

router.get('/api/v1/users', AppControllers.getAllUsers);

router.get('/api/v1/users/:id', AppControllers.getUser );

router.get('/api/v1/users/:userId/parcels', AppControllers.getUserParcels );

router.put('/api/v1/parcels/:id/cancel', AppControllers.updateUserStatus );

router.post('/api/v1/parcels', AppControllers.createParcel );

export default router;
