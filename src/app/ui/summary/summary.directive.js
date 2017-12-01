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

function Controller($mdDialog, $rootScope, events, constants, modelManager) {
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
        constants.schemas.forEach(schema => {
            self[schema.split('.')[0]] = modelManager.getState(schema.split('.')[0]);
        });
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
        $rootScope.$broadcast(events.avValidateForm);
    }

    /**
     * Open a dialog window to show current configuration
     * @function openPreview
     */
    function openPreview() {
        // loop schemas to get model values
        const models = { };
        constants.schemas.forEach(schema => {
            const name = schema.split('.')[0];
            models[name] = modelManager.getModel(name, false);
        });

        // TODO: set language and version selection from a select box as part of #91 #92
        // TODO solve initialBasemap as part of #90
        models.version = '2.0';
        models.language = 'en-CA';
        models.map.initialBasemapId = '';

        // set the config to use by the preview window/iFrame
        localStorage.setItem('configpreview', JSON.stringify(models));

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
