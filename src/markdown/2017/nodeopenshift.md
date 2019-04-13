# Openshift and Node

![](https://cdn-images-1.medium.com/max/1600/1*woBJO0R_xYjmcp96AkZJYA.png?style=centerme)

This is a guide for setting up a Node application on Openshift 3.6. Background information Openshift is an platform for deploying and hosting applications. This is mainly a learning experience for me so I will point out my pain points.

## Setting up Openshift
I used Linux Mint as an OS. First I installed docker because it is a dependency

![](https://cdn-images-1.medium.com/max/1600/0*OFD22NxBNgDoqMET.png?style=centerme)

```bash
sudo apt install docker.io
```

> **NOTE**: to configure docker to run with out sudo see this [blog](https://docs.docker.com/engine/installation/linux/linux-postinstall/).

Setup Docker daemon with an insecure registry parameter of 172.30.0.0/16 Add or edit the /etc/docker/daemon.json file and add the following:

```json
{
   "insecure-registries": [
     "172.30.0.0/16"
   ]
}
```

> **NOTE**: daemon.json file didn’t exist so created it, We add this because Openshift’s registry is using a self signed cert and we are allowing our local docker config to trust it.

Restart the Docker service

```bash
sudo service docker restart
```

Download the oc binary at [here](https://www.openshift.org/download.html#oc-platforms) . Run oc cluster up to start Openshift.

```bash
oc cluster up
```

![](https://cdn-images-1.medium.com/max/1600/1*uOGNt8GV5ffwSKG4D7RvCA.png?style=centerme)

> **NOTE**: if docker not configured to run without sudo then oc will also need sudo to run, haven’t documented exporting paths

You can now log into the web portal

![](https://cdn-images-1.medium.com/max/1600/1*23OW749xYm0rorSmC2sD-g.png?style=centerme)

Once logged in you will see the console

![](https://cdn-images-1.medium.com/max/1600/1*U9Fg2cXMXnSA0Nk7Y2vaMQ.png?style=centerme)

## Deploying a Node application
Click on create project

![](https://cdn-images-1.medium.com/max/1600/1*7vTEn8NMPY2XFAYbNwarZQ.png?style=centerme)

Add a Name and click Create

![](https://cdn-images-1.medium.com/max/1600/1*CG9zyYOh9tn5nglcJKxCbQ.png?style=centerme)

Select JavaScript

![](https://cdn-images-1.medium.com/max/1600/1*sU5kBtmhjt_tsfS6el-PbA.png?style=centerme)

I selected Node.js 6.

![](https://cdn-images-1.medium.com/max/1600/1*a1JFLrcckEPOxGsz99tn5g.png?style=centerme)

Add a **Name** and add the **Git Repository URL** of your Node.js application

> **NOTE**: https version of git URL

![](https://cdn-images-1.medium.com/max/1600/1*L9kDx_vzp2d42Il9GZ0z8w.png?style=centerme)

Your application is now deployed select **Continue to overview** to proceed to the Openshift console you can see the URL for accessing your application on the right. If there are any issues click on the pod icon, you can access the logs from a tab.

![](https://cdn-images-1.medium.com/max/1600/1*1HOen2lI9U5WkV5kjQ6Akg.png?style=centerme)

Pain point if your application doesn’t have an npm start script you application won’t build . You need to add a start script to your package.json like

```json
“scripts”: {
            “start”: “node app.js”
           }
```

Pain point your Node.js application needs to be using the same port as Openshift or your application won’t render.

```js
app.listen(8080, function () { 
    console.log(‘Listening at http://localhost:8080’); 
    });
```

> **NOTE**: if you don’t want to change your application port, you can change both the **route** and the **service** in Openshift by editing there yml files in the gui or by using the oc edit command e.g.
```bash
oc edit route <route-name> 
oc edit service <service-name>
```

And that all you should be up an running.