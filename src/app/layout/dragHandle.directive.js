/**
 * @module avDragHandle
 * @memberof app.layout
 * @restrict A
 * @description drag handle for array drag and drop
 *
 * The `avDragHandle`
 * https://codepen.io/thgreasi/pen/PGRoRY
 * https://jqueryui.com/sortable/#placeholder
 */
angular
    .module('app.layout')
    .directive('avDragHandle', avDragHandle);

/**
 * `avDragHandle` directive body.
 *
 * @function avDragHandle
 * @param {Object} $compile Angular object
 * @param {Object} $timeout Angular object
 * @param {Object} events Angular object
 * @param {Object} constants the modules whho contains all the constants
 * @return {Object}     directive body
 */
function avDragHandle($compile, $timeout, events, constants) {
    const directive = {
        restrict: 'A',
        link
    }

    function link(scope, element) {
        // when model is updated, we need to recreate the handle
        events.$on(events.avSwitchLanguage, () => { setHandle(scope, element, constants.delayHandle); });
        events.$on(events.avSchemaUpdate, () => { setHandle(scope, element, constants.delayHandle); });
        events.$on(events.avLoadModel, () => { setHandle(scope, element, constants.delayHandle); });

        events.$on(events.avNewItems, () => {
            setHandle(scope, element, 100);
        });
    }

    function setHandle(scope, element, delay) {
        // sortOptions on form element doesn't seems to work. As a workaround, we set the sortOptions
        // direclty on the element.
        // for an array to be sortable, this needs to be present inside the array: { 'type': 'help', 'helpvalue': '<div class="av-drag-handle"></div>' }
        $('.ui-sortable').each((index, item) => {
            $(item).sortable({
                'handle': 'div>div>.av-drag-handle>md-icon',
                'placeholder': 'av-state-highlight',
                'tolerance': 'pointer',
                'containment': 'parent'
            });
        });

        $timeout(() => {
            element.find('.av-drag-handle').not(':has(>md-icon)').each((index, element) => {
                addIcon($(element), scope);
            });
        }, delay);
    }

    function addIcon(element, scope) {
        // set the proper icon from the collapsible element state
        element.prepend(
            $compile(`<md-icon md-svg-src="editor:drag_handle"
                class="ng-scope" role="img" aria-hidden="true"></md-icon>`)(scope));
    }

    return directive;
}
