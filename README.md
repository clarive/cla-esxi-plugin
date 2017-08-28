
# ESXI VMWARE plugin

ESXI plugin will allow you to manage your virtual machines in Hypervisor from a Clarive instance.

## What is ESXI VMWare

VMware ESXi (formerly ESX) is an enterprise-class, type-1 hypervisor developed by VMware for deploying and serving virtual computers.
As a type-1 hypervisor, ESXi is not a software application that one installs in an operating system (OS); instead, it includes and integrates vital OS components, such as a kernel.

## Requirements

There are no requirements outlined in Clarive in order to work with this plugin.

## Installation

To install the plugin, place the cla-esxi-plugin folder inside the `CLARIVE_BASE/plugins`
directory in a Clarive instance.

## How to use

Once the plugin is correctly installed, you will have a new palette service called 'Manage Esxi VmWare VM', and a new CI for the VMs you wish to manage from Clarive, called 'EsxiVms'.

### EsxiVms CI

You will be able to save your virtual machine parameters in this CI. The main fields are:

- **Server** - Choose the server CI where the virtual machine is located.
- **Virtual machine ID** - The ID of the virtual machine on the server where it is installed.

Configuration example:

    Server: Esxi_server
    Virtual machine ID: 14

There are two different ways to obtain the virtual machine ID.
The first way is using the palette service with the "List Vms" option to view the ID assigned to the virtual machine.
The second way is by checking your virtual machine through the host web browser and viewing the URL. For example, if your selected virtual machine URL is https://Host_URL/ui/#/host/vms/24/, 24 will be the ID assigned to that virtual machine.

### Esxi vmWare manage VMs

This palette service will let you choose the option that you wish to perform with a virtual machine.
The various parameters from the palette service are:

- **Command** - Via this parameter you can write the main command you wish to launch. Depending on the selected option, you will have different fields to fill out.
The different options to choose from are:
    - List VMs: Show all VMs in the host with their IDs together with other information.
    - Start VM: Starts the selected VM.
    - Stop VM: Stops the selected VM.
    - Restart VM: Restarts the selected VM.
    - Suspend VM: Suspends the selected VM.
    - Get VM state: Gets the state of the selected VM (Stopped, Started or Suspended).
    - Register VM from vmx file: Registers a new VM from a file in the host.
    - Delete VM: Deletes the selected VM and all its fields. It also deletes the VM CI.
    - Unregister VM: Unregisters the selected VM from the host, and also deletes the VM CI.
    - Snapshot: Allows snapshot management.
    
- **Server** - This field will appear when you have the "List VMs", "Custom command" or "Register VM" option(s) selected. This option lets you choose the server where you wish to execute the command. 
- **Vmx file path** - Write the full path to the ´.vmx´ file in the host. This option will appear with "List VMs" option.
- **Virtual machine** - Select the VM CI you wish to manage.
- **Errors and Outputs** - These two fields are for error control on the command launch.

Configuration example:

    Command: List VMs
    Server: Esxi_server
    Errors: fail
    Output: 

This example will list all the VMs currently registered in the host.

NOTE: For the command `Register VM from vmx file`, the server will return a HASH structure with two entries for the output message and for the CI's MID that will be created in Clarive. The keys for each parameter in the HASH will be `output` and `mid`.
For the other commands, the output will be always the output message without any HASH structure.
