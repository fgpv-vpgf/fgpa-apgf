/**
 * @module layerService
 * @memberof app.geo
 * @description
 *
 * The `layerService` factory exposes layer functions from geoApi
 *
 */
angular
    .module('app.geo')
    .factory('layerService', layerService);

/**
 * The `layerService` factory exposes layer functions from geoApi
 * @function layerService
 * @param {Object} $q Angular object
 * @param {Object} $interval Angular object
 * @param {Object} gapiService geoapi viewer library
 * @return {Object} service
 */
function layerService($q, $interval, gapiService) {
    const service = {
        getLayerFields: getLayerFields
    };

    return service;

    /***/

    /**
     * loads Esri layers fields
     * @function getLayer
     * @param {String} url layer url
     * @return {Promise} layer fields returned to the caller
     */
    function getLayerFields(url) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: `${url}?f=json`,
                cache: true,
                dataType: 'jsonp',
                success: function (data) { return resolve(data.fields); },
                error: function () {
                    reject('Not able to connect to layer');
                }
            });
        });
    }
}
