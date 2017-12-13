/**
 *
 * @name formService
 * @module app.ui
 *
 * @description common JavaScript methods for forms
 *
 */
angular
    .module('app.ui')
    .factory('formService', formService);

function formService($timeout, events, commonService, constants) {

    const service = {
        showAdvance,
        advanceModel: false,
        toggleSection,
        copyValueToForm,
        copyValueToFormIndex,
        copyValueToModelIndex,
        updateLinkValues
    };

    // if show advance is true we need to toggle the hidden because the form has been reset
    events.$on(events.avSchemaUpdate, () => { resestShowAdvance(); });
    events.$on(events.avLoadModel, () => { resestShowAdvance(); });
    events.$on(events.avSwitchLanguage, () => { resestShowAdvance(); });

    return service;

    /***/

    function resestShowAdvance() {
        if (service.advanceModel) { $timeout(() => showAdvance(), constants.delayAccordion); }
    }

    function showAdvance() {
        // manage the show advance configuration (add 'htmlClass': 'av-form-advance hidden' to fields who need advance config)
        const elems = document.getElementsByClassName('av-form-advance');

        for (let elem of elems) {
            elem.classList.toggle('hidden');
        }
    }

    function toggleSection(event) {
        const targetParent = event.currentTarget.parentElement;
        $(targetParent.getElementsByClassName('av-accordion-content')).slideToggle(400, 'swing');

        const icons = targetParent.getElementsByTagName('md-icon');
        for (let elem of icons) {
            elem.classList.toggle('hidden');
        }
    }

    /**
     * Copy a value from the model to a form element. If the form element is an array, use copyValueToFormIndex instead
     * @function copyValueToForm
     * @param  {Object} form  form to uptade
     * @param  {String} model value to apply
     * @param  {Object} item parameters to find the form element to update
     */
    function copyValueToForm(form, model, item) {
        // IMPORTANT: need to be on a single form element not an array. Even if we use array index it won't work
        // it modoify the form, not the html element
        const params = item.link.split('.');
        assignForm(form, 'linkTo', params[0], params[1], model);
    }

    /**
     * Assign the value to the form element
     * @function assignForm
     * @private
     * @param  {Object} tree  form to tree to get element to uptade
     * @param  {String} key the key on the element to find
     * @param  {String} value value for the key to find
     * @param  {String} setKey the key on the element to update
     * @param  {String} apply value for the key to update
     */
    function assignForm(tree, key, value, setKey, apply) {
        for (let obj in tree) {
            if (!!tree[obj] && typeof(tree[obj]) === 'object') {
                if (tree.hasOwnProperty(key) && tree[key] === value) {
                    tree[setKey] = apply;
                }
                assignForm(tree[obj], key, value, setKey, apply);
            }
        }
    }

    /**
     * Copy a value from the model to a form element who contain index
     * @function copyValueToFormIndex
     * @param  {Object} model  model
     * @param  {String} item form item
     * @param  {Object} value value to set
     */
    function copyValueToFormIndex(model, item, value) {
        // IMPORTANT: use to update form inside array. It modify the html element, not the form
        // get indexes to update
        let indexes = findIndex(model, item.model.split('.'), value, 0, []);

        // get the html document element root to update
        const link = item.link.split('.');
        const elem = document.getElementsByClassName(link[0]);

        // loop trought the indexes and update with value or default if === ""
        for (let ind of indexes) {
            elem[ind].getElementsByTagName(link[1])[link[2]].innerText = (value !== "") ? value : item.default;
        }
    }


    /**
     * walk json tree to return the proper object indexes when value matches
     * @function findIndex
     * @private
     * @param  {Object} model   model to find the value from
     * @param  {Array} keys   array of keys to walk the model
     * @param  {String} value   value for the key to find
     * @param  {Integer} index index inside the array
     * @param  {Array} returnIndexes array of indexes to update
     * @return {Array} returnIndexes array of indexes to update
     */
    function findIndex(model, keys, value, index, returnIndexes) {
        // get the key to check for
        const key = keys.shift();

        // deal differently if it is an array or not
        if (commonService.isArray(model[key])) {
            for (let i = 0; i < model[key].length; i++) {
                // loop the array. Make a copy of keys so we don't empty it on first element
                findIndex(model[key][i], keys.slice(0), value, i, returnIndexes)
            }
        } else if (typeof model[key] !== 'undefined'){
            // if there is key in the array of keys, walk a level deeper
            const item = (keys.length > 0) ? findIndex(model[key], keys, value, index, returnIndexes) : model[key];

            // if the item equal the value to search, add the index to the return value
            if (item === value) { returnIndexes.push(index); }
        }

        return returnIndexes;
    }

    /**
     * Copy a value from the model to a model element who contain index
     * @function copyValueToModelIndex
     * @param  {Object} model  model
     * @param  {String} item form item
     * @param  {Object} value value to set
     */
    function copyValueToModelIndex(model, item, value) {
        // IMPORTANT: use to update model inside array, to use it on regular object use out of the box copyValueTo
        // get indexes to update
        let indexes = findIndex(model, item.model.split('.'), value, 0, []);

        // loop the model and assing the value
        for (let ind of indexes) {
            assignModel(model, item.link.replace('[$index]', `.${ind}`).split('.'), value);
        }
    }

    /**
     * Assign the value to the model element
     * @function assignModel
     * @private
     * @param  {Object} model  model to update
     * @param  {Array} keys the path to the key to update
     * @param  {String} value value for the key to update
     */
    function assignModel(model, keys, value) {
        const lastKey = keys.pop();
        for (let i = 0; i < keys.length; ++ i) {
            // check if it is a value or index. If it is an index, parse to integer
            const key = (isNaN(parseInt(keys[i]))) ? keys[i] : parseInt(keys[i]);
            model = model[key];
        }

        // set value
        model[lastKey] = value;
    }

    /**
    * Update scope element use inside a dynamic-select drop dowm. The value is use to link field together
    * e.g. in TitleSchema, we have extentSetId who is the value of one extent set id. This function Will
    * populate the scope element with all extent set id so user don't have to type them in
    *
    * Need an item to have the selection dropdown:
    * { 'key': 'tileSchemas[].extentSetId', 'type': 'dynamic-select', 'optionData': 'extentId', 'model': 'extentSetId' }
    * 'type' must be type-select, it will trigger the add on.
    * 'optionData' is the variable name to create on scope object
    * 'model' must be the last key in the path for this element (it is use inside dynamicSelect.module for ngModel)
    *
    * Need items with an values to updateModel
    * { 'key': 'extentSets[].id', 'onChange': () => { debounceService.registerDebounce(self.formService.updateLinkValues(scope, ['extentSets', 'id'], 'extentId'), constants.debInput, false); } },
    * 'onChange' function to use the self.formService.updateLinkValues where
    * scope is the form scope
    * Array of keys made from key element
    * The same variable name created for the first element
    *
    * Known issue: onChange is not fired on the last item delete inside an array. Will need to find a workaround if need be
    * @function updateLinkValues
    * @param  {Object} scope  form scope
    * @param  {Array} keys the path to the key to get value from
    * @param  {String} link the value to update (need to be the same on optionData as the the field who receive the link)
    */
    function updateLinkValues(scope, keys, link) {
        scope[link] = findValues(scope.model, keys, 0, []);
    }

    /**
    * Find values from the model element
    * @function findValues
    * @private
    * @param  {Object} model  model to find from
    * @param  {Array} keys the path to key
    * @param  {Integer} index index in the array
    * @param  {Array} returnValues array of values
    * @return {Array} returnValues array of values
    */
    function findValues(model, keys, index, returnValues) {
        // get the key to check for
        const key = keys.shift();

        // deal differently if it is an array or not
        if (commonService.isArray(model[key])) {
            for (let i = 0; i < model[key].length; i++) {
                // loop the array. Make a copy of keys so we don't empty it on first element
                findValues(model[key][i], keys.slice(0), i, returnValues);
            }
        } else {
            // if there is key in the array of keys, walk a level deeper
            let item = keys.length > 0 ? findValues(model[key], keys, index, returnValues) : model[key];

            // if the item equal the value to search, add the index to the return value
            returnValues.push(item);
        }

        return returnValues;
    }
}
