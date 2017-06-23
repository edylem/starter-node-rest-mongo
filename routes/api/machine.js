var express = require('express');
var router = express.Router();
var mongo = require('../../modules/mongo.js');

var collection = 'machines';

/**
 * Send all machines.
 */
router.get('/', function (req, res, next) {
    mongo.find(collection, function (results) { res.send(results) });
});

/**
 * Insert (._id not defined) or update a machine.
 */
router.post('/', function (req, res) {
    if ('undefined' != typeof req.body.id) {
        res.respond(new Error('Bad request body'), 400);
    } else {
        mongo.save(
            // Collection name
            collection,
            // Parameter
            req.body,
            // Callback on success
            function (results) { res.send() });
    }
});

module.exports = router;
