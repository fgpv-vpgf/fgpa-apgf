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
            scope.$on('sf-render-finished', (scope, element) => { console.log ('sf-render-finished') });
        }

    };

    return directive;
}

function Controller($scope, $translate, events, modelManager) {
    'ngInject';
    const self = this;
    self.modelName = 'map';
    self.sectionName = $translate.instant('app.section.map');

    // when schema is loaded or create new config is hit, initialize the schema, form and model
    events.$on(events.avSchemaUpdate, () => init());

    // when user load a config file, set form and model
    events.$on(events.avLoadModel, () => modelManager.updateModel($scope, self.modelName));

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
    }

    function validateForm() {
        // First we broadcast an event so all fields validate themselves then we validate the model to update
        // summary panel
        $scope.$broadcast('schemaFormValidate');
        modelManager.validateModel(self.modelName, $scope.activeForm, $scope);
    }

    function setForm() {
        return [
            {
                "key": "info",
                "items": [
                    { "key": "info.name" },
                    { "key": "info.subname",
                        "startEmpty": true,
                        "add": $translate.instant('button.add'),
                        "style": { "add": "btn-success" },
                        "items": [
                            { "key": "info.subname[].sub1", "placeholder": "Make a comment" },
                            { "key": "info.subname[].sub2" }
                        ]
                    }
                ]
            }, {
                "key": "email"
            }, {
                "key": "comment",
                "type": "textarea",
                "placeholder": "Make a comment"
            }, {
                "key": "eligible"
            }, {
                "type": "conditional",
                "condition": "model.eligible",
                "items": [
                    {
                        "key": "code",
                        "placeholder": "ex. 666"
                    }
                ]
            },
            {
                "type": "actions",
                "items": [
                    { "type": 'button', "style": 'btn-info', "title": $translate.instant('button.validate'), "onClick": validateForm }
                ]
            }
        ];
    }
}
