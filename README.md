# wiwi-wizard-example

Example project of a WIWI type wizard

## Getting started

**Clone the project**

**Installing all dependencies of project**

This project use yarn: https://yarnpkg.com/en/docs/install

```
yarn
```

or 

```
yarn install
```

**Bundle with webpack**

The project offers the following script that packages the project using [webpack](https://webpack.js.org/)


```
npm run bundle
```

## Install wizard on web OpenGate UX

Installation and management wizard on the web OpenGate UX is done through the following commands:

**Register**

```
npm run register
```

**Update**

```
npm run update
```

**Delete**

```
npm run delete
```

They will ask for the following information:

1. Type url of api-web (http://localhost:3977): default http://localhost:3977
2. domain: domain of user that exists in the platform OpenGate
3. user name: user that exists in the platform OpenGate
4. password: password of user

## Notes of version

**0.1.0**

This version is compatible with opengate-web version >= 8.13.x

## Ohters

### Configure wizard

By default the web, when launching the wizard will use the following configuration:

``` js
{
    template: 'modules/wizard/client/views/wizard.client.view.html',
    controller:  name_of_wizard + 'Controller',
    windowClass: name_of_wizard + '-wizard'
}
```

Where _name_of_wizard_ will be : meta-widget.json -> actions[name_of_action][name_of_wizard]

That is, the controller of the wizard must have the same name as the controller to be configured:

If the `name_de_wizard` equals _exampleWizard_, the angular controller should be called `exampleWizardController`

**You can configure all this by adding the configuration of the new wizard in the following way in the run block of the configured angular module**: `src/config/wizard.config.js`

``` js
angular
        .module('wiwi.wizard')
        .run(function ($enabledWizards) {
            $enabledWizards.wizards.exampleWizard = $enabledWizards.getCommonConfig({
                template: 'modules/wizard/client/views/wizard.client.view.html',
                controller: 'exampleWizardController',
                windowClass: 'exampleWizard-wizard'
            });
        });
```

- template: optional parameter. If it is not added, the base html on which the wizard is based will be the one with the default website: `'modules/wizard/client/views/wizard.client.view.html'`
- **controller**: mandatory parameter. Wizard's main controller
- **windowClass**: mandatory parameter. Class to add to the wizard