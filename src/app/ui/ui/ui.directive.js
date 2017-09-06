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

function Controller($scope) {
    'ngInject';
    const self = this;

    self.message = 'Good to be home!';

    $scope.schema = {
        type: "object",
        properties: {
            name: { type: "string", minLength: 2, title: "Name", description: "Name or alias" },
            title: {
                type: "string",
                enum: ['dr','jr','sir','mrs','mr','NaN','dj']
            }
        }
    };

    $scope.form = [
        "*",
        {
            type: "submit",
            title: "Save"
        }
    ];

    $scope.model = {};
}
