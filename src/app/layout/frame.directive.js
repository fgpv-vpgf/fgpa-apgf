/**
 * @module avFrame
 * @memberof app.layout
 * @restrict E
 * @description
 *
 * The `avFrame`
 *
 */
angular
    .module('app.layout')
    .directive('avFrame', avFrame);

/**
 * `avFrame` directive body.
 *
 * @function avFrame
 * @return {object} directive body
 */
function avFrame($sce) {
    const directive = {
        restrict: 'E',
        template: '<iframe src="{{ trustedUrl }}" frameborder="0" height="100%" width="100%"></iframe>',
        scope: { html: '@html' },
        link: function(scope) {
            scope.trustedUrl = $sce.trustAsHtml(scope.html);
        }
    };

    return directive;
}
