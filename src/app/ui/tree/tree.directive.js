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
            })

    };

    return directive;
}
