# Hosting static websites on Openshift

![](https://cdn-images-1.medium.com/max/800/1*EFWO2ndZaJPQadWav95T3Q.png)

I had a site that I wished to host on Openshift.

## Express.js
Because the Node run time was supported I decide to host using a simple Express.js server. I had a git repository with an index.html file in the root. I ran npm init and excepted all the defaults.

![](https://cdn-images-1.medium.com/max/800/1*y0SGXo1kGNP9Yr1b3yJjkw.png)

That’s all I need to setup a Node app, I then proceed to add Express.js to it

```bash
npm install --save express
```

I also added a start script to the package.json

```json
"scripts": {    
           "test": "echo \"Error: no test specified\" && exit 1",
           "start": "node index.js"  
},
```

Added index.js Express server

```js
var express = require('express');
var app = express(); 
// serves files from the root directory
app.use(express.static('./'));
app.listen(8080, function () {    
  console.log('Listening at http://localhost:8080');  
});
```

I committed the changes to git remote repo. I created a new project in Openshift , browsed the catalog and selected Node.

![](https://cdn-images-1.medium.com/max/800/1*DLudZsgJhftBGDuWNmy_hA.png)

I entered an Application name and an the Git repository where my index.html was and click create. The Node version does’t overly matter for this small app.

![](https://cdn-images-1.medium.com/max/800/1*feRCaU3P8idh-DJoej-Dug.png)


The project proceeded to build and pull the git repo. You can check the progress on the Overview for the project

![](https://cdn-images-1.medium.com/max/800/1*A1FkfKEZUqybx_4-78sa7A.png)

Once the build was finished I was able to access my static site from the url provide by Openshift.

## Nginx
It turns out that Openshift as of May 2018 now has Nginx in the catalog. So the route to hosting static websites is a little easier. You sill need an git repo with a index.html in the root directory but you can get your site up with zero code. Create a new project and from the catalog select Nginx.

![](https://cdn-images-1.medium.com/max/800/1*8jQrOH5MNgrmTAxWcAqt5A.png)

The steps are much the same as deploying the Node app above i.e. Add application name and git repository, once the build is complete your site is up on the Route-External traffic.