class Parcels {
    constructor(id, parcelName, parcelWeight, parcelFee, collectionAddress, collectionCity, collectionState, collectionDate, destinationAddress, destinationCity, destinationState, userId, parcelStatus, currentLocationAddress, currentLocationCity, currentLocationState, dateOfUpdate, timeOfUpdate) {
        this.id = id;
        this.parcelName = parcelName;
        this.parcelWeight = parcelWeight;
        this.parcelFee = parcelFee;
        this.collectionAddress = collectionAddress;
        this.collectionCity = collectionCity;
        this.collectionState = collectionState;
        this.collectionDate = collectionDate;
        this.destinationAddress = destinationAddress;
        this.destinationCity = destinationCity;
        this.destinationState = destinationState;
        this.userId = userId;
        this.parcelStatus = parcelStatus;
        this.currentLocationAddress = currentLocationAddress;
        this.currentLocationCity = currentLocationCity;
        this.currentLocationState = currentLocationState;
        this.dateOfUpdate = dateOfUpdate;
        this.timeOfUpdate = timeOfUpdate;
    }  
}

export default Parcels;