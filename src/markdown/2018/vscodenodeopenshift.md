# Debug your Openshift Node.js Apps locally with Visual Studio Code (VS Code)

![](https://cdn-images-1.medium.com/max/800/1*V6KM64_fuMeknCYQ4duxyQ.png?style=centerme)

VS Code has built-in debugging support for the Node.js runtime. But how do you remote debug a Node.js application running on Openshift.

## Setup Node debugger on Openshift

> On Openshift in the browser open the project your app is running on

> Select the Pod

![](https://cdn-images-1.medium.com/max/800/1*mNcfs09gLxDWyu0usgw9pA.jpeg?style=centerme)

> Select Terminal for the pod

![](https://cdn-images-1.medium.com/max/800/1*rrTjLh0qVh9DllyNXds67Q.jpeg?style=centerme)

> Node v6 LTS has an inbuilt debugger and can be run in the Terminal enter 
```bash
node debug app.js 
```

> where app.js will be the starting point for running your app (typically app.js or index.js). This exposes your app in debug mode on port 5858 by default.

**Note**: Node v8 LTS uses inspect so the command would be **node inspect app.js** 

From the command line login to Openshift and change to your project
```bash
oc login https://your-openshift-instance:8443

oc project your-project-name

oc set probe dc your-app-name --liveness --readiness --remove=true
```

This disables the liveness and readiness checks so your pod doesn’t restart during remote debugging. Returns the similar to the following

```bash
deploymentconfig "your-app-name" updated
oc port-forward $(oc get po | grep your-app-name | grep Running | awk '{print $1}') 8888:5858
```

This will forward port 5858 from the running Pod to a local port 8888 (8888 is an example you can use any free port). Returns the following

```bash
Forwarding from 127.0.0.1:8888 -> 5858
Forwarding from [::1]:8888 -> 5858
```
So now you have debug started in Openshift and forwarded to localhost:8888


## Connect Vs Code to the remote
> Open Visual Studio Code

> Open the Application you wish to debug.

> Select Debug option and select Configure ‘launch.json.

![](https://cdn-images-1.medium.com/max/800/1*zuN0dqopEdgX8sxvrisvJw.png?style=centerme)

Set the launch.json file similar to the following, using the port 8888 from the port forward command, the **“program” :”${workspaceRoot}/app.js”** variable should match your node.js starting point.
```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "attach", 
            "name": "Attach to Remote",
            "address": "localhost",
            "protocol": "legacy",
            "port": 8888,
            "localRoot": "${workspaceRoot}",
            "remoteRoot": "/opt/app-root/src/"
        },
        {
            "type": "node",
            "request": "launch",
            "protocol": "legacy",
            "name": "Launch Program",
            "program": "${workspaceRoot}/app.js"
        }
    ]
}
```

> Click the drop down beside the play button and select Attach to Remote

> Click on the play button or Select from drop down to start debugging

That it you can now use the debugger as normal

