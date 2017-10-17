/**
 * @module avCompileHtml
 * @memberof app.ui
 * @restrict A
 * @description
 *
 * The `avCompileHtml` directive compiles html before adding to template
 *
 */
angular
    .module('app.ui')
    .directive('avCompileHtml', avCompileHtml);

/**
 * `avCompileHtml` directive body.
 *
 * @function avCompileHtml
 * @param {Object} $compile Angular object
 * @return {Object}         Compiled element/directive
 */
function avCompileHtml($compile) {
    const directive = {
        restrict: 'A',
        link: (scope, element, attrs) => {
            scope.$watch(()=> scope.$eval(attrs.avCompileHtml), value => {
                element.html(value);
                $compile(element.contents())(scope);
            });
        }
    };

    return directive;
}
