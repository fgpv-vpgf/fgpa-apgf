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
        schemas: ['map.[lang].json', 'ui.[lang].json', 'service.[lang].json'] // TODO: add new schema as they come, list as they should appear in the tab menu
    });

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
        avNewModel: 'avNewModel', // Fired when user create a new for
        avLoadModel: 'avLoadModel', // Fired when a user load an existing form
        avNewItems: 'avNewItems', // Fired when a user add a new item inside an array (e.g. layer of layers)
        avValidateForm: 'avValidateForm' // Fired when a user click on validate to validate all forms
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
