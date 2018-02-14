/**
 * @module avAccordion
 * @memberof app.layout
 * @restrict A
 * @description handle accordion use
 *
 * The `avAccordion`
 * https://jsfiddle.net/aestheticartist/h72fuxvw/
 */
angular
    .module('app.layout')
    .directive('avAccordion', avAccordion);

/**
 * `avAccordion` directive body.
 *
 * @function avAccordion
 * @param {Object} $compile Angular object
 * @param {Object} $timeout Angular object
 * @param {Object} events Angular object
 * @param {Object} constants the modules whho contains all the constants
 * @return {Object}     directive body
 */
function avAccordion($compile, $timeout, events, constants) {
    const directive = {
        restrict: 'A',
        link
    }

    function link(scope, element) {
        // when model is updated, we need to recreate the accordion
        events.$on(events.avSwitchLanguage, () => { setAccordion(scope, element, constants.delayAccordion); });
        events.$on(events.avSchemaUpdate, () => { setAccordion(scope, element, constants.delayAccordion); });
        events.$on(events.avLoadModel, () => { setAccordion(scope, element, constants.delayAccordion); });

        events.$on(events.avNewItems, () => {
            setAccordion(scope, element, 100);
        });
    }

    /**
     * Set accordion on form if needed
     * @function setAccordion
     * @private
     * @param  {Object} scope Angular scope
     * @param  {Object} element  element to add to
     * @param {Interger} delay timeout to apply
     */
    function setAccordion(scope, element, delay) {
        $timeout(() => {
            element.find('.av-accordion-toggle').not(':has(>md-icon)').each((index, element) => {
                // check if the element need to be collapse by default
                // default behaviour of collapsible element is to be open by default
                let isOpen = true;

                // if element with class av-accordion-toggle also have av-collapse, collapse the group by default
                if (element.classList.contains('av-collapse')) {
                    isOpen = false;
                    $(element.getElementsByClassName('av-accordion-content')).slideToggle();
                }

                addIcon($(element), scope, isOpen);
            });

            // add button for expand and collapse all getElementsByTagName
            // to enable this, add htmml class av-accordion-all at the base level af an array inside the form
            element.find('.av-accordion-all').not(':has(>button)').each((index, element) => {
                addButton($(element), scope);
            });
        }, delay);
    }

    /**
     * Add expand and collapse icon to accordion section
     * @function addIcon
     * @private
     * @param  {Object} element  element to add to
     * @param  {Object} scope Angular scope
     * @param {Boolean} open true if the expand icon is show, false if collapse icon is shown
     */
    function addIcon(element, scope, open) {
        // set the proper icon from the collapsible element state
        const isOpen = (open) ? 'hidden' : '';
        const isClose = (!open) ? 'hidden' : '';

        element.prepend(
            $compile(`<md-icon class='av-accordion-icon av-accordion-expand ${isOpen}' md-svg-src='hardware:keyboard_arrow_right'
                ng-click="self.formService.toggleSection($event, 'slideToggle')"></md-icon>
                    <md-icon class='av-accordion-icon av-accordion-collapse ${isClose}' md-svg-src='hardware:keyboard_arrow_down'
                ng-click="self.formService.toggleSection($event)"></md-icon>`)(scope));
    }

    /**
     * Add expand and collapse button to array section
     * @function addButton
     * @private
     * @param  {Object} element  element to add to
     * @param  {Object} scope Angular scope
     */
    function addButton(element, scope) {
        element.prepend(
            $compile(`<md-button class="av-button-square av-expcol-all md-raised"
                        ng-click="self.formService.toggleAll($event, true)">
                        {{ 'summary.collapse' | translate }}
                        <md-tooltip>{{ 'summary.collapse' | translate }}</md-tooltip>
                    </md-button>
                    <md-button class="av-button-square av-expcol-all md-raised"
                        ng-click="self.formService.toggleAll($event, false)">
                        {{ 'summary.expand' | translate }}
                        <md-tooltip>{{ 'summary.expand' | translate }}</md-tooltip>
                    </md-button>`)(scope));
    }

    return directive;
}
