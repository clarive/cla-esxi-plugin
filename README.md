# ESXi VMware plugin

<img src="https://cdn.rawgit.com/clarive/cla-esxi-plugin/master/public/icon/esxi.svg?sanitize=true" alt="ESXi VMware Plugin" title="ESXi VMware Plugin" width="120" height="120">

ESXI plugin will allow you to manage your virtual machines in Hypervisor from a Clarive instance.

## What is ESXI VMWare

VMware ESXi is a tool developed by VMware for deploying and serving virtual machines (VM).

For more info, visit [ESXi website](https://www.vmware.com/products/esxi-and-esx.html)

## Requirements

There are no requirements outlined in Clarive in order to work with this plugin.

## Installation

To install the plugin, place the cla-esxi-plugin folder inside the `$CLARIVE_BASE/plugins`
directory in a Clarive instance.

### EsxiVms Resource

To configurate the EsxiVms Resource open:

In **Clarive SE**: Resources -> ClariveSE.

In **Clarive EE**: Resources -> EsxiVmware.

You will be able to save your virtual machine parameters in this Resource. The main fields are:

- **Server** - Choose the server Resource where the virtual machine is located.
- **Virtual machine ID** - The ID of the virtual machine on the server where it is installed.

Configuration example:

    Server: Esxi_server
    Virtual machine ID: 14

There are two different ways to obtain the virtual machine ID.
The first way is using the palette service (Only EE) with the "List Vms" option to view the ID assigned to the virtual machine.
The second way is by checking your virtual machine through the host web browser and viewing the URL. For example, if your selected virtual machine URL is `https://Host_URL/ui/#/host/vms/24/`, 24 will be the ID assigned to that virtual machine.

### ESXi VMware manage VMs

The various parameters are:

- **Command (variable name: command)** - Via this parameter you can write the main command you wish to launch. Depending on the selected option, you will have different fields to fill out.
The different options to choose from are:
    - List VMs ("list"): Show all VMs in the host with their IDs together with other information.
    - Start VM ("start"): Starts the selected VM.
    - Stop VM ("stop"): Stops the selected VM.
    - Restart VM ("restart"): Restarts the selected VM.
    - Suspend VM ("suspend"): Suspends the selected VM.
    - Get VM state ("status"): Gets the state of the selected VM (Stopped, Started or Suspended).
    - Register VM from vmx file ("register"): Registers a new VM from a file in the host machine.
    - Delete VM ("delete"): Deletes the selected VM and all its fields. It also deletes the VM Resource.
    - Unregister VM ("unregister"): Unregisters the selected VM from the host, and also deletes the VM Resource.
    - Snapshot ("snapshot"): Allows snapshot management. 
- **Server (esxi_server)** - This field will appear when you have the "List VMs", "Custom command" or "Register VM" option(s) selected. This option lets you choose the server where you wish to execute the command. 
- **Vmx file path (file_path)** - Write the full path to the ´.vmx´ file in the host. This option will appear with "List VMs" option.
- **Virtual machine (vm_id)** - Select the VM Resource you wish to manage.
- **Action (snapshot_action)** - Select the action to perfom with the Snapshot command.
    - Get ("get"): Gets the snapshots from the selected machine.
    - Create ("create"): Creates a new snapshot.
    - Remove ("remove"): Removes the selected snapshot.
    - Revert ("revert"): Reverts to the selected snapshot.
- **Snapshot name (snapshot_name)** - Write the name for the snapshot that is gonna be created.
- **Snapshot ID (snapshot_id)** - Write the ID for the snapshot that is removed or reverted.

**Only Clarive EE**

- **Errors and output** - These two fields concern to management of control errors. The options are:
   - **Fail and output error** - Search for configured error pattern in script output. If found, an error message is
     displayed in the monitor showing the match.
   - **Warn and output warn** - Search for configured warning pattern in script output. If found, an error message is
     displayed in the monitor showing the match.
   - **Custom** - If combo box errors is set to custom, a new form is displayed for defining the behavior with these
     fields:
      - **OK** - Range of return code values for the script to have succeeded. No message will be displayed in the
        monitor.
      - **Warn** - Range of return code values to warn the user. A warning message will be displayed in the monitor.
      - **Error** - Range of return code values for the script to have failed. An error message will be displayed in the
        monitor.
   - **Silent** - Silence all errors found.

## How to use

NOTE: For the command `Register VM from vmx file`, the server will return a HASH structure with two entries for the output message and for the Resource's MID that will be created in Clarive. The keys for each parameter in the HASH will be `output` and `mid`.
For the other commands, the output will be always the output message without any HASH structure.

### In Clarive EE

Once the plugin is placed in its folder, you can find this service in the palette in the section of generic service and can be used like any other palette op.

Op Name: **ESXi VMware manage VMs**

Example:

```yaml
    Command: List VMs
    Server: Esxi_server
``` 

This example will list all the VMs currently registered in the host.

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

Example:

```yaml
rule: List VMs demo
do:
   - esxi_control:
       command: 'list'               # Required.
       esxi_server: 'esxi-server'    # Use the mid set to the resource you created
``` 

```yaml
rule: Register VM demo
do:
   - esxi_control:
       command: 'register'          # Required.
       esxi_server: 'esxi_server'   # Use the mid set to the resource you created
       file_path: '/path/to/vmfile.vmx'
```

```yaml
rule: Start VM demo
do:
   - esxi_control:
       command: 'start'          # Required.
       vm_id: 'esxi-resource'    # Use the mid set to the resource you created
```

```yaml
rule: Get Snapshots from VM demo
do:
   - esxi_control:
       command: 'snapshot'       # Required.
       snapshot_action: 'get'
       vm_id: 'esxi-resource'    # Use the mid set to the resource you created
```

```yaml
rule: Create Snapshot demo
do:
   - esxi_control:
       command: 'snapshot'       # Required.
       snapshot_action: 'create'
       vm_id: 'esxi-resource'    # Use the mid set to the resource you created
       snapshotName: 'test-name'
```

```yaml
rule: Remove Snapshot demo
do:
   - esxi_control:
       command: 'snapshot'       # Required.
       snapshot_action: 'remove'
       vm_id: 'esxi-resource'    # Use the mid set to the resource you created
       snapshot_id: 'snap_id'
```

##### Outputs

###### Success

The service will return the console output for the command.

###### Possible configuration failures

**Task failed**

You will get the error from the console output.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "esxi_control": "command"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `Command` not available for op "esxi_control"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.
