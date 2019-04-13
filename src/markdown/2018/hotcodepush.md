# Hot code pushes to Openshift from a Node app

![](https://cdn-images-1.medium.com/max/800/1*gFnst2j3sKAF4Eh44RbNcg.png?style=centerme)

How move your local development to Openshift ? Here a couple of ways to push your local code changes to Openshift.

## 1. Create a Development Image and sync with oc RSYNC
Create a docker container for your Node app see here for more information on setting this up. We need the Node app to restart if any changes are made and not kill the pod, as a new pod wouldn’t have our changes. Run your Node program as a service in the pod with forever where app.js is the starting point for your app. Remove CMD [ "npm", "start" ]and add the following to your Dockerfile.

```bash
## Installing forever in app dir
RUN npm install -g forever
## ignore node_modules
RUN echo "node_modules" >> .foreverignore
## start app.js with forever watching for file changes the directory
CMD ["forever","-w","--watchDirectory=/opt/app-root/src","app.js"]
```

**NOTE**: you can do something similar with a package called nodemon

Disable the liveness and readiness checks so your pod doesn’t restart when your app is restarting.

```bash
oc login https://openshift-cluster-url
oc project your-project-name
oc set probe dc your-app-name --liveness --readiness --remove=true
```

Build your image and push it to dockerhub

```bash
docker build -t docker.io/docker-user-name/appName:tagName -f Dockerfile .
docker push dockerhub-user-name/appName:tagName
```

Change the image on Openshift to point to your new development image and click save.

![](https://cdn-images-1.medium.com/max/800/1*qar2WY5lLwjw5BB2SeDCxQ.gif?style=centerme)

That’s it you now have an image deployed that will restart anytime the code base changes.

### RSYNC

The oc binary has an rsync (remote sync) command included, which functions in much the same way as a traditional rsync command works.

```bash
rsync options source destination
```

So how can you use this. First you need two pieces of information the source and the destination.

1. Change to the root directory of your project.
2. Identify the (source) directory of your code base. This could be the root directory ./ or in some Node applications is typically ./lib or ./src directory
3. Login into your Openshift cluster and change to your project
```bash
oc login https://openshift-cluster-url
oc project your-project-name
```
4. Get your applications pod name in Openshift (destination). Use the following command where the appName is your application name. The results returned will be the pod-name
```bash
oc get po | grep appName | grep Running | awk '{print $1}'
run oc rsync
```
**NOTE**: On the options we don’t want to change the permissions of the files on Openshift we use the no-prems flag, the watch flag runs rsync continuously watching for changes

```bash
oc rsync --watch --no-perms=true ./source pod-name:/opt/app-root/src
```

**NOTE**: the path :/opt/app-root/src will not change, it is the default location for code in an pod
You will see something like

![](https://cdn-images-1.medium.com/max/800/1*6tPkFjzzYPV1erUkgWe0pA.png?style=centerme)

Check your pod has updated by going to the pod terminal and cd to /opt/app-root/src and cat a file you have changed to see if your changes have taken effect. Also you will see app restart in the logs.

```bash
error: restarting script because change changed
error: Forever detected script was killed by signal: SIGKILL
error: Script restart attempt #1
```

![](https://cdn-images-1.medium.com/max/800/1*rrTjLh0qVh9DllyNXds67Q.jpeg?style=centerme)


## 2. START-BUILD from the local directory

If you already have a project deployed on Openshift you can start a build directly from your local directory using the **from-dir** flag directory.

```bash
oc login https://openshift-cluster-url
oc project your-project-name
oc start-build app-name-on-openshift --from-dir=. --wait
```

This creates a local container image from your last git commit and starts a build on Openshift, This will close the current running pod on Openshift and start a new one.

One thing to note with the oc start-build command is each time it is run it generates a new docker container with all the local disk space overheads. So managing local images can be an issue. But it does confirm that changes will build in Openshift unlike rsync.