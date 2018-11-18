const users = [
    { id: 1, Name: 'Emmanuel O.', phoneNumber: '08138015039', email: 'emmanueloboh04@gmail.com', username: 'Awesome Kelly', password: 'senSe001', category: 'admin' },
    { id: 2, Name: 'Michael O.', phoneNumber: '07063823938', email: 'kellyharper2k4@yahoo.com', username: 'Micky', password: 'obOh1999', category: 'user' },
    { id: 3, Name: 'Aaron O.', phoneNumber: '08053467873', email: 'awesomekelly04@outlook.com', username: 'Dreamer', password: 'aarOn002', category: 'user' }
];

const parcels = [
    { id: 1, parcelName: 'Television', parcelWeight: '12kg', parcelFee: 'N1,000', collectionAddress: 'JQ 17, FMW&H Qrts', collectionCity: 'Kaduna', collectionState: 'Kaduna', collectionDate: '8/11/2018', destinationAddress: 'Behind Police Signboard, Airport Road', destinationCity: 'Abuja', destinationState: 'FCT', userId: 2, parcelStatus: 'Delivered', currentLocationAddress: 'Behind Police Signboard, Airport Road', currentLocationAddress: 'Lugbe', currentLocationCity: 'Abuja', currentLocationState: 'FCT', dateOfUpdate: '8/11/2018', timeOfUpdate: '3:00pm'},
    { id: 2, parcelName: 'Stove', parcelWeight: '6kg', parcelFee: 'N1,000', collectionAddress: 'JQ 17, FMW&H Qrts', collectionCity: 'Kaduna', collectionState: 'Kaduna', collectionDate: '8/11/2018', destinationAddress: 'Behind Police Signboard, Airport Road', destinationCity: 'Abuja', destinationState: 'FCT', userId: 2, parcelStatus: 'On Transit', currentLocationAddress: 'Kaduna Road', currentLocationCity: 'Kaduna', currentLocationState: 'Kaduna', dateOfUpdate: '8/11/2018', timeOfUpdate: '3:00pm'},
    { id: 3, parcelName: 'Radio', parcelWeight: '13kg', parcelFee: 'N1,000', collectionAddress: 'JQ 17, FMW&H Qrts', collectionCity: 'Kaduna', collectionState: 'Kaduna', collectionDate: '8/11/2018', destinationAddress: 'Behind Police Signboard, Airport Road', destinationCity: 'Abuja', destinationState: 'FCT', userId: 2, parcelStatus: '', currentLocationAddress: 'Zuba', currentLocationAddress: 'Lugbe', currentLocationCity: 'Abuja', currentLocationState: 'FCT', dateOfUpdate: '8/11/2018', timeOfUpdate: '3:00pm'},
    { id: 4, parcelName: 'Laptop', parcelWeight: '3kg', parcelFee: 'N1,000', collectionAddress: 'JQ 17, FMW&H Qrts', collectionCity: 'Kaduna', collectionState: 'Kaduna', collectionDate: '8/11/2018', destinationAddress: 'Behind Police Signboard, Airport Road', destinationCity: 'Abuja', destinationState: 'FCT', userId: 3, parcelStatus: 'On Transit', currentLocationAddress: 'Garki', currentLocationCity: 'Abuja', currentLocationState: 'FCT', dateOfUpdate: '8/11/2018', timeOfUpdate: '3:00pm'},
    { id: 5, parcelName: 'Shoes', parcelWeight: '1kg', parcelFee: 'N1,000', collectionAddress: 'JQ 17, FMW&H Qrts', collectionCity: 'Kaduna', collectionState: 'Kaduna', collectionDate: '8/11/2018', destinationAddress: 'Behind Police Signboard, Airport Road', destinationCity: 'Abuja', destinationState: 'FCT', userId: 3, parcelStatus: 'Delivered', currentLocationAddress: 'Behind Police Signboard, Airport Road', currentLocationCity: 'Abuja', currentLocationState: 'FCT', dateOfUpdate: '8/11/2018', timeOfUpdate: '3:00pm'},
];

export default {
    users, parcels
}