const templateUrl = require('./tab.html');

/**
 * @module avTab
 * @memberof app.layout
 * @restrict E
 * @description
 *
 * The `avTab`
 *
 */
angular
    .module('app.ui')
    .directive('avTab', avTab);

/**
 * `avUi` directive body.
 *
 * @function avTab
 * @return {object} directive body
 */
function avTab() {
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

function Controller() {
    'ngInject';
    const self = this;

    self.tab = 1;
    self.setTab = setTab;
    self.isSet = isSet;

    function setTab(newTab) { self.tab = newTab; }
    function isSet(tabNum) { return self.tab === tabNum; }
}
