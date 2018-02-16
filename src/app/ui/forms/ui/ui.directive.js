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
function avUi() {
    const directive = {
        restrict: 'E',
        templateUrl,
        scope: { },
        controller: Controller,
        controllerAs: 'self',
        bindToController: true,
        link: (scope, element, attrs) => {
            scope.$on('sf-render-finished', (scope, element) => {
            });
        }
    };

    return directive;
}

function Controller($scope, $translate, $timeout, events, modelManager, stateManager, formService, commonService) {
    'ngInject';
    const self = this;
    self.modelName = 'ui';
    self.sectionName = $translate.instant('app.section.ui');
    self.formService = formService;
    self.aboutContent = '';
    self.aboutFile = '';

    // when schema is loaded or create new config is hit, initialize the schema, form and model
    events.$on(events.avSchemaUpdate, () => {
        $scope.model = modelManager.getModel(self.modelName);
        getAboutChoice($scope.model);
        init();
    });

    // when user load a config file, set form and model
    events.$on(events.avLoadModel, () => {
        modelManager.updateModel($scope, self.modelName);
        init();
    });

    // when user change language, reset schema and form
    events.$on(events.avSwitchLanguage, () => {
        self.sectionName = $translate.instant('app.section.ui');
        init();
    });

    events.$on(events.avLayersIdUpdate, (evt, data) => {
        $scope.initLayerId = data;
    });

    function init() {
        $scope.schema = modelManager.getSchema(self.modelName);

        $scope.form = angular.copy($scope.form);
        $scope.form = setForm();
    }

    events.$on(events.avValidateForm, () => {
        $scope.$broadcast('schemaFormValidate');
        stateManager.validateModel(self.modelName, $scope.activeForm, $scope.form[0].tabs, $scope.model);
    });

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

                // reset value to default because when we remove about from the array aboutChoice is emptied
                $scope.model.about.aboutChoice = 'string';
                $scope.model.about.content = self.aboutContent;
                $scope.model.about.folderName = self.aboutFolder;
            }
        })
    }

    /**
     * Set about content and file for persistence
     * @function getAboutChoice
     * @param {Object} model model
     */
    function getAboutChoice(model) {

        if (model.hasOwnProperty('about')) {
            // content
            if (model.about.hasOwnProperty('content')) {
                self.aboutContent = model.about.content;
            } else { // file
                self.aboutFile = model.about.aboutFolder;
            }
        }
    }

    function isHelp() {
        return self.showHelp;
    }

    function isAbout() {
        return self.showAbout;
    }

    function isAboutString() {
        const about = $scope.model.about;
        return self.showAbout && typeof about !== 'undefined' && about.aboutChoice === 'string';
    }

    function isAboutFolder() {
        const about = $scope.model.about;
        return self.showAbout && typeof about !== 'undefined' && about.aboutChoice === 'folder';
    }

    function setForm() {
        return [
            { 'type': 'tabs', 'tabs': [
                { 'title': $translate.instant('form.ui.general'), 'items': [
                    { 'key': 'fullscreen' },
                    { 'key': 'theme' },
                    { 'key': 'failureFeedback', 'htmlClass': 'av-form-advance hidden' },
                    {
                        'type': "template",
                        'template': '<legend class="ng-binding">{{form.name}} </legend>',
                        'name': $translate.instant('ui.legend.title')
                    },
                    {
                        'type': "template",
                        'template': '<span ng-click="form.link()">{{form.name}}</span><p></p>',
                        'name': $translate.instant('form.ui.gomap'),
                        'link': () => commonService.clickSubTab(1, 'legend')
                    },
                    {
                        'type': 'fieldset', 'key': 'legend', 'notitle': true,
                        'items': [
                            { 'key': 'legend.reorderable' },
                            { 'key': 'legend.allowImport' },
                            { 'key': 'legend.isOpen' }
                        ]
                    },
                    { 'key': 'tableIsOpen', 'items': [
                        {
                            'key': 'tableIsOpen.id',
                            'type': 'dynamic-select',
                            'optionData': 'initLayerId',
                            'model': 'tableIsOpen_id',
                            'array': false,
                            // because the item is more then 1 level deep we need to define a temp model to link to the dynamic-select
                            // this temp model will be save to config file as well use same name with _ to replace .
                            'onChange': (model, data) => { $timeout(() => { $scope.model.tableIsOpen_id = model; $scope.model.tableIsOpen.id = model; }, 1000); }
                        },
                        { 'key': 'tableIsOpen.small' },
                        { 'key': 'tableIsOpen.medium' },
                        { 'key': 'tableIsOpen.large' }
                    ] }
                ] },
                { 'title': $translate.instant('form.ui.appbar'), 'items': [
                    { 'key': 'appBar', 'notitle': true }
                ] },
                { 'title': $translate.instant('form.ui.nav'), 'items': [
                    { 'key': 'restrictNavigation' },
                    { 'key': 'navBar' }
                ] },
                { 'title': $translate.instant('form.ui.sidemenu'), 'items': [
                    { 'key': 'title', 'validationMessage': form => self.formService.setErrorMessage(form, 'form.ui.titlevalidation', ['viewValue.length', 'schema.maxLength']) },
                    { 'key': 'sideMenu.logo' },
                    { 'key': 'logoUrl', 'condition': 'model.sideMenu.logo' },
                    { 'key': 'sideMenu.items', 'title': $translate.instant('form.ui.items'), 'add': $translate.instant('button.add'), 'onChange': checkMenu },
                    { 'key': 'help', 'condition': isHelp },
                    { 'type': 'fieldset', 'key': 'about', 'condition': isAbout,'items': [
                        {   'key': 'about.aboutChoice',
                            'title': $translate.instant('form.ui.aboutChoice'),
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
            ] }
        ];
    }
}
