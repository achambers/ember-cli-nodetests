# ember-cli-nodetests

> An EmberCLI addon to add the capability to run node tests to your addon

## Motivation

Often times, when creating an EmberCLI addon that extends EmberCLI
functionality, as opposed to the consuming ember app functionality, the ability
to test the node lib files created outside of the context of the `app` directory
is required. There are a few boilerplate things that need to be installed and
configured in order to get these tests running and this addon automates that.

This addon is designed to be used in addons that only provide node functionality
that extend EmberCLI. You can see examples of these sorts of addons by looking
at any of the [ember-cli-deploy plugins](https://github/ember-cli-deploy).

## What does this addon do?

This addon will:

- Add node testing dependencies: `chai`, `chai-as-promised`, `mocha` and
  `moch-jshint`
- Create a jshint node test
- Configure an npm `test` script that will run all `**/*-nodetest.js` files
  within in the tests directory

## Installation

Install with EmberCLI:

```bash
$ ember install ember-cli-nodetests
```

or with NPM:

```bash
$ npm install --save-dev ember-cli-nodetests
$ ember generate ember-cli-nodetests
```

Run your new node tests:

```bash
$ npm test
```
