# Create a custom workflow for RainCatcher

Oct 27, 2017

![](https://cdn-images-1.medium.com/max/800/1*LQ4o1lvQqwMFGbPiCbeHXw.png?style=centerme)

## Background
RainCatcher is an open source mobile enabled work force management solution. It’s real power is that it can be used to build custom workflows . RainCatcher has three applications that run together to provide the solution. The [raincatcher-server](https://github.com/feedhenry-raincatcher/raincatcher-server) that is the back end for the applications , the [raincatcher-portal](https://github.com/feedhenry-raincatcher/raincatcher-portal) that is used to administrate work orders and workflows and the [raincatcher-mobile](https://github.com/feedhenry-raincatcher/raincatcher-mobile) application that is used by end users or workers to complete work orders.

This is a how to guide for creating and customising a step by editing the html templates and editing the . I will also cover adding the step to the mobile and portal application.

##Getting started
Clone and install the git repos for the applications see the [official docs](http://raincatcher.feedhenry.io/docs/#%7Bcontext%7D-pro-running-the-demo-repositories) for more information. Workflows made up of steps when developing a workflow we build a step. There is a [step generator application](https://github.com/feedhenry-raincatcher/generator-rcstep) witch is attached to the RainCatcher project and will build a custom step using a basic template.

```bash
# Install yoeman and step generator 
npm install -g yo
npm install -g generator-rcstep
# Starting step generator
yo rcstep
```

**Note**: you need [NVM](https://github.com/creationix/nvm) installed to prevent permissions issues running yoeman
Below is I use rcstep generator to create a survey form step

![](https://cdn-images-1.medium.com/max/800/1*Lw5X2KEm-V5cGSbi9tPS_w.gif?style=centerme)

This is a basic template it contains a simple form which I will use as a starting point for this example . This form is made up of AngularJS directives and html templates . So I will try and explain the various elements involved. All the files for development of a step are in the **lib** directory. E.g.

![](https://cdn-images-1.medium.com/max/800/1*NQOxdQsyvTShBXdJc4pepQ.png?style=centerme)

In ./lib/angular/template you have two html files which are templates for a form and a result screen i.e. data entered on the form screen will be shown on the results screen.

## Editing Form
Below is the form template

```js
<!-- Title -->
<p class="wfm-step-row">Please register details</p>

<!-- Two field form -->
<div class="wfm-step-row" class="form-group" ng-form name="stepForm">

  <md-input-container class="md-block" flex-gt-sm>
    <label>E.g. First Name</label>
    <!-- Customise change ng-model ctrl.model to own variable -->
    <input type="text" id="title" name="title" ng-model="ctrl.model.firstName" required>
  </md-input-container>

  <md-input-container class="md-block" flex-gt-sm>
    <label>E.g. Last Name </label>
    <input type="text" id="title" name="title" ng-model="ctrl.model.lastName" required>
  </md-input-container>
  
</div>

<md-divider></md-divider>

<!-- Back and Continue Buttons-->
<div class="workflow-actions md-padding md-whiteframe-z4">
  <md-button class="md-primary md-hue-1" ng-click="ctrl.back($event)">Back</md-button>
  <md-button class="md-primary" ng-disabled="stepForm.$invalid || stepForm.$pristine" ng-click="ctrl.done($event)">Continue</md-button>
</div>
```

The form as it exists now has two input fields for ‘First Name’ and ‘Last Name’. The form has a ‘back’ and a ‘continue’ buttons.

Adding a extra field to the form is a matter of copying an existing field and modifying it. E.g. to add an email field change the label and the ng-model

```js
<md-input-container class="md-block" flex-gt-sm>
  <label>Email</label>
  <input type="text" id="title" name="title" ng-model="ctrl.model.email" required>
</md-input-container>
```

AngularJS Material have directives for forms and fields that can be used. See [Angular Demos](https://material.angularjs.org/latest/demo/select) for more examples. I have implemented a drop down below

```js
<md-input-container class="md-block" flex-gt-sm>
  <md-label>Select Web Language</md-label>
  <md-select ng-model="ctrl.model.webLanguage">
    <md-optgroup label = "Select Web Language">
      <md-option ng-value= "item" ng-repeat="item in ctrl.webLanguages">{{item}}</md-option>
    </md-optgroup>
  </md-select>
</md-input-container>
```

The step.js file in **./lib/angular** contains AngularJs directives which control the logic behind the form and result page. I added an array to the directive controlling the form (i.e. ngModule.directive(‘surveyForm’ ) in order to populate the drop down.

```js
self.webLanguages = [ 'HTML','CSS', 'JavaScript', 'Java' ];
```

See the full gist of steps.js [here](https://gist.github.com/austincunningham/5bb7c4fbc0ea5343c363d6b294a6621e)

## Editing Results
The second file is the results view which shows the results of form input. For every input you have on the form you should have a results view.

```js
<!-- Title-->
<md-subheader>survey</md-subheader>
<!-- Two field report -->
<md-list>
  
  <md-list-item class="md-2-line">
    <div class="md-list-item-text">
      <!-- Customise change model. to own variable -->
      <h3>{{model.firstName}} </h3>
      <p>First name </p>
    </div>
    <md-divider></md-divider>
  </md-list-item>

  <md-list-item class="md-2-line">
    <div class="md-list-item-text">
      <h3>{{model.lastName}} </h3>
      <p>Last Name</p>
    </div>
    <md-divider></md-divider>
  </md-list-item>

</md-list>
```


To add say the email field to the results page copy one of the existing fields and modify it see how the model.email is directly related to the forms ctrl.model.email

```js
<md-list-item class="md-2-line">
  <div class="md-list-item-text">
    <h3>{{model.email}} </h3>
    <p>Email</p>
  </div>
  <md-divider></md-divider>
</md-list-item>
```

To render the input from the dropdown similar to above.

```js
<md-list-item class="md-2-line">
  <div class="md-list-item-text">
    <h3>{{model.webLanguage}} </h3>
    <p>Selected Web Language</p>
  </div>
  <md-divider></md-divider>
</md-list-item>
```

To build the step so they are available use

```bash
npm run build
```

You can use the watch command to continuously build the step while developing it

```bash
npm run watch
```

## Adding the step to raincatcher-portal
Get your step package name and version from the package.json file in th
```json
"name": "@raincatcher/step-survey",
"version": "0.0.1",
```

Changed the directory raincatcher-portal and npm link my new step package

```bash
npm link @raincatcher/step-survey
```

Add step package to **package.json**

![](https://cdn-images-1.medium.com/max/800/1*HEKJXSHKiujp90m_bDu9NA.png?style=centerme)

```bash
npm install
```

Add step to portal in angular.modules in **src/app/main.js**

```js
// apply a variable name to the module
var surveyPortal = require('@raincatcher/step-survey');
```

Add step definition to angular.modules stepDefinitions array

```js
stepDefinitions: [
                    surveyPortal.definition 
                 ]
```

Also add step ngModule() in angular.modules

```js
surveyPortal.ngModule()
```

Import the step scss demo/portal/src/sass/portal.scss

```js
@import 'node_modules/@raincatcher/step-survey/lib/style.scss';
```

![](https://cdn-images-1.medium.com/max/800/1*u5rLQY8_SWx9-NrQZ4wSZQ.png?style=centerme)

Create a new workflow and create a work order from that work flow and assign it to a worker

![](https://cdn-images-1.medium.com/max/800/1*EyEnSCzfmahlCTNL9MZCvw.gif?style=centerme)

## Adding the step to raincatcher-mobile
Changed the directory raincatcher-mobile and npm link my new step package

```bash
npm link @raincatcher/step-survey
```

And add step package to the raincatcher-mobile package.json

![](https://cdn-images-1.medium.com/max/800/1*GRCCrzYlxFCf1xn-l7KybQ.png?style=centerme)

```bash
npm install
```

Add the step-survey to the **/src/app/app.js**

```js
// apply a variable name to the module
var surveyMobile = require('@raincatcher/step-survey');
// add ngModule() for the module to angular.module array;
surveyMobile.ngModule()
```

See the [app.js](https://gist.github.com/austincunningham/9d61c3022a4462d7040cf81e6d5d28af) gist for an example of this implementation


Import the step scss for step-survey into **/src/sass/app.scss**

```js
@import 'node_modules/@raincatcher/step-survey/lib/style.scss';
```

![](https://cdn-images-1.medium.com/max/800/1*abd3WaO4BXC8N9b6h4Yhhw.png?style=centerme)

**Note**: style.scss can be used to effect css style changes for the step , to change overall style for the mobile application you change app.scss

We can now access the work order created on the portal on the mobile application

![](https://cdn-images-1.medium.com/max/800/1*g9GcVNV8KclLmhCLrviGvw.gif?style=centerme)

As you can see we can build workflows up with steps and we can customise steps to take in what ever form content we wish.