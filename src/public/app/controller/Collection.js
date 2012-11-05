Ext.define('ExtMongo.controller.Collection', {
    extend: 'Ext.app.Controller',

    views: [
        'Collection'
    ],
    stores: [
        'Collection'
    ],
    models: [
        'Collection'
    ],

    refs: [
        {
            ref: 'grid',
            selector: 'grid'
        }
    ],

    init: function() {
        // Setup listener. The control function uses the new ComponentQuery engine to quickly and easily get references to components on the page.
        this.control({
            'grid': {
                viewready: this.onViewReady
            }
        });
    },

    onViewReady: function() {
    }
});