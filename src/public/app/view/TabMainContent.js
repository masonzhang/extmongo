Ext.define('ExtMongo.view.TabMainContent', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.tabmaincontent',
    requires: [
    ],
    closable: true,
    items: [{
        title: 'welcome',
        tid: 'welcome',
        html: 'Welcome to ExtMongo: a web based mongodb admin site'
    }]
});