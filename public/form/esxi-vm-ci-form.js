(function(params) {

    var data = params.rec || {};
    var serverCombo = Cla.ui.ciCombo({
        name: 'server',
        class: 'generic_server',
        fieldLabel: _('Server'),
        value: data.server || "",
        allowBlank: false,
    });

    var vmIdTextField = Cla.ui.textField({
        name: 'vmId',
        fieldLabel: _('Virtual Machine ID'),
        allowBlank: false
    });

    return [
        serverCombo,
        vmIdTextField,
    ]
})