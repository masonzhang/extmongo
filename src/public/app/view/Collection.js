Ext.define('ExtMongo.view.BaseList', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Date',
        'Ext.grid.RowNumberer',
        'Ext.grid.column.Action',
        'Ext.grid.column.Number',
        'Ext.grid.plugin.RowEditing',
        'Ext.window.MessageBox',
        'Ext.menu.Menu',
        'Ext.form.field.Time',
        'Ext.form.field.Number',
        'Ext.form.field.TextArea',
        'Ext.form.Label',
        'Ext.Action'
    ],

    border: false,
    layout: 'fit',
    store: 'ExtMongo.store.Collection',
    model: 'ExtMongo.model.Collection',
    gridViewConfigPlugins: [],
    enableRowEditing: true,

    initComponent: function() {
        this.gridBindActions = [];
        this.menuItems = [];
        if( this.enableRowEditing ) {
            this.rowEditing = Ext.create('Ext.grid.plugin.RowEditing');
        }
        var model = Ext.create(this.model);

        var columns = model.fields.items;
        var gridColumns = _.union(
            [{
                xtype: 'rownumberer'
            }],
            ExtMongo.utils.ui.mergeGridColumnDef(columns, this.visibleColumns)
        );

        this.createActions();
        var contextMenu = Ext.create('Ext.menu.Menu', {
            items: this.menuItems
        });

        this.createTools();

        this.items = _.union({
            header: false,
            xtype: 'grid',
            store: this.store,
            columns: gridColumns,
            plugins: this.enableRowEditing ? [this.rowEditing] : undefined,
            autoScroll: true,
            dockedItems: ( this.menuItems.length
                ? [{
                    xtype: 'toolbar',
                    items: this.toolItems
                }]
                : undefined ),
            layout: 'fit',
            region: 'center',
            collapsible: false,
            viewConfig: {
                copy: true, // copy data when drag from this gridview
                plugins: this.gridViewConfigPlugins,
                listeners: {
                    itemcontextmenu: function(view, record, node, index, e) {
                        e.stopEvent();
                        contextMenu.showAt(e.getXY());
                        return false;
                    }
                }
            }
        }, this.getAdditionalItems());

        this.callParent(arguments);

        var me = this;
        var grid = this.getGrid();
        grid.getSelectionModel().on({
            selectionchange: function(model, selections) {
                if (selections.length) {
                    for (var i = 0; i < me.gridBindActions.length; i++) {
                        me.gridBindActions[i].enable();
                    }
                }
                else {
                    for (var i = 0; i < me.gridBindActions.length; i++) {
                        me.gridBindActions[i].disable();
                    }
                }
            }
        });
        grid.on({
            viewready: function() {
                me.onRefresh();
            }
        });
    },

    createDefaultAddAction: function(model, data) {
        var me = this;
        return Ext.create('Ext.Action', {
            icon: '/shared/fam/icons/add.gif',
            text: 'Add',
            handler: function(widget, event) {
                me.rowEditing.cancelEdit();

                // Create a model instance
                var newRecord = data ? Ext.create(model, data) : Ext.create(model);

                me.getGrid().getStore().insert(0, newRecord);
                me.rowEditing.startEdit(0, 0);
            }
        });
    },

    createDefaultEditAction: function() {
        var me = this;
        return Ext.create('Ext.Action', {
            icon: '/shared/fam/icons/cog_edit.png',
            text: 'Modify',
            disabled: true,
            handler: function(widget, event) {
                var record = me.getGrid().getSelectionModel().getSelection()[0];
                if (!record) return;

                me.rowEditing.startEdit(record, 1);
            }
        });
    },

    createDefaultDeleteAction: function(name) {
        var me = this;
        return Ext.create('Ext.Action', {
            icon: '/shared/fam/icons/delete.gif',
            text: 'Delete',
            disabled: true,
            handler: function(widget, event) {
                var record = me.getGrid().getSelectionModel().getSelection()[0];
                if (!record) return;
                Ext.Msg.show({
                    title: 'Delete Document',
                    msg: 'Are you sure to delete this document?',
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.WARNING,
                    fn: function(buttonId) {
                        if(buttonId == 'yes') {
                             me.getGrid().store.remove(record);
                        }
                    }
                });
            }
        });
    },

    createDefaultRefreshAction: function() {
        var me = this;
        return Ext.create('Ext.Action', {
            icon: '/shared/fam/icons/table_refresh.png',
            text: 'Refresh',
            handler: function(widget, event) {
                me.onRefresh();
            }
        });
    },

    getGrid: function() {
        return this.down('grid');
    },

    createActions: function() {
        var addAction = this.createDefaultAddAction(this.model);
        this.menuItems.push(addAction);

        var editAction = this.createDefaultEditAction();
        this.gridBindActions.push(editAction);
        this.menuItems.push(editAction);

        var deleteAction = this.createDefaultDeleteAction();
        this.gridBindActions.push(deleteAction);
        this.menuItems.push(deleteAction);

        this.menuItems.push({ xtype: 'menuseparator' });

        var refreshAction = this.createDefaultRefreshAction();
        this.menuItems.push(refreshAction);
    },

    createTools: function() {
        this.toolItems = this.menuItems;
    },

    onRefresh: function() {
        this.getGrid().getStore().reload();
    }
});