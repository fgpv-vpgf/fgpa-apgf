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

function layerService($q, $interval, gapiService) {
    const service = {
        getLayer: getLayer
    };

    // config part to use to extend missing info from model
    const configExtend = {
        state: {
            opacity: 1,
            visibility: false,
            boundingBox: false,
            query: false,
            snapshot: false,
            hovertips: false,
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

    function getLayer(model, featClass) {
        // add needed configurations
        configExtend.name = model.name;
        configExtend.id = model.id;
        configExtend.url = model.url;
        configExtend.layerType = model.layerType;
        configExtend.layerEntries = model.layerEntries;

        return $q((resolve, reject) => {
            // check if minimum configuration is present. If not throw error
            if (typeof configExtend.url === 'undefined') {
                reject('Url is not set');
            } else {
                // get the layer record
                const layer = (model.layerType === 'esriFeature') ?
                    gapiService.gapi.layer.createFeatureRecord(configExtend) :
                    gapiService.gapi.layer.createDynamicRecord(configExtend);

                // wait for layer to load
                let to = $interval(() => {
                    if (layer.state === 'rv-loaded') {
                        $interval.cancel(to);
                        // get featureClass to query then get fields
                        const index = (featClass === -1) ? layer._defaultFC : featClass;
                        layer._featClasses[index].getLayerData().then(data => { resolve(data.fields) });
                    } else if (layer.state === 'rv-error') {
                        reject('Not able to connect to layer');
                    }
                }, 500);
            }
        });
    }
}
