/**
 * @module modelManager
 * @memberof app.common
 * @description
 *
 * The `modelManager` factory is a service controlling schema, states and model content.
 *
 */
angular
    .module('app.core')
    .factory('modelManager', modelManager);

function modelManager($timeout, events, constants, commonService) {

    const service = {
        save,
        setSchema,
        getSchema,
        setModels,
        getModel,
        updateModel,
        setDefault,
        getState,
        validateModel
    };

    const _state = {};
    const _form = {};
    const _schema = {};
    const _model = {};

    const _default = {};

    return service;

    /*********/

    /**
     * Return the schema as a string to be save
     * @function save
     * @return {String} the schema as a string to be save
     */
    function save() {
        // loop schemas to get model values
        const models = { };
        constants.schemas.forEach(schema => {
            const name = schema.split('.')[0];
            models[name] = getModel(name, false);
        });

        // version and language are one item model so we have to recreate the string
        models.version = models.version.version;
        models.language = models.language.language;

        // TODO solve initialBasemap as part of #90
        models.map.initialBasemapId = '';

        // return the config as a string
        return JSON.stringify(models);
    }

    /**
     * Set initial schema
     * @function setSchema
     * @param {String} modelName the model/form name to set schema for
     * @param {Object} schema the schema JSON object
     * @param {String} lang the language to set
     */
    function setSchema(modelName, schema, lang) {
        if (!_schema[lang]) {
            _schema[lang] = {};
        }
        _schema[lang][modelName] = schema;
    }

    /**
     * Get the schema for a model/form
     * @function getSchema
     * @param {String} modelName the model/form name to get schema for
     * @return {String}          the schema
     */
    function getSchema(modelName) {
        return _schema[commonService.getLang()][modelName];
    }

    /**
     * Set all the models when user load an existing config file
     * @function setModels
     * @param {Object} models all the models loaded from the configuration file in JSON
     */
    function setModels(models) {
        $.each(models, (k, v) => { _model[k] = v; });

        // broadcast event so form can update themselves
        events.$broadcast(events.avLoadModel);
    }

    /**
     * Get a model
     * @function getSchema
     * @param {String} modelName the model/form name to get model for
     * @param {String} newModel optional: true if it is a new model so we apply default
     * @return {Object}          the model
     */
    function getModel(modelName, newModel = true) {
        // if it is a new model, we apply default configuration value
        // check if it is only a string (version and language) and return default values
        // it is { map: {..}, version: "en-ca" } we need to set it { map: {..}, version: { version: "en-ca" } }
        _model[modelName] = (newModel) ? applyDefault(modelName, {}) :
            (typeof _model[modelName] !== 'string') ? _model[modelName] : { [modelName]: _model[modelName] };
        return _model[modelName];
    }

    /**
     * Update model after avLoadModel events
     * @function updateModel
     * @param {Object} scope controller scope
     * @param {String} modelName the model/form name to update model
     */
    function updateModel(scope, modelName) {
        scope.model = getModel(modelName, false);

        scope.$broadcast('schemaFormValidate');
        // TODO: when summary panel will work again, re-enable validation
        //$timeout(() => { validateModel(modelName, scope.activeForm); }, 1000);
    }

    /**
     * Apply default configuration to a model
     * @function applyDefault
     * @private
     * @param {String} modelName the model/form name to apply default on
     * @param {Object} model the model
     * @return {Object}      updated model
     */
    function applyDefault(modelName, model) {
        // get default model values
        const defaultModel = _default[commonService.getLang()][modelName];

        // check if it is only a string (version and language) and return default values
        // it is { map: {..}, version: "en-ca" } we need to set it { map: {..}, version: { version: "en-ca" } }
        const defaults = (typeof defaultModel !== 'string') ?
            $.extend(true, model, _default[commonService.getLang()][modelName]) : { [modelName]: defaultModel };

        return defaults;
    }

    /**
     * Set default configuration values to apply on new model
     * @function setDefault
     * @param {Object} defaultValues the default values in JSON
     * @param {String} lang language to apply the values on
     */
    function setDefault(defaultValues, lang) {
        _default[lang] = defaultValues;
    }

    /**
     * Get state object
     * @function getState
     * @param {Object} modelName the model/form name to get state on
     * @return {Object}          the state object in JSON
     */
    function getState(modelName) {
        // create state object used by the summary section
        _state[modelName] = { 'key': modelName, 'valid': null, 'expand': false, items: [] };

        return _state[modelName];
    }

    /**
     * Set state object with valid values from the form field validity
     * @function validateModel
     * @param {String} modelName the model/form name to get state on
     * @param {Object} form      the angular schema form active form
     */
    function validateModel(modelName, form) {
        // recreate state object used by the summary section
        _state[modelName].items = updateSummaryModel([], _model[modelName]);

        const cleanForm = commonService.parseJSON(form);
        let arrIndex = -1;
        let lastIndex = -1;

        // loop trough form keys to create state object
        $.each(cleanForm, (key, v) => {

            if (key.startsWith('activeForm-')) {
                // get all the keys to find the object
                let keys = key.split('-').filter(n => n !== '' && n!== 'activeForm');

                // remove duplicate keys. They are introduce by array in schema form
                const unique = commonService.setUniq(keys);

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

    /**
     * Create state object from model/form for the summary panel
     * @function updateSummaryModel
     * @private
     * @param {Object} state the state object in JSON
     * @param {Object} model the model object in JSON
     * @param {Number} array optional number to specify the array index. Minus one if it is not an array
     * @return {Object}      updated state
     */
    function updateSummaryModel(state, model, array = -1) {
        Object.keys(model).forEach((key, index) => {
            // undefined are introduce inside the model by AngularSchemaForm when user empty a field
            // replace undefined be "" value
            model[key] = typeof model[key] === 'undefined' ? "" : model[key];

            // TODO: remove angular $$hashkey inserted inside array by angularschemaform
            if (array === -1 && key !== '$$hashKey') {
                state[index] = { 'key': key, 'valid': null, 'expand': false, 'type': 'object' };
            } else if (key !== '$$hashKey') {
                state.push({ 'key': key, 'valid': null, 'expand': false, 'type': 'array' });
            }

            if (commonService.isArray(model[key]) && commonService.isObject(model[key][0])) {
                state[index].items = [];
                let i = 0;
                for (let value of model[key]) {
                    updateSummaryModel(state[index].items, value, i);
                    i++;
                }
            } else if (Object.keys(model[key]).length && commonService.isObject(model[key]) && !commonService.isArray(model[key])) {
                state[index].items = [];
                updateSummaryModel(state[index].items, model[key]);
            }
        });

        return state;
    }

    /**
     * Walk the object to return the proper item
     * @function walk
     * @private
     * @param {Object} model the model object in JSON
     * @param {Array} keys the array of keys
     * @param {Number} index the index for array members
     * @return {Object}      the item
     */
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
}
