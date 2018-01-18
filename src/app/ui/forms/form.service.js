const templateUrl = require('./map/extent/extent-dialog.html');
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

function formService($timeout, events, $mdDialog, $translate, commonService, constants, projectionService) {

    const service = {
        showAdvance,
        advanceModel: false,
        toggleSection,
        toggleAll,
        setExtent,
        setErrorMessage,
        copyValueToForm,
        copyValueToFormIndex,
        initValueToFormIndex,
        copyValueToModelIndex,
        updateLinkValues
    };

    // if show advance is true we need to toggle the hidden because the form has been reset
    events.$on(events.avSchemaUpdate, () => { resestShowAdvance(); });
    events.$on(events.avLoadModel, () => { resestShowAdvance(); });
    events.$on(events.avSwitchLanguage, () => { resestShowAdvance(); });

    return service;

    /***/

    /**
     * Reset show advance fields if needed when there is a new model or language switch
     * @function resestShowAdvance
     */
    function resestShowAdvance() {
        if (service.advanceModel) { $timeout(() => showAdvance(), constants.delayAccordion); }
    }

    /**
     * Show advance fields
     * @function showAdvance
     */
    function showAdvance() {
        // manage the show advance configuration (add 'htmlClass': 'av-form-advance hidden' to fields who need advance config)
        const elems = document.getElementsByClassName('av-form-advance');

        for (let elem of elems) {
            elem.classList.toggle('hidden');
        }
    }

    /**
     * Toggle one section of accordion panel
     * @function toggleSection
     * @param  {Object} event  event who trigger the action
     */
    function toggleSection(event) {
        const targetParent = event.currentTarget.parentElement;
        $(targetParent.getElementsByClassName('av-accordion-content')).slideToggle(400, 'swing');

        const icons = targetParent.getElementsByTagName('md-icon');
        for (let elem of icons) {
            elem.classList.toggle('hidden');
        }
    }

    /**
     * Toggle all sections of accordion panel (array of accordion items)
     * @function toggleAll
     * @param  {Object} event  event who trigger the action
     * @param  {Bolean} collapse  true if collapse false if expand
     */
    function toggleAll(event, collapse) {
        const targetParent = event.currentTarget.parentElement;
        const iconsExp = targetParent.getElementsByClassName('av-accordion-expand');
        const iconsCol = targetParent.getElementsByClassName('av-accordion-collapse');

        if (collapse) {
            $(targetParent.getElementsByClassName('av-accordion-content')).slideUp(400, 'swing');
            for (let elem of iconsExp) {
                elem.classList.remove('hidden');
            }
            for (let elem of iconsCol) {
                elem.classList.add('hidden');
            }
        } else {
            $(targetParent.getElementsByClassName('av-accordion-content')).slideDown(400, 'swing');
            for (let elem of iconsExp) {
                elem.classList.add('hidden');
            }
            for (let elem of iconsCol) {
                elem.classList.remove('hidden');
            }
        }
    }

    /**
     * Set extent from the viewer itself open in an iFrame
     * @function setExtent
     * @param  {String} type  type of extent ('default', 'full' or 'maximum')
     * @param  {Array} extentSets  array of extent set to set the extent for
     */
    function setExtent(type, extentSets) {
        $mdDialog.show({
            controller: extentController,
            controllerAs: 'self',
            templateUrl: templateUrl,
            parent: $('.fgpa'),
            disableParentScroll: false,
            clickOutsideToClose: true,
            fullscreen: false,
            onRemoving: () => {
                // get the extent from local storage
                const extent = JSON.parse(localStorage.getItem('mapextent'));
                localStorage.removeItem('mapextent');

                // for each extent set, project the extent in the proper projection then set values
                extentSets.forEach(extentSet => {
                    // project extent
                    const ext = projectionService.projectExtent(extent, extentSet.spatialReference);

                    // itnitialze the value because it will not work if it doesn't exist then apply values
                    extentSet[type] = {};
                    extentSet[type].xmin = ext.x0;
                    extentSet[type].ymin = ext.y0;
                    extentSet[type].xmax = ext.x1;
                    extentSet[type].ymax = ext.y1;
                })
            }
        });

        function extentController($mdDialog) {
            'ngInject';
            const self = this;

            self.close = $mdDialog.hide;
        }
    }

    /**
     * Set custom validation error message
     * inside translation.csv the variable to replace needs to be there inside {}
     * @function setErrorMessage
     * @param  {Object} form  form object to get value from
     * @param  {String} message  message to get from translation.csv
     * @param  {Array} variables  variables to replace
     * @return {String} mess the updated message
     */
    function setErrorMessage(form, message, variables) {
        let mess = $translate.instant(message);

        for (let variable of variables) {
            // get the replacing value from form object
            let replace = form;
            variable.split('.').map(item => { replace = replace[item] });

            // replace value in the message
            mess = mess.replace(`{${variable}}`, replace);
        }

        return mess;
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
     * Assign the value to the form element. Use active element to get target tp update value for
     * @function copyValueToFormIndex
     * @private
     * @param  {Object} model  value to set
     * @param  {String} item item from the form
     */
    function copyValueToFormIndex(model, item) {
        // need 'targetLink': 'legend.0', the target tag inside inside target parent and the array index for children
        // 'targetParent': 'av-accordion-toggle', the parent element target class
        // 'default': a default value for the tag when model value is empty

        // get targetLink info
        const itemLink = item.targetLink.split('.');

        // get active element to retrieve targetParent (loop trought parent element to find the the target)
        let flag = false;
        let element = document.activeElement;

        while(!flag) {
            element = element.parentElement;
            flag = element.classList.contains(item.targetParent);
        }

        // update form html element
        const modelValue = (model !== '') ? model : item.default;
        element.getElementsByTagName(itemLink[0])[itemLink[1]].innerHTML = modelValue;
    }

    /**
     * Copy a value from the model to a form element who contain index when form loads
     * @function initValueToFormIndex
     * @param  {Array} modelArray  model array of values to apply
     * @param  {Array} classEl array of classes/index on the form element to retrieve it
     * @param  {String} field field on the model to get the value to apply
     * @param  {String} targetLink target element info to apply value to
     */
    function initValueToFormIndex(modelArray, classEl, field, targetLink) {
        // get targetLink info
        const itemLink = targetLink.split('.');

        // loop trought classEl elements to get proper html item
        let elements = document;
        for (let elemClass of classEl) {
            // get the element from the class (all li elements (the html array))
            elements = $(elements.getElementsByClassName(elemClass.cls)).children('ol').children('li');

            // if needed, get the array index to set as the right element
            elements = (elemClass.ind === -1) ? elements : elements[elemClass.ind];
        }

        // loop trought the model and assign value
        for (let [index, model] of modelArray.entries()) {
            elements[index].getElementsByTagName(itemLink[0])[itemLink[1]].innerHTML = model[field];
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
