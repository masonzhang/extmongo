Ext.define('ExtMongo.controller.MainController', {
    extend: 'Ext.app.Controller',

    requires: [
        'ExtMongo.utils.ui'
    ],
    views: [
        'MainWindow',
        'TreeNavigator',
        'TabMainContent'
    ],
    refs: [
        {
            ref: 'tabs',
            selector: 'tabmaincontent'
        },
        {
            ref: 'navigator',
            selector: 'treenavigator'
        }
    ],
    init: function() {
        // Setup listener. The control function uses the new ComponentQuery engine to quickly and easily get references to components on the page.
        this.control({
            'treenavigator': {
                itemclick: this.onTreeNavigatorItemClick
            },
            'tabmaincontent': {
                tabchange: this.onTabChange
            }
        });
    },

    onTreeNavigatorItemClick: function(view, record) {
        // Ext.view.View view, Ext.data.Model record
        ExtMongo.utils.ui.createTab({
            tpl: record.data.tpl /*template id*/,
            title: record.data.text
        });
    },

    onTabChange: function(tab, newCard, oldCar, options) {
    }
});