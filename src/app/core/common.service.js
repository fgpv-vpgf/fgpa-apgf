/**
 *
 * @name commonService
 * @module app.core
 *
 * @description common JavaScript methods
 *
 */
angular
    .module('app.core')
    .factory('commonService', commonService);

/**
 * define common Javascript methods
 * @function commonService
 * @param {Object} $translate  translation service Angular object
 * @param {Object} events  Angular object
 * @param {Object} $timeout promise with timeout Angular object
 * @param {Object} constants  modules that contain all the constants
 * @return {Object} service  common service
 */
function commonService($translate, events, $timeout, constants) {

    const service = {
        parseJSON,
        isArray,
        isObject,
        whatsThat,
        setUniq,
        setLang,
        getLang,
        setLangs,
        getLangs,
        getUUID,
        getNested,
        clickTab,
        clickSubTab,
        scrollToElement,
        validServiceUrl,
        addButton,
        cleanLayerModel
    };

    let languages;

    return service;

    /***/

    /**
     * remove angular $$ field inserted inside JSN object by angularschemaform.
     * @function parseJSON
     * @param {Object} jsonObject The JSON to parse
     * @return {Object}           The parsed JSON object
     */
    function parseJSON(jsonObject) {
        return JSON.parse(angular.toJson(jsonObject));
    }

    /**
     * Get if an object is an array.
     * @function  isArray
     * @param {Object} item Object to check
     * @return {Boolean}    true: is an array; false otherwise
     */
    function isArray(item) {
        return Object.prototype.toString.call(item) === '[object Array]';
    }

    /**
     * Get if an element is an object.
     * @function  isObject
     * @param {Object} item Object to check
     * @return {Boolean}    true: is an object; false otherwise
     */
    function isObject(item) {
        return item === Object(item);
    }

    /**
    * Determine what kind of object we are dealing with.
    * This function complements typeof operator
    * @function whatsThat
    * @private
    * @param {Object} obj some kind of object
    * @return {String} return object type
    */
    function whatsThat(obj) {
        let typeObject = '';

        if (Array.isArray(obj)) {
            typeObject = 'array';
        } else if (obj === null) {
            typeObject = 'null';
        } else {
            typeObject = typeof obj;
        }
        return typeObject;
    }

    /**
     * Remove all duplicate element from an array.
     * @function  setUniq
     * @param {Array} arr Array to remove duplicate from
     * @return {Array}    the unique element arrray
     */
    function setUniq(arr) {
        return Array.from(new Set(arr));
    }

    /**
     * Sets the current language to the supplied value and broadcasts schema initialization event.
     * @function  setLang
     * @param {String} value language value to be set
     */
    function setLang(value) {
        // show splash with language switch event as parameter
        $translate.use(value).then(() => events.$broadcast(events.avShowSplash, events.avSwitchLanguage));
    }

    /**
     * Get the current language.
     * @function  getLang
     * @returns  {String}    the current language string
     */
    function getLang() {
        return ($translate.proposedLanguage() || $translate.use());
    }

    /**
     * Sets the current available languages.
     * @function  setLangs
     * @param {Array} langs Array of available languages
     */
    function setLangs(langs) {
        languages = langs;
    }

    /**
     * Get the current array of languags.
     * @function  getLangs
     * @returns  {Array}    Array of all available languages
     */
    function getLangs() {
        return languages;
    }

    /**
     * Get a unique UUID
     * @function  getUUID
     * @param {Boolean} short true: only first section will be returned; false: 4 sections will be returned
     * @returns  {String}  generated UUID
     * http://slavik.meltser.info/?p=142
     */
    function getUUID(short = true) {
        function _p8(s) {
            const p = (Math.random().toString(16) + '000000000').substr(2,8);
            return s ? `-${p.substr(0,4)}-${p.substr(4,4)}` : p ;
        }

        return (short) ? _p8() : `${_p8()}${_p8(true)}${_p8(true)}${_p8()}`;
    }

    /**
     * Get object by array of keys representing a reference path
     * eg: ['a', 'b', 'c'] => obj.a.b.c
     * Source: http://blog.nicohaemhouts.com/2015/08/03/accessing-nested-javascript-objects-with-string-key/
     * @function getNested
     * @param {Object} obj object
     * @param {String} path properties path
     * @return {Object}  particular sub-object of an object or undefined
     */
    function getNested (obj, path) {
        try {
            return path.reduce(((o, property) => o[property]), obj);
        } catch (err) {
            return undefined;
        }
    }

    /**
     * Get and display a tab
     * @function  clickTab
     * @param {Number} index tab index
     */
    function clickTab(index) {
        events.$broadcast(events.avUpdateFocus, index);
        $('html,body').scrollTop(0);
    }

    /**
     * Get and display a sub-tab
     * @function  clickSubTab
     * @param {Number} index tab index
     * @param {Number} subTabId sub-tab id
     */
    function clickSubTab(index, subTabId) {
        clickTab(index);
        $timeout(() => {
            angular.element(`#${subTabId}`).triggerHandler('click');
        });
    }

    /**
     * Scroll to a DOM element
     * @function  scrollToElement
     * @param {Number} id element id
     */
    function scrollToElement(id) {
        $timeout(() => {
            angular.element(`#${id}`)[0].scrollIntoView();
        }, constants.delayScrollToElement);
    }

    /**
     * Validate if the url is a esri service url
     * @function  validServiceUrl
     * @param {String} url service utl to validate
     * @returns {Boolean}    true if valid, false otherwise
     */
    function validServiceUrl(url) {
        const regexp = '(^(http|https):\\/\\/)*(/rest/services/)*\/(MapServer)';
        const regObj = new RegExp(regexp);
        return regObj.test(url) ? true : false;
    }

    /**
     * Add a button like in legend section or set extent of area of interest or extent section
     *
     * @function addButton
     * @private
     * @param {String} form form to apply to
     * @param {String} type type of button to add
     * @param {String} func function to associate to ng-click
     * @param {String} addClass class to add
     * @returns {String} the template for the button
     */
    function addButton(form, type, func, addClass = '') {
        return `<md-button class="av-button-square md-raised ${addClass}"
                        ng-click="form.${func}('${type}')">
                    {{ '${form}.${type}' | translate }}
                    <md-tooltip>{{ '${form}.${type}' | translate }}</md-tooltip>
                </md-button>`;
    }

    /**
     * Remove unnessacery kyes from layers object
     *
     * @function addButton
     * @private
     * @param {Array} layers layer object array
     * @returns {Array} the cleaned layers array
     */
    function cleanLayerModel(layers) {
        // keys to remove for ech layer type
        const keysRemove = {
            'esriDynamic': ['fileType', 'colour', 'latField', 'longField', 'nameField', 'tooltipField', 'customRenderer', 'xyInAttribs', 'suppressGetCapabilities', 'featureInfoMimeType', 'legendMimeType', 'table'],
            'esriFeature': ['fileType', 'colour', 'latField', 'longField', 'xyInAttribs', 'imageFormat', 'suppressGetCapabilities', 'singleEntryCollapse', 'layerEntries', 'featureInfoMimeType', 'legendMimeType'],
            'ogcWms': ['fileType', 'colour', 'latField', 'longField', 'toggleSymbology', 'nameField', 'tooltipField', 'customRenderer', 'xyInAttribs', 'imageFormat', 'singleEntryCollapse', 'table'],
            'file': ['refreshInterval', 'expectedResponseTime', 'metadataUrl', 'catalogueUrl', 'toggleSymbology', 'xyInAttribs', 'imageFormat', 'suppressGetCapabilities', 'singleEntryCollapse', 'layerEntries', 'featureInfoMimeType', 'legendMimeType'],
            'ogcWfs': ['refreshInterval', 'expectedResponseTime', 'fileType', 'latField', 'longField', 'toggleSymbology', 'imageFormat', 'suppressGetCapabilities', 'singleEntryCollapse', 'layerEntries', 'featureInfoMimeType', 'legendMimeType'],
            'esriImage': ['fileType', 'colour', 'latField', 'longField', 'toggleSymbology', 'nameField', 'tooltipField', 'customRenderer', 'xyInAttribs', 'imageFormat', 'suppressGetCapabilities', 'layerEntries', 'singleEntryCollapse', 'featureInfoMimeType', 'legendMimeType', 'table'],
            'esriTile': ['fileType', 'colour', 'latField', 'longField', 'toggleSymbology', 'nameField', 'tooltipField', 'customRenderer', 'xyInAttribs', 'imageFormat', 'suppressGetCapabilities', 'layerEntries', 'singleEntryCollapse', 'featureInfoMimeType', 'legendMimeType', 'table']
        }

        // loop layers
        for (let layer of layers) {
            // delete unwanted keys
            for (let key of keysRemove[layer.layerChoice]) {
                delete layer[key];
            }

            // delete nested unwanted key
            if (layer.layerType === 'ogcWms') {
                delete layer.layerEntries['table'];
                delete layer.layerEntries['outfields'];
                delete layer.layerEntries['stateOnly'];
            }

            // test table.columns array. If there is the default not initialize column, delete
            if (['table'] in layer && ['columns'] in layer.table) {
                if (layer.table.columns.length === 1 &&
                        (layer.table.columns[0].data === '' || typeof layer.table.columns[0].data === 'undefined')) {
                    layer.table.columns = [];
                }
            }
        }

        return layers;
    }
}
