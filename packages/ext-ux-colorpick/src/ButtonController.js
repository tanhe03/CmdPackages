Ext.define('Ext.ux.colorpick.ButtonController', {
    extend : 'Ext.app.ViewController',
    alias  : 'controller.colorpick-buttoncontroller',

    destroy: function () {
        var view = this.getView(),
            colorPickerWindow = view.colorPickerWindow;

        if (colorPickerWindow) {
            colorPickerWindow.destroy();
            view.colorPickerWindow = view.colorPicker = null;
        }

        this.callParent();
    },

    getPopup: function () {
        var view = this.getView(),
            popup = view.colorPickerWindow;

        if (!popup) {
            popup = Ext.create({
                xtype: 'window',
                header: false,
                resizable: false,
                items: [{
                    xtype: 'colorselector',
                    format: view.getFormat(),
                    showPreviousColor:   true,
                    showOkCancelButtons: true,

                    listeners: {
                        ok:     'onColorPickerOkBtn',
                        cancel: 'onColorPickerCancelBtn',
                        scope: this
                    }
                }]
            });

            view.colorPickerWindow = popup;
            popup.colorPicker = view.colorPicker = popup.items.getAt(0);
        }

        return popup;
    },

    // When button is clicked show the color picker window
    onClick: function() {
        var me = this,
            view = me.getView(),
            color = view.getColor(),
            popup = me.getPopup(),
            colorPicker = popup.colorPicker;

        colorPicker.setColor(color);
        colorPicker.setPreviousColor(color);

        popup.showBy(view, 'tl-br?');
    },

    onColorPickerOkBtn: function (picker) {
        var view  = this.getView(),
            color = picker.getColor(),
            cpWin = view.colorPickerWindow;

        cpWin.hide();

        view.setColor(color);
    },

    onColorPickerCancelBtn: function () {
        var view  = this.getView(),
            cpWin = view.colorPickerWindow;

        cpWin.hide();
    }
});
