var _ = require('underscore');
var express = require('express');
var mongoose = require('mongoose');
var mongodb = require("mongodb");
var fs = require('fs');
var path = require('path');
var assert = require('assert');

var app = express();

app.use(function(req, res, next){
    console.log('%s %s', req.method, req.url);
    next();
});
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser({ keepExtensions: true, uploadDir: '/tmp/files' }));

fs.readFile(path.join(__dirname, '../config.json'), function(err, data) {
    var config,
    debugServer;
    if (err) {
        console.warn("could not load config.json\n" + err.toString());
        config = {};
    }
    else {
        config = JSON.parse(data);
        if (config.hidden) {
            config.hidden = config.hidden.map(function(s) {
                return new RegExp(s, 'i');
            });
        }
    }
    if (!config.webPort) {
        config.webPort = 5000;
    }
    if (!config.dbPort) {
        config.dbPort = mongodb.Connection.DEFAULT_PORT;
    }
    if (!config.host) {
        config.host = 'localhost';    // null implies listen on all interfaces
    }

    config.server_options = {
        auto_reconnect: true
    };

    app.get('/api/database/root', function(req, res) {
        var db = new mongodb.Db('local', new mongodb.Server(config.host, config.dbPort, config.server_options), {
            safe: false,
            native_parser: false
        });

        // Establish connection to db
        db.open(function(err, db) {

            // Use the admin database for the operation
            db.admin(function(err, adminDb) {

                // List all the available databases
                adminDb.listDatabases(function(err, dbs) {

                    assert.equal(null, err);
                    assert.ok(dbs.databases.length > 0);

                    var databases = [];
                    _.each(dbs.databases, function(database) {
                        databases.push({
                            text: database.name,
                            id: database.name
                        });
                    });
                    res.send(200, databases);

                    db.close();
                });
            });
        });
        res.send(200, [{
                text: 'overview',
                leaf: true
            }, {
                text: 'databases',
                expanded: false,
                leaf: false
            }]
        );
    });

    app.get('/api/database', function(req, res) {

    });
});

///////////////////////////////////////////////////////////////////////////////
/// helper functions
var filtersToConditions = function(filterString) {
    var conditions = {};
    if(!filterString) return conditions;

    var filters = JSON.parse(filterString);
    if(!filters) return conditions;

    _.each(filters, function(filter){
        conditions[filter.property] = filter.value;
    });
    return conditions;
};

var updateFromRequest = function(model, body) {
    _.each(body, function(value, key){
        if( key == '_id' ||
            key == '__v' ||
            model.get(key) == value ) {
            return;
        }
        model.set(key, value);
    });
    model.set('modifiedDate', new Date());
    return model;
};

var commonCallback = function(res) {
    return function(err, record) {
        if(!err) {
            res.send(200, {success: true, records: record});
        } else {
            res.send(500, err);
        }
    };
};

var db = mongoose.createConnection('localhost', 'ExtMongo');
///////////////////////////////////////////////////////////////////////////////
/// initialize schema/model/CRUD
///////////////////////////////////////////////////////////////////////////////
var collections = ['members', 'staffs', 'lessons', 'courses', 'attendances', 'classrooms'];
var commonSchema = new mongoose.Schema({
    creationDate: Date,
    modifiedDate: Date,
    removed: {
        type: Boolean,
        default: false
    }
}, {
    strict: false,
    autoIndex: false
});

_.each(collections, function(collection){

    var model = db.model(collection, commonSchema);

    app.get('/api/' + collection, function(req, res) {
        var conditions = filtersToConditions(req.query.filter);
        conditions.removed = false;
        return model.find(conditions, function(err, records) {
            if(!err) {
                res.send(records);
            } else {
                res.send(500, err);
            }
        });
    });

    app.post('/api/' + collection, function(req, res) {
        delete req.body._id;
        var record = new model(req.body);
        var today = new Date();
        record.set('creationDate', today);
        record.set('modifiedDate', today);
        record.save(commonCallback(res));
    });

    app.put('/api/' + collection + '/:id', function(req, res) {
        return model.findById(req.params.id, function(err, record) {
            if(record) {
                record = updateFromRequest(record, req.body);
                return record.save(commonCallback(res));
            }
            else {
                res.send(500, err);
            }
            
        });
    });

    app.delete('/api/' + collection + '/:id', function(req, res) {
        return model.findById(req.params.id, function(err, record) {
            record = updateFromRequest(record, {
                removed: true
            });
            record.save(commonCallback(res));
        });
    });
});

/////////////////
app.listen(5000);