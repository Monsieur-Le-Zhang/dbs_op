var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1', 27017, {});
var client = new mongodb.Db('node', server, {w: 1});

client.open(function (err) {
    if (err) {
        throw err;
    } else {
        client.collection('users', function (err, collection) {
            if (err) {
                throw err;
            } else {
                console.log('We are now able to perform queries');
                insertDocument(collection);
            }
        });
    }
});

function insertDocument (collection) {
    // safe mode indicates that database operation should be completed before callback is executed.
    collection.insert({"id": "2", "pwd": "pwd01"}, {safe: true}, function (err, documents) {
        if (err) {
            throw err;
        } else {
            console.log('Insert document with success, documents: ' + documents[0]._id);
            updateDocument(collection, documents[0]._id);
        }
    });
}

// BSON document identifiers can be used to update data.
function updateDocument (collection, id) {
    var _id = new client.bson_serializer.ObjectID(id);
    collection.update({_id: _id}, {$set: {"pwd": "pwd02"}}, {safe: true}, function (err) {
        if (err) {
            throw err;
        } else {
            findDocument(collection);
        }
    });
}

function findDocument (collection) {
    collection.find({"pwd": "pwd01"}).toArray(function (err, results) {
        if (err) {
            throw err;
        } else {
            console.log(results);
            results.forEach(function (item, i) {
                deleteDocument(collection, item._id);
            })
        }
    });
}

function deleteDocument (collection, id) {
    var _id = new client.bson_serializer.ObjectID(id);
    collection.remove({_id: _id}, {safe: true}, function (err) {
        if (err) {
            throw err;
        }
    });
}