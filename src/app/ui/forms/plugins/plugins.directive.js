const templateUrl = require('../form.html');
import '../../../../../node_modules/jquery-ui/ui/widgets/datepicker.js';
import '../../../../../node_modules/jquery-ui/ui/i18n/datepicker-fr-CA.js';

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

        // create the convert to millisecond date and time picker element
        setTimepicker();
    }

    events.$on(events.avValidateForm, () => {
        $scope.$broadcast('schemaFormValidate');
        // There's no tab just the form
        stateManager.validateModel(self.modelName, $scope.activeForm, $scope.form[0].tabs, $scope.model);
    });

    /**
     * Set the date and time picker element
     *
     * @function setTimepicker
     * @private
     */
    function setTimepicker() {
        setTimeout(() => {
            // set default date and language
            const today = new Date();
            const dd = String(today.getDate()).padStart(2, '0');
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const yyyy = today.getFullYear();
            const lang = commonService.getLang() === 'en-CA' ? 'en' : 'fr-CA';
            const todayLang = (lang === 'en') ? `${mm}/${dd}/${yyyy}` : `${dd}/${mm}/${yyyy}`;
            const dateFormat = (lang === 'en') ? `mm/dd/yy` : `dd/mm/yy`;


            // initialize datepicker and timepicker
            $('.av-range-date').datepicker({ changeMonth: true, changeYear: true, yearRange: '1900:c+30' });
            $('.av-range-date').datepicker('option', $.datepicker.regional[lang]);
            $('.av-range-date').datepicker('option', 'dateFormat', dateFormat);
            $('.av-range-date').datepicker('setDate', todayLang);
            $('.av-range-hour').timepicker();
            $('.av-range-hour').timepicker('setTime', '12:00am');

            // set convert button event
            $('.av-setrange-date').on('click', () => {
                // extrac hours and minutes and convert
                const timepick = $('.av-range-hour').timepicker('getTime');
                const time = timepick.getHours() * 3600 + timepick.getMinutes() * 60;
                $('.av-range-millisecond')[0].value = Date.parse($('.av-range-date' ).datepicker('getDate')) + time;
            });

            // broadcast event to generate accordion
            events.$broadcast(events.avNewItems);

        }, constants.delayAccordion);
    }

    /**
     * Get timepicker element
     *
     * @function getTimepicker
     * @private
     * @return {String} the element string
     */
    function getTimepicker() {
        return  `<fieldset class="schema-form-fieldset">
                    <span>${$translate.instant('form.plugins.rangesliderdatelabel')}</span>
                    <div class="av-range-date-container">
                        <input type="text" class="av-range-date-holder av-range-date"></input>
                        <input type="text" class="av-range-date-holder av-range-hour"></input>
                        <button class="av-toggle-button av-setrange-date">${$translate.instant('form.plugins.rangesliderdateconvert')}</button>
                        <input type="text" class="av-range-date-holder av-range-millisecond"></input> 
                    </div>
                </fieldset>`;
    }

    /**
     * Get time duration element
     *
     * @function getDuration
     * @private
     * @return {String} the element string
     */
    function getDuration() {
        return  `<fieldset class="schema-form-fieldset">
                    <span>${$translate.instant('form.plugins.rangesliderdurationlabel')}</span>
                    <div class="av-range-duration-container">
                        <label for="av-range-quanity">${$translate.instant('form.plugins.rangesliderdurationqt')}</label>
                        <input type="number" name="${$translate.instant('form.plugins.rangesliderdurationqt')}" id="av-range-quanity" class="av-range-duration-holder" min="1" max="100" value="1"></input>
                        <label for="av-range-quantity-type">${$translate.instant('form.plugins.rangesliderdurationqttype')}</label>
                        <select name="${$translate.instant('form.plugins.rangesliderdurationqttype')}" id="av-range-quantity-type" class="av-range-duration-holder">
                            <option value="hh">${$translate.instant('format.hour')}(s)</option>
                            <option value="dd">${$translate.instant('format.day')}(s)</option>
                            <option value="ww">${$translate.instant('format.week')}(s)</option>
                            <option value="yy">${$translate.instant('format.year')}(s)</option>
                        </select>
                        <button class="av-toggle-button av-duration-set" ng-click="form.setDuration()">${$translate.instant('form.plugins.rangesliderdateconvert')}</button>
                        <input type="text" class="av-range-duration-holder"></input> 
                    </div>
                </fieldset>`;
    }

    /**
     * Set the duration interval in milliseconds
     * @function setDuration
     */
    function setDuration() {
        const elems = document.getElementsByClassName('av-range-duration-holder');
        const qt = Number(elems[0].value);
        const elemType = elems[1].value;
        let qtType = 3600 * 1000; // 1 hour in milliseconds

        if (elemType === 'dd') {
            qtType = qtType * 24;
        }
        if (elemType === 'ww') {
            qtType = qtType * 24 * 7;
        }
        if (elemType === 'yy') {
            qtType = qtType * 24 * 7 * 52 + (24 * 3600 * 1000);
        }

        document.getElementsByClassName('av-range-duration-holder')[2].value = qt * qtType;
    }

    /**
     * Get range type element
     *
     * @function getRangeType
     * @private
     * @return {String} the element string
     */
    function getRangeType() {
        return `<fieldset class="schema-form-fieldset">
                    <input type="radio" id="av-range-duration-interval" class="av-range-rangetype" name="type" value="interval" checked ng-click="form.setRangeType()">
                    <label for="av-range-duration-interval">${$translate.instant('form.plugins.rangesliderrangetypeinterval')}</label>
                    <input type="radio" id="av-range-duration-values" class="av-range-rangetype" name="type" value="values" ng-click="form.setRangeType()">
                    <label for="av-range-duration-values">${$translate.instant('form.plugins.rangesliderrangetypevalues')}</label><br>
                </fieldset>`;
    }

    /**
     * Show or hide the proper section
     * @function setRangeType
     */
    function setRangeType() {
        const elems = document.getElementsByClassName('av-range-rangetype');

        if (elems[0].checked) {
            document.getElementsByClassName('av-range-interval-section')[0].classList.remove('av-none');
            document.getElementsByClassName('av-range-values-section')[0].classList.add('av-none');
        } else {
            document.getElementsByClassName('av-range-values-section')[0].classList.remove('av-none');
            document.getElementsByClassName('av-range-interval-section')[0].classList.add('av-none');
        }
    }

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
                    { 'type': 'template', 'template': self.formService.addCustomAccordion($translate.instant('form.custom.help'), `help/info-contribute-plugins-${commonService.getLang()}.md`, true) },
                    { 'key': 'rangeSlider.enable', 'onChange': (key, value) => { if (value) setTimepicker() }},
                    { 'key': 'rangeSlider.open', 'condition': 'model.rangeSlider.enable === true' },
                    { 'key': 'rangeSlider.maximize', 'condition': 'model.rangeSlider.enable === true' },
                    { 'key': 'rangeSlider.maximizeDesc', 'condition': 'model.rangeSlider.enable === true' },
                    { 'key': 'rangeSlider.autorun', 'condition': 'model.rangeSlider.enable === true' },
                    { 'key': 'rangeSlider.loop', 'condition': 'model.rangeSlider.enable === true' },
                    { 'key': 'rangeSlider.lock', 'condition': 'model.rangeSlider.enable === true' },
                    { 'key': 'rangeSlider.reverse', 'condition': 'model.rangeSlider.enable === true' },
                    { 'key': 'rangeSlider.controls', 'condition': 'model.rangeSlider.enable === true', 'titleMap': [
                        { value: 'lock', name: $translate.instant('form.plugins.rangesliderctrllock') },
                        { value: 'loop', name: $translate.instant('form.plugins.rangesliderctrlloop') },
                        { value: 'delay', name: $translate.instant('form.plugins.rangesliderctrldelay') },
                        { value: 'export', name: $translate.instant('form.plugins.rangesliderctrlexport') },
                        { value: 'refresh', name: $translate.instant('form.plugins.rangesliderctrlrefresh') },
                        { value: 'reverse', name: $translate.instant('form.plugins.rangesliderctrlreverse') }
                    ] },
                    { 'key': 'rangeSlider.params', 'condition': 'model.rangeSlider.enable === true', 'items': [
                        { 'key': 'rangeSlider.params.type', 'type': 'select', 'titleMap': [
                            { value: 'date', name: $translate.instant('format.date') },
                            { value: 'number', name: $translate.instant('format.number') },
                            { value: 'wmst', name: 'WMS-T' }
                        ] },
                        { 'key': 'rangeSlider.params.rangeType', 'type': 'select', 'titleMap': [
                            { value: 'single', name: $translate.instant('form.plugins.rangeslidersingle') },
                            { value: 'dual', name: $translate.instant('form.plugins.rangesliderdual') }
                        ], 'validationMessage': { 'wrongType': $translate.instant('form.validation.rangeslidertype') },
                        '$validators': { wrongType: newValue => (newValue === 'single' && $scope.model.rangeSlider.params.stepType === 'dynamic') ? false : true }
                        },
                        { 'key': 'rangeSlider.params.stepType', 'type': 'select', 'titleMap': [
                            { value: 'static', name: $translate.instant('form.plugins.rangesliderstatic') },
                            { value: 'dynamic', name: $translate.instant('form.plugins.rangesliderdynamic') }
                        ], 'validationMessage': { 'wrongType': $translate.instant('form.validation.rangeslidertype') },
                        '$validators': { wrongType: newValue => (newValue === 'dynamic' && $scope.model.rangeSlider.params.rangeType === 'single') ? false : true }
                        },
                        { 'key': 'rangeSlider.params.units' },
                        { 'key': 'rangeSlider.params.description' },
                        { 'key': 'rangeSlider.params.precision', 'type': 'select', 'titleMap': [
                            { value: '0', name: '0' },
                            { value: '1', name: '1' },
                            { value: '2', name: '2' },
                            { value: 'date', name: $translate.instant('format.date') },
                            { value: 'hour', name: $translate.instant('format.hour') }
                        ] },
                        { 'key': 'rangeSlider.params.delay', 'titleMap': [
                            { value: '3000', name: '3 sec' },
                            { value: '4000', name: '4 sec' },
                            { value: '5000', name: '5 sec' },
                            { value: '6000', name: '6 sec' },
                            { value: '7000', name: '7 sec' }
                        ] },
                        { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle', 'title': $translate.instant('form.plugins.rangesliderrangesection'), 'items': [
                            { 'type': 'fieldset', 'htmlClass': 'av-accordion-content', 'items': [
                                { 'type': 'fieldset', 'title': $translate.instant('form.plugins.rangesliderrangeintervaltitle'), 'items': [
                                    { 'type': 'template', 'template': `<p>${$translate.instant('form.plugins.rangesliderrangeintervaldesc')}</p>` }
                                ] },
                                {
                                    'type': 'template',
                                    'template': getRangeType(),
                                    'setRangeType': () => setRangeType()
                                },
                                { 'type': 'fieldset', 'htmlClass': 'av-range-interval-section', 'title': $translate.instant('form.plugins.rangesliderrangeinterval'), 'items': [
                                    {
                                        'type': 'template',
                                        'template': getDuration(),
                                        'setDuration': () => setDuration()
                                    },
                                    { 'key': 'rangeSlider.params.rangeInterval' },
                                    { 'key': 'rangeSlider.params.startRangeEnd' }
                                ] },
                                { 'type': 'fieldset',  'htmlClass': 'av-range-values-section av-none', 'title': $translate.instant('form.plugins.rangesliderrangevalues'), 'items': [
                                    { 'type': 'template', 'template': getTimepicker() },
                                    { 'key': 'rangeSlider.params.range', 'notitle': true, 'items': [
                                        { 'key': 'rangeSlider.params.range.min', 'validationMessage': { 'wrongValues': $translate.instant('form.validation.rangesliderlimit') },
                                            '$validators': { wrongValues: value => (value !== null && value >= $scope.model.rangeSlider.params.range.max) ? false : true } },
                                        { 'key': 'rangeSlider.params.range.max', 'validationMessage': { 'wrongValues': $translate.instant('form.validation.rangesliderlimit') },
                                            '$validators': { wrongValues: value => (value !== null && value <= $scope.model.rangeSlider.params.range.min) ? false : true } }
                                    ] }
                                ] },
                                { 'key': 'rangeSlider.params.limit', 'items': [
                                    { 'type': 'template', 'template': getTimepicker() },
                                    { 'key': 'rangeSlider.params.limit.min', 'validationMessage': { 'wrongValues': $translate.instant('form.validation.rangesliderlimit') },
                                        '$validators': { wrongValues: value => (value !== null && value >= $scope.model.rangeSlider.params.limit.max) ? false : true } },
                                    { 'key': 'rangeSlider.params.limit.max', 'validationMessage': { 'wrongValues': $translate.instant('form.validation.rangesliderlimit') },
                                        '$validators': { wrongValues: value => (value !== null && value <= $scope.model.rangeSlider.params.limit.min) ? false : true } },
                                    { 'key': 'rangeSlider.params.limit.staticItems', 'startEmpty': true, 'add': $translate.instant('button.add'), 'condition': 'model.rangeSlider.params.stepType === \'static\'' }
                                ] }
                            ] }
                        ] }
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
                            { 'key': 'rangeSlider.layers[].field', 'validationMessage':
                                { 'empty': $translate.instant('form.validation.required') },
                            '$validators': { empty: function(value) {
                                return (angular.isString(value) && value === '') ? false : true;
                            } } },
                            { 'key': 'rangeSlider.layers[].isTimeAware'}
                        ] }
                    ] }
                ] },
                { 'title': $translate.instant('form.plugins.chart'), 'key': 'chart', 'items': [
                    { 'type': 'template', 'template': self.formService.addCustomAccordion($translate.instant('form.custom.help'), `help/info-contribute-plugins-${commonService.getLang()}.md`, true) },
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
                            { 'key': 'chart.axis.xAxis.split'  }
                        ] },
                        {
                            'key': 'chart.axis.yAxis', 'items': [
                                {
                                    'key': 'chart.axis.yAxis.type', 'condition': 'model.chart.enable === true && model.chart.type == "bar"', 'titleMap': [
                                        { value: 'config', name: $translate.instant('form.plugins.chartconfig') },
                                        { value: 'field', name: $translate.instant('form.plugins.chartfield') },
                                        { value: 'linear', name: $translate.instant('form.plugins.chartlinear') }
                                    ]
                                },
                                {
                                    'key': 'chart.axis.yAxis.type', 'condition': 'model.chart.enable === true && model.chart.type == "line"', 'titleMap': [
                                        { value: 'linear', name: $translate.instant('form.plugins.chartlinear') }
                                    ]
                                },
                                { 'key': 'chart.axis.yAxis.title' },
                                { 'key': 'chart.axis.yAxis.values' },
                                { 'key': 'chart.axis.yAxis.split', 'condition': '(model.chart.axis.yAxis.type === "config"||model.chart.axis.yAxis.type === "linear")'}
                        ] }
                    ] },
                    { 'key': 'chart.layers', 'condition': 'model.chart.enable === true', 'add': null, 'items': [
                        { 'type': 'fieldset', 'htmlClass': 'av-chart', 'items': [
                            {
                                'key': 'chart.layers[].id',
                                'type': 'dynamic-select',
                                'optionData': 'initLayerId',
                                'model': 'id',
                                'array': true
                            },
                            { 'key': 'chart.layers[].nameField' },
                            { 'key': 'chart.layers[].type', 'titleMap': [
                                { value: 'inline', name: $translate.instant('form.plugins.chartinline') },
                                { value: 'link', name: $translate.instant('form.plugins.chartlink') }
                            ] },
                            { 'key': 'chart.layers[].linkUrl', 'condition': 'model.chart.layers[arrayIndex].type === "link"' },
                            { 'key': 'chart.layers[].linkField', 'condition': 'model.chart.layers[arrayIndex].type === "link"' },
                            { 'key': 'chart.layers[].data', 'title': $translate.instant('form.plugins.chartdata'), 'htmlClass': 'av-accordion-all', 'startEmpty': true, 'onChange': () => {
                                // new item, create accordion
                                events.$broadcast(events.avNewItems);
                            }, 'add': $translate.instant('button.add'), 'items': [
                                { 'type': 'fieldset', 'htmlClass': 'av-accordion-toggle', 'title': $translate.instant('form.plugins.chartdata'), 'items': [
                                    { 'type': 'help', 'htmlClass': 'av-form-advance hidden', 'helpvalue': '<div class="help-block">' + $translate.instant('form.map.expcoldesc') + '<div>' },
                                    { 'key': 'chart.layers[].data[]', 'htmlClass': `av-accordion-content`, 'notitle': true, 'items': [
                                        { 'key': 'chart.layers[].data[].type', 'titleMap': [
                                            { value: 'single', name: $translate.instant('form.plugins.chartdatatype1') },
                                            { value: 'combine', name: $translate.instant('form.plugins.chartdatatype2') }
                                        ] },
                                        { 'key': 'chart.layers[].data[].linkType', 'condition': 'model.chart.layers[arrayIndex].type === "link"', 'titleMap': [
                                            { value: 'single', name: $translate.instant('form.plugins.chartdatatype1') },
                                            { value: 'combine', name: $translate.instant('form.plugins.chartdatatype2') },
                                            { value: 'multi', name: $translate.instant('form.plugins.chartdatatype3') }
                                        ] },
                                        { 'key': 'chart.layers[].data[].link', 'condition': 'model.chart.layers[arrayIndex].type === "link"' },
                                        { 'key': 'chart.layers[].data[].date', 'condition': 'model.chart.layers[arrayIndex].type === "link"' },
                                        { 'key': 'chart.layers[].data[].values', 'condition': 'model.chart.layers[arrayIndex].type === "link"' },
                                        { 'key': 'chart.layers[].data[].measure', 'targetLink': 'legend.0', 'targetParent': 'av-accordion-toggle', 'default': $translate.instant('form.plugins.chartdata'), 'onChange': debounceService.registerDebounce((model, item) => {
                                            self.formService.copyValueToFormIndex(model, item);}, constants.debInput, false)
                                        },
                                        { 'key': 'chart.layers[].data[].regex' },
                                        { 'key': 'chart.layers[].data[].split' },
                                        { 'key': 'chart.layers[].data[].label', 'condition': 'model.chart.enable === true', 'items': [
                                            { 'key': 'chart.layers[].data[].label.type', 'titleMap': [
                                                { value: 'config', name: $translate.instant('form.plugins.chartconfig') },
                                                { value: 'field', name: $translate.instant('form.plugins.chartfield') },
                                                 { value: 'value', name: $translate.instant('form.plugins.chartvalue') }
                                            ] },
                                            { 'key': 'chart.layers[].data[].label.values' },
                                            { 'key': 'chart.layers[].data[].label.split' }
                                        ] },
                                        { 'key': 'chart.layers[].data[].prefix' },
                                        { 'key': 'chart.layers[].data[].suffix' }
                                    ] }
                                ] }
                            ] },
                            { 'key': 'chart.layers[].details', 'items': [
                                { 'key': 'chart.layers[].details.enabled' },
                                { 'key': 'chart.layers[].details.value', 'condition': 'model.chart.layers[arrayIndex].details.enabled === true' }
                            ] }
                        ] }
                    ] }
                ] },
                { 'title': $translate.instant('form.plugins.swiper'), 'key': 'swiper', 'items': [
                    { 'type': 'template', 'template': self.formService.addCustomAccordion($translate.instant('form.custom.help'), `help/info-contribute-plugins-${commonService.getLang()}.md`, true) },
                    { 'key': 'swiper.enable' },
                    { 'key': 'swiper.type', 'condition': 'model.swiper.enable === true', 'titleMap': [
                        { value: 'vertical', name: 'Vertical' },
                        { value: 'horizontal', name: 'Horizontal' }
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
                    { 'type': 'template', 'template': self.formService.addCustomAccordion($translate.instant('form.custom.help'), `help/info-contribute-plugins-${commonService.getLang()}.md`, true) },
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
                    { 'type': 'template', 'template': self.formService.addCustomAccordion($translate.instant('form.custom.help'), `help/info-contribute-plugins-${commonService.getLang()}.md`, true) },
                    { 'key': 'thematicSlider.enable' },
                    { 'key': 'thematicSlider.open', 'condition': 'model.thematicSlider.enable === true' },
                    { 'key': 'thematicSlider.autorun', 'condition': 'model.thematicSlider.enable === true' },
                    { 'key': 'thematicSlider.loop', 'condition': 'model.thematicSlider.enable === true' },
                    { 'key': 'thematicSlider.slider', 'condition': 'model.thematicSlider.enable === true' },
                    { 'key': 'thematicSlider.stack', 'condition': 'model.thematicSlider.enable === true' },
                    { 'key': 'thematicSlider.legendStack', 'condition': 'model.thematicSlider.enable === true' },
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
                            { 'key': 'thematicSlider.layers[].description' },
                            { 'key': 'thematicSlider.layers[].legend', 'add': $translate.instant('button.add'), 'startEmpty': true, 'items': [
                                'thematicSlider.layers[].legend[].image',
                                'thematicSlider.layers[].legend[].label'
                            ] }
                        ] }
                    ] }
                ] }
            ] }
        ];
    }
}
