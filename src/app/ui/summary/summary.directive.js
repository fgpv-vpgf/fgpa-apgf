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

function Controller($scope, modelManager, events, $mdDialog, $sce) {
    'ngInject';
    const self = this;

    self.expandTree = expand;
    self.collapseTree = collapse;
    self.openPreview = openPreview;

    self.http = './index-one.html'; //('http://www.google.com') $sce.trustAsResourceUrl('./index-one.html');

    events.$on(events.avSchemaUpdate, (evt, schema) => { self[schema] = modelManager.getState(schema); });

    function expand() {
        walkTree(self, 'expand', true);
    }

    function collapse() {
        walkTree(self, 'expand', false);
    }

    function walkTree(tree, key, value) {
        for (let obj in tree) {
            if (tree.hasOwnProperty(key)) { tree[key] = value; }
            if (!!tree[obj] && typeof(tree[obj]) === 'object') {
                if (tree.hasOwnProperty(key)) { tree[key] = value; }
                walkTree(tree[obj], key, value);
            }
        }
    }

    function openPreview() {
        localStorage.setItem('configpreview', 'config/config-preview.json');

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
