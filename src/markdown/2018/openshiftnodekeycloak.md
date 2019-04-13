# Openshift, Node and Keycloak

![](https://cdn-images-1.medium.com/max/800/1*T32ZzxhlMuy8QTCTNku_uw.png?style=centerme)

## Node Express.js
Using [keycloak-connect](https://www.npmjs.com/package/keycloak-connect) middleware you can protect your endpoints with Keycloak. I cover this in more detail [here](https://codeburst.io/keycloak-and-express-7c71693d507a). Here are the basics install keycloak-connect in a express project.

```js

'use strict';

const Keycloak = require('keycloak-connect');
const express = require('express');
const session = require('express-session');
const expressHbs = require('express-handlebars');

const app = express();


// Register 'handelbars' extension with The Mustache Express
app.engine('hbs', expressHbs({extname:'hbs',
  defaultLayout:'layout.hbs',
  relativeTo: __dirname}));
app.set('view engine', 'hbs');


var memoryStore = new session.MemoryStore();
var keycloak = new Keycloak({ store: memoryStore });

//session
app.use(session({
  secret:'thisShouldBeLongAndSecret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

app.use(keycloak.middleware());

//route protected with Keycloak
app.get('/test', keycloak.protect(), function(req, res){
  res.render('test', {title:'Test of the test'});
});

//unprotected route
app.get('/',function(req,res){
  res.render('index');
});

app.use( keycloak.middleware( { logout: '/'} ));

app.listen(8000, function () {
  console.log('Listening at http://localhost:8000');
});
view raw
```

I added a start script to the package.json.

```json
"scripts": {
"start": "node app.js"
}
```
Then pushed the changes to a remote git repo. I can now deploy this to Openshift from git. Click on New Project In Openshift , browse the catalog and select node and point to your git repo.

![](https://cdn-images-1.medium.com/max/800/1*0rLa_RLZastlbJVNctGHRA.gif?style=centerme)

The project is deployed but Openshifts default port is 8080, As the expresss server is serving on 8000 we need to change this to get the route to resolve. We need to edit the Deployment config ,Service and the Route to change this.

![](https://cdn-images-1.medium.com/max/800/1*8WCH3lO5I70PibpisYtn9A.gif?style=centerme)

You should now be able to click on the link and it should resolve. There is one further thing we need to do this app but that is after we get the Keycloak server up and running.

## Keycloak
There is a Keycloak container designed to run with Openshift found [here](https://hub.docker.com/r/jboss/keycloak-openshift/) which I will use to deploy Keycloak. Click on Add to project and Deploy Image , add **jboss/keycloak-openshift** to the image name, and add two enviroment variables for the admin username **(KEYCLOAK_USER)** and password **(KEYCLOAK_PASSWORD)**.

![](https://cdn-images-1.medium.com/max/800/1*NKxp306KPkzt-toY5p7O0Q.gif?style=centerme)

Once the build is finished you will see that no route was setup. Just click on create route and except the defaults.

![](https://cdn-images-1.medium.com/max/800/1*bc46J2ME7vC416Hq15KGoQ.png?style=centerme)

Once the route is created you can click on it and got to the Keycloak landing page

![](https://cdn-images-1.medium.com/max/800/1*5FxEC4vIM9tgQicGTH9m9g.png?style=centerme)


Click on **Administration Console** and you can log in with the admin username(KEYCLOAK_USER) and password (KEYCLOAK_PASSWORD).Thats all your Keycloak server is up and running on Openshift.

## Connecting the Express server to Keycloak
On the Keycloak server we need to create a Realm and create a Client in the realm, set the valid redirect url for the client i.e. point it at our express server on Openshift, Create a user in the realm and set its password and download the keycloak.json file to the root of our express app. I cover this in more details here. This is a quick overview.

![](https://cdn-images-1.medium.com/max/800/1*IwAwtkr-7yty5fsDPEv_mg.gif?style=centerme)

Create a file in the route of your express server project call keycloak.json with the contents from the download e.g.

```json
{
  "realm": "express",
  "auth-server-url": "http://keycloak-openshift-keycloak-project.192.168.42.240.nip.io/auth",
  "ssl-required": "external",
  "resource": "express",
  "public-client": true,
  "confidential-port": 0
}
```
Commit the changes and push to your remote repo. Then trigger a build for the express Pod to pull the changes from git and deploy them.

![](https://cdn-images-1.medium.com/max/800/1*SQI99Eh4JMX52as8LmZ7gQ.png?style=centerme)

That’s it all should be working now.

![](https://cdn-images-1.medium.com/max/800/1*Ro_szAuoWA3V6KkDECZMcg.gif?style=centerme)

