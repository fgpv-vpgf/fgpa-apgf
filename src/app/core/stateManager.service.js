/**
 * @module stateManager
 * @memberof app.common
 * @description
 *
 * The `stateManager` factory is a service controlling states content.
 *
 */
angular
    .module('app.core')
    .factory('stateManager', stateManager);

function stateManager($timeout, $translate, events, constants, commonService) {

    const service = {
        getState,
        validateModel
    };

    const _state = {};

    return service;

    /*********/

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
     * @param {Object}  model     the model
     */
    function validateModel(modelName, form, arrForm, model) {

        const cleanForm = commonService.parseJSON(form);

        // for futur use
        // let advHidden = [];
        // listAdvanceHidden(arrForm, advHidden);

        // Since map is much more complicated we isolate it
        if (modelName === 'map') {
            const arrKeys = updateSummaryFormMap(_state[modelName], modelName, cleanForm);

            // Generate state records for basemaps, layers, tileSchemas, extentSets and lodSets
            setMapItemsState(_state[modelName], model, arrKeys);
        } else {
            updateSummaryForm(_state[modelName], modelName, cleanForm);
        }

        // Set each title
        setTitle(_state[modelName], arrForm);

        // Set custom title
        setCustomTitles(_state[modelName], modelName);

        // Set master element validity
        setMasterValidity(_state[modelName]);

        // Set element hyperlink here
        // TODO

        // Set master element hyperlink here
        // TODO

        // Set special style to hidden advance parameter
        // TODO

    }

    /**
     * Set new record for map items in state model
     * @function setMapItemsState
     * @private
     * @param {Object}  stateModel the stateModel
     * @param {Object}  model the model
     * @param {Array} arrKeys array of object {key: [], valid: true | false}
     */
    function setMapItemsState(stateModel, model, arrKeys) {

        // baseMaps and layers
        const setNames = [[2,'baseMaps'], [3, 'layers']];

        for (let i of setNames) {
            const items = model[i[1]];

            stateModel.items[i[0]]['items'] = [];

            for (let [j, item] of items.entries()) {
                // NOTE get the validity value need to be called here
                // NOTE ex: const validState = getValidityValue('baseMaps', i, arrKeys);
                stateModel.items[i[0]]['items'].push({ 'key': item.name, 'title': item.name, items: [], 'valid': '', 'expand': false, 'type': 'object' });
            }
        }

        // tilesSchemas, extents, lods
        const setID = [[0,'tileSchemas', 'name'], [1, 'extentSets', 'id'], [2, 'lodSets', 'id']];

        for (let i of setID) {
            const items = model[i[1]];

            stateModel.items[0].items[i[0]]['items'] = [];

            for (let item of items) {
                stateModel.items[0].items[i[0]]['items'].push({ 'key': item[i[2]], 'title': item[i[2]], items: [], 'valid': '', 'expand': false, 'type': 'object' });
            }
        }

    }

    /**
     * Get validity from an item in a list
     * Currently works only with baseMaps, layers, tileSchemas, extentSets, lodSets
     * @function getValidityValue
     * @private
     * @param {String} key key to select the proper list
     * @param {Number} index index in the form
     * @param {Array} arrKeys array of object {key: [], valid: true | false}
     * @return {Boolean} validity
     */
    function getValidityValue(key, index, arrKeys) {

        const validKey = arrKeys.filter(el => el[0][0] === key && el[0][1] === index.toString()).slice();
        const validArr = validKey.map(el => {
            el = el.slice(1);
            return el;
        }).slice();

        return !validArr.includes(false);
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
     * @param {Object} form the form object in JSON
     * @return {Array} arrKeys array of object {key: [], valid: true | false}
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

        return keysArr;
    }

    /**
     * Create state object from model/form for the summary panel
     * @function updateSummaryForm
     * @private
     * @param {Object} state the state object in JSON
     * @param {String} modelName the current model name
     * @param {Object} form the form object in JSON
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
