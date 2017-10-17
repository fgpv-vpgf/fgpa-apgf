const templateUrl = require('../form.html');

/**
 * @module avService
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avService` directive for the service form
 *
 */
angular
    .module('app.ui')
    .directive('avService', avService);

/**
 * `avService` directive body.
 *
 * @function avService
 * @return {object} directive body
 */
function avService() {
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
    self.modelName = 'service';
    self.sectionName = $translate.instant('app.section.service');

    // when schema is loaded or create new config is hit, initialize the schema, form and model
    events.$on(events.avSchemaUpdate, () => init());

    // when user load a config file, set form and model
    events.$on(events.avLoadModel, () => modelManager.updateModel($scope, self.modelName));

    // when user change language, reset schema and form
    events.$on(events.avSwitchLanguage, () => {
        self.sectionName = $translate.instant('app.section.service');
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
        return [{
            "type": "help",
            "helpvalue": "<h4>Tabbed Array Example</h4><p>Tab arrays can have tabs to the left, top or right.</p>"
        }, {
            "key": "comments",
            "type": "tabarray",
            "add": "New",
            "remove": "Delete",
            "style": {
                "remove": "btn-danger"
            },
            "title": "{{ value.name || 'Tab '+$index }}",
            "items": [
                { "key": "comments[].name"},
                "comments[].email",
                {
                    "key": "comments[].comment",
                    "type": "textarea"
                }
            ]
        },
        {
            "type": "submit",
            "style": "btn-default",
            "title": "OK"
        }]
    }
}
