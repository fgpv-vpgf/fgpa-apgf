/**
 * @module modelManager
 * @memberof app.common
 * @description
 *
 * The `modelManager` factory is a service controlling states form and model content.
 *
 */
angular
    .module('app.core')
    .factory('modelManager', modelManager);

function modelManager($rootElement, events, $translate, commonService) {

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
        'map': {},
        'ui': {},
        'service': {}
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
        let stateObj = { 'key': formName, 'valid': null, 'expand': false, items: [] };
        // stateObj = rec(stateObj, schema);
        _state[formName] = stateObj;

        events.$broadcast(events.avSchemaUpdate, formName);
    }

    function rec(state, schema) {
        if (schema.hasOwnProperty('properties')) {
            Object.keys(schema.properties).forEach((key, index) => {
                state.items[index] = { 'key': key, 'valid': null, 'expand': false };

                // first deal with object, they have properties key
                // second deal with array of objects
                if (schema.properties[key].hasOwnProperty('properties')) {
                    state.items[index].items = [];
                    rec(state.items[index], schema.properties[key]);
                } else if (schema.properties[key].hasOwnProperty('type') && schema.properties[key].type ==='array') {
                    state.items[index].items = [];
                    rec(state.items[index], schema.properties[key].items);
                }
            });
        }

        return state
    }

    function getSchema(formName) {
        return _schema[formName];
    }

    function resetModel(formName) {
        _model[formName] = {};
        return _model[formName];
    }

    function setModels(models) {
        $.each(models, function(k, v) {
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
    function setValidity(formName, keys, value) {
        // const keys = key.split('-');
        // const item = walk(_state[formName].items, keys);
        // item.valid = value;

        events.$broadcast(events.avFormUpdate, formName);
    }

    function getValidity(formName, keys) {
        // const keys = key.split('-');
        // return walk(_state[formName].items, keys).valid;
    }

    function translateSchema(json) {
        if (typeof json === 'object') {
            $.each(json, function(k, v) {

                if (json.hasOwnProperty('validationMessage')) {
                    json.validationMessage = $translate.instant(json.validationMessage);
                }

                // k is either an array index or object key
                translateSchema(v);
            });
        }
    }

    function validateModel(modelName, form, scope) {
        // recreate state object used by the summary section
        // remove angular $$hashkey inserted inside array by angularschemaform
        _state[modelName].items = updateSummaryModel([], commonService.parseJSON(_model[modelName]));

        const cleanForm = commonService.parseJSON(form);
        let arrIndex = -1;
        let lastIndex = -1;

        // loop trough form keys to create state object
        $.each(cleanForm, (key, v) => {

            if (key.startsWith('activeForm-')) {
                // get all the keys to find the object
                let keys = key.split('-').filter(n => n !== '' && n!== 'activeForm');

                // remove duplicate keys. They are introduce by array in schema form
                const unique = commonService.uniq(keys);

                // then get the index for array items
                // only work with one level array for now so reduce the array to 1 Number. When the number change
                // it means it is a new item in the array. We can't rely on key index because they don't follow
                // array index
                let index = unique.map(Number).filter(n => !isNaN(n)).slice(-1)[0];
                if (typeof index !== 'undefined') {
                    arrIndex = (index !== lastIndex) ? arrIndex + 1 : arrIndex;
                    lastIndex = index;
                } else {
                    arrIndex = -1;
                }

                // finally, remove index from unique keys
                keys = unique.filter(n => isNaN(Number(n)));

                // find the item in the state tree object for summary
                const item = walk(_state[modelName].items, keys, arrIndex);
                item.valid = cleanForm[key].$valid;
            }
        });
    }

    function updateSummaryModel(state, model, array = -1) {
        Object.keys(model).forEach((key, index) => {
            if (array === -1) {
                state[index] = { 'key': key, 'valid': null, 'expand': false, 'type': 'object' };
            } else {
                state.push({ 'key': key, 'valid': null, 'expand': false, 'type': 'array' });
            }

            if (commonService.isArray(model[key])) {
                state[index].items = [];
                let i = 0;
                for (let value of model[key]) {
                    updateSummaryModel(state[index].items, value, i);
                    i++;
                }
            } else if (Object.keys(model[key]).length && commonService.isObject(model[key])) {
                state[index].items = [];
                updateSummaryModel(state[index].items, model[key]);
            }
        });

        return state;
    }

    function walk(model, keys, index) {
        // walk json tree to return the proper object
        const key = keys.shift();
        let item = model.find(obj => obj.key === key);

        if (item.type === 'array') {
            let loop = 0;
            for (let i = 0; i < model.length; i++) {
                if (model[i].key === key) {
                    if (loop === index) {
                        item = model[i];
                    }
                    loop++;
                }
            }
        }

        // if there is key in the array, walk a level deeper
        item = (keys.length > 0) ? walk(item.items, keys, index): item;
        return item;
    }

    function resetValidity(model) {
        $.each(_state[model], function(k, v) {
            let item = _state[model].items.find(obj => obj.key === k);
            item = { 'key': k, 'valid': null };

            // k is either an array index or object key
            translateSchema(v);
        });
    }
}
