var MongoClient = require("mongodb").MongoClient;

/**
 *  Connection to database
 * 
 * @param {*} callbacksuccess 
 * @param {*} callbackerror 
 */
var connect = function (callbacksuccess, callbackerror) {
    MongoClient.connect("mongodb://localhost/konf", function (error, db) {
        // If error
        if (error) {
            if (callbackerror) {
                callbackerror(error);
            } else {
                throw error;
            }
        }
        // If no error
        else {
            // Callback
            callbacksuccess(db);
        }

    });
};

/**
 * Insert or update a document in database
 * 
 * @param {*} collection  collection target name
 * @param {*} document  the document to insert or update
 * @param {*} callbacksuccess callback for success (with "results" as parameter)
 */
var save = function (collection, document, callbacksuccess) {
    console.log('Insert in collection [' + collection + ']', document);
    // Define callback success on connection
    var cbConnect = function (db) {
        // Insert or update
        db.collection(collection).save(document, function (error, results) {
            if (error) throw error;
            if (callbacksuccess) callbacksuccess(results);
            console.log("Insert successfull");
        });
    };
    // Connection
    connect(cbConnect);
}

var find = function (collection, callbacksuccess) {
    console.log('Find in collection [' + collection + ']');
    // Define callback success on connection
    var cbConnect = function (db) {
        // Search
        db.collection(collection).find().toArray(function (error, results) {
            if (error) throw error;
            if (callbacksuccess) callbacksuccess(results);
            console.log("Find successfull");
        });
    };
    // Connection
    connect(cbConnect);
}

module.exports = {
    save: save,
    find: find
};