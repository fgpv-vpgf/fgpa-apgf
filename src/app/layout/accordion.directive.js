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
 * @return {Object}     directive body
 */
function avAccordion($compile, $timeout, events, constants) {
    const directive = {
        restrict: 'A',
        link
    }

    function link(scope, element) {
        // when model is updated, we need to recreate the accordion
        events.$on(events.avSwitchLanguage, () => { setAccordion(scope, element); });
        events.$on(events.avSchemaUpdate, () => { setAccordion(scope, element); });
        events.$on(events.avLoadModel, () => { setAccordion(scope, element); });

        events.$on(events.avNewItems, (event, args) => {
            if (element[0].classList.contains(args.form)) {
                $timeout(() => {
                    addIcon($(element.find(`.av-accordion-toggle.${args.class}`)[args.index]).not(':has(>md-icon)'), scope);
                }, 100);
            }
        });
    }

    function setAccordion(scope, element) {
        $timeout(() => {
            element.find('.av-accordion-toggle').each((index, element) => {
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
        }, constants.delayAccordion);
    }

    function addIcon(element, scope, open) {
        // set the proper icon from the collapsible element state
        const isOpen = (open) ? 'hidden' : '';
        const isClose = (!open) ? 'hidden' : '';

        element.prepend(
            $compile(`<md-icon class='av-accordion-icon ${isOpen}' md-svg-src='hardware:keyboard_arrow_right'
                ng-click="self.formService.toggleSection($event)"></md-icon>
                    <md-icon class='av-accordion-icon ${isClose}' md-svg-src='hardware:keyboard_arrow_down'
                ng-click="self.formService.toggleSection($event)"></md-icon>`)(scope));
    }
    return directive;
}
