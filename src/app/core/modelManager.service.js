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

function modelManager($timeout, $translate, events, constants, commonService) {

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

        // when we try to remove the table columns directly in ASF, there is an error
        // remove it here but only when we save the file. In preview author can change it's mind
        if (!preview) { cleanColumns(models.map.layers); }

        // remove $$haskkey from model
        const cleanModels = JSON.parse(angular.toJson(models));

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

    /**
     * Get state object
     * @function getState
     * @param {Object} modelName the model/form name to get state on
     * @return {Object}          the state object in JSON
     */
    function getState(modelName) {
        // create state object used by the summary section
        _state[modelName] = { 'key': modelName, 'title': $translate.instant(`app.section.${modelName}`), 'valid': null, 'expand': false, items: [] };

        return _state[modelName];
    }

    /**
     * Set state object with valid values from the form field validity
     * @function validateModel
     * @param {String}  modelName the model/form name to get state on
     * @param {Object}  form      the angular schema form active form
     * @param {Array}   arrForm   the form as an array of objects
     */
    function validateModel(modelName, form, arrForm) {

        const cleanForm = commonService.parseJSON(form);

        // for futur use
        // let advHidden = [];
        // listAdvanceHidden(arrForm, advHidden);

        // Since map is much more complicated we isolate it
        if (modelName === 'map') {
            updateSummaryFormMap(_state[modelName], modelName, cleanForm);
        } else {
            updateSummaryForm(_state[modelName], modelName, cleanForm);
        }

        // Set each title
        setTitle(_state[modelName], arrForm);

        // Set custom title
        setCustomTitles(_state[modelName], modelName);

        // Set element hyperlink here
        // TODO

        // Set master element hyperlink here
        // TODO

        // Set master element validity
        setMasterValidity(_state[modelName]);

        // Set special style to hidden advance parameter
        // TODO

    }

    /**
     * List of hidden advance parameters
     * @function listAdvanceHidden
     * @private
     * @param {Array}   arrForm   the form as an array of objects
     * @param {Array}   list   list of hidden advance parameters
     */
    function listAdvanceHidden(arrForm, list) {

        arrForm.forEach(item => {
            if (item.hasOwnProperty('htmlClass') && item.htmlClass === 'av-form-advance hidden') {
                list.push(item.key);
            }
            if (item.hasOwnProperty('items')) {
                listAdvanceHidden(item.items, list);
            }
        });
    }

    /**
     * Retrieve the title corresponding to the provided key
     * @function setTitle
     * @private
     * @param {Object}  stateModel the stateModel
     * @param {Array}   arrForm   the form as an array of objects
     */
    function setTitle(stateModel, arrForm) {

        if (stateModel.hasOwnProperty('key') && stateModel.title === '') {
            findTitle(stateModel.key, stateModel, arrForm);
        }
        if (stateModel.hasOwnProperty('items')) {
            stateModel.items.forEach(item => {
                setTitle(item, arrForm);
            });
        }
    }

    /**
     * Retrieve the title corresponding to the provided key
     * @function setCustomTitles
     * @private
     * @param {Object}  stateModel the stateModel
     * @param {String}   modelName modelName
     */
    function setCustomTitles(stateModel, modelName) {
        const customTitles = {
            'map': ['form.map.extentlods'],
            'ui': ['form.ui.general', 'form.ui.nav', 'form.ui.sidemenu'],
            'services': ['form.service.urls'],
            'language': [],
            'version': []
        };
        
        customTitles[modelName].forEach(title => {
            if (stateModel.hasOwnProperty('key') && stateModel.key === title){
                stateModel.title = $translate.instant(title);
            }
            if (stateModel.hasOwnProperty('items')) {
                stateModel.items.forEach(item => {
                    setCustomTitles(item, modelName);
                });
            }
        });
    }

    /**
     * Search for the title corresponding to the provided key
     * Ref: https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript?page=1&tab=votes#tab-top
     * @function findTitle
     * @private
     * @param {key}     key the key to look for (could be an array)
     * @param {Object}  itemForm a form item
     * @param {Array}   arrForm the form as an array of objects
     */
    function findTitle(key, itemForm, arrForm) {

        arrForm.forEach(item => {
            if (item.hasOwnProperty('key')) {
                if (Array.isArray(item.key)) {
                    if (key === item.key[item.key.length - 1]) {
                        itemForm.title = item.title;
                    }
                } else if (key === item.key) {
                    itemForm.title = item.title;
                }
            }
            if (item.hasOwnProperty('items')) {
                findTitle(key, itemForm, item.items);
            }
        });
    }

    /**
     * Create state object from model/form for the map section of the summary panel
     * @function updateSummaryFormMap
     * @private
     * @param {Object} state the state object in JSON
     * @param {String} modelName the current model name
     * @param {Object} form the model object in JSON
     */
    function updateSummaryFormMap(state, modelName, form) {

        let keysArr = [];

        // loop trough form keys to create set of keys
        $.each(form, key => {
            if (key.startsWith('activeForm-')) {
                // get all the keys to find the object
                let keys = key.replace('--', '-').split('-').filter(n => n !== '' && n!== 'activeForm');

                // remove first element of keys set if it is '0'
                if (keys [0] === '0') keys.shift();

                keysArr.push([keys, form[key].$valid]);
            }
        });

        // Simplify keys set
        const keysArrRed = reduceMapArray(keysArr);
        const keysArrUpd = addSpecific(keysArrRed, modelName);

        buildStateTree(state, modelName, keysArrUpd);
    }

    /**
     * Create state object from model/form for the summary panel
     * @function updateSummaryForm
     * @private
     * @param {Object} state the state object in JSON
     * @param {String} modelName the current model name
     * @param {Object} form the model object in JSON
     * @param {Object} list hidden advance parameters list
     */
    function updateSummaryForm(state, modelName, form) {

        let keysArr = [];
        // loop trough form keys to create set of keys
        $.each(form, key => {
            if (key.startsWith('activeForm-')) {
                // get all the keys to find the object
                let keys = key.split('-').filter(n => n !== '' && n!== 'activeForm');

                // remove duplicate keys. They are introduce by array in schema form
                const unique = commonService.setUniq(keys);

                keysArr.push([unique, form[key].$valid]);
            }
        });

        // Add specifis keys so the missing tabs can be represented in the summary
        const keysArrUpdate = addSpecific(keysArr, modelName);

        buildStateTree(state, modelName, keysArr);
    }

    /**
     * Create state object from model/form for the summary panel
     * @function buildStateTree
     * @private
     * @param {Object} state the state object in JSON
     * @param {String} element the current element name
     * @param {Array} arrKeys array of object {key: [], valid: true | false}
     */
    function buildStateTree(state, element, arrKeys) {

        const firstItems = [];
        arrKeys.forEach(arr => firstItems.push(arr[0][0]));
        const firstItemsUniq = Array.from(new Set(firstItems));

        firstItemsUniq.forEach(item => {

            const validKey = arrKeys.filter(el => el[0][0] === item).slice();
            const validArr = validKey.map(el => {
                el = el.slice(1);
                return el;
            }).slice();

            const maxLen = Math.max(arrKeys.filter(el => el[0][0] === item).length);
            // Check if we need to add items attribute
            if (maxLen > 1 && item !== 'items') {

                const valid = [];
                for (let i of validArr) valid.push(i[0]);

                const validState = !valid.includes(false);
                state.items.push({ 'key': item, 'title': '', items: [], 'valid': validState, 'expand': false, 'type': 'object' });

                // Build new keys array
                const newKeysArr = arrKeys.filter(el => {
                    if (el[0][0] === item) {
                        el[0].shift();
                        return el;
                    } 
                });

                const index = state.items.findIndex(el => el.key === item);
                // Go deeper
                buildStateTree(state.items[index], item, newKeysArr);
            } else if (item !== 'items' && typeof item !== 'undefined') {
                const valid = validArr[0][0];
                state.items.push({ 'key': item, 'title': '', 'valid': valid, 'expand': false, 'type': 'object' });
            }
        });
    }

    /**
     * Reduce map array to simplify hierarchy
     * @function reduceMapArray
     * @private
     * @param {Array} arrKeys array of object {key: [], valid: true | false}
     * @return {Array} reduced keys array
     */
    function reduceMapArray(arrKeys) {

        const arrLegend = arrKeys.filter(el => el[0][0] === 'legend');
        const arrComp = arrKeys.filter(el => el[0][0] === 'components');

        const arr = reduceKey(arrKeys, ['tileSchemas'])
            .concat(reduceKey(arrKeys, ['extentSets']),
                reduceKey(arrKeys, ['lodSets']),
                arrComp,
                reduceKey(arrKeys, ['baseMaps']),
                reduceKey(arrKeys, ['layers']),
                arrLegend
            );

        return arr;
    }

    /**
     * Reduce map array to simplify hierarchy
     * @function reduceKey
     * @private
     * @param {Array} arrKeys array of object {key: [], valid: true | false}
     * @param {Array} keys keys
     * @return {Array} reduced keys array
     */
    function reduceKey(arrKeys, keys) {

        const arr = arrKeys.filter(el => el[0].length >= keys.length
                                        && keys.every((v,i) => v === el[0][i]));

        const validSet = [];
        for (let i of arr) validSet.push(i[1]);
        const valid = !validSet.includes(false);

        return [[keys,valid]];
    }

    /**
     * Add specific keys so missing tabs can be part of the summary
     * @function addSpecific
     * @private
     * @param {Array}   arrKeys array of object {key: [], valid: true | false}
     * @param {String}  modelName modelName
     * @return {Array} updated keys array
     */
    function addSpecific(arrKeys, modelName) {
        const keys = {
            'map': { 'form.map.extentlods': ['tileSchemas', 'extentSets', 'lodSets'] },
            'ui': { 'form.ui.general': ['fullscreen', 'theme', 'legend', 'tableIsOpen', 'failureFeedback'],
                'form.ui.nav': ['restrictNavigation', 'navBar'],
                'form.ui.sidemenu': ['sideMenu', 'logoUrl', 'title', 'help', 'about']
            },
            'services': { 'form.service.urls': ['exportMapUrl', 'geometryUrl', 'googleAPIKey', 'proxyUrl'] },
            'language': {},
            'version': {}
        };

        arrKeys.forEach(key => {
            Object.keys(keys[modelName]).forEach(skey => {
                if (keys[modelName][skey].includes(key[0][0])) {
                    key[0].unshift(skey);
                }
            });
        });

        return arrKeys;
    }

    /**
     * Set validity on master element of the model
     * @function setMasterValidity
     * @private
     * @param {Object} state the state object in JSON
     */
    function setMasterValidity(state) {

        const validSet = [];

        for (let i of state.items) validSet.push(i.valid);

        state.valid = !validSet.includes(false);
    }
}