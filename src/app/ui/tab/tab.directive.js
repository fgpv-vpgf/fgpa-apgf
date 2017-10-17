const templateUrl = require('./tab.html');

/**
 * @module avTab
 * @memberof app.layout
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
 * `avUi` directive body.
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

    /**
     * Set tabs information, name and directive tag
     *
     * @function mapTabs
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
