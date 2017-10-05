// GLOBAL VENDOR IMPORTS
import 'jquery';
import 'angular';
import 'angular-aria';
import 'angular-animate';
import 'angular-material';
import 'angular-messages';
import 'angular-sanitize';
import 'angular-translate';
import 'dotjem-angular-tree/src/directives/dxTree.js';
import 'angular-translate-loader-static-files';

import 'angular-schema-form';

// TODO: import inside needed file and remove
import Flow from '@flowjs/ng-flow/dist/ng-flow-standalone'

// APPLICATION MAIN IMPORTS
import './bootstrap.js';
import './core/core.module.js';
import './ui/ui.module.js';
import './layout/layout.module.js';
import './layout/layout-loader.js';
import './ui/ui-loader.js';
import './core/core-loader.js';
import './app.module.js';
import './app-seed.js';
import '../content/styles/main.scss';


// HACKS
// hoverintent is a function consuming the jQuery object where it adds a prototype method hoverIntent.
import hoverintent from 'jquery-hoverintent';
hoverintent($);
