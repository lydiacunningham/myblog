# Create Node Command line App


![](https://cdn-images-1.medium.com/max/800/1*Yhe1R94CIotr2se7Wf6TQQ.png?style=centerme)

I wanted to create a command line Node Module. To start with I created my project directory change_oc and initialize my project with **npm init** excepting the defaults

![](https://cdn-images-1.medium.com/max/800/1*O-eU1pzEijMQpFvBswALkA.png?style=centerme)

I created the **index.js** file and gave it the following shebang

![](https://cdn-images-1.medium.com/max/800/1*8umHJmVTwj-3HBt8fcgLlA.png?style=centerme)

I edited the **package.json** file and add **bin** , and gave it my package name and pointed it at my main node file index.js

![](https://cdn-images-1.medium.com/max/800/1*1Mb-U9IERFpyiis39bRgaA.png?style=centerme)

I needed to change permissions on the index.js file so it can run in the os

```bash
chmod 775 index.js
```

So that’s it the package is now able to execute from the command line but it doesn’t do anything so add a console.log to index.js to test.

![](https://cdn-images-1.medium.com/max/800/1*FpI5Hjbj9nu6Zg4jCdmewQ.png?style=centerme)

Install the package globally from the package directory, and you can then run it by using the value set with bin in package.json e.g.

```bash
$ npm install -g
$ change_oc
This is like Echo in the command prompt
```

At this point you think great but what can I do. Node has some inbuilt components that are very useful for command line applications.

> [fs](https://nodejs.org/api/fs.html)

> [child process](https://nodejs.org/api/child_process.html)

A simple example and use case

```js

#!/usr/bin/env node

const colors = require('colors/safe');
const readlineSync = require('readline-sync');
const execsync = require('child_process').execSync;
const fs = require('fs');

console.log('This is like Echo in the command prompt');

// npm install colors/safe --save
console.log(colors.yellow('colours work like this'))

// fs has alot of methods but this is one I found useful
// Check to see if /usr/bin/oc exists if not create it
if (!fs.existsSync('/usr/bin/oc')) {
  //execSync can be used to execute any os command
  execsync('sudo touch /usr/bin/oc');
}

// setting up a prompt for user interface 
// npm install readline-sync --save
const result = readlineSync.question(colors.blue('Do you wish to do something else yes/no ? '));
  if (result === 'yes' || result === 'y') {
    // add your logic here
  }
```

**Note**: I recommend using synchronous commands, asynchronous commands may not always execute in the order you wish if you are waiting for user input or a disk writing processes.
That’s the basics you may want to publish to [npmjs](https://hackernoon.com/publish-your-own-npm-package-946b19df577e).

**Note**: To use command line node modules in the os they need to be installed globally.
My cli project is on [npmjs](https://www.npmjs.com/package/change_oc) and [github](https://github.com/austincunningham/change_oc) for further reference.

