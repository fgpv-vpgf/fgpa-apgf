const templateUrl = require('./service.html');

/**
 * @module avService
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avService`
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
function avService(schemaForm) {
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

function Controller($scope, modelManager, debounceService, constants, events, $timeout) {
    'ngInject';
    const self = this;

    self.modelName = 'service';
    self.buttonClick = validate;

    // when schema is loaded, initialize the form
    events.$on(events.avSchemaUpdate, (evt, schema) => { if (schema === self.modelName) init(); });

    // when user create a new config, reset the form
    events.$on(events.avNewModel, () => resetModel());

    // when user load a config file, set model
    events.$on(events.avLoadModel, () => updateModel());

    function init() {
        $scope.model = modelManager.getModel(self.modelName);
        // $scope.schema = modelManager.getSchema(self.modelName);

        $scope.schema = {
  "type": "object",
  "title": "Comment",
  "properties": {
    "comments": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": {
            "title": "Name",
            "type": "string"
          },
          "email": {
            "title": "Email",
            "type": "string",
            "pattern": "^\\S+@\\S+$",
            "description": "Email will be used for evil."
          },
          "comment": {
            "title": "Comment",
            "type": "string",
            "maxLength": 20,
            "validationMessage": "Don't be greedy!"
          }
        },
        "required": [
          "name",
          "email",
          "comment"
        ]
      }
    }
  }
}
        $scope.form = [
  {
    "type": "help",
    "helpvalue": "<h4>Tabbed Array Example</h4><p>Tab arrays can have tabs to the left, top or right.</p>"
  },
  {
    "key": "comments",
    "type": "tabarray",
    "add": "New",
    "onChange": debounceService.registerDebounce(validate, constants.debSummary, false),
    "remove": "Delete",
    "style": {
      "remove": "btn-danger"
    },
    "title": "{{ value.name || 'Tab '+$index }}",
    "items": [
      { "key": "comments[].name", "onChange": debounceService.registerDebounce(validate, constants.debSummary, false) },
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
  }
]
        // $scope.form = [
        //     '*',
        //     {
        //         "type": "actions",
        //         "items": [
        //             { "type": 'button', "style": 'btn-info', "title": 'Validate', "onClick": validateForm }
        //         ]
        //     }
        // ];
    }

    function validateForm(form, model) {
        // First we broadcast an event so all fields validate themselves
        $scope.$broadcast('schemaFormValidate');
        modelManager.validateModel(self.modelName, $scope.activeForm);

        // Then we check if the form is valid
        if ($scope.activeForm.$valid) {
            console.log("form is ", $scope.form);
            console.log("model is ", $scope.model);
        }
    }

    function validate(form, model) {
        const key = model.key.join('-');
        // modelManager.setValidity(self.modelName, key, $scope.activeForm[`activeForm-${key}`].$valid);
    }

    function resetModel() {
        $scope.$broadcast('schemaFormRedraw');
        $scope.model = modelManager.resetModel(self.modelName);
        modelManager.resetValidity(self.modelName);
    }

    function updateModel() {
        $scope.model = modelManager.getModel(self.modelName);
        $scope.$broadcast('schemaFormValidate');
        $timeout(() => { modelManager.validateModel(self.modelName, $scope.activeForm); }, 2000);
    }
}
