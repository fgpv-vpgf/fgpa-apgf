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

function projectionService(gapiService) {
    const service = {
        projectExtent: projectExtent
    };

    return service;

    /***/

    /**
     * Reproject the extent
     * @function projectExtent
     * @param  {Object} extent  extent to reproject
     * @param  {Object} outWKID  the output spatial reference
     * @return {Object} the reprojected extent
     */
    function projectExtent(extent, outWKID) {
        return gapiService.gapi.proj.localProjectExtent(extent, outWKID);
    }
}
