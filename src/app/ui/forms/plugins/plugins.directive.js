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
 * @param {Object} debounceService service to debounce user input
 * @param {Object} constants service with all application constant
 * @param {Object} commonService service with common functions
 */
function Controller($scope, $translate, events, modelManager, stateManager, formService, debounceService, constants,
    commonService) {
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
        console.log(parseInt(modelManager.getModel('version', false).version))
        return [
            { 'type': 'tabs', 'htmlClass': 'av-inner-tab', 'tabs': [
                { 'title': $translate.instant('form.plugins.coordinfo'), 'key': 'coordInfo', 'items': [
                    { 'type': 'template', 'template': self.formService.addCustomAccordion($translate.instant('form.custom.help'), `help/info-plugins-${commonService.getLang()}.md`, true) },
                    { 'key': 'coordInfo.enable' }
                ] },
                { 'title': $translate.instant('form.plugins.aois'), 'key': 'areasOfInterest', 'items': [
                    { 'type': 'template', 'template': self.formService.addCustomAccordion($translate.instant('form.custom.help'), `help/info-plugins-${commonService.getLang()}.md`, true) },
                    { 'key': 'areasOfInterest.enable' },
                    { 'key': 'areasOfInterest.areas', 'condition': 'model.areasOfInterest.enable === true', 'title': $translate.instant('form.plugins.aois'), 'htmlClass': 'av-accordion-all', 'startEmpty': true, 'onChange': () => {
                        // new item, create accordion
                        events.$broadcast(events.avNewItems);
                    }, 'add': $translate.instant('button.add'), 'items': [
                        { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle', 'title': $translate.instant('form.plugins.aoi'), 'items': [
                            { 'type': 'help', 'htmlClass': 'av-form-advance hidden', 'helpvalue': '<div class="help-block">' + $translate.instant('form.map.expcoldesc') + '<div>' },
                            { 'key': 'areasOfInterest.areas[]', 'htmlClass': `av-accordion-content`, 'notitle': true, 'items': [
                                { 'key': 'areasOfInterest.areas[].title-en-CA', 'targetLink': 'legend.0', 'targetParent': 'av-accordion-toggle', 'default': $translate.instant('form.plugins.aoi'), 'onChange': debounceService.registerDebounce((model, item) => {
                                    self.formService.copyValueToFormIndex(model, item);}, constants.debInput, false)
                                },
                                { 'key': 'areasOfInterest.areas[].title-fr-CA', 'targetLink': 'legend.0', 'targetParent': 'av-accordion-toggle', 'default': $translate.instant('form.plugins.aoi'), 'onChange': debounceService.registerDebounce((model, item) => {
                                    self.formService.copyValueToFormIndex(model, item);}, constants.debInput, false)
                                },
                                { 'type': 'template', 'template': commonService.addButton('form.plugins', 'setaoi', 'setAreaOfInterest', 'av-setareaofinterest-button'), 'setAreaOfInterest': () => self.formService.setAreaOfInterest($scope.model.areasOfInterest.areas) },
                                { 'type': 'section', 'htmlClass': 'row ', 'items': [
                                    { 'key': 'areasOfInterest.areas[]', 'notitle': true, 'items': [
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'areasOfInterest.areas[].xmin', 'readonly': true }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'areasOfInterest.areas[].ymin', 'readonly': true }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'areasOfInterest.areas[].xmax', 'readonly': true }
                                        ] },
                                        { 'type': 'section', 'htmlClass': 'col-xs-3', 'items': [
                                            { 'key': 'areasOfInterest.areas[].ymax', 'readonly': true}
                                        ] }
                                    ] }
                                ] },
                                { 'key': 'areasOfInterest.areas[].thumbnailUrl' }
                            ] }
                        ] }
                    ] }
                ] },
                { 'title': $translate.instant('form.plugins.rangeslider'), 'key': 'rangeSlider', 'items': [
                    { 'type': 'template', 'template': self.formService.addCustomAccordion($translate.instant('form.custom.help'), `help/info-plugins-${commonService.getLang()}.md`, true) },
                    { 'key': 'rangeSlider.enable' },
                    { 'key': 'rangeSlider.open', 'condition': 'model.rangeSlider.enable === true' },
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
                ] },
                { 'title': $translate.instant('form.plugins.chart'), 'key': 'chart', 'items': [
                    { 'type': 'template', 'template': self.formService.addCustomAccordion($translate.instant('form.custom.help'), `help/info-plugins-${commonService.getLang()}.md`, true) },
                    { 'key': 'chart.enable' },
                    { 'key': 'chart.type', 'condition': 'model.chart.enable === true', 'titleMap': [
                        { value: 'pie', name: $translate.instant('form.plugins.chartpie') },
                        { value: 'bar', name: $translate.instant('form.plugins.chartbar') },
                        { value: 'line', name: $translate.instant('form.plugins.chartline') }
                    ] },
                    { 'key': 'chart.title', 'condition': 'model.chart.enable === true' },
                    { 'key': 'chart.options', 'condition': 'model.chart.enable === true', 'items': [
                        { 'key': 'chart.options.colors' },
                        { 'key': 'chart.options.cutOut', 'condition': 'model.chart.type === "pie"' }
                    ] },
                    { 'key': 'chart.labelsPie', 'condition': 'model.chart.enable === true && model.chart.type === "pie"', 'items': [
                        { 'key': 'chart.labelsPie.type', 'titleMap': [
                            { value: 'config', name: $translate.instant('form.plugins.chartconfig') },
                            { value: 'field', name: $translate.instant('form.plugins.chartfield') }
                        ] },
                        { 'key': 'chart.labelsPie.values' },
                        { 'key': 'chart.labelsPie.split' }
                    ] },
                    { 'key': 'chart.axis', 'condition': 'model.chart.enable === true && model.chart.type !== "pie"', 'items': [
                        { 'key': 'chart.axis.xAxis', 'items': [
                            { 'key': 'chart.axis.xAxis.type', 'condition': 'model.chart.enable === true && model.chart.type == "bar"', 'titleMap': [
                                { value: 'config', name: $translate.instant('form.plugins.chartconfig') },
                                { value: 'field', name: $translate.instant('form.plugins.chartfield') }
                            ] },
                            { 'key': 'chart.axis.xAxis.type', 'condition': 'model.chart.enable === true && model.chart.type == "line"', 'titleMap': [
                                { value: 'date', name: $translate.instant('form.plugins.chartdate') },
                                { value: 'linear', name: $translate.instant('form.plugins.chartlinear') }
                            ] },
                            { 'key': 'chart.axis.xAxis.title' },
                            { 'key': 'chart.axis.xAxis.values' },
                            { 'key': 'chart.axis.xAxis.split' }
                        ] },
                        { 'key': 'chart.axis.yAxis', 'items': [
                            { 'key': 'chart.axis.yAxis.type', 'titleMap': [
                                { value: 'config', name: $translate.instant('form.plugins.chartconfig') },
                                { value: 'field', name: $translate.instant('form.plugins.chartfield') }
                            ] },
                            { 'key': 'chart.axis.yAxis.title' },
                            { 'key': 'chart.axis.yAxis.values' },
                            { 'key': 'chart.axis.yAxis.split' }
                        ] }
                    ] },
                    // TODO: re enable add when geoapi will support layer id. At the same time re enable layer id selection
                    // TODO: remove default value = 0 inside the schema
                    // TODO: remove layer id explanation
                    { 'key': 'chart.layers', 'condition': 'model.chart.enable === true', 'add': null, 'items': [
                        { 'type': 'fieldset', 'htmlClass': 'av-tileschema', 'readonly': true, 'items': [
                            {
                                'key': 'chart.layers[].id',
                                'type': 'dynamic-select',
                                'optionData': 'initLayerId',
                                'model': 'id',
                                'array': true
                            }
                        ] },
                        { 'key': 'chart.layers[].data', 'title': $translate.instant('form.plugins.chartdata'), 'htmlClass': 'av-accordion-all', 'startEmpty': true, 'onChange': () => {
                            // new item, create accordion
                            events.$broadcast(events.avNewItems);
                        }, 'add': $translate.instant('button.add'), 'items': [
                            { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle', 'title': $translate.instant('form.plugins.chartdata'), 'items': [
                                { 'type': 'help', 'htmlClass': 'av-form-advance hidden', 'helpvalue': '<div class="help-block">' + $translate.instant('form.map.expcoldesc') + '<div>' },
                                { 'key': 'chart.layers[].data[]', 'htmlClass': `av-accordion-content`, 'notitle': true, 'items': [
                                    { 'key': 'chart.layers[].data[].type' },
                                    { 'key': 'chart.layers[].data[].measure', 'targetLink': 'legend.0', 'targetParent': 'av-accordion-toggle', 'default': $translate.instant('form.plugins.chartdata'), 'onChange': debounceService.registerDebounce((model, item) => {
                                        self.formService.copyValueToFormIndex(model, item);}, constants.debInput, false)
                                    },
                                    { 'key': 'chart.layers[].data[].regex' },
                                    { 'key': 'chart.layers[].data[].split' },
                                    { 'key': 'chart.layers[].data[].label', 'condition': 'model.chart.enable === true && model.chart.type === "pie"', 'items': [
                                        { 'key': 'chart.layers[].data[].label.type', 'titleMap': [
                                            { value: 'config', name: $translate.instant('form.plugins.chartconfig') },
                                            { value: 'field', name: $translate.instant('form.plugins.chartfield') }
                                        ] },
                                        { 'key': 'chart.layers[].data[].label.values' },
                                        { 'key': 'chart.layers[].data[].label.split' }
                                    ] },
                                    { 'key': 'chart.layers[].data[].prefix' },
                                    { 'key': 'chart.layers[].data[].suffix' }
                                ] }
                            ] }
                        ] }
                    ] }
                ] },
                { 'title': $translate.instant('form.plugins.swiper'), 'key': 'swiper', 'items': [
                    { 'type': 'template', 'template': self.formService.addCustomAccordion($translate.instant('form.custom.help'), `help/info-plugins-${commonService.getLang()}.md`, true) },
                    { 'key': 'swiper.enable' },
                    { 'key': 'swiper.type', 'condition': 'model.swiper.enable === true', 'titleMap': [
                        { value: 'vertical', name: 'Vertical' }
                    ] },
                    { 'key': 'swiper.keyboardOffset', 'condition': 'model.swiper.enable === true' },
                    { 'key': 'swiper.layers', 'add': $translate.instant('button.add'), 'condition': 'model.swiper.enable === true', 'items': [
                        { 'type': 'fieldset', 'htmlClass': 'av-swiper', 'items': [
                            {
                                'key': 'swiper.layers[].id',
                                'type': 'dynamic-select',
                                'optionData': 'initLayerId',
                                'model': 'id',
                                'array': true
                            }
                        ] }
                    ] }
                ] },
                { 'title': $translate.instant('form.plugins.draw'), 'key': 'draw', 'items': [
                    { 'type': 'template', 'template': self.formService.addCustomAccordion($translate.instant('form.custom.help'), `help/info-plugins-${commonService.getLang()}.md`, true) },
                    { 'key': 'draw.enable' },
                    { 'key': 'draw.open', 'condition': 'model.draw.enable === true' },
                    { 'key': 'draw.tools', 'condition': 'model.draw.enable === true', 'titleMap': [
                        { value: 'picker', name: $translate.instant('form.plugins.drawctrlpicker') },
                        { value: 'point', name: $translate.instant('form.plugins.drawctrlpoint') },
                        { value: 'polyline', name: $translate.instant('form.plugins.drawctrlpolyline') },
                        { value: 'polygon', name: $translate.instant('form.plugins.drawctrlpolygon') },
                        { value: 'edit', name: $translate.instant('form.plugins.drawctrledit') },
                        { value: 'measure', name: $translate.instant('form.plugins.drawctrlmeasure') },
                        { value: 'extent', name: $translate.instant('form.plugins.drawctrlextent') },
                        { value: 'write', name: $translate.instant('form.plugins.drawctrlwrite') },
                        { value: 'read', name: $translate.instant('form.plugins.drawctrlread') }
                    ] }
                ] },
                { 'title': $translate.instant('form.plugins.thematicslider'), 'key': 'thematicSlider', 'items': [
                    { 'type': 'template', 'template': self.formService.addCustomAccordion($translate.instant('form.custom.help'), `help/info-plugins-${commonService.getLang()}.md`, true) },
                    { 'key': 'thematicSlider.enable' },
                    { 'key': 'thematicSlider.open', 'condition': 'model.thematicSlider.enable === true' },
                    { 'key': 'thematicSlider.autorun', 'condition': 'model.thematicSlider.enable === true' },
                    { 'key': 'thematicSlider.loop', 'condition': 'model.thematicSlider.enable === true' },
                    { 'key': 'thematicSlider.description', 'condition': 'model.thematicSlider.enable === true' },
                    { 'key': 'thematicSlider.slider', 'condition': 'model.thematicSlider.enable === true' },
                    { 'key': 'thematicSlider.stack', 'condition': 'model.thematicSlider.enable === true' },
                    { 'key': 'thematicSlider.layers', 'add': $translate.instant('button.add'), 'condition': 'model.thematicSlider.enable === true', 'items': [
                        { 'type': 'fieldset', 'htmlClass': 'av-thematic-slider', 'items': [
                            {
                                'key': 'thematicSlider.layers[].id',
                                'type': 'dynamic-select',
                                'optionData': 'initLayerId',
                                'model': 'id',
                                'array': true
                            },
                            { 'key': 'thematicSlider.layers[].duration' },
                            { 'key': 'thematicSlider.layers[].title' },
                            { 'key': 'thematicSlider.layers[].description' }
                        ] }
                    ] }
                ] }
            ] }
        ];
    }
}
