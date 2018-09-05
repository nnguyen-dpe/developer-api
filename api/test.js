const api = require('./developer');

api.getAllDevelopers().then(function(response) {
    console.log(response);
});