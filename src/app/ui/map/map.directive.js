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

function Controller($scope, $translate) {
    'ngInject';
    const self = this;

    self.message = $translate.instant('map.message');

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
                "title": "Eligible for awesome things"
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
        "name",
        "email",
        {
            "key": "comment",
            "type": "textarea",
            "placeholder": "Make a comment"
        },
        "eligible",
        {
            "type": "conditional",
            "condition": "mapModel.eligible",
            "items": [
                {
                    "key": "code",
                    "placeholder": "ex. 666"
                }
            ]
        },
        {
            "type": "submit",
            "style": "btn-info",
            "title": "OK"
        }
    ];


    $scope.submitForm = function(form, model) {
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');

        // Then we check if the form is valid
        if (form.$valid) {
            console.log("form is ", $scope.form);
            console.log("model is ", $scope.model);
        }
    }

}
