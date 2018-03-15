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
        getLayer: getLayer
    };

    // config part to use to extend missing info from model
    const configExtend = {
        state: {
            opacity: 1,
            visibility: true,
            boundingBox: false,
            query: true,
            snapshot: false,
            userAdded: false
        },
        controls: [
            'opacity',
            'visibility',
            'boundingBox',
            'query',
            'snapshot',
            'metadata',
            'boundaryZoom',
            'refresh',
            'reload',
            'remove',
            'settings',
            'data',
            'styles'
        ],
        disabledControls: [],
        userDisabledControls: []
    };

    return service;

    /***/

    /**
     * loads Esri layers
     * @function getLayer
     * @param {Object} model Angular schema form model
     * @param {Integer} featClass feature class index for Esri featureLayer
     * @return {Promise} layer fields returned to the caller
     */
    function getLayer(model, featClass) {
        let config = $.extend(model, configExtend);

        return $q((resolve, reject) => {
            // get the layer record
            const layer = (model.layerType === 'esriFeature') ?
                gapiService.gapi.layer.createFeatureRecord(config) : gapiService.gapi.layer.createDynamicRecord(config);

            // wait for layer to load
            let to = $interval(() => {
                if (layer.state === 'rv-loaded') {
                    $interval.cancel(to);
                    // get featureClass to query then get fields
                    const index = (featClass === -1) ? layer._defaultFC : featClass;
                    layer._featClasses[index].getLayerData().then(data => { resolve(data) });
                } else if (layer.state === 'rv-error') {
                    reject('Not able to connect to layer');
                }
            }, 500);
        });
    }
}
