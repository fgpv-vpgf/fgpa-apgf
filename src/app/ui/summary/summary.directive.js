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
function avSummary() {
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

function Controller(stateManager, events) {
    'ngInject';
    const self = this;

    self.mapModel = {};
    self.uiModel = {};

    events.$on(events.avSchemaUpdate, (evt, schema) => { self[schema] = stateManager.getState(schema); });
}
