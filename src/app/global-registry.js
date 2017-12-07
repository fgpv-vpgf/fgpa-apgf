'use strict';

import geoapi from 'geoApi';

/**
 * These are global values defined in the AV registry. They can be overridden by creating a global `AV` object with the same properties __before__ `injector.js` is executed.
 */
const avDefaults = {
    dojoURL: '//js.arcgis.com/3.20/'
};

/**
 * @global
 * @name AV
 * @desc The global object for the viewer.  Used for providing an API to the surrounding page.
 */
// check if the global RV registry object already exists
if (typeof window.AV === 'undefined') {
    window.AV = {};
}

const AV = window.AV; // just a reference

// apply default values to the global AV registry
Object.keys(avDefaults)
    .forEach(key => applyDefault(key, avDefaults[key]));

// initialize gapi and store a return promise
AV.gapiPromise = geoapi(AV.dojoURL, window);

/**
 * Checks if a property is already set and applies the default.
 * @param  {String} name  property name
 * @param  {String|Object|Number} value default value
 */
function applyDefault(name, value) {
    if (typeof AV[name] === 'undefined') {
        AV[name] = value;
    }
}
