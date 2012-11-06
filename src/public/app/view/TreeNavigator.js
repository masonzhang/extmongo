Ext.define('ExtMongo.view.TreeNavigator', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.treenavigator',
    rootVisible: false,

    store: Ext.create('ExtMongo.store.Database'),

    initComponent: function() {
        this.callParent(arguments);
    }
});