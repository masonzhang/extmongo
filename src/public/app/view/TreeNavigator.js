Ext.define('ExtMongo.view.TreeNavigator', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.treenavigator',
    rootVisible: false,
    root: {
        text: 'Root',
        expanded: true,
        children: [
            {
                text: 'databases',
                expanded: true,
                children: [
                    {
                        text: 'local',
                        leaf: true
                    }
                ]
            }
        ]
    }
});