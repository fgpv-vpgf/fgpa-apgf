// GLOBAL VENDOR IMPORTS
import 'jquery';
import 'angular';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';
import 'angular-messages';
import 'angular-sanitize';
import 'angular-translate';
import 'angular-translate-loader-static-files';
import 'angular-ui-sortable';
import 'dotjem-angular-tree/src/directives/dxTree.js';

// angular schema form: https://github.com/json-schema-form/angular-schema-form
import 'angular-schema-form';

// TODO: import inside needed file and remove
import Flow from '@flowjs/ng-flow/dist/ng-flow-standalone'

// APPLICATION MAIN IMPORTS
import './bootstrap.js';
import './app.module.js';
import './app-seed.js';
import './global-registry.js';

import './core/core.module.js';
import './core/core-loader.js';

import './geo/geo.module.js';
import './geo/geo-loader.js';

import './ui/ui.module.js';
import './ui/ui-loader.js';
import './layout/layout.module.js';
import './layout/layout-loader.js';

// schema form custom add on
import './addon/addon-loader.js';

// styles
import '../content/styles/main.scss';

// HACKS
// hoverintent is a function consuming the jQuery object where it adds a prototype method hoverIntent.
import hoverintent from 'jquery-hoverintent';
// hoverintent($); // TODO: see if needed...
