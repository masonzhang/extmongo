if(!ExtMongo) {
    ExtMongo = {};
}
if(!ExtMongo.utils) {
    ExtMongo.utils = {};
}

ExtMongo.utils.ui = function(){
    var msgCt;

    function createBox(t, s){
       return '<div class="msg"><h3>' + t + '</h3><p>' + s + '</p></div>';
    }
    return {
        msg : function(title, format){
            if(!msgCt){
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
            var s = Ext.String.format.apply(String, Array.prototype.slice.call(arguments, 1));
            var m = Ext.DomHelper.append(msgCt, createBox(title, s), true);
            m.hide();
            m.slideIn('t').ghost("t", { delay: 3000, remove: true});
        },

        createTab: function(options) {
            // options.tid: template id of view
            // options.title: title of the new tab
            if(!options.tid) return;

            var tabs = Ext.ComponentQuery.query('tabmaincontent')[0];
            var tab = !options._id ? tabs.child('panel[tid="' + options.tid + '"]')
                : tabs.child('panel[_id="' + options._id + '"]');
            if ( !tab ) {
                tab = tabs.add({
                    title: options.title,
                    tid: options.tid, // template id for the tab
                    _id: options._id,
                    closable: true,
                    layout: 'fit'
                });
                tab.add( Ext.widget(_.extend({
                    xtype: options.tid,
                    record: options.record
                }, options.config)) );
            }

            tabs.setActiveTab(tab);
        },

        init : function(){
            if(!msgCt){
                // It's better to create the msg-div here in order to avoid re-layouts
                // later that could interfere with the HtmlEditor and reset its iFrame.
                msgCt = Ext.DomHelper.insertFirst(document.body, {id:'msg-div'}, true);
            }
        }
    };
}();

Ext.onReady(ExtMongo.utils.ui.init, ExtMongo.utils.ui);
