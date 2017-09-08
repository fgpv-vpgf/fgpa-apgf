/**
 * @module stateManager
 * @memberof app.common
 * @description
 *
 * The `stateManager` factory is a service controlling states form and model content.
 *
 */
angular
    .module('app.core')
    .factory('stateManager', stateManager);

function stateManager($rootElement, events, $translate) {

    const service = {
        setSchema,
        getSchema,
        getState,
        setValidity,
        getValidity
    };

    const _state = {};
    const _form ={};
    const _schema ={}

    return service;

    /*********/

    /**
     * Set initial state for form fields;
     * @function setState
     * @param {Array} items the form and model for a section
     */
    function setSchema(formName, schema) {
        _schema[formName] = schema;

        // set value for translations
        traverse(schema);

        // create state object used by the summary section
        let mapObj = {};
        Object.keys(schema.properties).forEach((key,index) => {
            mapObj[key] = { "key": key, "valid": null };
        });
        _state[formName] = mapObj;

        events.$broadcast(events.avSchemaUpdate, formName);
    }

    function getSchema(formName) {
        return _schema[formName];
    }

    function getState(formName) {
        return _state[formName];
    }

    /**
     * Set validity state for one field in a form;
     * @function setState
     * @param {Array} items the form and model for a section
     */
    function setValidity(formName, key, value) {
        _state[formName][key].valid = value;

        events.$broadcast(events.avFormUpdate, formName);
    }

    function getValidity(formName, key) {
        return _state[formName][key].valid
    }

    function traverse(json) {
        if (typeof json === 'object') {
            $.each(json, function(k,v) {

                if (json.hasOwnProperty('validationMessage')) {
                    json.validationMessage = $translate.instant(json.validationMessage);
                }

                // k is either an array index or object key
                traverse(v);
            });
        }
    }
}
