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

function stateManager($rootElement) {

    const service = {
        state: {},
        form: {},
        setState,
        setValidity
    };

    return service;

    /*********/

    /**
     * Set initial state for form fields;
     * @function setState
     * @param {Array} items the form and model for a section
     */
    function setState(formName, schema) {
        let mapObj = {};
        Object.keys(schema).forEach((key,index) => {
            mapObj[key] = { "key": key, "valid": null };
        });

        service.state[formName] = mapObj;
    }

    /**
     * Set validity state for one field in a form;
     * @function setState
     * @param {Array} items the form and model for a section
     */
    function setValidity(formName, key, value) {
        service.state.map[key].valid = value;
    }
}
