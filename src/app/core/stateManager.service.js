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

function stateManager($timeout, $translate, events, constants, commonService, modelManager) {

    const service = {
        getState,
        goNoGoPreview,
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
        const link = constants.schemas
            .indexOf(`${modelName}.[lang].json`) + 1;
        // create state object used by the summary section
        _state[modelName] = { 'key': modelName,
            'title': $translate.instant(`app.section.${modelName}`),
            'valid': null,
            'expand': false,
            'masterlink': link,
            'hlink': link,
            'advance': false,
            'stype': '',
            'shlink': '',
            items: [] };

        return _state[modelName];
    }

    /**
     * Check validity of state sections
     * @function goNoGoPreview
     * @return {Boolean}  the go or no go
     */
    function goNoGoPreview() {
        let goNoGo = false; // Default

        // State defined
        if (Object.keys(_state).length === 0
                    && _state.constructor === Object) {
            goNoGo = false;
        } else {
            let validity = [];
            const names = Object.getOwnPropertyNames(_state);
            for (let item of names) {
                validity.push(_state[item].valid);
            }
            goNoGo = !(validity.includes(false) || validity.includes(null));
        }

        return goNoGo;
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

        // Since map is much more complicated we isolate it
        if (modelName === 'map') {
            const arrKeys = updateSummaryFormMap(_state[modelName], modelName, cleanForm);

            // Generate state records for basemaps, layers, tileSchemas, extentSets and lodSets
            setMapItemsState(_state[modelName], model, arrKeys);
        } else {
            updateSummaryForm(_state[modelName], modelName, cleanForm);
        }

        // TITLE SECTION
        // Set each title
        setTitle(_state[modelName], arrForm);

        // Set custom title
        setCustomTitles(_state[modelName], modelName);

        // VALIDITY SECTION
        // Set master element validity
        setMasterValidity(_state[modelName]);

        // UNDEFINED SECTION
        // Undefined parameters
        let modKeys = [modelName];
        let modUndef = [];
        searchUndefined(modKeys, model, modUndef);

        // Remove keys that are not in the stateModel
        // eg. both about.content and about.folderName exist in the model
        // but just one in the stateModel
        const modUndefExist = removeNonExistent(_state[modelName], modUndef);

        // Update validity based on undefined
        updateValidity(_state[modelName], modelName, modUndefExist);

        // ADVANCE SECTION
        // Advance parameters
        let adv = [];
        listAdvanceHidden(arrForm, adv);
        const advHidden = [].concat.apply([], adv);

        // Set special style to hidden advance parameter
        setAdvance(_state[modelName], modelName, advHidden);
    }

    /**
     * Remove keys if they don't exist in the stateModel
     * @function removeNonExistent
     * @private
     * @param {Object}  stateModel the stateModel
     * @param {Array}   arrKeys list of keys
     * @return {Array} array of existent keys
     */
    function removeNonExistent(stateModel, arrKeys) {

        let exist = [];

        for (let i of arrKeys) {
            if (commonService.getNested(stateModel, i) !== undefined) {
                exist.push(i);
            }
        }
        return exist;
    }

    /**
     * Set advance parameter in state model
     * All element and sub-element will have 'advance' parameter
     * set to true
     * @function setAdvance
     * @private
     * @param {Object}  stateModel the stateModel
     * @param {String}  modelName modelName
     * @param {Array}   arrKeys list of advance parameter keys
     */
    function setAdvance(stateModel, modelName, arrKeys) {
        if (arrKeys.includes(stateModel.key)) {
            setStateValueDown(stateModel, 'advance', true)
        } else if (stateModel.hasOwnProperty('items')) {
            for (let item of stateModel.items) {
                setAdvance(item, modelName, arrKeys);
            }
        }
    }

    /**
     * Set a parameter value for an element of the state model
     * and all is children
     * @function setStateValueDown
     * @private
     * @param {Object}  stateModel the stateModel
     * @param {String}  param parameter name
     * @param {Object}  value value to give to parameter
     */
    function setStateValueDown(stateModel, param, value) {

        stateModel[param] = value;

        if (stateModel.hasOwnProperty('items')) {
            for (let item of stateModel.items) {
                setStateValueDown(item, param, value);
            }
        }
    }

    /**
     * Set a parameter value for an element of the state model
     * and all parents
     * @function setStateValueUp
     * @private
     * @param {Object}  stateModel the stateModel
     * @param {Array}  path path from root to element ['root','child','grandchild=element']
     * @param {String}  param parameter name
     * @param {Object}  value value to give to parameter
     */
    function setStateValueUp(stateModel, path, param, value) {

        stateModel[param] = value;
        const target = path.shift();
        if (path.length > 0) {
            // Find proper target place
            for (let [j, item] of stateModel.items.entries()) {
                // Check if the target is a number
                // if so compare with index instead of key
                const isNumber = !isNaN(target);

                if ((isNumber && j === parseInt(target)) || item.key === target) {
                    setStateValueUp(stateModel.items[j], path, param, value);
                }
            }
        }
    }

    /**
     * List undefined attributes
     * @function  searchUndefined
     * @private
     * @param {Array}   modelKeys the model name path
     * @param {Object}  model the model
     * @param {Array}   arrKeys array of keys
     */
    function searchUndefined(modelKeys, model, arrKeys) {

        const dataType = commonService.whatsThat(model);

        if (dataType === 'undefined') {
            modelKeys.shift();
            arrKeys.push([modelKeys, false]);
        } else if(dataType !== 'null') {
            const entries = Object.entries(model);

            for (let el of entries) {
                if (dataType === 'array' || dataType === 'object') {
                    const keys = modelKeys.concat(el[0]);
                    searchUndefined(keys, el[1], arrKeys);
                }
            }
        }
    }

    /**
     * Set undefined parameter in state model and update
     * validity of upper hierarchy
     * @function updateValidity
     * @private
     * @param {Object}  stateModel the stateModel
     * @param {String}  modelName modelName
     * @param {Array}   undefKeys list of advance parameter keys
     */
    function updateValidity(stateModel, modelName, undefKeys) {
        const keysArrUpd = addSpecific(undefKeys, modelName);

        for (let k of keysArrUpd) {
            const path = k[0];
            setStateValueUp(stateModel, path, 'valid', false);
        }
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
        const masterLink = constants.schemas
            .indexOf(`map.[lang].json`) + 1;

        for (let i of setNames) {
            const items = model[i[1]];
            const hlink = constants.subTabs.map.keys[i[0]].replace(/\./g, '-');

            stateModel.items[i[0]]['items'] = [];

            for (let [j, item] of items.entries()) {
                const shlink = setItemId(hlink, i[1], j);

                stateModel.items[i[0]]['items']
                    .push({ 'key': item.name,
                        'title': item.name,
                        items: [],
                        'valid': true,
                        'expand': false,
                        'masterlink': masterLink,
                        'hlink': hlink,
                        'advance': false,
                        'stype': 'element',
                        'shlink': shlink,
                        'type': 'object' });
            }
        }

        // tilesSchemas, extents, lods
        const setID = [[0,'tileSchemas', 'name'], [1, 'extentSets', 'id'], [2, 'lodSets', 'id']];

        for (let i of setID) {
            const items = model[i[1]];
            const hlink = constants.subTabs.map.keys[0].replace(/\./g, '-');

            stateModel.items[0].items[i[0]]['items'] = [];

            for (let item of items) {
                stateModel.items[0].items[i[0]]['items']
                    .push({ 'key': item[i[2]],
                        'title': item[i[2]],
                        items: [],
                        'valid': true,
                        'expand': false,
                        'masterlink': masterLink,
                        'hlink': hlink,
                        'advance': false,
                        'stype': 'element',
                        'shlink': '',
                        'type': 'object' });
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
            if (stateModel.hasOwnProperty('key') && stateModel.key === title) {
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

        const link = constants.schemas
            .indexOf(`${modelName}.[lang].json`) + 1;

        addLink(keysArrUpd);

        buildStateTree(state, modelName, keysArrUpd, link);

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

        // Add specific keys so the missing tabs can be represented in the summary
        const keysArrUpdate = addSpecific(keysArr, modelName);

        const link = constants.schemas
            .indexOf(`${modelName}.[lang].json`) + 1;

        addLink(keysArr);

        buildStateTree(state, modelName, keysArr, link);
    }

    /**
     * Create state object from model/form for the summary panel
     * @function buildStateTree
     * @private
     * @param {Object} state the state object in JSON
     * @param {String} element the current element name
     * @param {Array} arrKeys array of arrays [[keys], valid: true | false, hlink: 'id']
     * @param {Number} mainSection ['map':1 | 'ui':2 | 'services':3 | 'version':4 | 'language':5]
     */
    function buildStateTree(state, element, arrKeys, mainSection) {

        // SubTab link
        let hlink = mainSection;

        const firstItems = [];
        arrKeys.forEach(arr => firstItems.push(arr[0][0]));
        const firstItemsUniq = Array.from(new Set(firstItems));

        for (let item of firstItemsUniq) {

            const validKey = arrKeys.filter(el => el[0][0] === item).slice();

            const maxLen = Math.max(arrKeys.filter(el => el[0][0] === item).length);
            // Check if we need to add items attribute
            if (maxLen > 1 && item !== 'items') {

                // Validity
                const validState = isValid(validKey);

                // Link
                const hlink = uniqId(validKey).replace(/\./g, '-');

                state.items
                    .push({ 'key': item,
                        'title': '',
                        items: [],
                        'valid': validState,
                        'expand': false,
                        'masterlink': mainSection,
                        'hlink': hlink,
                        'advance': false,
                        'stype': '',
                        'shlink': '',
                        'type': 'object' });

                // Build new keys array
                const newKeysArr = arrKeys.filter(el => {
                    if (el[0][0] === item) {
                        el[0].shift();
                        return el;
                    }
                });

                const index = state.items.findIndex(el => el.key === item);
                // Go deeper
                buildStateTree(state.items[index], item, newKeysArr, mainSection);
            } else if (item !== 'items' && typeof item !== 'undefined') {

                // validKey => [[[key], valid, id]]
                const valid = validKey[0][1];

                const index = constants.schemas.indexOf(`${validKey[0][2]}.[lang].json`);
                const hlink = index === -1 ? validKey[0][2].replace(/\./g, '-') : mainSection;

                state.items
                    .push({ 'key': item,
                        'title': '',
                        'valid': valid,
                        'expand': false,
                        'masterlink': mainSection,
                        'hlink': hlink,
                        'advance': false,
                        'stype': '',
                        'shlink': '',
                        'type': 'object' });
            }
        }
    }

    /**
     * Add hyperlink to arrays of key. The hyperlink === first key of keys array
     * @function addLink
     * @private
     * @param {Array} arrKeys array of arrays [[keys], valid: true | false, hlink: 'id']
     */
    function addLink(arrKeys) {
        for (let i of arrKeys) {
            i.push(i[0][0]);
        }
    }

    /**
     * Set the item id in the DOM and return the id
     * @function setItemId
     * @private
     * @param {String} hlink subTab link
     * @param {String} elType element type {'baseMaps'|'layers'}
     * @param {Number} index rank in elements list
     * @return {String} id
     */
    function setItemId(hlink, elType, index) {
        const el = angular.element(`#${hlink}-pane`);
        const children = Array.from(el[0].querySelector("ol").children);

        const id = `${elType}-${index}`;
        children[index].setAttribute('id', id);
        return id;
    }

    /**
     * Return a unique id
     * @function uniqId
     * @private
     * @param {Array} arrKeys array of arrays [[keys], valid: true | false, hlink: 'id']
     * @return {String} id
     */
    function uniqId(arrKeys) {
        const ids = [];
        for (let i of arrKeys) ids.push(i[2]);
        const id = commonService.setUniq(ids);
        if (id.length !== 1) {
            console.log('ERROR: MULTIPLE IDS');
        }

        return id[0];
    }

    /**
     * Return validity
     * @function isValid
     * @private
     * @param {Array} arrKeys array of arrays [[keys], valid: true | false, hlink: 'id']
     * @return {Boolean} return false if there's at least one false in validity array
     */
    function isValid(arrKeys) {
        const valid = [];
        for (let i of arrKeys) valid.push(i[1]);
        return !valid.includes(false);
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
