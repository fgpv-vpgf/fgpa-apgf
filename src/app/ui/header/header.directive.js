const templateUrl = require('./header.html');

/**
 * @module avHeader
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avHeader`
 *
 */
angular
    .module('app.ui')
    .directive('avHeader', avHeader);

/**
 * `avHeader` directive body.
 *
 * @function avHeader
 * @return {object} directive body
 */
function avHeader() {
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

}
