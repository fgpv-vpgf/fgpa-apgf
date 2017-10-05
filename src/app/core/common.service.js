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

function commonService() {

    const service = {
        parseJSON,
        isArray,
        isObject,
        uniq
    };

    return service;

    /***/

    /**
     * remove angular $$ field inserted inside JSN object by angularschemaform
     * @function parseJSON
     * @param {Object} The JSON to parse
     * @private
     * @return {Object} the parse JSON object
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

    function uniq(arr) {
        return Array.from(new Set(arr));
    }
}
