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

function Controller($scope, $translate, $timeout,
    events, modelManager, formService, debounceService, constants, layerService) {
    'ngInject';
    const self = this;
    self.modelName = 'map';
    self.sectionName = $translate.instant('app.section.map');
    self.formService = formService;

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

    function init() {
        $scope.schema = modelManager.getSchema(self.modelName);

        $scope.form = angular.copy($scope.form);
        $scope.form = setForm();

        // set dynamic values drop-down
        self.formService.updateLinkValues($scope, ['extentSets', 'id'], 'extentId');
        self.formService.updateLinkValues($scope, ['lodSets', 'id'], 'lodId');
        self.formService.updateLinkValues($scope, ['baseMaps', 'id'], 'initBaseId');
        self.formService.updateLinkValues($scope, ['tileSchemas', 'id'], 'tileId');

        $timeout(() => setCollapsibleHeader(), constants.delayCollapseLink);
    }

    events.$on(events.avValidateForm, () => {
        $scope.$broadcast('schemaFormValidate');
        modelManager.validateModel(self.modelName, $scope.activeForm, $scope);
    });

    function setCollapsibleHeader() {
        // set collapsible element from model value when first load
        const itemBasemap = { 'link': 'av-baseMaps.legend.0', 'model': 'baseMaps.name' };
        const itemLayer = { 'link': 'av-layers.legend.0', 'model': 'layers.name' };
        $timeout(() => {
            for (let base of $scope.model.baseMaps) {
                self.formService.copyValueToFormIndex($scope.model, itemBasemap, base.name);
            }
            if (typeof $scope.model.layers !== 'undefined') {
                for (let layer of $scope.model.layers) {
                    self.formService.copyValueToFormIndex($scope.model, itemLayer, layer.name);
                }
            }
        }, 3000);
    }

    function copyValueToForm(model, item) {
        // change the $scope.form on the fly. May not work with specific index because it will change all of them at the same time
        // need 'link': 'basemapName-title' on element with onChange (linkTo value - the attribute to modify)
        // 'linkTo': 'basemapName' on element to modify
        self.formService.copyValueToForm($scope.form[0], model, item);
    }

    function copyValueToFormIndex(model, item) {
        // need 'link': 'av-layers.legend.0', the class to get element then the type of tag inside and the array index for children
        // 'model': 'layers.layer.name', the model path. We can't use key because it does't reflect the real path
        // 'default': a default value for the tag when model value is empty
        self.formService.copyValueToFormIndex($scope.model, item, model);
    }

    function copyValueToModelIndex(model, item) {
        // need 'link': 'layers[$index].layer.layerType', the model element to update with [$index] to specify when it is the array
        // 'model': 'layers.layerChoice'. We can't use key because it does't reflect the real path
        self.formService.copyValueToModelIndex($scope.model, item, model);
    }

    function setColumns(event, item) {
        // get the element for dynamic and feature layer
        const elementDyn = event.currentTarget.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        const elementFeat = event.currentTarget.parentElement.parentElement.parentElement.parentElement;

        // get the index of current layer to get the model and the layerEntry index to get the feature class
        const indexLayer = (item.layerType === 'esriFeature') ?
            elementFeat.getAttribute('sf-index') : elementDyn.getAttribute('sf-index');
        const featClass = (item.layerType === 'esriFeature') ?
            -1 : elementFeat.parentElement.childNodes[5].children[1].value;

        // get model for specific layer
        let model = $scope.model.layers[indexLayer];

        // send the model to generate the config to query the layer
        layerService.getLayer(model, featClass).then(data => {

            // if it is a dynamic layer, use the index of the layer entry
            model = (item.layerType === 'esriFeature') ? model : model.layerEntries[elementFeat.getAttribute('sf-index')];

            // make sure table exist on layer object
            if (typeof model.table === 'undefined') { model.table = { }; }

            // set the columns from the layer field
            model.table.columns = data.fields.map(field => {
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
            model.table.columns.map((field, index) => {
                if (field.data === 'SHAPE') { model.table.columns.splice(index, 1) }
            });

            // broadcast event to generate accordion
            events.$broadcast(events.avNewItems);
        });
    }

    function setForm() {
        const scope = $scope;

        return [
            { 'type': 'tabs', 'tabs': [
                { 'title': $translate.instant('form.map.extentlods'), 'items': [
                    { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.tileschema'), 'items': [
                        { 'key': 'tileSchemas', 'htmlClass': 'av-accordion-content', 'onChange': () => { self.formService.updateLinkValues($scope, ['tileSchemas', 'id'], 'tileId'); }, 'notitle': true, 'add': $translate.instant('button.add'), 'items': [
                            { 'key': 'tileSchemas[].id', 'onChange': () => { debounceService.registerDebounce(self.formService.updateLinkValues($scope, ['tileSchemas', 'id'], 'tileId'), constants.debInput, false); } },
                            { 'key': 'tileSchemas[].name' },
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
                    ] },
                    { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.extentset'), 'items': [
                        { 'key': 'extentSets', 'htmlClass': 'av-accordion-content', 'onChange': () => { self.formService.updateLinkValues(scope, ['extentSets', 'id'], 'extentId'); }, 'notitle': true, 'add': $translate.instant('button.add'), 'items': [
                            { 'key': 'extentSets[].id', 'onChange': () => { debounceService.registerDebounce(self.formService.updateLinkValues(scope, ['extentSets', 'id'], 'extentId'), constants.debInput, false); }  },
                            { 'type': 'section', 'htmlClass': 'row', 'items': [
                                { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                    { 'key': 'extentSets[].spatialReference.wkid' }
                                ] },
                                { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                    { 'key': 'extentSets[].spatialReference.vcsWkid' }
                                ] },
                                { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                    { 'key': 'extentSets[].spatialReference.latestWkid' }
                                ] },
                                { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                    { 'key': 'extentSets[].spatialReference.latestVcsWkid' }
                                ] },
                                { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                    { 'key': 'extentSets[].spatialReference.wkt' }
                                ] }
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
                    ] },
                    { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.lodset'), 'items': [
                        { 'key': 'lodSets', 'htmlClass': 'av-accordion-content', 'onChange': () => { self.formService.updateLinkValues($scope, ['lodSets', 'id'], 'lodId'); },'notitle': true, 'add': $translate.instant('button.add'), 'items': [
                            { 'key': 'lodSets[].id', 'onChange': () => { debounceService.registerDebounce(self.formService.updateLinkValues($scope, ['lodSets', 'id'], 'lodId'), constants.debInput, false); } },
                            { 'type': 'fieldset', 'htmlClass': 'row', 'items': [
                                { 'key': 'lodSets[].lods', "add": $translate.instant('button.add'), 'items': [
                                    { 'type': 'section', 'htmlClass': 'row', 'items': [
                                        { 'key': 'lodSets[].lods[].level', 'htmlClass': 'col-xs-2 av-check-left' },
                                        { 'key': 'lodSets[].lods[].resolution', 'htmlClass': 'col-xs-2 av-check-left' },
                                        { 'key': 'lodSets[].lods[].scale', 'htmlClass': 'col-xs-2 av-check-left' }
                                    ] }
                                ] }
                            ] }
                        ] }
                    ] }
                ] },
                { 'title': $translate.instant('form.map.mapcomp'), 'items': [
                    { 'key': 'components', 'notitle': true, 'items': [
                        { 'key': 'components.mouseInfo', 'items': [
                            { 'key': 'components.mouseInfo.enabled', 'htmlClass': 'accordion-content' },
                            { 'type': 'section', 'htmlClass': 'row', 'items': [
                                { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                    { 'key': 'components.mouseInfo.spatialReference.wkid' }
                                ] },
                                { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                    { 'key': 'components.mouseInfo.spatialReference.vcsWkid' }
                                ] },
                                { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                    { 'key': 'components.mouseInfo.spatialReference.latestWkid' }
                                ] },
                                { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                    { 'key': 'components.mouseInfo.spatialReference.latestVcsWkid' }
                                ] },
                                { 'type': 'section', 'htmlClass': 'col-xs-2', 'items': [
                                    { 'key': 'components.mouseInfo.spatialReference.wkt' }
                                ] }
                            ] }
                        ] },
                        { 'key': 'components.northArrow' },
                        { 'key': 'components.scaleBar' },
                        { 'key': 'components.overviewMap' }
                    ]}
                ] },
                { 'title': $translate.instant('form.map.basemaps'), 'items': [
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
                    { 'key': 'baseMaps', 'startEmpty': true, 'onChange': () => { self.formService.updateLinkValues($scope, ['baseMaps', 'id'], 'initBaseId'); events.$broadcast(events.avNewItems); }, 'add': $translate.instant('button.add'), 'items': [
                        { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-baseMaps', 'title': $translate.instant('form.map.basemap'), 'items': [
                            { 'key': 'baseMaps[]', 'htmlClass': 'av-accordion-content', 'notitle': true, 'items': [
                                { 'key': 'baseMaps[].id', 'onChange': () => { debounceService.registerDebounce(self.formService.updateLinkValues($scope, ['baseMaps', 'id'], 'initBaseId'), constants.debInput, false); } },
                                { 'key': 'baseMaps[].name', 'link': 'av-baseMaps.legend.0', 'model': 'baseMaps.name', 'default': $translate.instant('form.map.basemap'), 'onChange': debounceService.registerDebounce(copyValueToFormIndex, constants.debInput, false) },
                                { 'key': 'baseMaps[].description' },
                                { 'key': 'baseMaps[].typeSummary' },
                                { 'key': 'baseMaps[].altText' },
                                { 'key': 'baseMaps[].thumbnailUrl' },
                                {
                                    'key': 'baseMaps[].tileSchemaId',
                                    'type': 'dynamic-select',
                                    'optionData': 'tileId',
                                    'model': 'tileSchemaId',
                                    'array': true
                                },
                                { 'key': 'baseMaps[].layers' },
                                { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.basemapattrib'), 'items': [
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
                    { 'key': 'layers', 'startEmpty': true, 'onChange': () => { events.$broadcast(events.avNewItems) }, 'add': $translate.instant('button.add'), 'items': [
                        { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-layers', 'title': $translate.instant('form.map.layer'), 'items': [
                            { 'key': 'layers[]', 'htmlClass': 'av-accordion-content', 'notitle': true, 'items': [
                                { 'key': 'layers[].layerChoice', 'type': 'select', 'link': 'layers[$index].layerType', 'model': 'layers.layerChoice', 'onChange': copyValueToModelIndex },
                                { 'key': 'layers[].id' },
                                { 'key': 'layers[].name', 'link': 'av-layers.legend.0', 'model': 'layers.name', 'default': $translate.instant('form.map.layer'), 'onChange': debounceService.registerDebounce(copyValueToFormIndex, constants.debInput, false) },
                                { 'key': 'layers[].url' },
                                { 'key': 'layers[].metadataUrl' },
                                { 'key': 'layers[].catalogUrl' },
                                { 'key': 'layers[].layerType', 'readonly': true },
                                { 'key': 'layers[].toggleSymbology', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriFeature\' || model.layers[arrayIndex].layerChoice === \'esriDynamic\'' },
                                { 'key': 'layers[].tolerance', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriFeature\' || model.layers[arrayIndex].layerChoice === \'esriDynamic\'' },
                                { 'key': 'layers[].layerEntries', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriDynamic\'', 'startEmpty': true, 'items': [
                                    // fields with condition doesn't work inside nested array, it appears only in the first element. We will use condition on group and duplicate them
                                    { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-layersentries', 'title': $translate.instant('form.map.layerentry'), 'items': [
                                        { 'type': 'fieldset', 'htmlClass': 'av-accordion-content', 'items': [
                                            { 'key': 'layers[].layerEntries[].index' },
                                            { 'key': 'layers[].layerEntries[].name' },
                                            { 'key': 'layers[].layerEntries[].outfields' },
                                            { 'key': 'layers[].layerEntries[].stateOnly' },
                                            { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.layerconstrols'), 'items': [
                                                { 'type': 'section', 'htmlClass': 'av-accordion-content', 'items': [
                                                    { 'key': 'layers[].layerEntries[].controls' },
                                                    { 'key': 'layers[].layerEntries[].disabledControls' },
                                                    { 'key': 'layers[].layerEntries[].state' }
                                                ] }
                                            ] },
                                            { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.layertable'), 'items': setTableSection('layers[].layerEntries[].table', 'esriDynamic') }
                                        ] }
                                    ] }
                                ] },
                                { 'key': 'layers[].layerEntries', 'condition': 'model.layers[arrayIndex].layerChoice === \'ogcWms\'', 'startEmpty': true, 'items': [
                                    // fields with condition doesn't work inside nested array, it appears only in the first element. We will use condition on group and duplicate them
                                    { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-layersentries', 'title': $translate.instant('form.map.layerentry'), 'items': [
                                        { 'type': 'fieldset', 'htmlClass': 'av-accordion-content', 'items': [
                                            { 'key': 'layers[].layerEntries[].id' },
                                            { 'key': 'layers[].layerEntries[].name' },
                                            { 'key': 'layers[].layerEntries[].allStyles' },
                                            { 'key': 'layers[].layerEntries[].currentStyle' },
                                            { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.layerconstrols'), 'items': [
                                                { 'type': 'section', 'htmlClass': 'av-accordion-content', 'items': [
                                                    { 'key': 'layers[].layerEntries[].controls' },
                                                    { 'key': 'layers[].layerEntries[].disabledControls' },
                                                    { 'key': 'layers[].layerEntries[].state' }
                                                ] }
                                            ] }
                                        ] }
                                    ] }
                                ] },
                                { 'key': 'layers[].singleEntryCollapse', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriDynamic\''  },
                                { 'key': 'layers[].featureInfoMimeType', 'condition': 'model.layers[arrayIndex].layerChoice === \'ogcWms\''  },
                                { 'key': 'layers[].legendMimeType', 'condition': 'model.layers[arrayIndex].layerChoice === \'ogcWms\''  },
                                { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-collapse', 'title': $translate.instant('form.map.layerconstrols'), 'items': [
                                    { 'type': 'section', 'htmlClass': 'av-accordion-content', 'items': [
                                        { 'key': 'layers[].controls' },
                                        { 'key': 'layers[].disabledControls' },
                                        { 'key': 'layers[].state' }
                                    ] }
                                ] },
                                { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-collapse', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriFeature\'', 'title': $translate.instant('form.map.layertable'), 'items': setTableSection('layers[].table', 'esriFeature') }
                            ] }
                        ] }
                    ] }
                ] },
                { 'title': $translate.instant('form.map.legend'), 'items': [
                    { 'key': 'legend', 'items': [
                        {   'key': 'legend.legendChoice',
                            'type': 'select',
                            'titleMap': [
                                { 'value': "autopopulate", 'name': $translate.instant('form.map.legendauto') },
                                { 'value': "structured", 'name': $translate.instant('form.map.legendstruct') }
                            ],
                            'copyValueTo': ['legend.type']
                        },
                        {   'key': 'legend.type', 'readonly': true }
                    ]}
                ] }
            ] }
        ];
    }

    function setTableSection(model, layerType) {
        return [{ 'key': `${model}`, 'notitle': true, 'htmlClass': 'av-accordion-content', 'items': [
            { 'key': `${model}.title` },
            { 'key': `${model}.description` },
            { 'key': `${model}.maximize` },
            { 'key': `${model}.search` },
            { 'key': `${model}.applyMap` },
            { 'type': 'fieldset', 'title': $translate.instant('form.map.layertablecols'), 'items': [
                { 'type': 'button', 'title': $translate.instant('form.map.layertablesetcol'), 'layerType': layerType, 'onClick': setColumns },
                { 'key': `${model}.columns`, 'add': null, 'remove': null, 'notitle': true, 'startEmpty': true, 'items': [
                    { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-columns', 'title': $translate.instant('form.map.layertablecol'), 'items': [
                        { 'type': 'section', 'htmlClass': 'av-accordion-content', 'items': [
                            { 'key': `${model}.columns[].remove` },
                            { 'key': `${model}.columns[].title` },
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
            ] }
        ] }]
    }
}
