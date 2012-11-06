Ext.define('ExtMongo.store.Database', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'Ext.data.proxy.Rest',
        'Ext.data.reader.Json'
    ],
    autoLoad: true,

    proxy: {
        type: 'rest',
        url : 'api/database',
        reader: {
            type: 'json',
            root: 'text'
        }
    }
});