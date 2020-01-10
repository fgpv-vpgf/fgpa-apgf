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

/**
 * UI form controller
 *
 * @function Controller
 * @param {Object} $scope module scope
 * @param {Object} $translate Angular translation object
 * @param {Object} $timeout Angular timeout object
 * @param {Object} events Angular events object
 * @param {Object} modelManager service to manage Angular Schema Form model
 * @param {Object} stateManager service to manage model state for validation
 * @param {Object} formService service with common functions for form
 * @param {Object} commonService service with common functions
 */
function Controller($scope, $translate, $timeout, events, modelManager, stateManager, formService, commonService) {
    'ngInject';
    const self = this;
    self.modelName = 'ui';
    self.sectionName = $translate.instant('app.section.ui');
    self.formService = formService;
    self.aboutChoice = 'string';
    self.aboutContent = '';
    self.aboutFile = '';

    // when schema is loaded or create new config is hit, initialize the schema, form and model
    events.$on(events.avSchemaUpdate, () => {
        $scope.model = modelManager.getModel(self.modelName);
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

    /**
     * Initialize UI form
     *
     * @function init
     * @private
     */
    function init() {
        $scope.schema = modelManager.getSchema(self.modelName);

        getAboutChoice($scope.model);

        $scope.form = angular.copy($scope.form);
        $scope.form = setForm();
    }

    events.$on(events.avValidateForm, () => {
        $scope.$broadcast('schemaFormValidate');
        stateManager.validateModel(self.modelName, $scope.activeForm, $scope.form[0].tabs, $scope.model);
    });

    /**
     * Check side menu to see if we should show help anbd/or about section
     *
     * @function checkMenu
     * @private
     * @param {String} model model value
     * @param {Object} form form object
     */
    function checkMenu(model, form) {
        // FIXME: when we use condition, the item is remove from the model. When the item come back it looses all the
        // previously set info. We need a way to persist this info.
        self.showHelp = false;
        self.showAbout = false;
        model.forEach(item => {
            if (item.includes('help')) {
                self.showHelp = true;

                // reset value to default beacuse when we remove about from the array aboutChoice is emptied
                if (typeof $scope.model.help === 'undefined') {
                    $scope.model.help = { 'folderName': 'default' };
                }
            }
            if (item.includes('about')) {
                self.showAbout = true;

                // reset value to default because when we remove about from the array aboutChoice is emptied
                if (typeof $scope.model.about === 'undefined') {
                    $scope.model.about = {
                        'aboutChoice': self.aboutChoice,
                        'content': self.aboutContent,
                        'folderName': self.aboutFolder
                    }
                }
            }
        })
    }

    /**
     * Set about content and file for persistence
     *
     * @function getAboutChoice
     * @private
     * @param {Object} model model
     */
    function getAboutChoice(model) {

        if (model.hasOwnProperty('about')) {
            // content
            if (model.about.hasOwnProperty('content')) {
                self.aboutContent = model.about.content;
                self.aboutChoice = 'string';
                model.about.aboutChoice = 'string';
            } else { // file
                self.aboutFile = model.about.aboutFolder;
                self.aboutChoice = 'folder';
                model.about.aboutChoice = 'folder';
            }
        }
    }

    /**
     * Return if help should be shown
     *
     * @function isHelp
     * @private
     * @return {Boolean} if help section should be shown
     */
    function isHelp() {
        return self.showHelp;
    }

    /**
     * Return if about should be shown
     *
     * @function isAbout
     * @private
     * @return {Boolean} if about section should be shown
     */
    function isAbout() {
        return self.showAbout;
    }

    /**
     * Return if about string should be shown
     *
     * @function isAboutString
     * @private
     * @return {Boolean} if about string section should be shown
     */
    function isAboutString() {
        const about = $scope.model.about;
        return self.showAbout && typeof about !== 'undefined' && about.aboutChoice === 'string';
    }

    /**
     * Return if about folder should be shown
     *
     * @function isAboutFolder
     * @private
     * @return {Boolean} if about folder section should be shown
     */
    function isAboutFolder() {
        const about = $scope.model.about;
        return self.showAbout && typeof about !== 'undefined' && about.aboutChoice === 'folder';
    }

    /**
     * Reorder the nav button array with first in order
     *
     * @function orderNavButtons
     * @private
     * @param {String} model model value
     */
    function orderNavButtons(model) {
        if (typeof model !== 'boolean') {
            const order = model.map(item => $translate.instant(`form.ui.enum${item}`)).join(', ');
            $('.av-navbar-extra .help-block')[0].innerText = `${$translate.instant('form.ui.navbarorder')} ${order}`;
        }
    }

    /**
     * Set UI form
     *
     * @function setForm
     * @private
     * @return {Object} the UI form
     */
    function setForm() {
        return [
            { 'type': 'tabs', 'htmlClass': 'av-inner-tab', 'tabs': [
                { 'title': $translate.instant('form.ui.general'), 'items': [
                    { 'key': 'fullscreen' },
                    // FIXME: not use inside the viewer... see if still needed { 'key': 'theme' },
                    { 'key': 'failureFeedback', 'htmlClass': 'av-form-advance hidden' },
                    {
                        'type': 'fieldset', 'key': 'legend', 'items': [
                            {
                                'type': "template",
                                'template': '<div class="av-legend-link" ng-click="form.link()">{{form.name}}</div>',
                                'name': $translate.instant('form.ui.gomap'),
                                'link': () => commonService.clickSubTab(1, 'legend')
                            },
                            { 'key': 'legend.reorderable' },
                            { 'key': 'legend.allowImport' },
                            { 'key': 'legend.isOpen' }
                        ]
                    },
                    { 'key': 'tableIsOpen', 'htmlClass': 'av-form-advance hidden', 'items': [
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
                        { 'key': 'tableIsOpen.large' },
                        { 'key': 'tableIsOpen.medium' },
                        { 'key': 'tableIsOpen.small' }
                    ] }
                ] },
                { 'title': $translate.instant('form.ui.appbar'), 'items': [
                    { 'key': 'appBar', 'notitle': true }
                ] },
                { 'title': $translate.instant('form.ui.nav'), 'items': [
                    { 'key': 'restrictNavigation' },
                    { 'key': 'navBar', 'items': [
                        // FIXME: not working in the viewer, see if still needed { 'key': 'navBar.zoom' },
                        { 'key': 'navBar.extra', 'htmlClass': 'av-navbar-extra', 'onChange':  orderNavButtons, 'titleMap': {
                            'geoLocator': $translate.instant('form.ui.enumgeoLocator'),
                            'home': $translate.instant('form.ui.enumhome'),
                            'basemap': $translate.instant('form.ui.enumbasemap'),
                            'help': $translate.instant('form.ui.enumhelp'),
                            'fullscreen': $translate.instant('form.ui.enumfullscreen'),
                            'geoSearch': $translate.instant('form.ui.enumgeoSearch'),
                            'sideMenu': $translate.instant('form.ui.enumsideMenu'),
                            'layers': $translate.instant('form.ui.enumlayers')
                        } }
                        // FIXME those are in the schema "geoLocator","marquee","home","history","basemap","help","fullscreen","geoSearch","sideMenu","layers"
                        // removed "marquee", "history" are not implemented
                    ] }
                ] },
                { 'title': $translate.instant('form.ui.sidemenu'), 'items': [
                    { 'key': 'title', 'validationMessage': form => self.formService.setErrorMessage(form, 'form.ui.titlevalidation', ['viewValue.length', 'schema.maxLength']) },
                    { 'key': 'sideMenu.logo', 'htmlClass': 'av-form-advance hidden', 'onChange': () => $timeout(() => { $('.av-ui-logourl').removeClass('hidden'); }, 500) },
                    { 'key': 'logoUrl', 'htmlClass': 'av-form-advance hidden av-ui-logourl', 'condition': 'model.sideMenu.logo' },
                    { 'key': 'sideMenu.items', 'title': $translate.instant('form.ui.items'), 'add': $translate.instant('button.add'), 'onChange': checkMenu, 'titleMap': {
                        'layers': $translate.instant('form.ui.enumlayers'),
                        'basemap': $translate.instant('form.ui.enumbasemap'),
                        'geoLocator': $translate.instant('form.ui.enumgeoLocator'),
                        'about': $translate.instant('form.ui.enumabout'),
                        'fullscreen': $translate.instant('form.ui.enumfullscreen'),
                        'help': $translate.instant('form.ui.enumhelp'),
                        'export': $translate.instant('form.ui.enumexport'),
                        'share': $translate.instant('form.ui.enumshare'),
                        'touch': $translate.instant('form.ui.enumshare'),
                        'language': $translate.instant('form.ui.enumlanguage'),
                        'plugins': $translate.instant('form.ui.enumplugins')
                    } },
                    { 'key': 'help', 'condition': isHelp },
                    // do not set as advance config, there is a bug. We need to uncheck and check again to see the help section
                    { 'type': 'fieldset', 'key': 'about', 'condition': isAbout,'items': [
                        {   'key': 'about.aboutChoice',
                            'title': $translate.instant('form.ui.aboutChoice'),
                            'type': 'select',
                            'titleMap': [
                                { 'value': "string", 'name': $translate.instant('form.ui.aboutstring') },
                                { 'value': "folder", 'name': $translate.instant('form.ui.aboutfile') }
                            ]
                        },
                        { 'key': 'about.content', 'type':"textarea", 'condition': isAboutString },
                        { 'key': 'about.folderName', 'condition': isAboutFolder }
                    ]}
                ] }
            ] }
        ];
    }
}
