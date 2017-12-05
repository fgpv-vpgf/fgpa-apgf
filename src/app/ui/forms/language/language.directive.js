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
function avLanguage($timeout, formService) {
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
    self.modelName = 'language';
    self.sectionName = $translate.instant('app.section.language');
    self.formService = formService;

    // when schema is loaded or create new config is hit, initialize the schema, form and model
    events.$on(events.avSchemaUpdate, () => init());

    // when user load a config file, set form and model
    events.$on(events.avLoadModel, () => modelManager.updateModel($scope, self.modelName));

    // when user change language, reset schema and form
    events.$on(events.avSwitchLanguage, () => {
        self.sectionName = $translate.instant('app.section.language');
        $scope.schema = modelManager.getSchema(self.modelName);

        $scope.form = angular.copy($scope.form);
        $scope.form = setForm();
    });

    function init() {
        $scope.model = modelManager.getModel(self.modelName);
        $scope.schema = modelManager.getSchema(self.modelName);

        // this form is a one item model so we need to parse it
        // it is { map: {..}, language: "en-ca" } we need to set it { map: {..}, language: { language: "en-ca" } }
        const modelValue = $scope.model;
        $scope.model = { };
        $scope.model.language = $.map(modelValue, value => [value] ).join('');

        $scope.form = angular.copy($scope.form);
        $scope.form = setForm();
    }

    events.$on(events.avValidateForm, () => {
        $scope.$broadcast('schemaFormValidate');
        modelManager.validateModel(self.modelName, $scope.activeForm, $scope);
    });

    function setForm() {
        return [{ 'key': 'language' }];
    }
}
