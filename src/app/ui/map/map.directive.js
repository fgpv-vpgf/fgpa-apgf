const templateUrl = require('./map.html');

/**
 * @module avMap
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avMap`
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
function avMap(schemaForm) {
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

function Controller($scope, stateManager, debounceService, constants, events, $timeout) {
    'ngInject';
    const self = this;

    self.modelName = 'map';
    self.buttonClick = validate;

    // when schema is loaded, initialize the form
    events.$on(events.avSchemaUpdate, (evt, schema) => { if (schema === self.modelName) init(); });

    // when user create a new config, reset the form
    events.$on(events.avNewModel, () => resetModel());

    // when user load a config file, set model
    events.$on(events.avLoadModel, () => updateModel());

    function init() {
        $scope.model = stateManager.getModel(self.modelName);
        $scope.schema = stateManager.getSchema(self.modelName);

        $scope.form = [
            {
                "key": "name",
                "onChange": debounceService.registerDebounce(validate, constants.debSummary, false),
                "feedback": "{'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-star': !hasSuccess() }"
            }, {
                "key": "email",
                "onChange": debounceService.registerDebounce(validate, constants.debSummary, false)
            }, {
                "key": "comment",
                "type": "textarea",
                "placeholder": "Make a comment",
                "onChange": debounceService.registerDebounce(validate, constants.debSummary, false)
            }, {
                "key": "eligible",
                "onChange": debounceService.registerDebounce(validate, constants.debSummary, false)
            }, {
                "type": "conditional",
                "condition": "model.eligible",
                "items": [
                    {
                        "key": "code",
                        "placeholder": "ex. 666",
                        "onChange": debounceService.registerDebounce(validate, constants.debSummary, false)
                    }
                ]
            },
            {
                "type": "actions",
                "items": [
                    { "type": 'button', "style": 'btn-info', "title": 'Validate', "onClick": validateForm }
                ]
            }
        ];
    }

    function validateForm(form, model) {
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');
        stateManager.validateModel(self.modelName, $scope.activeForm);

        // Then we check if the form is valid
        if ($scope.activeForm.$valid) {
            console.log("form is ", $scope.form);
            console.log("model is ", $scope.model);
        }
    }

    function validate(form, model) {
        const key = model.key[0];
        stateManager.setValidity(self.modelName, key, $scope.activeForm[`activeForm-${key}`].$valid);
    }

    function resetModel() {
        $scope.$broadcast('schemaFormRedraw');
        $scope.model = stateManager.resetModel(self.modelName);
        stateManager.resetValidity(self.modelName);
    }

    function updateModel() {
        $scope.model = stateManager.getModel(self.modelName);
        $scope.$broadcast('schemaFormValidate');
        $timeout(() => { stateManager.validateModel(self.modelName, $scope.activeForm); }, 2000);
    }
}
