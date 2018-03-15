/**
 * @module projectionService
 * @memberof app.geo
 * @description
 *
 * The `projectionService` factory exposes projection functions from geoApi
 *
 */
angular
    .module('app.geo')
    .factory('projectionService', projectionService);

/**
 * The `projectionService` factory exposes projection functions from geoApi
 * @function projectionService
 * @param  {Object} gapiService geoapi viewer library
 * @return {Object}  service
 */
function projectionService(gapiService) {
    const service = {
        projectExtent: projectExtent
    };

    return service;

    /***/

    /**
     * Reproject the extent
     * @function projectExtent
     * @private
     * @param  {Object} extent  extent to reproject
     * @param  {Object} outWKID  the output spatial reference
     * @return {Object} the reprojected extent
     */
    function projectExtent(extent, outWKID) {
        return gapiService.gapi.proj.localProjectExtent(extent, outWKID);
    }
}
