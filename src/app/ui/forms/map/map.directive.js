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
        self.layers = -1;

        // update schema and form
        $scope.schema = modelManager.getSchema(self.modelName);
        $scope.form = angular.copy($scope.form);
        $scope.form = setForm();

        // set dynamic values drop-down
        self.formService.updateLinkValues($scope, ['extentSets', 'id'], 'extentId');
        self.formService.updateLinkValues($scope, ['lodSets', 'id'], 'lodId');
        self.formService.updateLinkValues($scope, ['baseMaps', 'id'], 'initBaseId');
        self.formService.updateLinkValues($scope, ['tileSchemas', 'id'], 'tileId');
        self.formService.updateLinkValues($scope, ['layers', 'id'], 'initLayerId', 'avLayersIdUpdate');

        $timeout(() => setCollapsibleHeader(), constants.delayCollapseLink);

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
                    'remove': false,
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
            $scope.model.legend.root = JSON.stringify(JSON.parse($scope.model.legend.root), null, 4);
            document.getElementById('activeForm-legend-root').innerHTML = $scope.model.legend.root

            // Validate layers ID
            const idsErrors = validateLayerID($scope.model.legend.root);

            if (idsErrors !== '') {
                const e = `${$translate.instant('form.map.legenderror')} ${idsErrors}`
                throw(e);
            }
            // set class and message
            help.classList.remove('av-legend-json-error');
            help.classList.add('av-legend-json-valid');
            help.innerHTML = $translate.instant('form.map.legendtextvalid');
        } catch (e) {
            // set class
            help.classList.add('av-legend-json-error');
            help.classList.remove('av-legend-json-valid');

            // set message
            help.innerHTML = e;

            // Broadcast error if needed
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
        const regexp = /"layerId": "(\w+)\W/g;
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
                legend.root = (typeof legend.root === 'undefined') ? { "name": "root", "children": [] } :
                    (typeof legend.root === 'object') ? JSON.stringify(legend.root, null, 4) : legend.root;

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
                'hidden': 'false',
                'controlledIds': [],
                'entryIndex': 'integer - index of sublayer ESRI dynamic',
                'entryId': 'sublayer id for WMS',
                'coverIcon': '',
                'description': '',
                'symbologyStack': [{
                    'image': '',
                    'text': ''
                }],
                'symbologyRenderStyle': 'icons -- images'
            },
            'legendentrygroup': {
                'name': '',
                'expanded': true,
                'children': [],
                'controls': ['opacity', 'visibility', 'symbology', 'query', 'reload', 'remove', 'settings'],
                'disabledControls': []
            },
            'legendinfo': {
                'infoType': 'title -- image -- text',
                'content': ''
            },
            'legendunbound': {
                'infoType': 'unboundLayer',
                'layerName': '',
                'description': '',
                'symbologyStack': [{
                    'image': '',
                    'text': ''
                }],
                'symbologyRenderStyle': 'icons or images'
            },
            'legendvis': {
                'exclusiveVisibility': ['entry -- entryGroup']
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
        }

        // update layers numbers
        self.layers = layers.length -1;

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
            { 'type': 'tabs', 'tabs': [
                { 'title': $translate.instant('form.map.extentlods'), 'items': [
                    { 'type': 'template', 'template': self.formService.addCustomAccordion($translate.instant('form.custom.help'), `help/info-extentlods-${commonService.getLang()}.md`, true) },
                    { 'type': 'fieldset', 'htmlClass': 'av-form-advance hidden av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.tileschema'), 'items': [
                        { 'key': 'tileSchemas', 'htmlClass': 'av-accordion-content', 'onChange': () => self.formService.updateLinkValues($scope, ['tileSchemas', 'id'], 'tileId'), 'notitle': true, 'add': $translate.instant('button.add'), 'items': [
                            { 'type': 'fieldset', 'htmlClass': 'av-tileschema', 'items': [
                                // hidden read only field { 'key': 'tileSchemas[].id', 'readonly': true },
                                { 'key': 'tileSchemas[].name', 'onChange': debounceService.registerDebounce((model, item) => {
                                    self.formService.updateId(model, $scope, 'tileSchemas');
                                    self.formService.updateLinkValues($scope, ['tileSchemas', 'id'], 'tileId'); }, constants.debInput, false) },
                                {
                                    'key': 'tileSchemas[].extentSetId',
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
                                }
                            ] }
                        ] }
                    ] },
                    { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.extentset'), 'items': [
                        { 'type': 'section', 'htmlClass': 'av-accordion-content', 'items': [
                            { 'type': 'template', 'template': addButton('extentdefault', 'setExtent'), 'setExtent': () => self.formService.setExtent('default', $scope.model.extentSets) },
                            { 'type': 'template', 'template': addButton('extentfull', 'setExtent'), 'setExtent': () => self.formService.setExtent('full', $scope.model.extentSets) },
                            { 'type': 'template', 'template': addButton('extentmax', 'setExtent'), 'setExtent': () => self.formService.setExtent('maximum', $scope.model.extentSets) },
                            { 'key': 'extentSets', 'onChange': () => self.formService.updateLinkValues(scope, ['extentSets', 'id'], 'extentId'), 'notitle': true, 'add': $translate.instant('button.add'), 'items': [
                                { 'key': 'extentSets[].id', 'onChange': () => debounceService.registerDebounce(self.formService.updateLinkValues(scope, ['extentSets', 'id'], 'extentId'), constants.debInput, false) },
                                { 'type': 'section', 'htmlClass': 'row', 'items': [
                                    { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                        { 'key': 'extentSets[].spatialReference.wkid' }
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
                                            { 'key': 'extentSets[].default.xmin' }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].default.ymin' }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].default.xmax' }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].default.ymax' }
                                        ] }
                                    ] }
                                ] },
                                { 'type': 'section', 'htmlClass': 'row', 'items': [
                                    { 'key': 'extentSets[].full', 'items': [
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].full.xmin' }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].full.ymin' }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].full.xmax' }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].full.ymax' }
                                        ] }
                                    ] }
                                ] },
                                { 'type': 'section', 'htmlClass': 'row', 'items': [
                                    { 'key': 'extentSets[].maximum', 'items': [
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].maximum.xmin' }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].maximum.ymin' }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].maximum.xmax' }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'extentSets[].maximum.ymax' }
                                        ] }
                                    ] }
                                ] }
                            ] }
                        ]}
                    ] },
                    { 'type': 'fieldset', 'htmlClass': 'av-form-advance hidden av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.lodset'), 'items': [
                        { 'key': 'lodSets', 'htmlClass': 'av-accordion-content', 'onChange': () => self.formService.updateLinkValues($scope, ['lodSets', 'id'], 'lodId'), 'notitle': true, 'add': $translate.instant('button.add'), 'items': [
                            { 'key': 'lodSets[]', 'htmlClass': `av-lods-array`, 'items': [
                                { 'key': 'lodSets[].id', 'onChange': () => debounceService.registerDebounce(self.formService.updateLinkValues($scope, ['lodSets', 'id'], 'lodId'), constants.debInput, false) },
                                { 'type': 'template', 'template': addButton('setlods', 'setLods'), 'setLods': () => self.formService.setLods($scope.model.lodSets, self.formService.getActiveElemIndex('av-lods-array')) },
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
                    { 'key': 'baseMaps', 'htmlClass': 'av-accordion-all av-baseMaps av-sortable', 'startEmpty': true, 'onChange': () => { self.formService.updateLinkValues($scope, ['baseMaps', 'id'], 'initBaseId'); events.$broadcast(events.avNewItems); }, 'add': $translate.instant('button.add'), 'items': [
                        { 'type': 'help', 'helpvalue': '<div class="av-drag-handle"></div>' },
                        { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-baseMap', 'title': $translate.instant('form.map.basemap'), 'items': [
                            { 'key': 'baseMaps[]', 'htmlClass': 'av-accordion-content', 'notitle': true, 'items': [
                                // hidden read only field { 'key': 'baseMaps[].id', 'readonly': true },
                                { 'key': 'baseMaps[].name', 'targetLink': 'legend.0', 'targetParent': 'av-accordion-toggle', 'default': $translate.instant('form.map.basemap'), 'onChange': debounceService.registerDebounce((model, item) => {
                                    self.formService.copyValueToFormIndex(model, item);
                                    self.formService.updateId(model, $scope, 'baseMaps');
                                    self.formService.updateLinkValues($scope, ['baseMaps', 'id'], 'initBaseId'); }, constants.debInput, false) },
                                { 'key': 'baseMaps[].description' },
                                { 'key': 'baseMaps[].typeSummary', 'htmlClass': 'av-form-advance hidden' },
                                { 'key': 'baseMaps[].altText' },
                                { 'key': 'baseMaps[].thumbnailUrl', 'htmlClass': 'av-form-advance hidden' },
                                {
                                    'key': 'baseMaps[].tileSchemaId',
                                    'type': 'dynamic-select',
                                    'optionData': 'tileId',
                                    'model': 'tileSchemaId',
                                    'array': true
                                },
                                { 'key': 'baseMaps[].layers', 'add': $translate.instant('button.add'), 'onChange': (model, form) => {
                                    if (model[model.length - 1].id === '') { model[model.length - 1].id = commonService.getUUID(); } }, 'items': [
                                    { 'key': 'baseMaps[].layers[].id', 'htmlClass': 'av-form-advance hidden' },
                                    { 'key': 'baseMaps[].layers[].layerType', 'htmlClass': 'av-form-advance hidden' },
                                    { 'key': 'baseMaps[].layers[].url' }
                                ] },
                                { 'type': 'fieldset', 'htmlClass': 'av-form-advance hidden av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.basemapattrib'), 'items': [
                                    { 'key': 'baseMaps[].attribution', 'htmlClass': 'av-accordion-content', 'notitle': true, 'items': [
                                        { 'key': 'baseMaps[].attribution.text' },
                                        { 'key': 'baseMaps[].attribution.logo' }
                                    ] }
                                ] }
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
                                { 'key': 'layers[].layerChoice', 'type': 'select', 'targetElement': ['layers', 'layerType'], 'targetParent': 'av-accordion-content', 'onChange': (model, item) => self.formService.copyValueToModelIndex(model, item, $scope.model) },
                                { 'key': 'layers[].id', 'readonly': true },
                                { 'key': 'layers[].name', 'targetLink': 'legend.0', 'targetParent': 'av-accordion-toggle', 'default': $translate.instant('form.map.layer'), 'onChange': debounceService.registerDebounce((model, item) => {
                                    self.formService.copyValueToFormIndex(model, item);
                                    self.formService.updateId(model, $scope, 'layers');
                                    self.formService.updateLinkValues($scope, ['layers', 'id'], 'initLayerId', 'avLayersIdUpdate'); }, constants.debInput, false) },
                                { 'key': 'layers[].url', 'onChange': debounceService.registerDebounce(model => {
                                    // check if it is a feature layer. If so, set fields. For dynamic we set when index change
                                    if (!isNaN(parseInt(model.substring(model.lastIndexOf('/') + 1, model.length)))) {
                                        // simulate click event to set fields
                                        const btn = $(document.activeElement).closest('.av-layer').find('.av-form-setfields button')[0];
                                        $timeout(() => { angular.element(btn).triggerHandler('click'); }, 0);
                                    }
                                }, constants.delayUpdateColumns, false) },
                                { 'key': 'layers[].metadataUrl', 'htmlClass': 'av-form-advance hidden' },
                                { 'key': 'layers[].catalogueUrl', 'htmlClass': 'av-form-advance hidden' },
                                // hidden read only field { 'key': 'layers[].layerType', 'readonly': true },
                                { 'key': 'layers[].toggleSymbology', 'htmlClass': 'av-form-advance hidden', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriFeature\' || model.layers[arrayIndex].layerChoice === \'esriDynamic\'' },
                                { 'key': 'layers[].tolerance', 'htmlClass': 'av-form-advance hidden', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriFeature\' || model.layers[arrayIndex].layerChoice === \'esriDynamic\'' },
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
                                            }, constants.delayUpdateColumns, false) },
                                            { 'key': 'layers[].layerEntries[].name' },
                                            { 'key': 'layers[].layerEntries[].outfields', 'htmlClass': 'av-form-advance hidden' },
                                            { 'key': 'layers[].layerEntries[].stateOnly', 'htmlClass': 'av-form-advance hidden' },
                                            { 'type': 'fieldset', 'htmlClass': 'av-form-advance hidden av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.layerconstrols'), 'items': [
                                                { 'type': 'section', 'htmlClass': 'av-accordion-content', 'items': [
                                                    { 'key': 'layers[].layerEntries[].controls', 'htmlClass': 'av-controls-bug' },
                                                    // We don't set this section because it is internal to the viewer { 'key': 'layers[].layerEntries[].disabledControls' },
                                                    { 'key': 'layers[].layerEntries[].state' }
                                                ] }
                                            ] },
                                            { 'type': 'fieldset', 'htmlClass': 'av-form-advance hidden av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.layertable'), 'items': setTableSection('layers[].layerEntries[].table', 'esriDynamic') }
                                        ] }
                                    ] }
                                ] },
                                { 'key': 'layers[].layerEntries', 'htmlClass': 'av-accordion-all av-layerEntries', 'condition': 'model.layers[arrayIndex].layerChoice === \'ogcWms\'', 'startEmpty': true, 'add': $translate.instant('button.add'), 'onChange': debounceService.registerDebounce(model => { initLayerEntry(model) }, constants.debInput, false), 'items': [
                                    { 'type': 'help', 'helpvalue': '<div class="av-drag-handle"></div>' },
                                    // fields with condition doesn't work inside nested array, it appears only in the first element. We will use condition on group and duplicate them
                                    { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-layerEntry', 'title': $translate.instant('form.map.layerentry'), 'items': [
                                        { 'type': 'fieldset', 'htmlClass': 'av-accordion-content', 'items': [
                                            { 'key': 'layers[].layerEntries[].id', 'targetLink': 'legend.0', 'targetParent': 'av-accordion-toggle', 'default': $translate.instant('form.map.layerentry'), 'onChange': debounceService.registerDebounce(self.formService.copyValueToFormIndex, constants.debInput, false) },
                                            { 'key': 'layers[].layerEntries[].name' },
                                            { 'key': 'layers[].layerEntries[].allStyles' },
                                            { 'key': 'layers[].layerEntries[].currentStyle' },
                                            { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.layerconstrols'), 'items': [
                                                { 'type': 'section', 'htmlClass': 'av-accordion-content', 'items': [
                                                    { 'key': 'layers[].layerEntries[].controls', 'htmlClass': 'av-controls-bug' },
                                                    // We don't set this section because it is internal to the viewer { 'key': 'layers[].layerEntries[].disabledControls' },
                                                    { 'key': 'layers[].layerEntries[].state' }
                                                ] }
                                            ] }
                                        ] }
                                    ] }
                                ] },
                                { 'key': 'layers[].singleEntryCollapse', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriDynamic\''  },
                                { 'key': 'layers[].featureInfoMimeType', 'condition': 'model.layers[arrayIndex].layerChoice === \'ogcWms\''  },
                                { 'key': 'layers[].legendMimeType', 'condition': 'model.layers[arrayIndex].layerChoice === \'ogcWms\''  },
                                { 'type': 'fieldset', 'htmlClass': 'av-form-advance hidden av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.layerconstrols'), 'items': [
                                    { 'type': 'section', 'htmlClass': 'av-accordion-content', 'items': [
                                        { 'key': 'layers[].controls' },
                                        // We don't set this section because it is internal to the viewer { 'key': 'layers[].disabledControls' },
                                        { 'key': 'layers[].state' }
                                    ] }
                                ] },
                                { 'type': 'fieldset', 'htmlClass': 'av-form-advance hidden av-accordion-toggle av-collapse', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriFeature\'', 'title': $translate.instant('form.map.layertable'), 'items': setTableSection('layers[].table', 'esriFeature') }
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
                            { 'type': 'template', 'template': addButton('legendtextvalidate', 'validateLegend'), 'validateLegend': () =>  validateLegend() },
                            { 'type': 'fieldset', 'title': $translate.instant('form.map.legendadd'), 'items': [
                                { 'type': 'section', 'htmlClass': 'av-legend-snippet', 'items': [
                                    { 'type': 'template', 'template': addButton('legendentry', 'addLegend'), 'addLegend': type => addLegendSnippet(type) },
                                    { 'type': 'template', 'template': addButton('legendentrygroup', 'addLegend'), 'addLegend': type => addLegendSnippet(type) },
                                    { 'type': 'template', 'template': addButton('legendinfo', 'addLegend'), 'addLegend': type => addLegendSnippet(type) },
                                    { 'type': 'template', 'template': addButton('legendunbound', 'addLegend'), 'addLegend': type => addLegendSnippet(type) },
                                    { 'type': 'template', 'template': addButton('legendvis', 'addLegend'), 'addLegend': type => addLegendSnippet(type) }
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
                                    { 'key': 'components.mouseInfo.spatialReference.wkid' }
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
                        { 'key': 'components.northArrow' },
                        { 'key': 'components.scaleBar' },
                        { 'key': 'components.overviewMap', 'items': [
                            { 'key': 'components.overviewMap.enabled' },
                            { 'key': 'components.overviewMap.expandFactor', 'htmlClass': 'av-form-advance hidden' },
                            { 'key': 'components.overviewMap.initiallyExpanded', 'htmlClass': 'av-form-advance hidden' }
                        ] }
                    ]}
                ] }
            ] }
        ];
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
            { 'key': `${model}.applyMap` },
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
                                    { 'key': `${model}.columns[].filter`, 'notitle': true }
                                ] }
                            ] }
                        ] }
                    ] }
                ] }
            ]}
        ] }]
    }

    /**
     * Add a button for legend section
     *
     * @function addLegendSection
     * @private
     * @param {String} type type of button to add
     * @param {String} func function to associate to ng-click
     * @returns {String} the template for the button
     */
    function addButton(type, func) {
        return `<md-button class="av-button-square md-raised"
                        ng-click="form.${func}('${type}')">
                    {{ 'form.map.${type}' | translate }}
                    <md-tooltip>{{ 'form.map.${type}' | translate }}</md-tooltip>
                </md-button>`;
    }
}
