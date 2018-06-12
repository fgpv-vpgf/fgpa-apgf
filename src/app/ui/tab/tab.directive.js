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
 * @param {Object} $timeout Angular timeout object
 * @param {Object} events Angular events object
 * @param  {Object} keyNames key names with corresponding key code
 * @param {Object} constants service with all constants for the application
 * @param {Object} externalService external service for extension functions
 */
function Controller($translate, $timeout, events, keyNames, constants, externalService) {
    'ngInject';
    const self = this;

    self.tab = 1;
    self.setTab = setTab;
    self.isSet = isSet;
    self.showExtension = showExentsion;
    self.isShowExtension = false;
    $timeout(() => { self.extensions = externalService.getExtensionsCount(); }, constants.delaySplash);

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

    /**
     * Select active tab
     *
     * @function setTab
     * @private
     * @param {Number} newTab the index of tab to select
     * @param {Object} event the triggered event
     */
    function setTab(newTab, event = null) {
        self.tab = newTab;
        self.isShowExtension = false;

        // WCAG
        if (event === null || event.which === keyNames.SPACEBAR) {
            $timeout(() => document.getElementsByClassName('av-show-advance')[newTab - 1].focus(), constants.delayWCAG);

            if (event !== null) event.preventDefault();
        }
    }

    function showExentsion() { self.isShowExtension = !self.isShowExtension }
    function isSet(tabNum) { return self.tab === tabNum; }
}
