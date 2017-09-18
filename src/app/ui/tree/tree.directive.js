const templateUrl = require('./tree.html');

/**
 * @module avTree
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avTree`
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
        compile: function(element) {
            return recursionService.compile(element, function(scope, iElement, iAttrs, controller, transcludeFn) {
                // Define your normal link function here.
                // Alternative: instead of passing a function,
                // you can also pass an object with
                // a 'pre'- and 'post'-link function.

                scope.expand = item => {
                    item.expand = !item.expand;
                }
            });
        }
    };

    return directive;
}
