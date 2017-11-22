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
function avAccordion($compile, $timeout, events) {
    const directive = {
        restrict: 'A',
        link
    }

    function link(scope, element) {
        $timeout(() => {
            element.find('.av-accordion-toggle').each((index, element) => {
                addIcon($(element), scope);
            });
        }, 2100);

        events.$on(events.avNewItems, (event, args) => {
            if (element[0].classList.contains(args.form)) {
                $timeout(() => {
                    addIcon($(element.find(`.av-accordion-toggle${args.class}`)[args.index]).not(':has(>md-icon)'), scope);
                }, 100);
            }
        });
    }

    function addIcon(element, scope) {
        element.prepend(
            $compile(`<md-icon class='av-accordion-icon hidden' md-svg-src='hardware:keyboard_arrow_right'
                ng-click="self.formService.toggleSection($event)"></md-icon>
                    <md-icon class='av-accordion-icon' md-svg-src='hardware:keyboard_arrow_down'
                ng-click="self.formService.toggleSection($event)"></md-icon>`)(scope));
    }
    return directive;
}
