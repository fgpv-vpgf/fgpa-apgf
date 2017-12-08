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

function Controller($mdDialog, $rootScope, events, constants, modelManager, commonService) {
    'ngInject';
    const self = this;

    self.expandTree = expand;
    self.collapseTree = collapse;
    self.openPreview = openPreview;
    self.validateForm = validateForm;

    // set tree directive tag
    self.tabs = constants.schemas.map(item => ({
        model: `<av-tree tree="self.${item.split('.')[0]}"></av-tree>`
    }));

    // on schema update, rebuild the tree (state object)
    events.$on(events.avSchemaUpdate, () => {
        initState();
    });

    events.$on(events.avSwitchLanguage, () => {
        initState();
    });


    function expand() { walkTree(self, 'expand', true); }
    function collapse() { walkTree(self, 'expand', false); }

    /**
     * Walk the tree to set expand or collapse
     *
     * @function walkTree
     * @param {Object} tree Tree to walk
     * @param {String} key Key to set value for
     * @param {Boolean} value Value to set
     */
    function walkTree(tree, key, value) {
        for (let obj in tree) {
            if (tree.hasOwnProperty(key)) { tree[key] = value; }
            if (!!tree[obj] && typeof(tree[obj]) === 'object') {
                if (tree.hasOwnProperty(key)) { tree[key] = value; }
                walkTree(tree[obj], key, value);
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
            self[schema.split('.')[0]] = modelManager.getState(schema.split('.')[0]);
        });
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
}
