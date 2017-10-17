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
     * @return {Object} the parsed JSON object
     */
    function parseJSON(jsonObject) {
        return JSON.parse(angular.toJson(jsonObject));
    }

    function isArray(item) {
        return Object.prototype.toString.call(item) === '[object Array]';
    }

    function isObject(obj) {
        return obj === Object(obj);
    }

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

    function setLangs(langs) {
        languages = langs;
    }

    function getLangs() {
        return languages;
    }
}
