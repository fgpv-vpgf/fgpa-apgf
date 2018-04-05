const templateUrl = require('./tree.html');

/**
 * @module avTree
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avTree` manage a tree structure. Use for summary panel.
 *
 */
angular
    .module('app.ui')
    .directive('avTree', avTree);

/**
 * `avTree` directive body.
 *
 * @function avTree
 * @return {object} directive body
 */
// http://plnkr.co/edit/JAIyolmqPqO9KsynSiZp?p=preview
function avTree(recursionService) {
    const directive = {
        restrict: 'E',
        templateUrl,
        scope: { tree: '=' },
        compile: element =>
            recursionService.compile(element, (scope, iElement, iAttrs, controller, transcludeFn) => {
                // define your normal link function here.
                // alternative: instead of a function, you can pass an object with a 'pre'- and 'post'-link function.
                scope.expand = item => {
                    item.expand = !item.expand;
                }
            }),
        controller: Controller,
        controllerAs: 'self',
        bindToController: false
    };

    return directive;
}

/**
 * tree directive controller
 *
 * @function Controller
 * @param {Object} $timeout Angular timeout object
 * @param {Object} $scope Angular scope directive object
 * @param {Object} events Angular events object
 * @param {Object} constants service with all constants for the application
 * @param {Object} commonService service with common functions
 */
function Controller($timeout, $scope, events, constants, commonService) {
    'ngInject';
    const self = this;

    self.setFocus = setFocus;

    /**
     * Set focus on tree object
     *
     * @function setFocus
     * @private
     * @param {Object} tree summary tree
     */
    function setFocus(tree) {
        if (tree.masterlink === tree.hlink) {
            commonService.clickTab(tree.hlink);
        } else {
            commonService.clickSubTab(tree.masterlink, tree.hlink);
            if (tree.stype === 'element' || tree.stype === 'bad-element') {
                commonService.scrollToElement(tree.shlink);
            }
        }
    }
}
