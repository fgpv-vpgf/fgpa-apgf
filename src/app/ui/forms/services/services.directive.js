const templateUrl = require('../form.html');

/**
 * @module avServices
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avServices` directive for the services form
 *
 */
angular
    .module('app.ui')
    .directive('avServices', avServices);

/**
 * `avServices` directive body.
 *
 * @function avServices
 * @return {object} directive body
 */
function avServices() {
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

function Controller($scope, $translate, events, modelManager, stateManager, formService) {
    'ngInject';
    const self = this;
    self.modelName = 'services';
    self.sectionName = $translate.instant('app.section.services');
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
        self.sectionName = $translate.instant('app.section.services');
        init();
    });

    function init() {
        $scope.schema = modelManager.getSchema(self.modelName);

        $scope.form = angular.copy($scope.form);
        $scope.form = setForm();
    }

    events.$on(events.avValidateForm, () => {
        $scope.$broadcast('schemaFormValidate');
        stateManager.validateModel(self.modelName, $scope.activeForm, $scope.form[0].tabs, $scope.model);
    });

    function setForm() {
        return [
            { 'type': 'tabs', 'tabs': [
                { 'title': $translate.instant('form.service.urls'), 'items': [
                    { 'key': 'proxyUrl', 'htmlClass': 'av-form-advance hidden', 'readonly': true },
                    { 'key': 'exportMapUrl', 'htmlClass': 'av-form-advance hidden', 'readonly': true },
                    { 'key': 'geometryUrl', 'htmlClass': 'av-form-advance hidden', 'readonly': true },
                    { 'key': 'googleAPIKey', 'htmlClass': 'av-form-advance hidden', 'readonly': true },
                    { 'key': 'geolocation', 'htmlClass': 'av-form-advance hidden', 'readonly': true },
                    { 'key': 'coordInfo' },
                    { 'key': 'print' }
                ]},
                { 'title': $translate.instant('form.service.geosearch'),
                    'key': 'search', 'items': [
                        { 'key': 'search.serviceUrls', 'readonly': true },
                        { 'key': 'search.disabledSearches', 'titleMap': {
                            'NTS': $translate.instant('form.service.nts'),
                            'FSA': $translate.instant('form.service.fsa'),
                            'LAT/LNG': 'Latitude / Longitude'
                        } }
                    ] },
                { 'title': $translate.instant('form.service.export'),
                    'key': 'export', 'items': [
                        { 'key': 'export.title', 'items': [
                            {
                                'type': 'section', 'items': [{ 'key': 'export.title.titleValue' }]
                            },
                            {
                                'type': 'section', 'items': [{ 'key': 'export.title.isSelected' }]
                            },
                            {
                                'type': 'section', 'items': [{ 'key': 'export.title.isSelectable' }]
                            }
                        ] },
                        { 'key': 'export.map', 'items': [
                            {
                                'type': 'section', 'items': [{ 'key': 'export.map.isSelected' }]
                            },
                            {
                                'type': 'section', 'items': [{ 'key': 'export.map.isSelectable' }]
                            }
                        ] },
                        { 'key': 'export.legend', 'items': [
                            {
                                'type': 'section', 'items': [{ 'key': 'export.legend.isSelected' }]
                            },
                            {
                                'type': 'section', 'items': [{ 'key': 'export.legend.isSelectable' }]
                            }
                        ] },
                        { 'key': 'export.mapElements', 'items': [
                            {
                                'type': 'section', 'items': [{ 'key': 'export.mapElements.isSelected' }]
                            },
                            {
                                'type': 'section', 'items': [{ 'key': 'export.mapElements.isSelectable' }]
                            }
                        ] },
                        { 'key': 'export.footnote', 'items': [
                            { 'key': 'export.footnote.footnoteValue', 'notitle': true },
                            {
                                'type': 'section', 'items': [{ 'key': 'export.footnote.isSelected' }]
                            },
                            {
                                'type': 'section', 'items': [{ 'key': 'export.footnote.isSelectable' }]
                            }
                        ] },
                        { 'key': 'export.timestamp', 'items': [
                            {
                                'type': 'section', 'items': [{ 'key': 'export.timestamp.isSelected' }]
                            },
                            {
                                'type': 'section', 'items': [{ 'key': 'export.timestamp.isSelectable' }]
                            }
                        ] }
                    ] }
            ] }
        ];
    }
}
