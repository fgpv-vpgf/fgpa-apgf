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

function Controller($scope, $rootScope, $translate, stateManager, $timeout, debounceService) {
    'ngInject';
    const self = this;

    self.message = $translate.instant('map.message');
    self.buttonClick = validate;

    $scope.mapModel = {};

    $scope.schema = {
        "type": "object",
        "title": "Comment",
        "properties": {
            "name": {
                "title": "Name",
                "type": "string"
            },
            "email": {
                "title": "Email",
                "type": "string",
                "pattern": "^\\S+@\\S+$",
                "description": "Email will be used for evil."
            },
            "comment": {
                "title": "Comment",
                "type": "string",
                "maxLength": 20,
                "validationMessage": $translate.instant('error.email')
            },
            "eligible": {
                "type": "boolean",
                "title": "Eligible for awesome things",
                "default": true
            },
            "code": {
                "type":"string",
                "title": "The Code"
            }
        },
        "required": [
            "name",
            "email",
            "comment"
        ]
    };

    $scope.form = [
        {
            "key": "name",
            "onChange": debounceService.registerDebounce(validate, 1000, false),
            "feedback": "{'glyphicon': true, 'glyphicon-ok': hasSuccess(), 'glyphicon-star': !hasSuccess() }"
        }, {
            "key": "email",
            "onChange": debounceService.registerDebounce(validate, 1000, false)
        }, {
            "key": "comment",
            "type": "textarea",
            "placeholder": "Make a comment"
        }, {
            "key": "eligible",
            "onChange": debounceService.registerDebounce(validate, 1000, false)
        }, {
            "type": "conditional",
            "condition": "mapModel.eligible",
            "items": [
                {
                    "key": "code",
                    "placeholder": "ex. 666",
                    "onChange": debounceService.registerDebounce(validate, 1000, false)
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

    $rootScope.$on('sf-render-finished', init);

    function validateForm(form, model) {
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');

        // Then we check if the form is valid
        if ($scope.mapForm.$valid) {
            console.log("form is ", $scope.form);
            console.log("model is ", $scope.model);
        }
    }

    function init() {
        // https://github.com/json-schema-form/angular-schema-form/issues/381
        $timeout(setState, 1000);
    }

    function setState() {
        const schema = $scope.schema.properties;
        stateManager.setState('map', schema);
    }

    function validate(form, model) {
        const key = model.key[0];
        stateManager.setValidity('map', key, $scope.mapForm[`mapForm-${key}`].$valid);
    }
}
