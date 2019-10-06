function convertDegreeToRadian(degree) {
    return (Math.PI / 180) * degree;
}

function unitConversion(distance, unit) {
    switch (unit) {
        case 'm': //`m` for distance `meter`
            return distance * Math.pow(10, 3);
        default:
            return distance;
    }
}

module.exports = function (customer, targetCoordinates, allowedRange, distanceUnit = 'km') {

    const R = 6371; // Radius of the earth in KM

    const lat1 = targetCoordinates.latitude;
    const lat2 = customer.latitude;
    const lon1 = targetCoordinates.longitude;
    const lon2 = customer.longitude;

    const dlat = convertDegreeToRadian(lat2 - lat1);
    const dlon = convertDegreeToRadian(lon2 - lon1);

    const a =
        Math.sin(dlat / 2) * Math.sin(dlat / 2) +
        Math.cos(convertDegreeToRadian(lat2)) * Math.cos(convertDegreeToRadian(lat1)) *
        Math.sin(dlon / 2) * Math.sin(dlon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; //Distance in KM b/w two locations

    customer.inRange = false;
    if (distance && (unitConversion(distance, distanceUnit) < allowedRange)) {
        customer.inRange = true;
    }

    return customer;

}