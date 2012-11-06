Ext.define('ExtMongo.model.Collection', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],

    idProperty: '_id',
    
    fields: [
        {
            name: '_id',
            type: 'string'
        }
    ],

    proxy: {
        type: 'rest',
        url : 'api/collection',
        reader: {
            type: 'json',
            root: 'records'
        }
    }
});
