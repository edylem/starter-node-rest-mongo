var express = require('express');
var router = express.Router();
var mongo = require('../modules/mongo');


router.get('/', function (req, res, next) {
    mongo.find(
        // Collection name
        'machines',
        // Callback on success
        function (results) {
            // Render template
            res.render('machines', { machines: results })
        });
});

module.exports = router;
