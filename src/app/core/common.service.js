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
        setUniq,
        setLang,
        getLang,
        setLangs,
        getLangs
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
        // broadcast event to fired a schema change wihtout reloading model
        $translate.use(value).then(() => events.$broadcast(events.avSwitchLanguage));
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
}
