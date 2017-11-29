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

function Controller($scope, $translate, $timeout, events, modelManager, formService, debounceService, constants) {
    'ngInject';
    const self = this;
    self.modelName = 'map';
    self.sectionName = $translate.instant('app.section.map');
    self.formService = formService;

    // when schema is loaded or create new config is hit, initialize the schema, form and model
    events.$on(events.avSchemaUpdate, () => init());

    // when user load a config file, set form and model
    events.$on(events.avLoadModel, () => {
        setCollapsibleHeader();

        modelManager.updateModel($scope, self.modelName)
    });

    // when user change language, reset schema and form
    events.$on(events.avSwitchLanguage, () => {
        self.sectionName = $translate.instant('app.section.map');
        $scope.schema = modelManager.getSchema(self.modelName);

        $scope.form = angular.copy($scope.form);
        $scope.form = setForm();
    });

    function init() {
        $scope.model = modelManager.getModel(self.modelName);
        $scope.schema = modelManager.getSchema(self.modelName);

        $scope.form = angular.copy($scope.form);
        $scope.form = setForm();

        // set dynamic values drop-down
        self.formService.updateLinkValues($scope, ['extentSets', 'id'], 'extentId');
        self.formService.updateLinkValues($scope, ['lodSets', 'id'], 'lodId');
        self.formService.updateLinkValues($scope, ['baseMaps', 'id'], 'initBaseId');
        self.formService.updateLinkValues($scope, ['tileSchemas', 'id'], 'tileId');

        setCollapsibleHeader();
    }

    events.$on(events.avValidateForm, () => {
        $scope.$broadcast('schemaFormValidate');
        modelManager.validateModel(self.modelName, $scope.activeForm, $scope);
    });

    function setCollapsibleHeader() {
        // set collapsible element from model value when first load
        const itemBasemap = { 'link': 'av-baseMaps.legend.0', 'model': 'baseMaps.name' };
        const itemLayer = { 'link': 'av-layers.legend.0', 'model': 'layers.layer.name' };
        $timeout(() => {
            for (let base of $scope.model.baseMaps) {
                self.formService.copyValueToFormIndex($scope.model, itemBasemap, base.name);
            }
            if (typeof $scope.model.layers !== 'undefined') {
                for (let layer of $scope.model.layers) {
                    self.formService.copyValueToFormIndex($scope.model, itemLayer, layer.layer.name);
                }
            }
        }, 2000);
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

    function setForm() {
        const scope = $scope;

        return [
            { 'type': 'tabs', 'tabs': [
                { 'title': $translate.instant('form.map.extentlods'), 'items': [
                    { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle', 'title': $translate.instant('form.map.tileschema'), 'items': [
                        { 'key': 'tileSchemas', 'htmlClass': 'av-accordion-content', 'onChange': () => { self.formService.updateLinkValues($scope, ['tileSchemas', 'id'], 'tileId'); }, 'notitle': true, 'add': $translate.instant('button.add'), 'items': [
                            { 'key': 'tileSchemas[].id', 'onChange': () => { debounceService.registerDebounce(self.formService.updateLinkValues($scope, ['tileSchemas', 'id'], 'tileId'), constants.debInput, false); } },
                            { 'key': 'tileSchemas[].name' },
                            {
                                'key': 'tileSchemas[].extentSetId',
                                'type': 'dynamic-select',
                                'optionData': 'extentId',
                                'model': 'extentSetId'
                            }, {
                                'key': 'tileSchemas[].lodSetId',
                                'type': 'dynamic-select',
                                'optionData': 'lodId',
                                'model': 'lodSetId'
                            }
                        ] }
                    ] },
                    { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle', 'title': $translate.instant('form.map.extentset'), 'items': [
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
                    { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle', 'title': $translate.instant('form.map.lodset'), 'items': [
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
                            'notitle': true
                        }
                    ] },
                    { 'key': 'baseMaps', 'onChange': () => { self.formService.updateLinkValues($scope, ['baseMaps', 'id'], 'initBaseId'); self.formService.addToggleArraySection(); }, 'startEmpty': true, 'add': $translate.instant('button.add'), 'items': [
                        { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-baseMaps', 'linkTo': 'basemapName', 'title': $translate.instant('form.map.basemap'), 'items': [
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
                                    'model': 'tileSchemaId'
                                },
                                { 'key': 'baseMaps[].layers' },
                                { 'key': 'baseMaps[].attribution' }
                            ] }
                        ] }
                    ] }
                ] },
                { 'title': $translate.instant('form.map.layers'), 'items': [
                    { 'key': 'layers', 'startEmpty': true, 'onChange': self.formService.addToggleArraySection, 'add': $translate.instant('button.add'), 'items': [
                        { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle av-layers', 'title': $translate.instant('form.map.layer'), 'items': [
                            { 'key': 'layers[].layer', 'htmlClass': 'av-accordion-content', 'notitle': true, 'items': [
                                { 'key': 'layers[].layerChoice', 'type': 'select', 'link': 'layers[$index].layer.layerType', 'model': 'layers.layerChoice', 'onChange': copyValueToModelIndex },
                                { 'key': 'layers[].layer.id' },
                                { 'key': 'layers[].layer.name', 'link': 'av-layers.legend.0', 'model': 'layers.layer.name', 'default': $translate.instant('form.map.layer'), 'onChange': debounceService.registerDebounce(copyValueToFormIndex, constants.debInput, false) },
                                { 'key': 'layers[].layer.url' },
                                { 'key': 'layers[].layer.metadataUrl' },
                                { 'key': 'layers[].layer.catalogUrl' },
                                { 'key': 'layers[].layer.layerType', 'readonly': true },
                                { 'key': 'layers[].layer.toggleSymbology', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriFeature\' || model.layers[arrayIndex].layerChoice === \'esriDynamic\'' },
                                { 'key': 'layers[].layer.tolerance', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriFeature\' || model.layers[arrayIndex].layerChoice === \'esriDynamic\'' },
                                { 'key': 'layers[].layer.singleEntryCollapse', 'condition': 'model.layers[arrayIndex].layerChoice === \'esriDynamic\''  },
                                { 'key': 'layers[].layer.featureInfoMimeType', 'condition': 'model.layers[arrayIndex].layerChoice === \'ogcWms\''  },
                                { 'key': 'layers[].layer.legendMimeType', 'condition': 'model.layers[arrayIndex].layerChoice === \'ogcWms\''  }
                            ]}
                        ] }
                    ] }
                ] },
                { 'title': $translate.instant('form.map.legend'), 'items': [

                ] }
            ] }
        ];
    }
}
