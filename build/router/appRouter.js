'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _appControllers = require('../controllers/appControllers');

var _appControllers2 = _interopRequireDefault(_appControllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/api/v1/parcels', _appControllers2.default.getAllParcels);

router.get('/api/v1/parcels/:id', _appControllers2.default.getParcel);

router.get('/api/v1/users', _appControllers2.default.getAllUsers);

router.get('/api/v1/users/:id', _appControllers2.default.getUser);

router.get('/api/v1/users/:userId/parcels', _appControllers2.default.getUserParcels);

router.put('/api/v1/parcels/:id/cancel', _appControllers2.default.updateUserStatus);

router.post('/api/v1/parcels', _appControllers2.default.createParcel);

exports.default = router;