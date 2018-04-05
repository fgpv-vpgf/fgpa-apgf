const templateUrl = require('../form.html');

/**
 * @module avLanguage
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avLanguage` directive for the language form
 *
 */
angular
    .module('app.ui')
    .directive('avLanguage', avLanguage);

/**
 * `avLanguage` directive body.
 *
 * @function avLanguage
 * @return {object} directive body
 */
function avLanguage() {
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
 * Language form controller
 *
 * @function Controller
 * @param {Object} $scope module scope
 * @param {Object} $translate Angular translation object
 * @param {Object} events Angular events object
 * @param {Object} modelManager service to manage Angular Schema Form model
 * @param {Object} stateManager service to manage model state for validation
 * @param {Object} formService service with common functions for form
 */
function Controller($scope, $translate, events, modelManager, stateManager, formService) {
    'ngInject';
    const self = this;
    self.modelName = 'language';
    self.sectionName = $translate.instant('app.section.language');
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
        self.sectionName = $translate.instant('app.section.language');
        init();
    });

    /**
     * Initialize Language form
     *
     * @function init
     * @private
     */
    function init() {
        $scope.schema = modelManager.getSchema(self.modelName);

        $scope.form = angular.copy($scope.form);
        $scope.form = setForm();
    }

    events.$on(events.avValidateForm, () => {
        $scope.$broadcast('schemaFormValidate');
        // There's no tab just the form
        stateManager.validateModel(self.modelName, $scope.activeForm, $scope.form, $scope.model);
    });

    /**
     * Set Language form
     *
     * @function setForm
     * @private
     * @return {Object} the language form
     */
    function setForm() {
        return [{ 'key': 'language' }];
    }
}
