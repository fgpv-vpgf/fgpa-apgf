const templateUrl = require('../form.html');

/**
 * @module avTest
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avTest` TEST FORMS AND SCHEMA
 *
 */
angular
    .module('app.ui')
    .directive('avTest', avTest);

function avTest(schemaForm) {
    const directive = {
        restrict: 'E',
        templateUrl,
        scope: { },
        controller: Controller,
        controllerAs: 'self',
        bindToController: true

    };

    return directive;
}

function Controller($scope, $translate, events, modelManager) {
    'ngInject';
    const self = this;
    self.modelName = 'test';
    self.sectionName = 'test';

    // when schema is loaded or create new config is hit, initialize the schema, form and model
    events.$on(events.avSchemaUpdate, () => init());

    // when user load a config file, set form and model
    events.$on(events.avLoadModel, () => modelManager.updateModel($scope, self.modelName));

    // when user change language, reset schema and form
    events.$on(events.avSwitchLanguage, () => {
        self.sectionName = $translate.instant('test');
        $scope.schema = modelManager.getSchema(self.modelName);
        //$scope.form = angular.copy($scope.form);
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
                "key": "favorites",
                "items": [
                    {
                        "key": "favorites.favfirst"
                    }, {
                        "key": "favorites.favsecond"
                    }, {
                        "key": "favorites.subfav",
                        "type": "array",
                        "items": [
                            {
                                "key": "favorites.subfav[].propOne",
                                "title": "Prop one"
                            }
                        ]
                    }
                ]
            }, {
                "key": "layers",
                "items": [{
                    "key": "layers.firstArray",
                    "title": "{{\"Tab \"+ value.propOne}}",
                    "startEmpty": true,
                    "type": "tabarray",
                    "items": [
                        {
                            "key": "layers.firstArray[].propOne",
                            "title": "Prop one"
                        },
                        {
                            "key": "layers.firstArray[].propTwo",
                            "title": "Prop two"
                        }
                    ]
                }]
            },
            {
                "type": "actions",
                "items": [
                    { "type": 'button', "style": 'btn-info', "title": 'Validate', "onClick": validateForm }
                ]
            }
        ]
    }
}
