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

function formService(events, commonService) {

    const service = {
        showAdvance,
        toggleSection,
        addToggleArraySection,
        copyValueToForm,
        copyValueToFormIndex,
        copyValueToModelIndex
    };

    return service;

    /***/

    function showAdvance(form) {
        const elems = document.getElementsByTagName(`av-${form}`)[0].getElementsByClassName('av-form-advance');

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

    function addToggleArraySection(model, itemClass) {
        if (typeof model !== 'undefined' && model.length) {
            events.$broadcast(events.avNewItems,
                { 'form': 'av-form-map', 'class': `.av-${itemClass.key[0]}`, 'index': model.length - 1 });
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
     * @param  {Array} keys   array of keys to walkthe model
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
        } else {
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
}
