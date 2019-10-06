const fs = require('fs');
const readline = require('readline');
const calculateDistance = require('./distance-calculator');

const targetAreaCoordinates = { latitude: '53.339428', longitude: '-6.257664' };

const readInterface = readline.createInterface({
    input: fs.createReadStream('customers.txt'),
});

const result = [];

readInterface.on('line', (line) => {
    const customer = JSON.parse(line);
    const item = calculateDistance(customer, targetAreaCoordinates, 100);

    if (item.inRange) {
        result.push({
            user_id: item.user_id,
            name: item.name,
        });
    }

});

module.exports = result;