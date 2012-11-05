Ext.application({
    requires: [
        'Ext.container.Viewport',
        'Ext.data.proxy.Rest',
        'ExtMongo.utils.ui'
    ],
    name: 'ExtMongo',
    appFolder: 'app',
    controllers: [
        'MainController',
        'Collection'
    ],
    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    title: 'ExtMongo: Web based mongodb admin using node.js',
                    xtype: 'mainwindow'
                }
            ]
        });
    }
});

// override 
Ext.JSON.encodeDate = function(d) {
    return '"' + d.toISOString() + '"';
};