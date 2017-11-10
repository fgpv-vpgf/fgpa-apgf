const templateUrl = require('../form.html');

/**
 * @module avUi
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avUi` directive for the ui form
 *
 */
angular
    .module('app.ui')
    .directive('avUi', avUi);

/**
 * `avUi` directive body.
 *
 * @function avUi
 * @return {object} directive body
 */
function avUi($timeout, formService) {
    const directive = {
        restrict: 'E',
        templateUrl,
        scope: { },
        controller: Controller,
        controllerAs: 'self',
        bindToController: true,
        link: (scope, element, attrs) => {
            scope.$on('sf-render-finished', (scope, element) => {
                if (scope.currentScope.self.advance) {
                    const model = scope.currentScope.self.modelName;
                    $timeout(() => formService.showAdvance(model), 100);
                }
            });
        }
    };

    return directive;
}

function Controller($scope, $translate, events, modelManager, formService) {
    'ngInject';
    const self = this;
    self.modelName = 'ui';
    self.sectionName = $translate.instant('app.section.ui');

    // manage the show advance configuration (add 'htmlClass': 'av-form-advance hidden' to fields who need advance config)
    self.advance = false;
    self.formService = formService;

    // when schema is loaded or create new config is hit, initialize the schema, form and model
    events.$on(events.avSchemaUpdate, () => init());

    // when user load a config file, set form and model
    events.$on(events.avLoadModel, () => modelManager.updateModel($scope, self.modelName));

    // when user change language, reset schema and form
    events.$on(events.avSwitchLanguage, () => {
        self.sectionName = $translate.instant('app.section.ui');
        $scope.schema = modelManager.getSchema(self.modelName);

        $scope.form = angular.copy($scope.form);
        $scope.form = setForm();
    });

    function init() {
        $scope.model = modelManager.getModel(self.modelName);
        $scope.schema = modelManager.getSchema(self.modelName);

        $scope.form = angular.copy($scope.form);
        $scope.form = setForm();
    }

    function validateForm() {
        // First we broadcast an event so all fields validate themselves then we validate the model to update
        // summary panel
        $scope.$broadcast('schemaFormValidate');
        modelManager.validateModel(self.modelName, $scope.activeForm, $scope);
    }

    // FIXME: when we use condition, the item is remove from the model. When the item come back it looses all the
    // previously set info. We need a way to persist this info.
    function checkMenu(model, form) {
        self.showHelp = false;
        self.showAbout = false;
        model.forEach(item => {
            if (item.includes('help')) {
                self.showHelp = true;

                // reset value to default beacuse when we remove about from the array aboutChoice is emptied
                $scope.model.help = { 'folderName': 'default' };
            }
            if (item.includes('about')) {
                self.showAbout = true;

                // reset value to default beacuse when we remove about from the array aboutChoice is emptied
                $scope.model.aboutChoice = 'string';
            }
        })
    }

    function isHelp() {
        return self.showHelp;
    }

    function isAbout() {
        return self.showAbout;
    }

    function isAboutString() {
        return self.showAbout && $scope.model.aboutChoice === 'string';
    }

    function isAboutFolder() {
        return self.showAbout && $scope.model.aboutChoice === 'folder';
    }

    function setForm() {
        return [
            { 'type': 'tabs', 'tabs': [
                { 'title': $translate.instant('form.ui.general'), 'items': [
                    { 'key': 'fullscreen' },
                    { 'key': 'theme' },
                    { 'key': 'failureFeedback' },
                    {
                        'type': 'fieldset', 'title': 'Legend', 'items': [
                            { 'key': 'legend.reorderable' },
                            { 'key': 'legend.allowImport' }
                        ]
                    },
                    {
                        'type': 'fieldset', 'title': 'What is Open by Default', 'items': [
                            { 'key': 'legend.isOpen' },
                            { 'key': 'tableIsOpen' }
                        ]
                    }
                ] },
                { 'title': $translate.instant('form.ui.appbar'), 'items': [
                    { 'key': 'appBar', 'notitle': true }
                ] },
                { 'title': $translate.instant('form.ui.navbar'), 'items': [
                    { 'key': 'navBar', 'notitle': true },
                    { 'key': 'restrictNavigation' }
                ] },
                { 'title': $translate.instant('form.ui.sidemenu'), 'items': [
                    { 'key': 'sideMenu.logo' },
                    { 'key': 'logoUrl', 'condition': 'model.sideMenu.logo' },
                    { 'key': 'title' },
                    { 'key': 'sideMenu.items', 'add': $translate.instant('button.add'), 'onChange': checkMenu },
                    { 'key': 'help', 'condition': isHelp },
                    { 'type': 'fieldset', 'title': $translate.instant('form.ui.about'), 'condition': isAbout,'items': [
                        {   'key': 'aboutChoice',
                            'type': 'select',
                            'titleMap': [
                                { 'value': "string", 'name': $translate.instant('form.ui.aboutstring') },
                                { 'value': "folder", 'name': $translate.instant('form.ui.aboutfile') }
                            ]
                        },
                        { 'key': 'about.content', 'condition': isAboutString },
                        { 'key': 'about.folderName', 'condition': isAboutFolder }
                    ]}
                ] }
            ] }, {
                'type': 'actions',
                'items': [
                    { 'type': 'button', 'style': 'btn-info', 'title': $translate.instant('button.validate'), 'onClick': validateForm }
                ]
            }
        ];
    }
}
