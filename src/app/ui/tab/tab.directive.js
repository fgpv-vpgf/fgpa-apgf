const templateUrl = require('./tab.html');

/**
 * @module avTab
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avTab`
 *
 */
angular
    .module('app.ui')
    .directive('avTab', avTab);

/**
 * `avTab` directive body.
 *
 * @function avTab
 * @return {object} directive body
 */
function avTab() {
    const directive = {
        restrict: 'E',
        templateUrl,
        scope: { },
        controller: Controller,
        controllerAs: 'self',
        bindToController: true
    };

    return directive;
}

/**
 * avTab controller
 *
 * @function Controller
 * @param {Object} $translate Angular translation object
 * @param {Object} events Angular events object
 * @param {Object} constants service with all constants for the application
 */
function Controller($translate, events, constants) {
    'ngInject';
    const self = this;

    self.tab = 1;
    self.setTab = setTab;
    self.isSet = isSet;

    // set tabs name and directive tag
    self.tabs = constants.schemas.map(item => mapTabs(item));

    // on language switch, update tab name
    events.$on(events.avSwitchLanguage, () => { constants.schemas.map((item, index) => {
        self.tabs[index].name = $translate.instant(`app.section.${item.split('.')[0]}`);
    })});

    events.$on(events.avUpdateFocus, (event, val) => {
        self.setTab(val);
    });

    /**
     * Set tabs information, name and directive tag
     *
     * @function mapTabs
     * @private
     * @param {String} item the file name to use to create tab
     * @return {Object} who contain the name for the tab and the directive tag
     */
    function mapTabs(item) {
        const name = item.split('.')[0];
        return {
            name: $translate.instant(`app.section.${name}`),
            tag: `<av-${name}></av-${name}>`
        }
    }

    function setTab(newTab) { self.tab = newTab; }
    function isSet(tabNum) { return self.tab === tabNum; }
}
