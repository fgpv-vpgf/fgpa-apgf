// get width of the scrollbar
// TODO: this can be moved to app-seed as it's only needed once
const SCROLLBAR_WIDTH = (() => {
    // Create the measurement node
    const scrollDiv = angular.element('<div class="av-scrollbar-measure"></div>');
    angular.element('body').append(scrollDiv);

    // Get the scrollbar width
    const width = scrollDiv[0].offsetWidth - scrollDiv[0].clientWidth;

    // Delete the DIV
    scrollDiv.remove();

    return width;
})();

/**
 * @module avDetectScrollbar
 * @memberof app.ui
 * @restrict A
 * @description
 *
 * The `avDetectScrollbar` directive fires a `av-detect-scrollbar` event when a scrollbar is detected on a node.
 *
 */
angular
    .module('app.ui')
    .directive('avDetectScrollbar', avDetectScrollbar);

/**
 * @function avDetectScrollbar
 * @param {Object} $timeout Angular object
 * @return {Object}  directive
 */
function avDetectScrollbar($timeout) {
    const directive = {
        restrict: 'A',
        link: link
    };

    return directive;

    /*********/

    /**
     * @function link
     * @param {Object} scope Angular object
     * @param {Object} element Angular object
     */
    function link(scope, element) {
        const domNode = element[0];
        let handle;

        // TODO: add check for overflow property and if it's auto, or scroll set the watch
        // if (window.getComputedStyle(domNode).overflowY)

        scope.$watch(() => domNode.scrollHeight > domNode.clientHeight, (newValue, oldValue) => {
            $timeout.cancel(handle);
            handle = $timeout(() => {
                scope.$emit('av-detect-scrollbar', newValue, oldValue, SCROLLBAR_WIDTH);
            }, 20); // magic binding sometimes doubles the height of the node; add a small timeout to avoid false detections
        });
    }
}
