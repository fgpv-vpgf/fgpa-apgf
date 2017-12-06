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

function Controller($scope, $translate, events, modelManager, formService) {
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

    function init() {
        $scope.schema = modelManager.getSchema(self.modelName);

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
