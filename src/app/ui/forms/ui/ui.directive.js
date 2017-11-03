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

    function checkMenu(model, form) {
        self.showHelp = false;
        self.showAbout = false;
        model.forEach(item => {
            if (item.includes('help')) self.showHelp = true;
            if (item.includes('about')) self.showAbout = true;
        })
    }

    function isHelp() {
        return self.showHelp;
    }

    function isAbout() {
        return self.showAbout;
    }

    function isAboutString() {
        return self.showAbout && $scope.model.aboutChoice === true;
    }

    function isAboutFolder() {
        return self.showAbout && $scope.model.aboutChoice === false;
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
                    { 'key': 'sideMenu.items', "add": $translate.instant('button.add'), 'onChange': checkMenu },
                    { 'key': 'help', 'condition': isHelp },
                    {   'key': 'aboutChoice',
                        'type': 'radios',
                        'condition': isAbout,
                        'titleMap': [
                            { 'value': true, 'name': "No I don't understand these cryptic terms" },
                            { 'value': false, 'name': "Yes this makes perfect sense to me" }
                        ]
                    },
                    { 'key': 'aboutString', 'condition': isAboutString },
                    { 'key': 'aboutFolder', 'condition': isAboutFolder }
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
