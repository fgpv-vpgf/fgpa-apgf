const templateMapUrl = require('./map.html');
const templateUIUrl = require('./ui.html');

/**
 * @name routeService
 * @module app.route
 * @description
 *
 * The `routeService` service provides access to all route.
 */
angular.module('app.route').config($routeProvider => {

    $routeProvider
        // route for the map page
        .when('/map', {
            templateUrl : templateMapUrl,
            controller  : 'avMapCtrl'
        })

        // route for the ui page
        .when('/ui', {
            templateUrl : templateUIUrl,
            controller  : 'avUICtrl'
        })

        .otherwise({
            redirectTo: '/map'
        });
});
