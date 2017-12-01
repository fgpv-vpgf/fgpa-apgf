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
function avVersion($timeout, formService) {
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
    self.modelName = 'version';
    self.sectionName = $translate.instant('app.section.version');
    self.formService = formService;

    // when schema is loaded or create new config is hit, initialize the schema, form and model
    events.$on(events.avSchemaUpdate, () => init());

    // when user load a config file, set form and model
    events.$on(events.avLoadModel, () => modelManager.updateModel($scope, self.modelName));

    // when user change language, reset schema and form
    events.$on(events.avSwitchLanguage, () => {
        self.sectionName = $translate.instant('app.section.version');
        $scope.schema = modelManager.getSchema(self.modelName);

        $scope.form = angular.copy($scope.form);
        $scope.form = setForm();
    });

    function init() {
        $scope.model = modelManager.getModel(self.modelName);
        $scope.schema = modelManager.getSchema(self.modelName);

        // this form is a one item model so we need to parse it
        // it is { map: {..}, version: "en-ca" } we need to set it { map: {..}, version: { version: "en-ca" } }
        const modelValue = $scope.model;
        $scope.model = { };
        $scope.model.version = $.map(modelValue, value => [value] ).join('');

        $scope.form = angular.copy($scope.form);
        $scope.form = setForm();
    }

    events.$on(events.avValidateForm, () => {
        $scope.$broadcast('schemaFormValidate');
        modelManager.validateModel(self.modelName, $scope.activeForm, $scope);
    });

    function setForm() {
        return [{ 'key': 'version' }];
    }
}
