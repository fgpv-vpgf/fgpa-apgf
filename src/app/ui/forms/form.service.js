import marked from 'marked';
const renderer = new marked.Renderer();

const templateUrls = {
    extent: require('./map/extent/extent-dialog.html'),
    lods:require('./map/lods/lods-dialog.html')
}

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

/**
 * Form service form controller
 *
 * @function formService
 * @param {Object} $timeout Angular timeout object
 * @param {Object} $rootScope Angular rootscope object
 * @param {Object} events Angular events object
 * @param {Object} $mdDialog Angular dialog window object
 * @param {Object} $translate Angular translation object
 * @param  {Object} keyNames key names with corresponding key code
 * @param {Object} commonService service with common functions
 * @param {Object} constants service with all constants for the application
 * @param {Object} projectionService service to project geometries
 * @param {Object} $http Angular http object
 * @param {Object} modelManager service to manage Angular Schema Form model
 * @return {Object} the form service
 */
function formService($timeout, $rootScope, events, $mdDialog, $translate, keyNames, commonService, constants, projectionService,
    $http, modelManager) {

    const service = {
        showAdvance,
        triggerValidation,
        advanceModel: false,
        frenchLanguage: (commonService.getLang() === 'fr-CA') ? true : false,  
        toggleSection,
        toggleAll,
        addCustomAccordion,
        setExtent,
        setAreaOfInterest,
        setLods,
        setErrorMessage,
        updateId,
        copyValueToFormIndex,
        initValueToFormIndex,
        copyValueToModelIndex,
        updateLinkValues,
        getActiveElemIndex
    };

    // if show advance is true we need to toggle the hidden because the form has been reset
    events.$on(events.avSchemaUpdate, () => {
        resestShowAdvance();
        triggerValidation();
    });
    events.$on(events.avLoadModel, () => {
        resestShowAdvance();
        triggerValidation();
    });
    events.$on(events.avSwitchLanguage, () => { resestShowAdvance(); service.frenchLanguage = (commonService.getLang() === 'fr-CA') ? true : false;});

    // when we add basemap or layers, if show advance is click, remove hidden
    events.$on(events.avNewItems, () => { $timeout(() => {
        showAdvance();
        showVersion();
    }, constants.debInput) });

    // when version is set, show/hide dev version fields
    events.$on(events.avVersionSet, () => { $timeout(() => showVersion(), constants.debInput) });

    // set WCAG
    events.$on(events.avSchemaUpdate, () => { $timeout(() => { WCAG() }, constants.delaySplash) });
    events.$on(events.avLoadModel, () => { $timeout(() => { WCAG() }, constants.delaySplash) });
    events.$on(events.avSwitchLanguage, () => { $timeout(() => { WCAG() }, constants.delaySplash) });

    return service;

    /***/

    /**
     * Add WCAG for tab inside a form
     *
     * @function WCAG
     * @private
     */
    function WCAG() {
        // remove tabindex on tab because href inside is tabbable and creates double tab
        const navTabs = $(document.getElementsByClassName('nav-tabs')).children();
        navTabs.attr('tabindex', '-1')

        // on press ENTER, focus to first focusable element
        navTabs.bind('keydown', event => {
            $timeout(() => {
                if (event.which === keyNames.ENTER || event.which === keyNames.SPACEBAR) {
                    const tabList = event.target.closest('.av-inner-tab');
                    const tabContent = tabList.querySelectorAll('.tab-pane:not(.ng-hide)')[0];
                    tabContent.querySelectorAll(('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"]):not(.hidden)'))[0].focus();
                }
            }, constants.delayWCAG);
        });
    }

    /**
     * Reset show advance fields if needed when there is a new model or language switch
     *
     * @function resestShowAdvance
     * @private
     */
    function resestShowAdvance() {
        if (service.advanceModel) { $timeout(() => showAdvance(), constants.delayAccordion); }
    }

    /**
     * Show advance fields
     *
     * @function showAdvance
     */
    function showAdvance() {
        // manage the show advance configuration (add 'htmlClass': 'av-form-advance hidden' to fields who need advance config)
        const elems = document.getElementsByClassName('av-form-advance');

        const func = (service.advanceModel) ? 'removeClass' : 'addClass';
        $(elems)[func]('hidden');
    }

    /**
     * Show versions fields
     *
     * @function showVersion
     */
    function showVersion() {
        const show = modelManager.checkVersion();

        const items = document.getElementsByClassName('av-version-dev');
        const func = (show) ? 'removeClass' : 'addClass';
        $(items)[func]('av-version-dev-hide');
    }

    /**
     * Trigger forms validation
     *
     * @function triggerValidation
     */
    function triggerValidation() {
        $timeout(() => {
            angular.element('#validate').triggerHandler('click');
        });
    }

    /**
     * Toggle one section of accordion panel
     *
     * @function toggleSection
     * @param  {Object} event  event who trigger the action
     */
    function toggleSection(event) {
        const targetParent = event.currentTarget.parentElement;
        $(targetParent.getElementsByClassName('av-accordion-content')).slideToggle(400, 'swing');

        const icons = targetParent.getElementsByTagName('md-icon');
        icons[0].classList.toggle('hidden');
        icons[1].classList.toggle('hidden');

        // WCAG
        if (event.type === 'keydown') {
            const itemClass = event.target.classList.contains('av-accordion-expand') ? 'collapse' : 'expand';
            event.target.parentElement.getElementsByClassName(`av-accordion-${itemClass}`)[0].focus();
            event.preventDefault();
        }
    }

    /**
     * Create a custom accordion container
     *
     * @function addCustomAccordion
     * @param  {String} title  accordion title
     * @param {String} content accordion content
     * @param {Boolean} markedown optional, default false. if accordion content is from markdown file
     * @return {String} accordion html template
     */
    function addCustomAccordion(title, content, markedown = false) {
        const tempID = `avAcc${commonService.getUUID()}`
        // if the accordion type is markedown, access the info then append the result when it is ready
        if (markedown) {
            $http.get(content).then(r => marked(r.data, { renderer })).then(html => $(`#${tempID}`).append(html));
            content = '';
        }

        return `<fieldset class="schema-form-fieldset av-accordion-toggle av-collapse av-accordion-custom">
                    <legend>${title}</legend>
                    <div id="${tempID}" class="av-accordion-content">
                        <p>${content}</p>
                    </div>
                </fieldset>`;
    }

    /**
     * Toggle all sections of accordion panel (array of accordion items)
     *
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
            $(iconsExp).removeClass('hidden');
            $(iconsCol).addClass('hidden');
        } else {
            $(targetParent.getElementsByClassName('av-accordion-content')).slideDown(400, 'swing');
            $(iconsExp).addClass('hidden');
            $(iconsCol).removeClass('hidden');
        }
    }

    /**
     * Set extent from the viewer itself open in an iFrame
     *
     * @function setExtent
     * @param  {String} type  type of extent ('default', 'full' or 'maximum')
     * @param  {Array} extentSets  array of extent set to set the extent for
     */
    function setExtent(type, extentSets) {
        // get the extentset wkid and index
        let wkid = document.activeElement.parentElement.getElementsByClassName('av-extentset-wkid')[0]
            .getElementsByTagName('input')[0].value;
        let id = document.activeElement.parentElement.getElementsByClassName('av-extentset-id')[0]
            .getElementsByTagName('input')[0].value;
        const index = extentSets.findIndex(item => item.id.toString() === id);

        // set wkid to local storage to know wich one to use from frame-extent.html
        // if wkid = 102100, replace with 3857 because is deprecated
        wkid = (wkid === '102100') ? '3857' : wkid;
        localStorage.setItem('configextent', `config-extent-${wkid}`);

        $mdDialog.show({
            controller: extentController,
            controllerAs: 'self',
            templateUrl: templateUrls.extent,
            parent: $('.fgpa'),
            clickOutsideToClose: true,
            fullscreen: false,
            onRemoving: () => {
                // get the extent from local storage
                let extent = JSON.parse(localStorage.getItem('mapextent'));

                // set default bound if user close the viewer without changing the extent
                if (extent === null) {
                    const ext = {
                        xmin: -124,
                        ymin: 35,
                        xmax: -12,
                        ymax: 57,
                        spatialReference: { wkid: 4326 }
                    }
                    extent = projectionService.projectExtent(ext, extentSets[index].spatialReference);
                }
                localStorage.removeItem('mapextent');

                // itnitialze the value because it will not work if it doesn't exist then apply values
                extentSets[index][type] = {};
                extentSets[index][type].xmin = extent.xmin;
                extentSets[index][type].ymin = extent.ymin;
                extentSets[index][type].xmax = extent.xmax;
                extentSets[index][type].ymax = extent.ymax;

                $timeout(() => {
                    document.getElementsByClassName(`av-set${type}ext-button`)[parseInt(index)].focus();
                }, constants.delayWCAG)
            }
        });
    }

    /**
     * setExtent controller
     *
     * @function extentController
     * @private
     * @param  {Object} $mdDialog  Angular dialog window object
     */
    function extentController($mdDialog) {
        'ngInject';
        const self = this;

        self.close = $mdDialog.hide;
    }

    /**
     * Set area of interest from the viewer itself open in an iFrame
     *
     * @function setAreaOfInterest
     * @param  {Array} areaOfInterestSets  array of areas of interest
     */
    function setAreaOfInterest(areaOfInterestSets) {
        const index = parseInt(document.activeElement.parentElement.getAttribute('sf-index'));
        localStorage.setItem('configextent', `config-extent-3978`);

        $mdDialog.show({
            controller: extentController,
            controllerAs: 'self',
            templateUrl: templateUrls.extent,
            parent: $('.fgpa'),
            clickOutsideToClose: true,
            fullscreen: false,
            onRemoving: () => {
                // get the extent from local storage
                let extent = JSON.parse(localStorage.getItem('mapextent'));

                // set default bound if user close the viewer without changing the extent
                if (extent === null) {
                    extent = {
                        xmin: -4844430.556896179,
                        ymin: -1052774.037634491,
                        xmax: 5666163.380958509,
                        ymax: 4170111.408136484,
                        spatialReference: { wkid: 3918 }
                    }
                }

                localStorage.removeItem('mapextent');

                // itnitialze the value because it will not work if it doesn't exist then apply values
                areaOfInterestSets[index].xmin = extent.xmin;
                areaOfInterestSets[index].ymin = extent.ymin;
                areaOfInterestSets[index].xmax = extent.xmax;
                areaOfInterestSets[index].ymax = extent.ymax;

                $timeout(() => {
                    document.getElementsByClassName('av-setareaofinterest-button')[index].focus();
                }, constants.delayWCAG)
            }
        });
    }

    /**
     * Set lods from service
     *
     * @function setLods
     * @param  {Array} lods  lods model object
     * @param  {Integer} index  model array index to set
     */
    function setLods(lods, index) {
        $mdDialog.show({
            controller: lodsController,
            controllerAs: 'self',
            templateUrl: templateUrls.lods,
            parent: $('.fgpa'),
            clickOutsideToClose: true,
            fullscreen: false,
            onRemoving: () => { $timeout(() => {
                document.getElementsByClassName('av-setloads-button')[parseInt(index)].focus();
            }, constants.delayWCAG); }
        });

        /**
         * setLods controller
         *
         * @function lodsController
         * @private
         * @param  {Object} $mdDialog  Angular dialog window object
         */
        function lodsController($mdDialog) {
            'ngInject';
            const self = this;

            self.lodsUrl = '';
            self.disabled = true;
            self.close = $mdDialog.hide;
            self.cancel = $mdDialog.hide;
            self.validateUrl = () => {
                self.disabled = commonService.validServiceUrl(self.lodsUrl) ? false : true;
            }

            // set lods
            self.setLods = () => {
                $.ajax({
                    method: 'GET',
                    url: `${self.lodsUrl}?f=json`,
                    error: () => document.getElementsByClassName('av-lods-error')[0].classList.remove('hidden') })
                    .then(data => {
                        const json = (typeof data !== 'object') ? JSON.parse(data) : data;
                        if (typeof json.tileInfo !== 'undefined' && typeof json.tileInfo.lods !== 'undefined') {
                            lods[index].lods = json.tileInfo.lods;
                            self.close();
                        } else {
                            document.getElementsByClassName('av-lods-error')[0].classList.remove('hidden');
                        }
                    });
            };
        }
    }

    /**
     * Set custom validation error message
     * inside translation.csv the variable to replace needs to be there inside {}
     *
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
     * Get model array index from active element
     *
     * @function getActiveElemIndex
     * @param  {String} parentClass  class to find on parent element
     * @return {Integer} the index
     */
    function getActiveElemIndex(parentClass) {
        // get active element to retrieve targetParent (loop throught parent element to find the target)
        let flag = false;
        let element = document.activeElement;

        while (!flag) {
            element = element.parentElement;
            flag = element.classList.contains(parentClass);
        }

        // get active index
        return element.getAttribute('sf-index');
    }

    /**
     * Assign the value to the form element. Use active element to get target to update value for
     *
     * Need to have on the item:
     *  'targetLink': 'legend.0', the target tag inside inside target parent and the array index for children
     *  'targetParent': 'av-accordion-toggle', the parent element target class
     *  'default': a default value for the tag when model value is empty
     *
     * @function copyValueToFormIndex
     * @param  {Object} model  value to set
     * @param  {String} item item from the form
     */
    function copyValueToFormIndex(model, item) {
        // get targetLink info
        const itemLink = item.targetLink.split('.');

        // get active element to retrieve targetParent (loop throught parent element to find the target)
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
     *
     * @function initValueToFormIndex
     * @param  {Array} modelArray  model array of values to apply
     * @param  {Array} classEl array of classes/index on the form element to retrieve it
     * @param  {String} field field on the model to get the value to apply
     * @param  {String} targetLink target element info to apply value to
     */
    function initValueToFormIndex(modelArray, classEl, field, targetLink) {
        // get targetLink info
        const itemLink = targetLink.split('.');

        // loop throught classEl elements to get proper html item
        let elements = document;
        for (let elemClass of classEl) {
            // get the element from the class (all li elements (the html array))
            elements = $(elements.getElementsByClassName(elemClass.cls)).children('ol').children('li');

            // if needed, get the array index to set as the right element
            elements = (elemClass.ind === -1) ? elements : elements[elemClass.ind];
        }

        // loop throught the model and assign value
        for (let [index, model] of modelArray.entries()) {
            if (typeof elements[index] !== 'undefined') {
                elements[index].getElementsByTagName(itemLink[0])[itemLink[1]].innerHTML = model[field];

                // FIXME: because we can't remove fields from array (ASF problem), we need to remove the hidden class
                // if there is a field when we load a new model
                if (typeof model.table !== 'undefined' && model.table.columns.length > 0) {
                    if (typeof model.table.columns[0].title === 'string') {
                        elements[index].getElementsByClassName('av-columns')[0].classList.remove('hidden');
                    }
                }
            }
        }
    }

    /**
     * Copy a value from the model to a model element who contain index
     *
     * Need to have on the item:
     *  'targetElement': ['layers', 'layerType'], array of keys to to get the element to update
     *  'targetParent': 'av-accordion-content', the parent element target class to find index of
     *
     * @function copyValueToModelIndex
     * @param  {Object} modelValue  model value
     * @param  {String} item form item
     * @param  {String} model model to update
     */
    function copyValueToModelIndex(modelValue, item, model) {
        // get active index
        const index = getActiveElemIndex(item.targetParent);

        // find the key to update, if it is an array, use the index found before
        let update = model;
        for (let key of item.targetElement) {
            update = commonService.isArray(update[key]) ? update[key][index] :
                (typeof update[key] === 'object') ? update[key] : update[key] = modelValue;
        }
    }

    /**
     * Update the id automatically from a model value
     *
     * @function updateId
     * @param  {String} model  model value
     * @param  {Object} scope model to update
     * @param  {String} type class to find inex
     * @param {Boolean} useModel optional and default to false, specify if we use model value to generate id
     */
    function updateId(model, scope, type, useModel = false) {
        const index = getActiveElemIndex(type);
        const modelId = scope.model[type][index].id;

        let tempId = (typeof modelId === 'undefined' || modelId === '') ? commonService.getUUID() : modelId;
        tempId = (tempId.split('***').length === 2) ? tempId.split('***')[1] : (tempId.split('**/').length === 2) ?
            tempId.split('**/')[1] : tempId;

        // if empty, generate id. If not keep original or split to only keep id if it is a combine value
        scope.model[type][index].id = (!useModel) ? tempId : `${model}***${tempId}`;
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
    * { 'key': 'extentSets[].id', 'onChange': () => { debounceService.registerDebounce(self.formService.updateLinkValues(scope, [['extentSets', 'id']], 'extentId'), constants.debInput, false); } },
    * 'onChange' function to use the self.formService.updateLinkValues where
    * scope is the form scope
    * Array of keys made from key element
    * The same variable name created for the first element
    *
    * For a sample with a broadcast event, look at avLayersIdupdateEvents
    *
    * Known issue: onChange is not fired on the last item delete inside an array. Will need to find a workaround if need be
    *
    * @function updateLinkValues
    * @param  {Object} scope  form scope
    * @param  {Array} keys the path to the key to get value from. It is an array of key [name, id]. If only one is provided, id will be duplicate
    * @param  {String} link the value to update (need to be the same on optionData as the the field who receive the link)
    * @param  {String} broadcast optional - the event to broadcast. This will be use to update link in another scope model
    * @param  {String} showId optional - show the id inside the dropdown menu
    */
    function updateLinkValues(scope, keys, link, broadcast = false, showId = false) {
        // find values then remove undefined
        const id = findValues(scope.model, keys[0], 0, []).filter(val => (typeof val !== 'undefined'));
        const name = (keys.length === 2) ?
            findValues(scope.model, keys[1], 0, []).filter(val => (typeof val !== 'undefined')) : [];

        // create a pair of key [name**/id] it will be decrypted inside processOptions of dynamicSelect to show name in dropdown but apply id value
        const linkValues = [];
        for (let [index, value] of id.entries()) {
            let final = showId ? ` (${value})` : '';
            linkValues.push((name.length > 0) ? `${name[index]}${final}**/${value}` : `${value}**/${value}`)
        }
        scope[link] = linkValues;

        // if array of options is empty, add a message. This way validation will apply
        // when options are empty, the last item removed doesn't trigger validation
        if (scope[link].length === 0) {
            scope[link].push($translate.instant('options.dynamicselect'));
        }

        if (broadcast !== false) {
            $rootScope.$broadcast(events[broadcast], scope[link]);
        }
    }

    /**
    * Find values from the model element
    *
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
