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
        resetModel,
        setModels,
        getModel,
        getState,
        setValidity,
        getValidity,
        resetValidity,
        validateModel
    };

    const _state = {};
    const _form = {};
    const _schema = {};
    const _model = {
        "map": {},
        "ui": {}
    };

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
        translateSchema(schema);

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

    function resetModel(formName) {
        _model[formName] = {};
        return _model[formName];
    }

    function setModels(models) {
        $.each(models, function(k,v) {
            _model[k] = v;
        });

        events.$broadcast(events.avLoadModel, 'new');
    }

    function getModel(formName) {
        return _model[formName];
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

    function translateSchema(json) {
        if (typeof json === 'object') {
            $.each(json, function(k,v) {

                if (json.hasOwnProperty('validationMessage')) {
                    json.validationMessage = $translate.instant(json.validationMessage);
                }

                // k is either an array index or object key
                translateSchema(v);
            });
        }
    }

    function validateModel(model, form) {
        if (typeof form === 'object') {
            $.each(form, function(k,v) {

                if (k.startsWith(`activeForm-`)) {
                    _state[model][k.split('-')[1]].valid = form[k].$valid;
                }

                // k is either an array index or object key
                // translateSchema(v);
            });
        }
    }

    function resetValidity(model) {
        $.each(_state[model], function(k,v) {

            _state[model][k] = { "key": k, "valid": null };

            // k is either an array index or object key
            translateSchema(v);
        });
    }
}
