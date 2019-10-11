/**
 * @name configDefaults
 * @constant
 * @memberof app.core
 * @description
 *
 * The `configDefaults` constant service provides default configuration values.
 */

angular
    .module('app.core')
    .factory('events', events)
    .constant('translations', AUTOFILLED_TRANSLATIONS)
    .factory('appInfo', appInfo)
    .constant('constants', {
        debInput: 500, // time for debouncing when user enter value
        delayWCAG: 250,
        delayAccordion: 2500,
        delayHandle: 3500,
        delayCollapseLink: 2800,
        delayCollapseHeader: 3000,
        delaySplash: 3500,
        delayEventSplash: 750,
        delayUpdateColumns: 1000,
        delaySetSubTab: 100,
        delaySetVersion: 2000,
        delayScroll: 100,
        delayScrollToElement: 300,
        supportWkid: [3978, 3857, 102100],
        schemas: [
            'map.[lang].json',
            'ui.[lang].json',
            'services.[lang].json',
            'version.[lang].json',
            'language.[lang].json',
            'plugins.[lang].json'
        ], // TODO: add new schema as they come, list as they should appear in the tab menu. !!search for TODO to find what to set!!
        subTabs: {
            map: {
                index: 0,
                keys: ['form.map.extentlods', 'baseMaps', 'layers', 'legend', 'components']
            },
            ui: {
                index: 1,
                keys: ['form.ui.general', 'appBar', 'form.ui.nav', 'form.ui.sidemenu']
            },
            services: {
                index: 2,
                keys: ['export', 'search', 'form.service.urls']
            },
            plugins: {
                index: 3,
                keys: ['form.plugins.rangeSlider', 'form.plugins.coordInfo', 'form.plugins.areasOfInterest']
            }
        },
        devVersion: '3.2.0',
        prodVersion: '2.5.0'
    }); // TODO: add new tabs and subtabs as they come, tabs and subtabs listed as they should appear in the interface

function events($rootScope) {
    return {
        /**
         * A shorthand for $rootScope.$on; no need to inject `$rootScope` separately;
         *
         * @function $on
         * @param {String} eventName event name to listen once
         * @param {Function} listener a callback function to execute
         * @return {Function}         a deregister function
         */
        $on: (...args) =>
            $rootScope.$on(...args),
        $broadcast: (...args) =>
            $rootScope.$broadcast(...args),

        avSchemaUpdate: 'avSchemaUpdate', // Fired when there is an update to the state
        avSwitchLanguage: 'avSwitchLanguage', // Fired when there is a language switch
        avLoadModel: 'avLoadModel', // Fired when a user load an existing form
        avNewItems: 'avNewItems', // Fired when a user add a new item inside an array (e.g. layer of layers)
        avValidateForm: 'avValidateForm', // Fired when a user click on validate to validate all forms
        avShowSplash: 'avShowSplash',
        avLayersIdUpdate: 'avLayersIdUpdate', // Fired when layers id is updated. Will be use inside UI model to update table layer id
        avUpdateFocus: 'avUpdateFocus', // Fired when user click on element of summary tree
        avShowHelp: 'avShowHelp', // Fired when help dialog window opening is completed
        avLegendError: 'avLegendError', // Fired when there's an id in error in the structured legend
        avValidateLegend: 'avValidateLegend', // Fired legend validation
        avNewSaveName: 'avNewSaveName', // Fired new save name,
        avVersionSet: 'avVersionSet' // Fired when version has been set
    };
}

// Angular services that have no constructors (services that are just plain objects) are __shared__ across app instances
// to have it per instance, the appInfo service needs to have some initialization logic
function appInfo() {
    const service = {
        id: null
        // something else ?
    };

    return service;
}
