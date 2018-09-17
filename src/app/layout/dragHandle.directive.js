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
 * @param  {Object} keyNames key names with corresponding key code
 * @param {Object} events Angular object
 * @param {Object} constants the modules whho contains all the constants
 * @return {Object}     directive body
 */
function avDragHandle($compile, $timeout, keyNames, events, constants) {
    const directive = {
        restrict: 'A',
        link
    }

    let timestamp = 0;
    let started = false;

    /**
     * recreate the handle when model updated
     * @function link
     * @param {Object} scope Angular object
     * @param {Object} element html element
     */
    function link(scope, element) {
        // when model is updated, we need to recreate the handle
        events.$on(events.avSwitchLanguage, () => { setHandle(scope, element, constants.delayHandle); });
        events.$on(events.avSchemaUpdate, () => { setHandle(scope, element, constants.delayHandle); });
        events.$on(events.avLoadModel, () => { setHandle(scope, element, constants.delayHandle); });

        events.$on(events.avNewItems, () => { setHandle(scope, element, 100); });
    }

    /**
     * set the WCAG jQueryUi sortable
     * @function setKeyboardReorder
     * @private
     * @param {Object} scope Angular scope to access to model element
     */
    function setKeyboardReorder(scope) {
        // https://codepen.io/bartz/pen/rrgyjw
        // extent jQueryUi to handle keyboard event
        jQuery.fn.extend({
            ksortable: function(options) {
                this.sortable(options);

                // select basemaps li not already setup and bind events
                $('.av-baseMaps > ol > li:not([tabindex="0"])').attr('tabindex', 0)
                    .bind('keydown', event => bindKeydown(event, scope.model.baseMaps));

                // select layers li not already setup and bind events
                $('.av-layers > ol > li:not([tabindex="0"])').attr('tabindex', 0)
                    .bind('keydown', event => bindKeydown(event, scope.model.layers));

                // select layer entries li not already setup and bind events
                $('.av-layerEntries > ol > li:not([tabindex="0"])').attr('tabindex', 0)
                    .bind('keydown', event => {
                        const index = parseInt(document.activeElement.closest('.av-layer').getAttribute('sf-index'));
                        bindKeydown(event, scope.model.layers[index].layerEntries);
                    });

            }
        });

        // sortOptions on form element doesn't seems to work. As a workaround, we set the sortOptions
        // direclty on the element.
        // for an array to be sortable, this needs to be present inside the array: { 'type': 'help', 'helpvalue': '<div class="av-drag-handle"></div>' }
        // the class .av-sortable need to be present on the key e.g. 'key': 'layers', 'htmlClass': 'av-accordion-all av-layers av-sortable'
        $('.av-sortable > .ui-sortable').ksortable({
            'handle': 'div>div>.av-drag-handle>md-icon',
            'placeholder': 'av-state-highlight',
            'tolerance': 'pointer',
            'containment': 'parent'
        });
    }

    /**
     * keyboard event to bind to li
     * @function bindKeydown
     * @private
     * @param {Object} event triggered event
     * @param {Array} list array of element to sort
     */
    function bindKeydown(event, list) {
        // if the item is a groupitem and time elapse between event is more the 100 milliseconds
        // we use a timestamp because event on layer entries is triggered twice each time
        if (event.target.classList.contains('list-group-item') && event.timeStamp - timestamp > 100) {
            const active = document.activeElement;
            const index = parseInt(active.children[1].getAttribute('sf-index'));

            // update index with the what it shuld become
            let sort = 0;
            if (event.which === keyNames.UP_ARROW) {
                $(active).insertBefore($(active).prev());
                sort = (index === 0) ? 0 : -1;
            }
            if (event.which === keyNames.DOWN_ARROW) {
                $(active).insertAfter($(active).next());
                sort = (index === list.length - 1) ? 0 : 1;
            }

            // swap items
            [list[index], list[index + sort]] = [list[index + sort], list[index]];
            active.focus();

            // reset the sf-index on all array DOM elements
            const lis = [...active.parentElement.children];
            for (let [i, li] of lis.entries()) {
                const sfIndexes = [...$(li).find('[sf-index]')];
                for (let sf of sfIndexes) {
                    sf.setAttribute('sf-index', i);
                }
            }
        }

        // set time stamp for next pass
        timestamp = event.timeStamp;
    }

    /**
     * recreate the handle when model update
     * @function setHandle
     * @param {Object} scope Angular object
     * @param {Object} element html element
     * @param {Object} delay timeout delay
     */
    function setHandle(scope, element, delay) {

        // drag handle is only inside map schema
        if (scope.schema.schema === 'map' && !started) {
            started = true;

            // set WCAG reorder
            $timeout(() => { setKeyboardReorder(scope) }, delay);

            $timeout(() => {
                element.find('.av-drag-handle').not(':has(>md-icon)').each((index, element) => {
                    addIcon($(element), scope);
                });
            }, delay);

            // because event is fired multiple time, reset event after time out
            $timeout(() => { started = false; }, 1000);
        }
    }

    /**
     * set the proper icon
     * @function addIcon
     * @param {Object} element html element
     * @param {Object} scope Angular object
     */
    function addIcon(element, scope) {
        // set the proper icon from the collapsible element state
        element.prepend(
            $compile(`<md-icon md-svg-src="editor:drag_handle"
                class="ng-scope" role="img" aria-hidden="true"></md-icon>`)(scope));
    }

    return directive;
}
