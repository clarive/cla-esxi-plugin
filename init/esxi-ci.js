var ci = require("cla/ci");

ci.createRole("EsxiVmware");

ci.createClass("esxiVms", {
    form: '/plugin/cla-esxi-plugin/form/esxi-vm-ci-form.js',
    icon: '/plugin/cla-esxi-plugin/icon/esxi.svg',
    roles: ["EsxiVmware", "ClariveSE"],
    has: {
        server: {
            is: "rw",
            isa: "ArrayRef",
            required: true
        },
        vmId: {
            is: "rw",
            isa: "Str",
            required: true
        }
    }
});