const templateUrl = require('./formtest.html');

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
    .directive('avFormtest', avFormtest);

/**
 * `avFormtest` directive body.
 *
 * @function avFormtest
 * @return {object} directive body
 */
function avFormtest(schemaForm) {
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

    self.modelName = 'test';
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

        // in this sample, we use layers has holder for tab arrray so we see a title even if no tab are present
        // this cause a problem with the keys with the on change event
        $scope.schema = {
            "schema": "test",
            "title": "Map",
            "description": "A set of service endpoints used by the viewer",
            "type": "object",
            "properties": {
                "favorites": {
                    "type": "object",
                    "properties": {
                        "favfirst": {
                            "title": "My first favorite",
                            "type": "string"
                        },
                        "favsecond": {
                            "title": "My second favorite",
                            "type": "string"
                        },
                        "subfav": {
                            "title": "Sub Fav",
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "propOne": {
                                        "title": "Prop One",
                                        "type": "string",
                                        "maxLength": 8,
                                        "validationMessage": "Max length is {{schema.maxLength}}"
                                    }
                                }
                            }
                        }
                    }
                },
                "layers": {
                    "type": "object",
                    "title": "My layers",
                    "properties": {
                        "firstArray": {
                            "title": "First Array",
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "propOne": {
                                        "title": "Prop One",
                                        "type": "string",
                                        "maxLength": 8,
                                        "validationMessage": "Max length is {{schema.maxLength}}"
                                    },
                                    "propTwo": {
                                        "title": "Prop Two",
                                        "type": "string",
                                        "maxLength": 128,
                                        "validationMessage": "Max length is {{schema.maxLength}}"
                                    },
                                    "nestedArray": {
                                        "title": "Nested Array",
                                        "type": "array",
                                        "default": [],
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "nestedPropOne": {
                                                    "title": "Nested Prop One",
                                                    "type": "string"
                                                },
                                                "nestedPropTwo": {
                                                    "title": "Nested Prop Two",
                                                    "type": "string"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        $scope.form = [
            {
                "key": "favorites",
                "items": [
                    {
                        "key": "favorites.favfirst",
                        "onChange": debounceService.registerDebounce(validate, constants.debSummary, false)
                    }, {
                        "key": "favorites.favsecond",
                        "onChange": debounceService.registerDebounce(validate, constants.debSummary, false)
                    }, {
                        "key": "favorites.subfav",
                        "type": "array",
                        "items": [
                            {
                                "key": "favorites.subfav[].propOne",
                                "title": "Prop one",
                                "onChange": debounceService.registerDebounce(validate, constants.debSummary, false)
                            }
                        ]
                    }
                ]
            }, {
                "key": "layers",
                "items": [{
                    "key": "layers.firstArray",
                    "title": "{{\"Tab \"+ value.propOne}}",
                    "startEmpty": true,
                    "type": "tabarray",
                    "onChange": debounceService.registerDebounce(validate, constants.debSummary, false),
                    "items": [
                        {
                            "key": "layers.firstArray[].propOne",
                            "title": "Prop one",
                            "onChange": debounceService.registerDebounce(validate, constants.debSummary, false)
                        },
                        {
                            "key": "layers.firstArray[].propTwo",
                            "title": "Prop two",
                            "onChange": debounceService.registerDebounce(validate, constants.debSummary, false)
                        }
                    ]
                }]
            },
            {
                "type": "actions",
                "items": [
                    { "type": 'button', "style": 'btn-info', "title": 'Validate', "onClick": validateForm }
                ]
            }
        ]
        //     {
        //       "key": "comments1",
        //       "type": "array",
        //       "add": "New",
        //       "remove": "Delete",
        //       "style": {
        //         "remove": "btn-danger"
        //       },
        //       "title": "{{ value.name || 'Tab '+$index }}",
        //       "items": [
        //           { "key": "comments1.comments",
        //             "items": [
        //                 { "key": "comments1.ßcomments[].name", "onChange": debounceService.registerDebounce(validate, constants.debSummary, false) }
        //             ]
        //       }
        //
        //       ]
        //     },
        //     {
        //         "key": "info",
        //         "items": [``
        //             { "key": "info.name", "onChange": debounceService.registerDebounce(validate, constants.debSummary, false) },
        //             { "key": "info.subname",
        //                 "onChange": debounceService.registerDebounce(modifyArray, constants.debSummary, false),
        //                 "startEmpty": true,
        //                 "items": [
        //                     { "key": "info.subname[].sub1", "placeholder": "Make a comment", "onChange": debounceService.registerDebounce(validate, constants.debSummary, false) },
        //                     { "key": "info.subname[].sub2", "onChange": debounceService.registerDebounce(validate, constants.debSummary, false) }
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

        // $scope.form = [
        //     {
        //       "key": "comments",
        //       "type": "array",
        //       "add": "New",
        //       "onChange": debounceService.registerDebounce(validate, constants.debSummary, false),
        //       "remove": "Delete",
        //       "style": {
        //         "remove": "btn-danger"
        //       },
        //       "title": "{{ value.name || 'Tab '+$index }}",
        //       "items": [
        //         { "key": "comments[].name", "onChange": debounceService.registerDebounce(validate, constants.debSummary, false) },
        //         "comments[].email",
        //         {
        //           "key": "comments[].comment",
        //           "type": "textarea"
        //         }
        //       ]
        //     },
        //     {
        //         "key": "info",
        //         "items": [
        //             { "key": "info.name", "onChange": debounceService.registerDebounce(validate, constants.debSummary, false) },
        //             { "key": "info.subname",
        //                 "onChange": debounceService.registerDebounce(modifyArray, constants.debSummary, false),
        //                 "startEmpty": true,
        //                 "items": [
        //                     { "key": "info.subname[].sub1", "placeholder": "Make a comment", "onChange": debounceService.registerDebounce(validate, constants.debSummary, false) },
        //                     { "key": "info.subname[].sub2", "onChange": debounceService.registerDebounce(validate, constants.debSummary, false) }
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
        console.log(model)
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
        $scope.model = modelManager.getModel(self.modelName);
        $scope.$broadcast('schemaFormValidate');
        $timeout(() => { modelManager.validateModel(self.modelName, $scope.activeForm); }, 2000);
    }
}
