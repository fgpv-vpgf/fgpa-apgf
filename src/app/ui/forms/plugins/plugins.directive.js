const templateUrl = require('../form.html');

/**
 * @module avPlugins
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avPlugins` directive for the plugins form
 *
 */
angular
    .module('app.ui')
    .directive('avPlugins', avPlugins);

/**
 * `avPlugins` directive body.
 *
 * @function avPlugins
 * @return {object} directive body
 */
function avPlugins() {
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
 * Plugins form controller
 *
 * @function Controller
 * @param {Object} $scope module scope
 * @param {Object} $translate Angular translation object
 * @param {Object} events Angular events object
 * @param {Object} modelManager service to manage Angular Schema Form model
 * @param {Object} stateManager service to manage model state for validation
 * @param {Object} formService service with common functions for form
 *  @param {Object} $timeout Angular timeout object
 */
function Controller($scope, $translate, events, modelManager, stateManager, formService, $timeout) {
    'ngInject';
    const self = this;
    self.modelName = 'plugins';
    self.sectionName = $translate.instant('app.section.plugins');
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
        self.sectionName = $translate.instant('app.section.plugins');
        init();
    });

    events.$on(events.avLayersIdUpdate, (evt, data) => {
        $scope.initLayerId = data;
    });

    /**
     * Initialize Plugins form
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
        stateManager.validateModel(self.modelName, $scope.activeForm, $scope.form[0].tabs, $scope.model);
    });

    /**
     * Set Plugins form
     *
     * @function setForm
     * @private
     * @return {Object} the plugins form
     */
    function setForm() {
        return [
            { 'type': 'tabs', 'htmlClass': 'av-inner-tab', 'tabs': [
                { 'title': $translate.instant('form.plugins.rangeslider'), 'key': 'rangeSlider', 'items': [
                    { 'key': 'rangeSlider.enable' },
                    { 'key': 'rangeSlider.controls', 'condition': 'model.rangeSlider.enable === true', 'titleMap': [
                        { value: 'lock', name: $translate.instant('form.plugins.rangesliderctrllock') },
                        { value: 'loop', name: $translate.instant('form.plugins.rangesliderctrlloop') },
                        { value: 'delay', name: $translate.instant('form.plugins.rangesliderctrldelay') },
                        { value: 'export', name: $translate.instant('form.plugins.rangesliderctrlexport') },
                        { value: 'refresh', name: $translate.instant('form.plugins.rangesliderctrlrefresh') }
                    ] },
                    { 'key': 'rangeSlider.params', 'condition': 'model.rangeSlider.enable === true', 'items': [
                        { 'key': 'rangeSlider.params.type', 'type': 'select', 'titleMap': [
                            { value: 'date', name: $translate.instant('format.date') },
                            { value: 'number', name: $translate.instant('format.number') }
                        ] },
                        { 'key': 'rangeSlider.params.delay', 'titleMap': [
                            { value: '3000', name: '3 sec' },
                            { value: '4000', name: '4 sec' },
                            { value: '5000', name: '5 sec' },
                            { value: '6000', name: '6 sec' },
                            { value: '7000', name: '7 sec' }
                        ] },
                        { 'key': 'rangeSlider.params.range' },
                        { 'key': 'rangeSlider.params.limit' }
                    ] },
                    { 'key': 'rangeSlider.layers', 'add': $translate.instant('button.add'), 'condition': 'model.rangeSlider.enable === true', 'items': [
                        { 'type': 'fieldset', 'htmlClass': 'av-rangeSlider', 'items': [
                            {
                                'key': 'rangeSlider.layers[].id',
                                'type': 'dynamic-select',
                                'optionData': 'initLayerId',
                                'model': 'id',
                                'array': true
                            },
                            // there is a problem with the validation. Need to add custom one
                            { 'key': 'rangeSlider.layers[].field','validationMessage':
                                { 'empty': $translate.instant('form.validation.required') },
                            '$validators': { empty: function(value) {
                                return (angular.isString(value) && value === '') ? false : true;
                            } } }
                        ] }
                    ] }
                ] }
            ] }
        ];
    }
}
