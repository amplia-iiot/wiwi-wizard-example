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

## Install widget on web OpenGate UX

Installation and management widget on the web OpenGate UX is done through the following commands:

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

This version is compatible with opengate-web version >= 6.0.0