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
        bindToController: true
    };

    return directive;
}

function Controller($scope, $translate, events, modelManager) {
    'ngInject';
    const self = this;
    self.modelName = 'ui';
    self.sectionName = $translate.instant('app.section.ui');

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

    function setForm() {
        return [
            {
                "key": "fullscreen"
            }, {
                "key": "theme"
            }, {
                "key": "logoUrl"
            }, {
                "type": "actions",
                "items": [
                    { "type": 'button', "style": 'btn-info', "title": $translate.instant('button.validate'), "onClick": validateForm }
                ]
            }
        ];
    }
}
