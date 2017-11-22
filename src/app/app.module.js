'use strict';

/**
 * @namespace app
 * @description
 * The root module ties other modules together providing a very straightforward way to add or remove modules from the application.
 *
 */
angular
    .module('app', [
        'app.core',
        'app.addon.sampleSchema',
        'app.addon.sampleForm',
        'app.ui',
        'app.layout'
    ])
    .config(($compileProvider, $mdInkRippleProvider, $mdAriaProvider) => {
        // to improve IE performance disable ripple effects globally and debug info
        if (window.AV.isIE) {
            $mdInkRippleProvider.disableInkRipple();
        }
    });
