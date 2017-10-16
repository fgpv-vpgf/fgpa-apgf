const templateUrl = require('./map.html');

/**
 * @module avMap
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avMap`
 *
 */
angular
    .module('app.ui')
    .directive('avMap', avMap);

/**
 * `avMap` directive body.
 *
 * @function avMap
 * @return {object} directive body
 */
function avMap(schemaForm) {
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

    self.modelName = 'map';
    self.buttonClick = validate;

    // when schema is loaded, initialize the form
    events.$on(events.avSchemaUpdate, (evt, schema) => { if (schema === self.modelName) init(); });

    // when user create a new config, reset the form
    events.$on(events.avNewModel, () => resetModel());

    // when user load a config file, set model
    events.$on(events.avLoadModel, () => updateModel());

    function init() {
        $scope.model = modelManager.getModel(self.modelName);
        $scope.schema = modelManager.getSchema(self.modelName);

        $scope.form = ['*', {
                "type": "actions",
                "items": [
                    { "type": 'button', "style": 'btn-info', "title": 'Validate', "onClick": validateForm }
                ]
            }];
        //     {
        //         "key": "info",
        //         "items": [
        //             { "key": "info.name", "onChange": debounceService.registerDebounce(validate, constants.debSummary, false) },
        //             { "key": "info.subname",
        //                 "startEmpty": true,
        //                 "items": [
        //                     { "key": "info.subname[].sub1", "placeholder": "Make a comment" },
        //                     { "key": "info.subname[].sub2" }
        //                 ]
        //             }
        //         ]
        //     }, {
        //         "key": "email",
        //         "onChange": debounceService.registerDebounce(validate, constants.debSummary, false)
        //     }, {
        //         "key": "comment",
        //         "type": "textarea",
        //         "placeholder": "Make a comment",
        //         "onChange": debounceService.registerDebounce(validate, constants.debSummary, false)
        //     }, {
        //         "key": "eligible",
        //         "onChange": debounceService.registerDebounce(validate, constants.debSummary, false)
        //     }, {
        //         "type": "conditional",
        //         "condition": "model.eligible",
        //         "items": [
        //             {
        //                 "key": "code",
        //                 "placeholder": "ex. 666",
        //                 "onChange": debounceService.registerDebounce(validate, constants.debSummary, false)
        //             }
        //         ]
        //     },
        //     {
        //         "type": "actions",
        //         "items": [
        //             { "type": 'button', "style": 'btn-info', "title": 'Validate', "onClick": validateForm }
        //         ]
        //     }
        // ];
    }

    function validateForm(form, model) {
        // First we broadcast an event so all fields validate themselves then we validate the model to update
        // summary panel
        $scope.$broadcast('schemaFormValidate');
        modelManager.validateModel(self.modelName, $scope.activeForm, $scope);

        // Then we check if the form is valid
        if ($scope.activeForm.$valid) {
            console.log("form is ", $scope.form);
            console.log("model is ", $scope.model);
        }
    }

    function validate(form, model) {
        console.log(model);

        // need to determine what type of object it is
        // const type = model.schema.type;
        //
        // if (type !== 'array') {
        //     const key = model.key.join('-');
        //     modelManager.setValidity(self.modelName, model.key, $scope.activeForm[`activeForm-${key}`].$valid);
        // } else {
        //     console.log('array');
        // }
    }

    function resetModel() {
        $scope.$broadcast('schemaFormRedraw');
        $scope.model = modelManager.resetModel(self.modelName);
        modelManager.resetValidity(self.modelName);
    }

    function updateModel() {
        $scope.model = modelManager.getModel(self.modelName, false);
        $scope.$broadcast('schemaFormValidate');
        $timeout(() => { modelManager.validateModel(self.modelName, $scope.activeForm); }, 2000);
    }
}
