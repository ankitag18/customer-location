module.exports = function (data, key) {

    const sortedData = data.sort((a, b) => {
        return a[key] - b[key];
    });

    return sortedData;

}