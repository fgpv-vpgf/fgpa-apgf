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

function Controller($scope, stateManager, debounceService, constants, events) {
    'ngInject';
    const self = this;

    self.buttonClick = validate;

    init();

    // when schema is loaded, initialize the form
    events.$on(events.avSchemaUpdate, (evt, schema) => { if (schema === 'map') init(); });

    function init() {
        $scope.model = {};
        $scope.schema = stateManager.getSchema('map');

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
                "condition": "mapModel.eligible",
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

        // Then we check if the form is valid
        if ($scope.mapForm.$valid) {
            console.log("form is ", $scope.form);
            console.log("model is ", $scope.model);
        }
    }

    function validate(form, model) {
        const key = model.key[0];
        stateManager.setValidity('map', key, $scope.mapForm[`mapForm-${key}`].$valid);
    }
}
