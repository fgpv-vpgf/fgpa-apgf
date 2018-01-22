/**
 * @module modelManager
 * @memberof app.common
 * @description
 *
 * The `modelManager` factory is a service controlling schema and model content.
 *
 */
angular
    .module('app.core')
    .factory('modelManager', modelManager);

function modelManager($timeout, $translate, events, constants, commonService) {

    const service = {
        save,
        setSchema,
        getSchema,
        setModels,
        getModel,
        updateModel,
        setDefault
    };

    const _state = {};
    const _form = {};
    const _schema = {};
    const _model = {};

    let _default = {};

    return service;

    /*********/

    /**
     * Return the schema as a string to be save
     * @function save
     * @param {Boolean} preview [optional = false] if save is for preview
     * @return {String} the schema as a string to be save
     */
    function save(preview = false) {
        // loop schemas to get model values
        const models = { };
        constants.schemas.forEach(schema => {
            const name = schema.split('.')[0];
            models[name] = getModel(name, false);
        });

        // version and language are one item model so we have to recreate the string
        models.version = models.version.version;
        models.language = models.language.language;

        // FIXME: this is a workaround to parse the legend string to JSON objects
        // and set it back to string after save/preview
        let root = models.map.legend.root;
        if (typeof root === 'string') {
            models.map.legend.root = JSON.parse(root);
        }
        $timeout(() => {
            models.map.legend.root = JSON.stringify(models.map.legend.root, null, 4);
        }, 1000);

        // when we try to remove the table columns directly in ASF, there is an error
        // remove it here but only when we save the file. In preview author can change it's mind
        if (!preview) { cleanColumns(models.map.layers); }

        // remove $$haskkey from model
        const cleanModels = commonService.parseJSON(models);

        // return the config as a string
        return JSON.stringify(cleanModels);
    }

    /**
     * If the config is save to file, clean the columns array by removing not needed column
     * @function cleanColumns
     * @private
     * @param {Object} model model (array of layers) to clean
     */
    function cleanColumns(model) {
        for (let layer in model) {
            if (model[layer].layerType === 'esriFeature') {
                model[layer] = deleteColumns(model[layer]);
            } else if (model[layer].layerType === 'esriDynamic') {
                model[layer].layerEntries.forEach((entry, index) => {
                    model[layer].layerEntries[index] = deleteColumns(model[layer].layerEntries[index]);
                })
            }
        }
    }

    /**
     * Delete colunms for a particular layer
     * @function deleteColumns
     * @private
     * @param {Object} entry model (layer) to clean
     * @return {Object} entry the clean entry with removed columns
     */
    function deleteColumns(entry) {
        // if there is table and columns define, remove the one with remove = true
        if (typeof entry.table !== 'undefined' && typeof entry.table.columns !== 'undefined') {
            entry.table.columns = entry.table.columns.filter(item => !item.remove);
        }

        return entry;
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
        // $timeout(() => { validateModel(modelName, scope.activeForm); }, 1000);
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
        const defaultModel = _default[modelName];

        // check if it is only a string (version and language) and return default values
        // it is { map: {..}, version: "en-ca" } we need to set it { map: {..}, version: { version: "en-ca" } }
        const defaults = (typeof defaultModel !== 'string') ?
            $.extend(true, model, _default[modelName]) : { [modelName]: defaultModel };

        return defaults;
    }

    /**
     * Set default configuration values to apply on new model
     * @function setDefault
     * @param {Object} defaultValues the default values in JSON
     */
    function setDefault(defaultValues) {
        _default = defaultValues;
    }
}