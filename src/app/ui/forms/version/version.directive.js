const templateUrl = require('../form.html');

/**
 * @module avVersion
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avVersion` directive for the version form
 *
 */
angular
    .module('app.ui')
    .directive('avVersion', avVersion);

/**
 * `avVersion` directive body.
 *
 * @function avVersion
 * @return {object} directive body
 */
function avVersion() {
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
 * Version form controller
 *
 * @function Controller
 * @param {Object} $scope module scope
 * @param {Object} $translate Angular translation object
 * @param {Object} events Angular events object
 * @param {Object} modelManager service to manage Angular Schema Form model
 * @param {Object} stateManager service to manage model state for validation
 * @param {Object} formService service with common functions for form
 * @param {Object} debounceService service to debounce user input
 */
function Controller($scope, $translate, events, modelManager, stateManager, formService, debounceService) {
    'ngInject';
    const self = this;
    self.modelName = 'version';
    self.sectionName = $translate.instant('app.section.version');
    self.formService = formService;

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
        self.sectionName = $translate.instant('app.section.version');
        init();
    });

    /**
     * Initialize Version form
     *
     * @function init
     * @private
     */
    function init() {
        $scope.schema = modelManager.getSchema(self.modelName);
        setLocalVersion();

        $scope.form = angular.copy($scope.form);
        $scope.form = setForm();

        events.$broadcast(events.avVersionSet);
    }

    /**
     * Set local storage viewerversion parameter
     *
     * @function setLocalVersion
     * @private
     */
    function setLocalVersion() {
        localStorage.setItem('viewerversion', modelManager.getModel('version', false).version);
        localStorage.setItem('viewerenv', modelManager.getModel('version', false).version === '2.5.0' ? 'dev' : '');
    }

    events.$on(events.avValidateForm, () => {
        $scope.$broadcast('schemaFormValidate');
        // There's no tab just the form
        stateManager.validateModel(self.modelName, $scope.activeForm, $scope.form, $scope.model);
    });

    /**
     * Set Version form
     *
     * @function setForm
     * @private
     * @return {Object} the version form
     */
    function setForm() {
        return [{ 'key': 'version', 'onChange': debounceService.registerDebounce(model => {
            setLocalVersion();
            events.$broadcast(events.avVersionSet);
        }) },
        { 'key': 'Comment', 'onChange': debounceService.registerDebounce(model => {
            setLocalVersion();
            events.$broadcast(events.avVersionSet);
        }) }];
    }
}
