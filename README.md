# wgnhs-layout
Generic Layout Web Components for WGNHS apps

# Usage
Served via jsdelivr: [![](https://data.jsdelivr.com/v1/package/npm/@wgnhs/elements/badge)](https://www.jsdelivr.com/package/npm/@wgnhs/elements)

Package includes baseline css and variables. You can replace [variables](css/variables.css) with your own project specific copy.
```html
  <link rel="stylesheet" href="css/variables.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@wgnhs/elements@^0/dist/css/reset.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@wgnhs/elements@^0/dist/css/typography.css" />
```

Using scripts, include common first:
```html
  <script src="https://cdn.jsdelivr.net/npm/@wgnhs/elements@^0/dist/common.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@wgnhs/elements@^0/dist/layout.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@wgnhs/elements@^0/dist/router.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@wgnhs/elements@^0/dist/pdf.min.js"></script>
```

# Components
## Common
Contains baseline styles in both CSS and [Constructable Stylesheets](https://wicg.github.io/construct-stylesheets/), packaged [lit-element](https://lit-element.polymer-project.org/) dependency, and small utility functions to quickly generate unique ID's and dispatch events.
* lit-element
* styles
  * reset
  * typography
* utils

## Layout
Contains basic structural building blocks for UIs.
* app-collapsible
* app-sidebar
* app-spinner
* interact
  * button-link
  * toggle-switch
  * in-radio

## Router
Contains a general purpose front-end router based off of [UI-Router](https://ui-router.github.io/).
* site-router

## PDF
Contains an in-browser PDF renderer and controls. Based off of [Mozilla's PDF.js](https://github.com/mozilla/pdf.js)
* pdf-view



# Development
This project requires [NodeJS 8+](https://nodejs.org/) installed on your development system. We recommend using the latest LTS version.

## Setup
```
npm install
```
After cloning the repository, bring up a terminal in the repository's root directory and run `npm install` to download the dependencies.

## Running
```
npm start
```
The `npm start` command is configured to build the project, then serve the project 
at `http://127.0.0.1:8081/wgnhs-elements/`

The server will watch for source changes and automatically refresh the browser.


## Building
```
npm run build
```
The distributable folder `dist/` can be generated by runnning `npm run build`


## Publishing GitHub Pages
```
npm run pages
```
The command `npm run pages` will build the source code, and commit the `dist/` folder to the `gh-pages` branch of the repository. It will also `push` the branch to the git remote named `origin`


## Releasing
A baseline release process is implemented in npm scripts:
```
npm run release
```
The command will:
* install dependencies
* run a fresh build
* configure publishing options
* version to the next `patch` version
* push the newly created commit and tag
* publish to npm
* push ghpages content
