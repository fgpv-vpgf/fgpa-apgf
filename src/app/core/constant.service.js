/**
 * @name configDefaults
 * @constant
 * @memberof app.core
 * @description
 *
 * The `configDefaults` constant service provides default config values.
 */
/**
 * @name templateRegistry
 * @constant
 * @memberof app.core
 * @description
 *
 * The `templateRegistry` constant service provides template URLs.
 */


angular
    .module('app.core')
    .factory('events', events)
    .constant('translations', AUTOFILLED_TRANSLATIONS);

function events($rootScope) {
    return {
        /**
         * A shorthand for $rootScope.$on; no need to inject `$rootScope` separately;
         *
         * @function $on
         * @param {String} eventName event name to listen once
         * @param {Function} listener a callback function to execute
         * @return {Function} a deregister function
         */
        $on: (...args) =>
            $rootScope.$on(...args),
        $broadcast: (...args) =>
            $rootScope.$broadcast(...args),

        avReady: 'avReady' // Fired when author is ready
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
