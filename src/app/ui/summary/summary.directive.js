const templateUrl = require('./summary.html');

/**
 * @module avSummary
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avSummary`
 *
 */
angular
    .module('app.ui')
    .directive('avSummary', avSummary);

/**
 * `avSummary` directive body.
 *
 * @function avSummary
 * @return {object} directive body
 */
function avSummary($rootScope) {
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

function Controller($scope, stateManager, $rootScope) {
    'ngInject';
    const self = this;

    $rootScope.$watch(() => stateManager.form.map, (newValue, oldValue) => {
        console.log(newValue);
        if (typeof newValue !== 'undefined') {
            // self.model = newValue;
        }
    }, true);

    $rootScope.$watch(() => stateManager.state.map, (newValue, oldValue) => {
        console.log(newValue);
        if (typeof newValue !== 'undefined') {
            self.mapModel = newValue;
        }
    }, true);


}
