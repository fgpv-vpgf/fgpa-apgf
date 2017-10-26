const templateUrl = require('../form.html');

/**
 * @module avService
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avService` directive for the service form
 *
 */
angular
    .module('app.ui')
    .directive('avService', avService);

/**
 * `avService` directive body.
 *
 * @function avService
 * @return {object} directive body
 */
function avService($timeout, formService) {
    const directive = {
        restrict: 'E',
        templateUrl,
        scope: { },
        controller: Controller,
        controllerAs: 'self',
        bindToController: true,
        link: (scope, element, attrs) => {
            scope.$on('sf-render-finished', (scope, element) => {
                if (scope.currentScope.self.advance) {
                    const model = scope.currentScope.self.modelName;
                    $timeout(() => formService.showAdvance(model), 100);
                }
            });
        }

    };

    return directive;
}

function Controller($scope, $translate, events, modelManager, formService) {
    'ngInject';
    const self = this;
    self.modelName = 'service';
    self.sectionName = $translate.instant('app.section.service');

    // manage the show advance configuration (add "htmlClass": "av-form-advance hidden" to fields who need advance config)
    self.advance = false;
    self.formService = formService;

    // when schema is loaded or create new config is hit, initialize the schema, form and model
    events.$on(events.avSchemaUpdate, () => init());

    // when user load a config file, set form and model
    events.$on(events.avLoadModel, () => modelManager.updateModel($scope, self.modelName));

    // when user change language, reset schema and form
    events.$on(events.avSwitchLanguage, () => {
        self.sectionName = $translate.instant('app.section.service');
        $scope.schema = modelManager.getSchema(self.modelName);

        $scope.form = angular.copy($scope.form);
        $scope.form = setForm();
    });

    function init() {
        $scope.model = modelManager.getModel(self.modelName);
        $scope.schema = modelManager.getSchema(self.modelName);

        $scope.form = angular.copy($scope.form);
        $scope.form = setForm();
    }

    function validateForm() {
        // first we broadcast an event so all fields validate themselves then we validate the model to update
        // summary panel
        $scope.$broadcast('schemaFormValidate');
        modelManager.validateModel(self.modelName, $scope.activeForm, $scope);
    }

    function setForm() {
        return [
            {"type": "tabs", "tabs": [
                {"title": $translate.instant('form.service.urls'), "items": [
                    {"key": "proxyUrl", "readonly": true},
                    {"key": "exportMapUrl", "htmlClass": "av-form-advance hidden"},
                    {"key": "geometryUrl", "htmlClass": "av-form-advance hidden"},
                    {"key": "googleAPIKey", "htmlClass": "av-form-advance hidden"},
                    {"key": "geolocation", "htmlClass": "av-form-advance hidden"},
                    {"key": "coordInfo"},
                    {"key": "print"}
                ]},
                {"title": $translate.instant('form.service.geosearch'), "items": [
                    {"key": "search", "items": [
                        {"key": "search.disabledSearches", "titleMap": {
                            "NTS": "SNRC",
                            "FSA": "Postal Code",
                            "LAT/LNG": "Latitude / Longitude"
                        }},
                        {"key": "search.serviceUrls", "readonly": true}
                    ]}
                ]},
                {"title": $translate.instant('form.service.export'), "items": [
                    {"key": "export", "items": [
                        {"key": "export.title", "items": [
                            {"key": "export.title.value", "notitle": true},
                            {
                                "type": "section", "items": [
                                    {"key": "export.title.isSelected"}
                                ]
                            },
                            {
                                "type": "section", "items": [
                                    {"key": "export.title.isSelectable"}
                                ]
                            }
                        ]},
                        {"key": "export.map", "items": [
                            {
                                "type": "section", "items": [
                                    {"key": "export.map.isSelected"}
                                ]
                            },
                            {
                                "type": "section", "items": [
                                    {"key": "export.map.isSelectable"}
                                ]
                            }
                        ]},
                        {"key": "export.legend", "items": [
                            {
                                "type": "section", "items": [
                                    {"key": "export.legend.isSelected"}
                                ]
                            },
                            {
                                "type": "section", "items": [
                                    {"key": "export.legend.isSelectable"}
                                ]
                            }
                        ]},
                        {"key": "export.mapElements", "items": [
                            {
                                "type": "section", "items": [
                                    {"key": "export.mapElements.isSelected"}
                                ]
                            },
                            {
                                "type": "section", "items": [
                                    {"key": "export.mapElements.isSelectable"}
                                ]
                            }
                        ]},
                        {"key": "export.footnote", "items": [
                            {"key": "export.footnote.value", "notitle": true},
                            {
                                "type": "section", "items": [
                                    {"key": "export.footnote.isSelected"}
                                ]
                            },
                            {
                                "type": "section", "items": [
                                    {"key": "export.footnote.isSelectable"}
                                ]
                            }
                        ]},
                        {"key": "export.timestamp", "items": [
                            {
                                "type": "section", "items": [
                                    {"key": "export.timestamp.isSelected"}
                                ]
                            },
                            {
                                "type": "section", "items": [
                                    {"key": "export.timestamp.isSelectable"}
                                ]
                            }
                        ]}
                    ]}
                ]}
            ]},
            {
                "type": "actions",
                "items": [
                    { "type": 'button', "style": 'btn-info', "title": $translate.instant('button.validate'), "onClick": validateForm }
                ]
            }]
    }
}
