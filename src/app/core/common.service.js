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

function commonService($translate, events) {

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
        getUUID
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

        if (Array.isArray(obj)){
            typeObject = 'array';
        } else if (obj === null){
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
}
