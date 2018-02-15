/**
 * @module avBindValue
 * @memberof app.ui
 * @restrict A
 * @description handle binding value
 *
 * The `avBindValue`
 */
angular
    .module('app.ui')
    .directive('avBindValue', avBindValue);

/**
 * `avBindValue` directive body.
 *
 * @param {Object} $compile Angular object
 * @param {Object} $timeout Angular object
 * @param {Object} events Angular object
 * @function avBindValue
 * @return {Object}     directive body
 */
function avBindValue($compile, $timeout, events) {
    const directive = {
        restrict: 'A',
        link
    }

    function link(scope, element) {
        $timeout(() => {
            // TODO: for testing purpose only. Works with the sampleForm.module add on
            // to make it work ok, we need to add a watch on the element because
            // index are always mess up when we add/delete items
            element.removeAttr('av-bind-value');
            const key = element.attr('data-bind');
            element[0].innerText = `{{ ${key} }}`;
            $compile(element.context)(scope);
        }, 100);
    }

    return directive;
}
