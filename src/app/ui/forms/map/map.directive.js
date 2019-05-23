const templateUrl = require('../form.html');

/**
 * @module avMap
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avMap` directive for the map form
 *
 */
angular
    .module('app.ui')
    .directive('avMap', avMap);

/**
 * `avMap` directive body.
 *
 * @function avMap
 * @return {object} directive body
 */
function avMap() {
    const directive = {
        restrict: 'E',
        templateUrl,
        scope: { },
        controller: Controller,
        controllerAs: 'self',
        bindToController: true,
        link: (scope, element, attrs) => {
            scope.$on('sf-render-finished', (scope, element) => {
            });
        }
    };

    return directive;
}

/**
 * Map form controller
 *
 * @function Controller
 * @param {Object} $scope module scope
 * @param {Object} $translate Angular translation object
 * @param {Object} $timeout Angular timeout object
 * @param {Object} events Angular events object
 * @param {Object} modelManager service to manage Angular Schema Form model
 * @param {Object} stateManager service to manage model state for validation
 * @param {Object} formService service with common functions for form
 * @param {Object} debounceService service to debounce user input
 * @param {Object} constants service with all application constant
 * @param {Object} layerService service use to get info from ESRI layers
 * @param {Object} commonService service with common functions
 */
function Controller($scope, $translate, $timeout,
    events, modelManager, stateManager, formService, debounceService, constants, layerService, commonService) {
    'ngInject';
    const self = this;
    self.modelName = 'map';
    self.sectionName = $translate.instant('app.section.map');
    self.formService = formService;

    // keep track of legend cursor position
    self.legendCursor = 0;

    // when schema is loaded or create new config is hit, initialize the schema, form and model
    events.$on(events.avSchemaUpdate, () => {
        $scope.model = modelManager.getModel(self.modelName);
        init();
    });

    // when user load a config file, set form and model
    events.$on(events.avLoadModel, () => {
        modelManager.updateModel($scope, self.modelName);
        init();
    });

    // when user change language, reset schema and form
    events.$on(events.avSwitchLanguage, () => {
        self.sectionName = $translate.instant('app.section.map');
        init();
    });

    /**
     * Initialize the map form
     *
     * @function init
     * @private
     */
    function init() {
        // keep track of number of layers to fire onChange only for new layer
        // do the same for other type array. If not the onChange and updateLinkValues are fired continously
        self.layers = -1;
        self.basemaps = -1;
        self.extentSets = -1;
        self.lodSets = -1;
        self.tileSchemas = -1;

        // update schema and form
        $scope.schema = modelManager.getSchema(self.modelName);
        $scope.form = angular.copy($scope.form);
        $scope.form = setForm();

        // set dynamic values drop-down
        self.formService.updateLinkValues($scope, [['extentSets', 'id']], 'extentId');
        self.formService.updateLinkValues($scope, [['lodSets', 'id']], 'lodId');
        self.formService.updateLinkValues($scope, [['baseMaps', 'id'], ['baseMaps', 'name']], 'initBaseId');
        self.formService.updateLinkValues($scope, [['tileSchemas', 'id'], ['tileSchemas', 'name']], 'tileId');
        self.formService.updateLinkValues($scope, [['layers', 'id']], 'initLayerId', 'avLayersIdUpdate');

        $timeout(() => setCollapsibleHeader(), constants.delayCollapseLink);

        // enable/disable setExtent buttons
        $timeout(() => {
            const buttons = [...document.getElementsByClassName('av-extentsets')[0].getElementsByClassName('av-button-square')];

            for (let [index, extentset] of $scope.model.extentSets.entries()) {
                // get buttons onlly for this extent set
                const extentSetBtn = buttons.slice(index * 3, index * 3 + 3);

                // check if projection is supported by setExtent buttons and disable/enable buttons accordingly
                let apply = (constants.supportWkid.findIndex(item => item === extentset.spatialReference.wkid) === -1) ?  'setAttribute' : 'removeAttribute';
                for (let btn of extentSetBtn) {
                    btn[apply]('disabled', '');
                }
            }
        }, constants.delaySplash);

        // set default structure legend values
        setDefaultStructureLegend(constants.delayCollapseLink);
    }

    events.$on(events.avValidateForm, () => {
        $scope.$broadcast('schemaFormValidate');
        stateManager.validateModel(self.modelName, $scope.activeForm, $scope.form[0].tabs, $scope.model);
    });

    events.$on(events.avValidateLegend, () => {
        validateLegend();
    });

    /**
     * Initialize header (collapsible element) value (form element) from model values when it loads.
     *
     * @function setCollapsibleHeader
     * @private
     */
    function setCollapsibleHeader() {
        // set collapsible element from model value when first load
        $timeout(() => {
            // set the class element to get { class, index in the array (-1 to get all) }
            const baseClass = [{ 'cls': 'av-baseMaps', 'ind': -1 }];
            const layerClass = [{ 'cls': 'av-layers', 'ind': -1 }];

            // set basemaps and layers (model, class elements, field to use to update, item to update)
            self.formService.initValueToFormIndex($scope.model.baseMaps, baseClass, 'name', 'legend.0')
            self.formService.initValueToFormIndex($scope.model.layers, layerClass, 'name', 'legend.0')

            // loop trought layers to set children (layer entry and columns for table)
            if (typeof $scope.model.layers !== 'undefined') {
                for (let [layerIndex, layer] of $scope.model.layers.entries()) {

                    // set layer entries
                    if (typeof layer.layerEntries !== 'undefined') {
                        setCollapsibleHeaderEntry(layer.layerType, layerIndex, layer.layerEntries);
                    }

                    // set columns if need be
                    if (typeof layer.table !== 'undefined' && typeof layer.table.columns !== 'undefined') {
                        let columnClass = [
                            { 'cls': 'av-layers', 'ind': layerIndex },
                            { 'cls': 'av-columns', 'ind': -1 }
                        ];
                        self.formService.initValueToFormIndex(layer.table.columns, columnClass, 'title', 'legend.0');
                    }
                }
            }
        }, constants.delayCollapseHeader);
    }

    /**
     * Initialize header (collapsible element) value (form element) for layer entry from model values when it loads.
     *
     * @function setCollapsibleHeaderEntry
     * @private
     * @param  {String} layerType  type of layer
     * @param  {Integer} layerIndex  index of the layer inside the array
     * @param  {Array} entries  array of layer entries
     */
    function setCollapsibleHeaderEntry(layerType, layerIndex, entries) {
        const entryClass = [
            { 'cls': 'av-layers', 'ind': layerIndex },
            { 'cls': 'av-layerEntries', 'ind': -1 }
        ];

        // set entry for esriDynamic and ogcWMS
        if (layerType === 'esriDynamic') {
            self.formService.initValueToFormIndex(entries, entryClass, 'index', 'legend.0');

            // set columns if need be
            for (let [entryIndex, entries] of entries.entries()) {
                if (typeof entries.table !== 'undefined' && typeof entries.table.columns !== 'undefined') {
                    let columnClass = [
                        { 'cls': 'av-layers', 'ind': layerIndex },
                        { 'cls': 'av-layerEntries', 'ind': entryIndex },
                        { 'cls': 'av-columns', 'ind': -1 }
                    ];
                    self.formService.initValueToFormIndex(entries.table.columns, columnClass, 'title', 'legend.0');
                }
            }
        } else if (layerType === 'ogcWms') {
            self.formService.initValueToFormIndex(entries, entryClass, 'id', 'legend.0');
        }
    }

    /**
     * Initialize layer columns for datatable from the layer url and layer entry index
     *
     * @function setColumns
     * @private
     * @param  {Object} event  the event
     * @param  {Integer} item  Angular schema form item
     */
    function setColumns(event, item) {
        // get the element for dynamic and feature layer
        const currTarget  = $(event.currentTarget);
        const elementDyn = currTarget.closest('.av-layer')[0];
        const elementFeat = currTarget.closest('.av-layerEntry')[0];

        // get the index of current layer to get the model and the layerEntry index to get the feature class
        const indexLayer = elementDyn.getAttribute('sf-index');
        const featClass = (item.layerType === 'esriFeature') ?
            -1 : elementFeat.getElementsByClassName('av-feature-index')[0].getElementsByTagName('input')[0].value;

        // get model for specific layer
        let model = $scope.model.layers[indexLayer];

        // send the model to generate the config to query the layer
        layerService.getLayer(model, parseInt(featClass)).then(data => {

            // if it is a dynamic layer, use the index of the layer entry
            model = (item.layerType === 'esriFeature') ? model : model.layerEntries[elementFeat.getAttribute('sf-index')];

            // make sure table exist on layer object
            if (typeof model.table === 'undefined') { model.table = { }; }

            // set the columns from the layer field
            model.table.columns = data.map(field => {
                // get field type, set number as default
                let fieldType = 'number';
                if (field.type === 'esriFieldTypeString') { fieldType = 'string'; }
                else if (field.type === 'esriFieldTypeDate') { fieldType = 'date'; }

                const item = {
                    'data': field.name,
                    'title': field.alias,
                    'visible':  true,
                    'searchable': true,
                    'filter': {
                        'type': fieldType
                    }
                };
                return item;
            });

            // remove shape column if present
            const updateCol = [];
            model.table.columns.map((field, index) => {
                if (field.data.substring(0, 5).toUpperCase() !== 'SHAPE') { updateCol.push(model.table.columns[index]); }
            });
            model.table.columns = updateCol;

            // broadcast event to generate accordion
            events.$broadcast(events.avNewItems);

            // update columns name with field title
            $timeout(() => {
                const columnClass = [{ 'cls': 'av-layers', 'ind': indexLayer }];

                // if dynamic, set layer entry info
                if (item.layerType === 'esriDynamic') {
                    columnClass.push({ 'cls': 'av-layerEntries', 'ind': elementFeat.getAttribute('sf-index') });
                }

                // update columns
                columnClass.push({ 'cls': 'av-columns', 'ind': -1 });
                self.formService.initValueToFormIndex(model.table.columns, columnClass, 'title', 'legend.0');

                // FIXME: remove hidden class. This css is there because we can't use strartempty: true on columns array
                // ASF throws an error. So we start with one undefined element with hidden class then update the array
                // and remove the class
                const element = (featClass === -1) ? elementDyn : elementFeat;
                element.getElementsByClassName('av-columns')[0].classList.remove('hidden');

            }, constants.delayUpdateColumns);
        }).catch(err => {
            // catch the error and reinitialize the fields array
            console.log(err);

            // if it is a dynamic layer, use the index of the layer entry
            model = (item.layerType === 'esriFeature') ? model : model.layerEntries[elementFeat.getAttribute('sf-index')];

            // make sure table exist on layer object then empty fields
            if (typeof model.table === 'undefined') { model.table = { }; }
            model.table.columns = [];
        });
    }

    /**
     * Validate JSON structure legend
     *
     * @function validateLegend
     * @private
     */
    function validateLegend() {
        // remove focus event
        $('#activeForm-legend-root').off('focus');

        const help = document.getElementsByClassName('av-legend-json')[0];
        try {
            if  ($scope.model.legend.type === 'structured') {
                $scope.model.legend.root = (typeof $scope.model.legend.root === 'object' && $scope.model.legend.root !== null) ?
                    JSON.stringify($scope.model.legend.root, null, 4) : $scope.model.legend.root = JSON.stringify(JSON.parse($scope.model.legend.root), null, 4);

                document.getElementById('activeForm-legend-root').innerHTML = $scope.model.legend.root

                // validate layers ID
                const idsErrors = validateLayerID($scope.model.legend.root);

                if (idsErrors !== '') {
                    const e = `${$translate.instant('form.map.legenderror')} ${idsErrors}`
                    throw(e);
                }
                // set class and message
                help.classList.remove('av-legend-json-error');
                help.classList.add('av-legend-json-valid');
                help.innerHTML = $translate.instant('form.map.legendtextvalid');
            }
        } catch (e) {
            // set class
            help.classList.add('av-legend-json-error');
            help.classList.remove('av-legend-json-valid');

            // set message
            help.innerHTML = e;

            // broadcast error if needed
            events.$broadcast(events.avLegendError);
        }
    }

    /**
     * Validate legend's layers ID
     *
     * @function validateLayerID
     * @private
     * @param  {String} json json content
     * @return {String} ids in error
     */
    function validateLayerID(json) {

        // Extract JSON layers IDs
        const ids = [];
        const regexp = /"layerId": "(.*?)"/g;
        json.replace(regexp, (s, match) => ids.push(match));

        // Compare extracted ids with available ids
        let layersList = [];
        for (let item of $scope.model.layers) layersList.push(item.id);

        let noMatches = [];
        for (let id of ids) {
            if (layersList.includes(id) === false) noMatches.push(id);
        }

        let idsErrors = '';
        idsErrors = noMatches.join(', ');

        return idsErrors;
    }

    /**
     * Set default JSON structure legend
     *
     * @function setDefaultStructureLegend
     * @private
     * @param {Interger} time the timeout duration (optional, default = 0)
     */
    function setDefaultStructureLegend(time = 100) {
        // check if structured section needs to be shown
        $timeout(() => {
            const legend = $scope.model.legend;
            const elem = document.getElementsByClassName('av-legend-structure')[0];

            if (legend.legendChoice !== 'structured') {
                elem.classList.add('hidden');
            } else {
                if (typeof legend.root === 'undefined' || legend.root === '') {
                    legend.root = { "name": "root", "children": [] }
                } else if (typeof legend.root === 'object') {
                    legend.root = JSON.stringify(legend.root, null, 4);
                }

                elem.classList.remove('hidden');
            }

            // set legend cursor position
            $('#activeForm-legend-root').on('click', evt => {
                updateCursorPos(evt.currentTarget.selectionStart);
            });
        }, time);
    }

    /**
     * Add a legend section snippet
     *
     * @function addLegendSnippet
     * @private
     * @param  {String} section  type of section to add
     */
    function addLegendSnippet(section) {
        const legendSection = {
            'legendentry': {
                'layerId': '',
                'hidden': false,
                'controlledIds': [],
                'entryIndex': 'integer - index of sublayer ESRI dynamic',
                'entryId': 'sublayer id for WMS',
                'coverIcon': '',
                'description': '',
                'controls': ['opacity', 'visibility', 'boundingBox', 'query', 'snapshot', 'metadata', 'boundaryZoom', 'refresh', 'reload', 'remove', 'settings', 'data', 'styles'],
                'symbologyStack': [{
                    'image': '',
                    'text': '',
                    'sqlQuery': ''
                }],
                'symbologyRenderStyle': 'icons -- images',
                'symbologyExpanded': 'false'
            },
            'legendentrygroup': {
                'name': '',
                'hidden': false,
                'expanded': true,
                'children': ['EntryGroup - VisibilitySet -- Entry -- InfoSection'],
                'controls': ['opacity', 'visibility', 'symbology', 'query', 'reload', 'remove', 'settings'],
                'disabledControls': []
            },
            'legendinfo': {
                'infoType': 'title -- image -- text',
                'content': '',
                'export': 'true'
            },
            'legendunbound': {
                'infoType': 'unboundLayer',
                'content': 'name to display in the legend',
                'layerName': 'prior to version 2.5',
                'coverIcon': '',
                'description': '',
                'export': true,
                'symbologyStack': [{
                    'image': '',
                    'text': '',
                    'sqlQuery': ''
                }],
                'symbologyRenderStyle': 'icons or images',
                'symbologyExpanded': false
            },
            'legendvis': {
                'exclusiveVisibility': ['entry -- entryGroup'],
                'collapse': false
            }
        }

        // update legend string (place the snippet at the last string edit)
        const snippet = JSON.stringify(legendSection[section], null, 4);
        $scope.model.legend.root = [$scope.model.legend.root.slice(0, self.legendCursor),
            snippet,
            $scope.model.legend.root.slice(self.legendCursor)].join('');

        // on focus, highlight the new snippet
        $('#activeForm-legend-root').on('focus', evt => {
            evt.currentTarget.setSelectionRange(self.legendCursor, self.legendCursor + snippet.length + 1);
        });
    }

    /**
     * Show/update legend cursor position
     *
     * @function updateCursorPos
     * @private
     * @param  {Integer} pos  cursor position
     */
    function updateCursorPos(pos) {
        self.legendCursor = pos;
        document.getElementsByClassName('av-legend-cursorpos')[0].innerText =
            `${$translate.instant('form.map.legendcursor')} ${pos}`;
    }

    /**
     * Initialize layer object to solve the bug of 'linked' layers
     * If we don't do this, when we change something in the controls array or state, it
     * is replecated everywhere in all controls or state of all layer.
     * We initilize layerEntries as well. If not new layer have layerEntries from other layers
     *
     * @function initLayer
     * @private
     * @param  {Object} layers  array of layers to initialize
     */
    function initLayer(layers) {
        let flag = false;
        // When we add a new layer, initialize the controls array to avoid linked layers controls bug
        if (self.layers !== -1 && layers.length - 1 > self.layers) {
            const layer = layers[layers.length - 1];

            // reinitialize to break the 'link'
            layer.controls = ['opacity', 'visibility', 'boundingBox', 'query', 'snapshot', 'metadata', 'boundaryZoom', 'refresh', 'reload', 'remove', 'settings', 'data', 'styles'];
            layer.state = {
                'opacity': 1,
                'visibility': true,
                'boundingBox': false,
                'query': true,
                'snapshot': false,
                'hovertips': true
            };
            layer.layerEntries = [];

            // broadcast the new item even to update accordion
            events.$broadcast(events.avNewItems);
            flag = true;
        } else if (self.layers === -1) {
            // special case when it is the first layer
            events.$broadcast(events.avNewItems);
            flag = true;
        }

        // update id array when layer is deleted
        if (self.layers !== -1 && layers.length - 1 < self.layers) {
            self.formService.updateLinkValues($scope, [['layers', 'id']], 'initLayerId', 'avLayersIdUpdate');
        }

        // FIXME: there is bugs with ASF.
        // We are not able to set step value... we need to set them manually
        if (flag) {
            // set opacity input step value
            $timeout(() => {
                $('.av-opacity-input input').each((index, element) => {
                    element.step = 0.05;
                });
            }, constants.debInput);
        }

        // update layers numbers
        self.layers = layers.length - 1;

    }

    /**
     * Initialize layer entry object to solve the bug of 'linked' layers entries
     * If we don't do this, when we change something in the controls array, it
     * is replecated everywhere in all controls or state of all layer entries.
     *
     * @function initLayerEntry
     * @private
     * @param  {Object} layerEntries  array of layer entries to initialize
     */
    function initLayerEntry(layerEntries) {

        const entry = layerEntries[layerEntries.length -1];
        if (typeof entry !== 'undefined' && typeof entry.init === 'undefined') {
            entry.init = true;
            entry.controls = ['opacity', 'visibility', 'boundingBox', 'query', 'snapshot', 'metadata', 'boundaryZoom', 'refresh', 'reload', 'remove', 'settings', 'data', 'styles'];

            // we need to reset value of all controls to true to refresh the ui
            // FIXME: know bug, the first time the use will click on a controls, it will have no effect
            const controls = $(document.activeElement).closest('ol').find('.av-controls-bug');
            const inputs = $(controls[controls.length - 1]).find('input');

            for (let input of Array.from(inputs)) {
                input.checked = true;
            }

            // FIXME: there so bugs with ASF.
            // We are not able to set step value... we need to set them manually
            $timeout(() => {
                $('.av-opacity-input input').each((index, element) => {
                    element.step = 0.05;
                });
            }, constants.debInput);

            // broadcast the new item even to update accordion
            events.$broadcast(events.avNewItems);
        }
    }

    /**
     * Set map form
     *
     * @function setForm
     * @private
     * @return {Object} the map form
     */
    function setForm() {
        const scope = $scope;

        return [
            { 'type': 'tabs', 'htmlClass': 'av-inner-tab', 'tabs': [
                { 'title': $translate.instant('form.map.extentlods'), 'items': [
                    { 'type': 'template', 'template': self.formService.addCustomAccordion($translate.instant('form.custom.help'), `help/info-extentlods-${commonService.getLang()}.md`, true) },
                    { 'type': 'fieldset', 'htmlClass': 'av-form-advance hidden av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.tileschema'), 'items': [
                        { 'key': 'tileSchemas', 'htmlClass': 'av-accordion-content', 'onChange': tiles => {
                            if (self.tileSchemas !== -1 && tiles.length < self.tileSchemas) {
                                self.formService.updateLinkValues($scope, [['tileSchemas', 'id'], ['tileSchemas', 'name']], 'tileId');
                            }

                            // update tiles schema numbers
                            self.tileSchemas = tiles.length;
                        }, 'notitle': true, 'add': $translate.instant('button.add'), 'items': [
                            { 'type': 'fieldset', 'htmlClass': 'av-tileschema', 'items': [
                                // hidden read only field { 'key': 'tileSchemas[].id', 'readonly': true },
                                { 'key': 'tileSchemas[].name', 'onChange': debounceService.registerDebounce((model, item) => {
                                    self.formService.updateId(model, $scope, 'tileSchemas');
                                    self.formService.updateLinkValues($scope, [['tileSchemas', 'id'], ['tileSchemas', 'name']], 'tileId'); }, constants.debInput, false), 'validationMessage': form => self.formService.setErrorMessage(form, '', ) },
                                {
                                    'key': 'tileSchemas[].extentSetId', 'validationMessage': form => self.formService.setErrorMessage(form, '', ),
                                    'type': 'dynamic-select',
                                    'optionData': 'extentId',
                                    'model': 'extentSetId',
                                    'array': true
                                }, {
                                    'key': 'tileSchemas[].lodSetId',
                                    'type': 'dynamic-select',
                                    'optionData': 'lodId',
                                    'model': 'lodSetId',
                                    'array': true
                                }, {
                                    'key': 'tileSchemas[].overviewUrl'
                                }, {
                                    'key': 'tileSchemas[].hasNorthPole',
                                    'htmlClass': 'av-form-advance hidden'
                                }
                            ] }
                        ] }
                    ] },
                    { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.extentset'), 'items': [
                        { 'type': 'section', 'htmlClass': 'av-accordion-content', 'items': [
                            { 'key': 'extentSets', 'htmlClass': 'av-extentsets', 'onChange': extents => {
                                if (self.extentSets !== -1 && extents.length < self.extentSets) {
                                    self.formService.updateLinkValues(scope, [['extentSets', 'id']], 'extentId')
                                }

                                // update extents numbers
                                self.extentSets = extents.length;
                            }, 'notitle': true, 'add': $translate.instant('button.add'), 'items': [
                                { 'type': 'template', 'template': commonService.addButton('form.map', 'extentdefault', 'setExtent', 'av-setdefaultext-button'), 'setExtent': () => self.formService.setExtent('default', $scope.model.extentSets) },
                                { 'type': 'template', 'template': commonService.addButton('form.map', 'extentfull', 'setExtent', 'av-setfullext-button'), 'setExtent': () => self.formService.setExtent('full', $scope.model.extentSets) },
                                { 'type': 'template', 'template': commonService.addButton('form.map', 'extentmax', 'setExtent', 'av-setmaxext-button'), 'setExtent': () => self.formService.setExtent('maximum', $scope.model.extentSets) },
                                { 'key': 'extentSets[].id', 'htmlClass': 'av-extentset-id', 'onChange': () => debounceService.registerDebounce(self.formService.updateLinkValues(scope, [['extentSets', 'id']], 'extentId'), constants.debInput, false), 'validationMessage': form => self.formService.setErrorMessage(form, 'form.map.requirederr', ) },
                                { 'type': 'section', 'htmlClass': 'row', 'items': [
                                    { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                        { 'key': 'extentSets[].spatialReference.wkid', 'htmlClass': 'av-extentset-wkid', 'onChange': debounceService.registerDebounce(model => {
                                            const buttons = document.activeElement.closest('.av-extentsets').getElementsByTagName('button');

                                            // check if projection is supported by setExtent buttons and disable/enable buttons accordingly
                                            let apply = (constants.supportWkid.findIndex(item => item === model) === -1) ?  'setAttribute' : 'removeAttribute';
                                            for (let btn of buttons) {
                                                btn[apply]('disabled', '');
                                            }
                                        }, constants.debInput, false), 'validationMessage':  form => self.formService.setErrorMessage(form, '', ['viewValue', 'schema.minimum'] ) }
                                    ] }
                                    // Not use,
                                    // { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                    //     { 'key': 'extentSets[].spatialReference.vcsWkid' }
                                    // ] },
                                    // { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                    //     { 'key': 'extentSets[].spatialReference.latestWkid' }
                                    // ] },
                                    // { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                    //     { 'key': 'extentSets[].spatialReference.latestVcsWkid' }
                                    // ] },
                                    // { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                    //     { 'key': 'extentSets[].spatialReference.wkt' }
                                    // ] }
                                ] },
                                { 'type': 'section', 'htmlClass': 'row', 'items': [
                                    { 'key': 'extentSets[].default', 'items': [
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].default.xmin', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].default.ymin', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].default.xmax', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].default.ymax', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) }
                                        ] }
                                    ] }
                                ] },
                                { 'type': 'section', 'htmlClass': 'row', 'items': [
                                    { 'key': 'extentSets[].full', 'items': [
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].full.xmin', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].full.ymin', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].full.xmax', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].full.ymax', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) }
                                        ] }
                                    ] }
                                ] },
                                { 'type': 'section', 'htmlClass': 'row', 'items': [
                                    { 'key': 'extentSets[].maximum', 'items': [
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].maximum.xmin', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].maximum.ymin', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].maximum.xmax', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].maximum.ymax', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) }
                                        ] }
                                    ] }
                                ] }
                            ] }
                        ]}
                    ] },
                    { 'type': 'fieldset', 'htmlClass': 'av-form-advance hidden av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.lodset'), 'items': [
                        { 'key': 'lodSets', 'htmlClass': 'av-accordion-content', 'onChange': lods => {
                            if (self.lodSets !== -1 && lods.length < self.lodSets) {
                                self.formService.updateLinkValues($scope, [['lodSets', 'id']], 'lodId');
                            }
                            // update lods numbers
                            self.lodSets = lods.length;
                        }, 'notitle': true, 'add': $translate.instant('button.add'), 'items': [
                            { 'key': 'lodSets[]', 'htmlClass': `av-lods-array`, 'items': [
                                { 'key': 'lodSets[].id', 'onChange': () => debounceService.registerDebounce(self.formService.updateLinkValues($scope, [['lodSets', 'id']], 'lodId'), constants.debInput, false), 'validationMessage': form => self.formService.setErrorMessage(form, '', ) },
                                { 'type': 'template', 'template': commonService.addButton('form.map', 'setlods', 'setLods', 'av-setloads-button'), 'setLods': () => self.formService.setLods($scope.model.lodSets, self.formService.getActiveElemIndex('av-lods-array')) },
                                { 'type': 'fieldset', 'htmlClass': 'row', 'items': [
                                    { 'key': 'lodSets[].lods', 'add': null, 'items': [
                                        { 'type': 'section', 'htmlClass': 'row', 'readonly': true, 'items': [
                                            { 'key': 'lodSets[].lods[].level', 'htmlClass': 'col-xs-2 av-check-left' },
                                            { 'key': 'lodSets[].lods[].resolution', 'htmlClass': 'col-xs-3 av-check-left' },
                                            { 'key': 'lodSets[].lods[].scale', 'htmlClass': 'col-xs-2 av-check-left' }
                                        ] }
                                    ] }
                                ] }
                            ] }
                        ] }
                    ] }
                ] },
                { 'title': $translate.instant('form.map.basemaps'), 'items': [
                    { 'type': 'template', 'template': self.formService.addCustomAccordion($translate.instant('form.custom.help'), `help/info-basemaps-${commonService.getLang()}.md`, true) },
                    { 'type': 'fieldset', 'title': $translate.instant('form.map.initialid'), 'items': [
                        {
                            'key': 'initialBasemapId',
                            'type': 'dynamic-select',
                            'optionData': 'initBaseId',
                            'model': 'initialBasemapId',
                            'array': false,
                            'notitle': true
                        }
                    ] },
                    { 'type': 'help', 'helpvalue': '<div class="help-block">' + $translate.instant('form.map.expcoldesc') + '<div>' },
                    { 'key': 'baseMaps', 'htmlClass': 'av-accordion-all av-baseMaps av-sortable', 'startEmpty': true, 'onChange': basemaps => {
                        if (self.basemaps !== -1 && basemaps.length < self.basemaps) {
                            self.formService.updateLinkValues($scope, [['baseMaps', 'id'], ['baseMaps', 'name']], 'initBaseId');
                        } else {
                            // new item, create accordion
                            events.$broadcast(events.avNewItems);
                        }

                        // update basemaps numbers
                        self.basemaps = basemaps.length;
                    }, 'add': $translate.instant('button.add'), 'items': [
                        { 'type': 'help', 'helpvalue': '<div class="av-drag-handle"></div>' },
                        { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-baseMap', 'title': $translate.instant('form.map.basemap'), 'items': [
                            { 'key': 'baseMaps[]', 'htmlClass': 'av-accordion-content', 'notitle': true, 'items': [
                                // hidden read only field { 'key': 'baseMaps[].id', 'readonly': true },
                                { 'key': 'baseMaps[].name', 'targetLink': 'legend.0', 'targetParent': 'av-accordion-toggle', 'default': $translate.instant('form.map.basemap'), 'onChange': debounceService.registerDebounce((model, item) => {
                                    self.formService.copyValueToFormIndex(model, item);
                                    self.formService.updateId(model, $scope, 'baseMaps');
                                    self.formService.updateLinkValues($scope, [['baseMaps', 'id'], ['baseMaps', 'name']], 'initBaseId'); }, constants.debInput, false), 'validationMessage': form => self.formService.setErrorMessage(form, '', ) },
                                { 'key': 'baseMaps[].description', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) },
                                { 'key': 'baseMaps[].typeSummary', 'htmlClass': 'av-form-advance hidden' },
                                { 'key': 'baseMaps[].altText', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) },
                                { 'key': 'baseMaps[].thumbnailUrl', 'htmlClass': 'av-form-advance hidden' },
                                {
                                    'key': 'baseMaps[].tileSchemaId',
                                    'type': 'dynamic-select',
                                    'optionData': 'tileId',
                                    'model': 'tileSchemaId',
                                    'array': true
                                },
                                { 'key': 'baseMaps[].layers', 'add': $translate.instant('button.add'), 'onChange': (model, form) => {
                                    if (model[model.length - 1].id === '') { model[model.length - 1].id = commonService.getUUID();}

                                    // removed with version 2.5
                                    // $timeout(() => { events.$broadcast(events.avVersionSet); }, 1000);
                                }, 'items': [
                                    { 'key': 'baseMaps[].layers[].id', 'htmlClass': 'av-form-advance hidden', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) },
                                    { 'key': 'baseMaps[].layers[].layerType', 'htmlClass': 'av-form-advance hidden', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) },
                                    { 'key': 'baseMaps[].layers[].url', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) },
                                    { 'key': 'baseMaps[].layers[].opacity', 'htmlClass': 'av-opacity-input av-form-advance hidden av-version-dev av-version-dev-hide', 'validationMessage': form => self.formService.setErrorMessage(form, '',['viewValue', 'schema.minimum', 'schema.maximum'] ) }
                                ] },
                                { 'type': 'fieldset', 'htmlClass': 'av-form-advance hidden av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.basemapattrib'), 'items': [
                                    { 'key': 'baseMaps[].attribution', 'htmlClass': 'av-accordion-content', 'notitle': true, 'items': [
                                        { 'key': 'baseMaps[].attribution.text' },
                                        // { 'key': 'baseMaps[].attribution.logo' }
                                        // To be brought back with version 2.5 since we want the new element altext (v2.4) to be hide with prod version (2.3)
                                        { 'key': 'baseMaps[].attribution.logo', 'items': [
                                            { 'key': 'baseMaps[].attribution.logo.enabled', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) },
                                            { 'key': 'baseMaps[].attribution.logo.value' },
                                            { 'key': 'baseMaps[].attribution.logo.altText', 'htmlClass': 'av-form-advance hidden' },
                                            { 'key': 'baseMaps[].attribution.logo.link' }
                                        ]}
                                    ] }
                                ] },
                                { 'key': 'baseMaps[].zoomLevels', 'htmlClass': 'av-form-advance hidden' }
                            ] }
                        ] }
                    ] }
                ] },
                { 'title': $translate.instant('form.map.layers'), 'items': [
                    { 'type': 'template', 'template': self.formService.addCustomAccordion($translate.instant('form.custom.help'), `help/info-layers-${commonService.getLang()}.md`, true) },
                    { 'type': 'help', 'helpvalue': '<div class="help-block">' + $translate.instant('form.map.expcoldesc') + '<div>' },
                    { 'key': 'layers', 'htmlClass': 'av-accordion-all av-layers av-sortable', 'startEmpty': true, 'onChange': () => { initLayer(scope.model.layers) }, 'add': $translate.instant('button.add'), 'items': [
                        { 'type': 'help', 'helpvalue': '<div class="av-drag-handle"></div>' },
                        { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-layer', 'title': $translate.instant('form.map.layer'), 'items': [
                            { 'key': 'layers[]', 'htmlClass': `av-accordion-content`, 'notitle': true, 'items': [
                                { 'key': 'layers[].layerChoice', 'type': 'select', 'targetElement': ['layers', 'layerType'], 'targetParent': 'av-accordion-content', 'onChange': (model, item) => {
                                    if (model === 'file') { model = 'esriFeature'; }
                                    self.formService.copyValueToModelIndex(model, item, $scope.model);
                                    events.$broadcast(events.avNewItems); }
                                },
                                // hidden read only field { 'key': 'layers[].id', 'readonly': true },
                                { 'key': 'layers[].name', 'targetLink': 'legend.0', 'targetParent': 'av-accordion-toggle', 'default': $translate.instant('form.map.layer'), 'onChange': debounceService.registerDebounce((model, item) => {
                                    self.formService.copyValueToFormIndex(model, item);
                                    self.formService.updateId(model, $scope, 'layers', true);
                                    self.formService.updateLinkValues($scope, [['layers', 'id']], 'initLayerId', 'avLayersIdUpdate'); }, constants.debInput, false), 'validationMessage': form => self.formService.setErrorMessage(form, '', ) },
                                { 'key': 'layers[].url', 'onChange': debounceService.registerDebounce(model => {
                                    // check if it is a feature layer. If so, set fields. For dynamic we set when index change
                                    if (!isNaN(parseInt(model.substring(model.lastIndexOf('/') + 1, model.length)))) {
                                        // simulate click event to set fields
                                        const btn = $(document.activeElement).closest('.av-layer').find('.av-form-setfields button')[0];
                                        $timeout(() => { angular.element(btn).triggerHandler('click'); }, 0);
                                    }
                                }, constants.delayUpdateColumns, false) , 'validationMessage': form => self.formService.setErrorMessage(form, '', )},
                                { 'type': 'help', 'helpvalue': '<div class="help-block">' + $translate.instant('form.map.urlfile') + '<div>', 'condition': 'model.layers[arrayIndex].layerChoice === \'file\'' },
                                { 'key': 'layers[].refreshInterval', 'htmlClass': 'av-form-advance hidden', 'validationMessage': form => self.formService.setErrorMessage(form, '', ['viewValue', 'schema.minimum', 'schema.maximum'] ), 'condition': 'model.layers[arrayIndex].layerChoice !== \'file\' && model.layers[arrayIndex].layerChoice !== \'ogcWfs\'' },
                                { 'key': 'layers[].expectedResponseTime', 'htmlClass': 'av-form-advance hidden', 'validationMessage': form => self.formService.setErrorMessage(form, '', ),'condition': 'model.layers[arrayIndex].layerChoice !== \'file\' && model.layers[arrayIndex].layerChoice !== \'ogcWfs\'' },
                                { 'key': 'layers[].metadataUrl', 'htmlClass': 'av-form-advance hidden', 'condition': 'model.layers[arrayIndex].layerChoice !== \'file\'' },
                                { 'key': 'layers[].catalogueUrl', 'htmlClass': 'av-form-advance hidden', 'condition': 'model.layers[arrayIndex].layerChoice !== \'file\'' },
                                { 'key': 'layers[].suppressGetCapabilities', 'htmlClass': 'av-form-advance hidden', 'condition': 'model.layers[arrayIndex].layerChoice === \'ogcWms\'' },
                                { 'key': 'layers[].fileType', 'htmlClass': 'av-version-dev av-version-dev-hide', 'condition': 'model.layers[arrayIndex].layerChoice === \'file\'' },
                                { 'key': 'layers[].colour', 'htmlClass': 'av-version-dev av-version-dev-hide', 'condition': 'model.layers[arrayIndex].layerChoice === \'file\' || model.layers[arrayIndex].layerChoice === \'ogcWfs\'' },
                                { 'key': 'layers[].latField', 'htmlClass': 'av-version-dev av-version-dev-hide', 'condition': 'model.layers[arrayIndex].layerChoice === \'file\'' },
                                { 'key': 'layers[].longField', 'htmlClass': 'av-version-dev av-version-dev-hide', 'condition': 'model.layers[arrayIndex].layerChoice === \'file\'' },
                                // hidden read only field { 'key': 'layers[].layerType', 'readonly': true },
                                { 'key': 'layers[].toggleSymbology', 'htmlClass': 'av-form-advance hidden', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriFeature\' || model.layers[arrayIndex].layerChoice === \'esriDynamic\'' },
                                { 'key': 'layers[].nameField', 'htmlClass': 'av-form-advance hidden', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriFeature\' || model.layers[arrayIndex].layerChoice === \'file\' || model.layers[arrayIndex].layerChoice === \'ogcWfs\'' },
                                { 'key': 'layers[].tooltipField', 'htmlClass': 'av-form-advance hidden', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriFeature\' || model.layers[arrayIndex].layerChoice === \'file\' || model.layers[arrayIndex].layerChoice === \'ogcWfs\'' },
                                { 'key': 'layers[].customRenderer', 'htmlClass': 'av-form-advance hidden', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriFeature\' || model.layers[arrayIndex].layerChoice === \'file\' || model.layers[arrayIndex].layerChoice === \'ogcWfs\'' },
                                { 'key': 'layers[].xyInAttribs', 'htmlClass': 'av-form-advance hidden', 'condition': 'model.layers[arrayIndex].layerChoice === \'ogcWfs\'' },
                                { 'key': 'layers[].tolerance', 'htmlClass': 'av-form-advance hidden', 'validationMessage': form => self.formService.setErrorMessage(form, '', ['viewValue', 'schema.minimum', 'schema.maximum'] ),'condition': 'model.layers[arrayIndex].layerChoice === \'esriFeature\' || model.layers[arrayIndex].layerChoice === \'file\' || model.layers[arrayIndex].layerChoice === \'esriDynamic\' || model.layers[arrayIndex].layerChoice === \'ogcWfs\'' },
                                { 'key': 'layers[].imageFormat', 'htmlClass': 'av-form-advance hidden', 'condition': `model.layers[arrayIndex].layerChoice === \'esriDynamic\'` },
                                { 'type': 'fieldset', 'htmlClass': 'av-form-advance hidden av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.layerdetail'), 'items': [
                                    { 'type': 'section', 'htmlClass': 'av-accordion-content', 'items': [
                                        { 'key': 'layers[].details', 'htmlClass': 'av-form-advance hidden' }
                                    ]}
                                ] },
                                { 'key': 'layers[].layerEntries', 'htmlClass': 'av-accordion-all av-layerEntries', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriDynamic\'', 'startEmpty': true, 'add': $translate.instant('button.add'), 'onChange': debounceService.registerDebounce(model => { initLayerEntry(model) }, constants.debInput, false), 'items': [
                                    { 'type': 'help', 'helpvalue': '<div class="av-drag-handle"></div>' },
                                    // fields with condition doesn't work inside nested array, it appears only in the first element. We will use condition on group and duplicate them
                                    { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-layerEntry', 'title': $translate.instant('form.map.layerentry'), 'items': [
                                        { 'type': 'fieldset', 'htmlClass': 'av-accordion-content', 'items': [
                                            { 'key': 'layers[].layerEntries[].index', 'htmlClass': 'av-feature-index', 'targetLink': 'legend.0', 'targetParent': 'av-accordion-toggle', 'default': $translate.instant('form.map.layerentry'), 'onChange': debounceService.registerDebounce((model, item) => {
                                                self.formService.copyValueToFormIndex(model, item);

                                                // simulate click event to set fields
                                                const btn = $(document.activeElement).closest('.av-layerEntry').find('.av-form-setfields button')[0];
                                                $timeout(() => { angular.element(btn).triggerHandler('click'); }, 0);
                                            }, constants.delayUpdateColumns, false), 'validationMessage': form => self.formService.setErrorMessage(form, '', ) },
                                            { 'key': 'layers[].layerEntries[].name' },
                                            { 'key': 'layers[].layerEntries[].outfields', 'htmlClass': 'av-form-advance hidden' },
                                            { 'key': 'layers[].layerEntries[].nameField', 'htmlClass': 'av-form-advance hidden' },
                                            { 'key': 'layers[].layerEntries[].stateOnly', 'htmlClass': 'av-form-advance hidden' },
                                            { 'type': 'fieldset', 'htmlClass': 'av-form-advance hidden av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.layerconstrols'), 'items': [
                                                { 'type': 'section', 'htmlClass': 'av-accordion-content', 'items': setControlSection('layers[].layerEntries[]', 'av-controls-bug') }
                                            ] },
                                            { 'type': 'fieldset', 'htmlClass': 'av-form-advance hidden av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.layertable'), 'items': setTableSection('layers[].layerEntries[].table', 'esriDynamic') },
                                            { 'type': 'fieldset', 'htmlClass': 'av-form-advance hidden av-accordion-toggle av-collapse av-version-dev av-version-dev-hide', 'title': $translate.instant('form.map.fieldsmetadata'), 'items': [
                                                { 'type': 'section', 'htmlClass': 'av-accordion-content', 'items': [
                                                    { 'key': 'layers[].layerEntries[].fieldMetadata', 'notitle': true, 'startEmpty': true }
                                                ] }
                                            ] }
                                        ] }
                                    ] }
                                ] },
                                { 'key': 'layers[].layerEntries', 'htmlClass': 'av-accordion-all av-layerEntries', 'condition': 'model.layers[arrayIndex].layerChoice === \'ogcWms\'', 'startEmpty': true, 'add': $translate.instant('button.add'), 'onChange': debounceService.registerDebounce(model => { initLayerEntry(model) }, constants.debInput, false), 'items': [
                                    { 'type': 'help', 'helpvalue': '<div class="av-drag-handle"></div>' },
                                    // fields with condition doesn't work inside nested array, it appears only in the first element. We will use condition on group and duplicate them
                                    { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-layerEntry', 'title': $translate.instant('form.map.layerentry'), 'items': [
                                        { 'type': 'fieldset', 'htmlClass': 'av-accordion-content', 'items': [
                                            { 'key': 'layers[].layerEntries[].id', 'targetLink': 'legend.0', 'targetParent': 'av-accordion-toggle', 'default': $translate.instant('form.map.layerentry'), 'onChange': debounceService.registerDebounce(self.formService.copyValueToFormIndex, constants.debInput, false), 'validationMessage': form => self.formService.setErrorMessage(form, '', ) },
                                            { 'key': 'layers[].layerEntries[].name' },
                                            { 'key': 'layers[].layerEntries[].allStyles' },
                                            { 'key': 'layers[].layerEntries[].currentStyle' },
                                            { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.layerconstrols'), 'items': [
                                                { 'type': 'section', 'htmlClass': 'av-accordion-content', 'items': setControlSection('layers[].layerEntries[]', 'av-controls-bug') }
                                            ] }
                                        ] }
                                    ] }
                                ] },
                                { 'key': 'layers[].singleEntryCollapse', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriDynamic\''  },
                                { 'key': 'layers[].featureInfoMimeType', 'condition': 'model.layers[arrayIndex].layerChoice === \'ogcWms\''  },
                                { 'key': 'layers[].legendMimeType', 'condition': 'model.layers[arrayIndex].layerChoice === \'ogcWms\''  },
                                { 'type': 'fieldset', 'htmlClass': 'av-form-advance hidden av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.layerconstrols'), 'items': [
                                    { 'type': 'section', 'htmlClass': 'av-accordion-content', 'items': setControlSection('layers[]') }
                                ] },
                                { 'type': 'fieldset', 'htmlClass': 'av-form-advance hidden av-accordion-toggle av-collapse', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriFeature\' || model.layers[arrayIndex].layerChoice === \'file\' || model.layers[arrayIndex].layerChoice === \'ogcWfs\'', 'title': $translate.instant('form.map.layertable'), 'items': setTableSection('layers[].table', 'esriFeature') },
                                { 'type': 'fieldset', 'htmlClass': 'av-form-advance hidden av-accordion-toggle av-collapse av-version-dev av-version-dev-hide', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriFeature\' || model.layers[arrayIndex].layerChoice === \'file\' || model.layers[arrayIndex].layerChoice === \'ogcWfs\'', 'title': $translate.instant('form.map.fieldsmetadata'), 'items': [
                                    { 'type': 'section', 'htmlClass': 'av-accordion-content', 'items': [
                                        { 'key': 'layers[].fieldMetadata', 'notitle': true, 'startEmpty': true }
                                    ] }
                                ] }
                            ] }
                        ] }
                    ] }
                ] },
                { 'title': $translate.instant('form.map.legend'), 'items': [
                    { 'type': 'template', 'template': self.formService.addCustomAccordion($translate.instant('form.custom.help'), `help/info-legend-${commonService.getLang()}.md`, true) },
                    { 'key': 'legend', 'items': [
                        {
                            'type': 'template',
                            'template': '<div class="av-legend-link" ng-click="form.link()">{{ form.name }}</div>',
                            'name': $translate.instant('form.map.goui'),
                            'link': () => commonService.clickSubTab(2, 'form.ui.general')
                        },
                        {   'key': 'legend.legendChoice',
                            'type': 'select',
                            'titleMap': [
                                { 'value': 'autopopulate', 'name': $translate.instant('form.map.legendauto') },
                                { 'value': 'structured', 'name': $translate.instant('form.map.legendstruct') }
                            ],
                            'copyValueTo': ['legend.type'],
                            'onChange': setDefaultStructureLegend
                        },
                        // hidden read only field { 'key': 'legend.type', 'readonly': true },
                        { 'type': 'fieldset', 'htmlClass': 'av-legend-structure hidden', 'title': $translate.instant('form.map.legendtext'), 'items': [
                            {
                                'key': 'legend.id',
                                'type': 'dynamic-select',
                                'optionData': 'initLayerId',
                                'model': 'legend_id',
                                'array': false,
                                'title': $translate.instant('form.map.legendidstitle'),
                                'description': $translate.instant('form.map.legendidsdesc'),
                                'onChange': (model, item) => {
                                    $scope.model.legend.root = [$scope.model.legend.root.slice(0, self.legendCursor),
                                        model,
                                        $scope.model.legend.root.slice(self.legendCursor)].join('');

                                    // if model is not null (null is because it is fire from this modification $scope.initLayerId = ['null'])
                                    // reinit the optionData to unselect previous selection
                                    if (model !== null) {
                                        const temp = $scope.initLayerId;
                                        $scope.initLayerId = ['null'];
                                        $timeout(() => { $scope.initLayerId = temp }, 500);
                                    }
                                }
                            },
                            { 'key': 'legend.root', 'notitle': true, 'htmlClass': 'av-legend-text', 'type': 'textarea', 'onChange': () => {
                                // remove the focus event
                                const textArea = $('#activeForm-legend-root');
                                textArea.off('focus');

                                // update cursor position
                                updateCursorPos(textArea[0].selectionStart);
                            }},
                            { 'type': 'template', 'template': '<span class="av-legend-cursorpos"></span>' },
                            { 'type': 'help', 'helpvalue': '<div class="av-legend-json"></div>' },
                            { 'type': 'template', 'template': commonService.addButton('form.map', 'legendtextvalidate', 'validateLegend'), 'validateLegend': () =>  validateLegend() },
                            { 'type': 'fieldset', 'title': $translate.instant('form.map.legendadd'), 'items': [
                                { 'type': 'section', 'htmlClass': 'av-legend-snippet', 'items': [
                                    { 'type': 'template', 'template': commonService.addButton('form.map', 'legendentry', 'addLegend'), 'addLegend': type => addLegendSnippet(type) },
                                    { 'type': 'template', 'template': commonService.addButton('form.map', 'legendentrygroup', 'addLegend'), 'addLegend': type => addLegendSnippet(type) },
                                    { 'type': 'template', 'template': commonService.addButton('form.map', 'legendinfo', 'addLegend'), 'addLegend': type => addLegendSnippet(type) },
                                    { 'type': 'template', 'template': commonService.addButton('form.map', 'legendunbound', 'addLegend'), 'addLegend': type => addLegendSnippet(type) },
                                    { 'type': 'template', 'template': commonService.addButton('form.map', 'legendvis', 'addLegend'), 'addLegend': type => addLegendSnippet(type) }
                                ]}
                            ]}
                        ]}
                    ]}
                ] },
                { 'title': $translate.instant('form.map.mapcomp'), 'items': [
                    { 'key': 'components', 'notitle': true, 'items': [
                        { 'key': 'components.mouseInfo', 'items': [
                            { 'key': 'components.mouseInfo.enabled', 'htmlClass': 'accordion-content' },
                            { 'type': 'help', 'helpvalue': '<h5>' + $translate.instant('form.map.spatialref') + '<h5>' },
                            { 'key': 'components.mouseInfo.spatialReference', 'type': 'section', 'htmlClass': 'av-form-advance hidden row', 'items': [
                                { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                    { 'key': 'components.mouseInfo.spatialReference.wkid', 'validationMessage': form => self.formService.setErrorMessage(form, '', ['viewValue', 'schema.minimum'] ) }
                                ] }
                                // Not use,
                                // { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                //     { 'key': 'components.mouseInfo.spatialReference.vcsWkid' }
                                // ] },
                                // { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                //     { 'key': 'components.mouseInfo.spatialReference.latestWkid' }
                                // ] },
                                // { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                //     { 'key': 'components.mouseInfo.spatialReference.latestVcsWkid' }
                                // ] },
                                // { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                //     { 'key': 'components.mouseInfo.spatialReference.wkt' }
                                // ] }
                            ] }
                        ] },
                        { 'key': 'components.northArrow', 'items': [
                            { 'key': 'components.northArrow.enabled' },
                            { 'key': 'components.northArrow.arrowIcon', 'htmlClass': 'av-form-advance hidden' },
                            { 'key': 'components.northArrow.poleIcon', 'htmlClass': 'av-form-advance hidden' }
                        ] },
                        { 'key': 'components.scaleBar' },
                        { 'key': 'components.overviewMap', 'items': [
                            { 'key': 'components.overviewMap.enabled' },
                            { 'key': 'components.overviewMap.expandFactor', 'htmlClass': 'av-form-advance hidden', 'validationMessage': form => self.formService.setErrorMessage(form, '', ['viewValue', 'schema.minimum'] ) },
                            { 'key': 'components.overviewMap.initiallyExpanded', 'htmlClass': 'av-form-advance hidden' }
                        ] },
                        { 'type': 'help', 'htmlClass': 'av-form-advance hidden', 'helpvalue': '<div class="help-block">' + $translate.instant('form.map.expcoldesc') + '<div>' },
                        { 'key': 'components.areaOfInterest', 'title': $translate.instant('form.map.areasofinterest'), 'htmlClass': 'av-accordion-all av-form-advance hidden', 'startEmpty': true,'onChange': () => {
                            // new item, create accordion
                            events.$broadcast(events.avNewItems);
                        }, 'add': $translate.instant('button.add'), 'items': [
                            { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle', 'title': $translate.instant('form.map.areaofinterest'), 'items': [
                                { 'key': 'components.areaOfInterest[]', 'htmlClass': `av-accordion-content`, 'notitle': true, 'items': [
                                    { 'key': 'components.areaOfInterest[].title', 'targetLink': 'legend.0', 'targetParent': 'av-accordion-toggle', 'default': $translate.instant('form.map.areaofinterest'), 'onChange': debounceService.registerDebounce((model, item) => {
                                        self.formService.copyValueToFormIndex(model, item);}, constants.debInput, false), 'validationMessage': form => self.formService.setErrorMessage(form, '', )
                                    },
                                    { 'type': 'template', 'template': commonService.addButton('setareaofinterest', 'setAreaOfInterest', 'av-setareaofinterest-button'), 'setAreaOfInterest': () => self.formService.setAreaOfInterest($scope.model.components.areaOfInterest) },
                                    { 'type': 'section', 'htmlClass': 'row ', 'items': [
                                        { 'key': 'components.areaOfInterest[]', 'notitle': true, 'items': [
                                            { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                                { 'key': 'components.areaOfInterest[].xmin', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) }
                                            ] },
                                            { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                                { 'key': 'components.areaOfInterest[].ymin', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) }
                                            ] },
                                            { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                                { 'key': 'components.areaOfInterest[].xmax', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) }
                                            ] },
                                            { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                                { 'key': 'components.areaOfInterest[].ymax', 'validationMessage': form => self.formService.setErrorMessage(form, '', ) }
                                            ] }
                                        ]}
                                    ] },
                                    { 'key': 'components.areaOfInterest[].thumbnailUrl' }
                                ]}
                            ] }
                        ]}
                    ]}
                ] }
            ]}
        ];
    }

    /**
     * Set controls and state section
     *
     * @function setControlSection
     * @private
     * @param {String} key key to use fo the section
     * @param {String} htmlClass HTML class to add - optional
     * @return {Object} the map control and state section
     */
    function setControlSection(key, htmlClass = '') {
        return [{ 'key': `${key}.controls`, 'htmlClass': htmlClass, 'titleMap': {
            'opacity': $translate.instant('form.map.enumopacity'),
            'visibility': $translate.instant('form.map.enumvisibility'),
            'boundingBox': $translate.instant('form.map.enumboundingBox'),
            'query': $translate.instant('form.map.enumquery'),
            'snapshot': $translate.instant('form.map.enumsnapshot'),
            'metadata': $translate.instant('form.map.enummetadata'),
            'boundaryZoom': $translate.instant('form.map.enumboundaryZoom'),
            'refresh': $translate.instant('form.map.enumrefresh'),
            'reload': $translate.instant('form.map.enumreload'),
            'remove': $translate.instant('form.map.enumremove'),
            'settings': $translate.instant('form.map.enumsettings'),
            'data': $translate.instant('form.map.enumdata'),
            'styles': $translate.instant('form.map.enumstyles')
        } },
        // We don't set this section because it is internal to the viewer { 'key': 'layers[].layerEntries[].disabledControls' },
        { 'key': `${key}.state`, 'items': [
            { 'key': `${key}.state.opacity`, 'htmlClass': 'av-opacity-input', 'validationMessage': form => self.formService.setErrorMessage(form, '', ['viewValue', 'schema.minimum', 'schema.maximum'] ) },
            { 'key': `${key}.state.visibility` },
            { 'key': `${key}.state.boundingBox` },
            { 'key': `${key}.state.query` },
            { 'key': `${key}.state.snapshot` },
            { 'key': `${key}.state.hovertips` }
        ] }]
    }

    /**
     * Set the map table section form
     *
     * @function setTableSection
     * @private
     * @param {String} model model value
     * @param {String} layerType type of layer (esriDynamic or esriFeature)
     * @return {Object} the map table section form
     */
    function setTableSection(model, layerType) {
        return [{ 'key': `${model}`, 'notitle': true, 'htmlClass': 'av-accordion-content', 'items': [
            { 'key': `${model}.title` },
            { 'key': `${model}.description` },
            { 'key': `${model}.maximize` },
            { 'key': `${model}.search` },
            { 'key': `${model}.lazyFilter` },
            { 'key': `${model}.applyMap` },
            { 'key': `${model}.showFilter`, 'htmlClass': 'av-version-dev av-version-dev-hide' },
            { 'key': `${model}.filterByExtent`, 'htmlClass': 'av-version-dev av-version-dev-hide' },
            { 'key': `${model}.searchStrictMatch`, 'htmlClass': 'av-version-dev av-version-dev-hide' },
            { 'key': `${model}.printEnabled`, 'htmlClass': 'av-version-dev av-version-dev-hide' },
            { 'type': 'fieldset', 'title': $translate.instant('form.map.layertablecols'), 'items': [
                { 'type': 'button', 'title': $translate.instant('form.map.layertablesetcol'), 'htmlClass': 'av-form-setfields', 'layerType': layerType, 'onClick': setColumns },
                { 'key': `${model}.columns`, 'htmlClass': 'av-accordion-all av-columns hidden', 'add': null, 'items': [
                    { 'type': 'help', 'helpvalue': '<div class="av-drag-handle"></div>' },
                    { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.layertablecol'), 'items': [
                        { 'type': 'section', 'htmlClass': 'av-accordion-content', 'items': [
                            { 'key': `${model}.columns[].title`, 'targetLink': 'legend.0', 'targetParent': 'av-accordion-toggle', 'default': $translate.instant('form.map.layertablecol'), 'onChange': debounceService.registerDebounce(self.formService.copyValueToFormIndex, constants.debInput, false) },
                            { 'key': `${model}.columns[].description` },
                            { 'key': `${model}.columns[].visible` },
                            { 'key': `${model}.columns[].width` },
                            { 'key': `${model}.columns[].sort` },
                            { 'key': `${model}.columns[].searchable` },
                            { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.layertablefilter'), 'items': [
                                { 'type': 'section', 'htmlClass': 'av-accordion-content', 'items': [
                                    { 'key': `${model}.columns[].filter`, 'notitle': true, 'items': [
                                        { 'key': `${model}.columns[].filter.type`, 'onChange': () => {
                                            const element = document.activeElement

                                            if (element.type !== 'button') {
                                                element.parentElement.parentElement.children[3].children[1].value = '';
                                            }
                                        } },
                                        { 'key': `${model}.columns[].filter.value`, 'validationMessage': {
                                            'selector': $translate.instant('form.map.selectorerror')
                                        },
                                        '$validators': {
                                            selector: value => {
                                                let flag = true;
                                                const element = document.activeElement

                                                const type = (element.type === 'text') ?
                                                    element.parentElement.parentElement.children[2].children[1].value :
                                                    'not text';

                                                if (type === 'string:selector') {
                                                    try {
                                                        if (value !== '') JSON.parse(value);
                                                    } catch (e) {
                                                        flag = false;
                                                    }
                                                }
                                                return flag
                                            }
                                        } },
                                        { 'key': `${model}.columns[].filter.static` }
                                    ] }
                                ] }
                            ] }
                        ] }
                    ] }
                ] }
            ]}
        ] }]
    }
}
