const rp = require('request-promise');
const Promise = require('bluebird');

module.exports = {
    getAllDevelopers() {
        return rp({
            uri: 'http://localhost:5000/api/v1/developers',
            json: true
        }).then((response) => {
            return Promise.all(response.records);
        });
    }
}