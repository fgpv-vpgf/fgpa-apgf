const templateUrl = require('./ui.html');

/**
 * @module avUi
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avUi`
 *
 */
angular
    .module('app.ui')
    .directive('avUi', avUi);

/**
 * `avUi` directive body.
 *
 * @function avUi
 * @return {object} directive body
 */
function avUi() {
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

function Controller($scope, stateManager, debounceService, constants, events) {
    'ngInject';
    const self = this;

    self.buttonClick = validate;

    init();

    // when schema is loaded, initialize the form
    events.$on(events.avSchemaUpdate, (evt, schema) => { if (schema === 'ui') init(); });

    function init() {
        $scope.model = {};
        $scope.schema = stateManager.getSchema('ui');

        $scope.form = [
            {
                "key": "fullscreen",
                "onChange": debounceService.registerDebounce(validate, constants.debSummary, false)
            }, {
                "key": "theme",
                "onChange": debounceService.registerDebounce(validate, constants.debSummary, false)
            }, {
                "key": "logoUrl",
                "onChange": debounceService.registerDebounce(validate, constants.debSummary, false)
            }, {
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

        // Then we check if the form is valid
        if ($scope.mapForm.$valid) {
            console.log("form is ", $scope.form);
            console.log("model is ", $scope.model);
        }
    }

    function validate(form, model) {
        const key = model.key[0];
        stateManager.setValidity('ui', key, $scope.uiForm[`uiForm-${key}`].$valid);
    }
}
