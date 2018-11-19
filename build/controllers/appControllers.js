'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _sendITData = require('../Store/sendITData');

var _sendITData2 = _interopRequireDefault(_sendITData);

var _dataValidator = require('../validation/dataValidator');

var _dataValidator2 = _interopRequireDefault(_dataValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parcels = _sendITData2.default.parcels;
var users = _sendITData2.default.users;

var app = (0, _express2.default)();
app.use(_express2.default.json());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.text());

var AppControllers = function () {
	function AppControllers() {
		_classCallCheck(this, AppControllers);
	}

	_createClass(AppControllers, null, [{
		key: 'default',
		value: function _default(req, res) {
			res.send("Welcome To SendIT API");
		}
	}, {
		key: 'getAllParcels',
		value: function getAllParcels(req, res) {
			res.send(parcels);
		}
	}, {
		key: 'getParcel',
		value: function getParcel(req, res) {
			var parcel = parcels.find(function (p) {
				return p.id === parseInt(req.params.id, 10);
			});
			if (!parcel) return res.status(404).send('The parcel with the given ID was not found');
			res.send(parcel);
		}
	}, {
		key: 'getAllUsers',
		value: function getAllUsers(req, res) {
			res.send(users);
		}
	}, {
		key: 'getUser',
		value: function getUser(req, res) {
			var user = users.find(function (u) {
				return u.id === parseInt(req.params.id, 10);
			});
			if (!user) return res.status(404).send('The user with the given ID was not found');
			res.send(user);
		}
	}, {
		key: 'getUserParcels',
		value: function getUserParcels(req, res) {
			var user = users.find(function (u) {
				return u.id === parseInt(req.params.userId, 10);
			});
			if (!user) return res.status(404).send('The user with the given ID was not found');

			var userParcels = [];
			parcels.forEach(function (parcel) {
				if (parcel.userId === parseInt(req.params.userId, 10)) {
					userParcels.push(parcel);
				}
			});

			if (!userParcels) return res.status(404).send('The parcel with the given ID was not found');
			res.send(userParcels);
		}
	}, {
		key: 'updateUserStatus',
		value: function updateUserStatus(req, res) {
			var parcel = parcels.find(function (p) {
				return p.id === parseInt(req.params.id, 10);
			});
			if (!parcel) return res.status(404).send('The parcel with the given ID was not found');

			if (parcel.parcelStatus !== "") return res.status(404).send('Sorry, this parcel order has been processed and cannot be cancelled at this point.');

			var _dataValidator$valida = _dataValidator2.default.validateParcelCancelOrder(req.body),
			    error = _dataValidator$valida.error;

			if (error) return res.status(404).send(error.details[0].message);

			parcel.parcelStatus = req.body.parcelStatus;
			res.send(parcel);
		}
	}, {
		key: 'createParcel',
		value: function createParcel(req, res) {
			var _dataValidator$valida2 = _dataValidator2.default.validateParcel(req.body),
			    error = _dataValidator$valida2.error;

			if (error) return res.status(404).send(error.details[0].message);

			var newParcel = {
				id: parcels.length + 1,
				parcelName: req.body.parcelName,
				parcelWeight: req.body.parcelWeight,
				parcelFee: req.body.parcelFee,
				collectionAddress: req.body.collectionAddress,
				collectionCity: req.body.collectionCity,
				collectionState: req.body.collectionState,
				collectionDate: req.body.collectionDate,
				destinationAddress: req.body.destinationAddress,
				destinationCity: req.body.destinationCity,
				destinationState: req.body.destinationState,
				userId: req.body.userId,
				parcelStatus: req.body.parcelStatus,
				currentLocationAddress: req.body.currentLocationAddress,
				currentLocationCity: req.body.currentLocationCity,
				currentLocationState: req.body.currentLocationState,
				dateOfUpdate: req.body.dateOfUpdate,
				timeOfUpdate: req.body.timeOfUpdate
			};

			parcels.push(newParcel);
			res.send(newParcel);
		}
	}]);

	return AppControllers;
}();

exports.default = AppControllers;