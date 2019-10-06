const express = require('express');
const matchedCustomers = require('./calculate');
const sortData = require('./sort-data');

const app = express();

app.get('/customer/distance', (req, res) => {
    res.json(sortData(matchedCustomers, 'user_id'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started successfully on port: ${PORT}`);
})