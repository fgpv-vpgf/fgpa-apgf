const templateUrls = {
    summary: require('./summary.html'),
    preview: require('./preview-dialog.html')
}

/**
 * @module avSummary
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avSummary`
 *
 */
angular
    .module('app.ui')
    .directive('avSummary', avSummary);

/**
 * `avSummary` directive body.
 *
 * @function avSummary
 * @return {object} directive body
 */
function avSummary() {
    const directive = {
        restrict: 'E',
        templateUrl: templateUrls.summary,
        scope: { },
        controller: Controller,
        controllerAs: 'self',
        bindToController: true
    };

    return directive;
}

function Controller($mdDialog, $rootScope, $timeout, events, constants, modelManager, stateManager, commonService,
    version) {
    'ngInject';
    const self = this;

    // set author version and link to the repo
    self.versiongit = version;

    self.expandTree = expand;
    self.collapseTree = collapse;
    self.openPreview = openPreview;
    self.validateForm = validateForm;
    self.previewReady = previewReady;

    self.disableCollapseExpand = true;

    // set tree directive tag
    self.tabs = constants.schemas.map(item => ({
        model: `<av-tree tree="self.${item.split('.')[0]}"></av-tree>`
    }));

    setSubTab(constants);

    // on schema update, rebuild the tree (state object)
    events.$on(events.avSchemaUpdate, () => {
        initState();
    });

    // on switching language, rebuild the tree
    events.$on(events.avSwitchLanguage, () => {
        initState();
        setSubTab(constants);
    });

    // on validation enable expand and collapse
    events.$on(events.avValidateForm, () => {
        self.disableCollapseExpand = false;
    });

    function expand() { expandSummary(self, true); }
    function collapse() { expandSummary(self, false); }

    /**
     * Expand or collapse the summary
     *
     * @function expandSummary
     * @param {Object} summary summary object
     * @param {Boolean} value Value to set
     */
    function expandSummary(summary, value) {
        const arrSum = ['map', 'ui', 'services', 'version', 'language'];

        for (let el of arrSum) {
            walkTree(summary[el], 'expand', value);
        }
    }

    /**
     * Walk the tree to set expand or collapse
     *
     * @function walkTree
     * @param {Object} tree Tree to walk
     * @param {String} key Key to set value for
     * @param {Boolean} value Value to set
     */
    function walkTree(tree, key, value) {
        if (tree.hasOwnProperty(key)) {
            tree[key] = value;
        }
        if (tree.hasOwnProperty('items')) {
            for (let item of tree.items) {
                walkTree(item, key, value);
            }
        }
    }

    function validateForm() {
        initState();
        $rootScope.$broadcast(events.avValidateForm);
    }

    /**
     * Open a dialog window to show current configuration
     * @function initState
     */
    function initState() {
        constants.schemas.forEach(schema => {
            self[schema.split('.')[0]] = stateManager.getState(schema.split('.')[0]);
        });
    }

    /**
     * Check if preview can be done
     * @function previewReady
     * @return {Boolean} true if ready and false if not
     */
    function previewReady() {
        return stateManager.goNoGoPreview();
    }

    /**
     * Open a dialog window to show current configuration
     * @function openPreview
     */
    function openPreview() {
        // set the config to use by the preview window/iFrame
        localStorage.setItem('configpreview', modelManager.save(true));

        // set the array of languages to use by the preview window/iFrame
        const langs = commonService.setUniq([commonService.getLang()].concat(commonService.getLangs()));
        localStorage.setItem('configlangs', `["${langs.join('","')}"]`);

        $mdDialog.show({
            controller: previewController,
            controllerAs: 'self',
            templateUrl: templateUrls.preview,
            parent: $('.fgpa'),
            disableParentScroll: false,
            clickOutsideToClose: true,
            fullscreen: false
        });
    }

    function previewController($mdDialog) {
        'ngInject';
        const self = this;

        self.close = $mdDialog.hide;
    }

    /**
 * Set subTab ids once the document has loaded
 * @function setSubTab
 * @private
 * @param {Object} constants Constants service
 */
    function setSubTab(constants) {

        let readyStateCheckInterval = setInterval(() => {
            if (document.readyState === "complete") {
                clearInterval(readyStateCheckInterval);
                setSubTabID(constants);
            }
        }, 1000);
    }

    /**
 * Set subtab element id in document
 * @function setSubTabID
 * @private
 * @param {Object} constants Constants service
 */
    function setSubTabID(constants) {

        const sections = Object.getOwnPropertyNames(constants.subTabs);

        for (let section of sections) {
            for (let i of constants.subTabs[section].keys) {
                const elTab = angular.element('[class="nav nav-tabs"]');
                const childrenTab = Array.from(elTab[constants.subTabs[section].index].children);
                const elPane = angular.element('[class="tab-content "]');
                const childrenPane = Array.from(elPane[constants.subTabs[section].index].children);

                const subTabLength = constants.subTabs[section].keys.length;
                if (childrenTab.length === subTabLength && childrenPane.length === subTabLength) {
                    for (let [j, child] of childrenTab.entries()) {
                        const id = constants.subTabs[section].keys[j].replace(/\./g, '-')
                        child.setAttribute('id', id);
                    }
                    for (let [j, child] of childrenPane.entries()) {
                        const id = `${constants.subTabs[section].keys[j].replace(/\./g, '-')}-pane`;
                        child.setAttribute('id', id);
                    }
                }
            }
        }
    }
}
