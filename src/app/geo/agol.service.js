/**
 * @module agolService
 * @memberof app.geo
 * @description
 *
 * The `agolService` factory exposes ArcGIS Online functions from geoApi
 *
 */
angular
    .module('app.geo')
    .factory('agolService', agolService);

/**
 * The `agolService` factory exposes ArcGIS Onlilne functions from geoApi
 * @function agolService
 * @param  {Object} gapiService geoapi viewer library
 * @return {Object}  service
 */
function agolService(gapiService) {
    const service = {
        getItemId: getItemId,
        getToken: getToken
    };

    return service;

    /***/

    /**
     * Get info from item id
     * @function getItemId
     * @param {String} url ArcGIS Online url
     * @param  {Object} id  web map or web app id
     * @param {String} token for secure arcGIS online id
     * @return {Object} the item is info
     */
    function getItemId(url, id, token) {
        return gapiService.gapi.agol.queryItem(url, id, token);
    }

    /**
     * Get ArcGIS Online token.
     * @function getToken
     * @param {String} url ArcGIS Online url
     * @param {String} user user name
     * @param {String} password password
     * @returns {Object} token
     */
    function getToken(url, user, password) {
        return gapiService.gapi.agol.queryToken(url, user, password);
    }
}
