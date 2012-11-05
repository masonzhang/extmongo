Ext.define('ExtMongo.view.MainWindow', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mainwindow',
    requires: [
        'Ext.layout.container.Border'
    ],
    layout:'border',
    defaults: {
        collapsible: false,
        split: true
    },
    items: [{
        title: 'Navigator',
        xtype: 'treenavigator',
        region:'west',
        width: 150,
        minSize: 100,
        maxSize: 250
    },{
        header: false,
        collapsible: false,
        xtype: 'tabmaincontent',
        region:'center'
    }]
});