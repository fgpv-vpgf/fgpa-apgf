const templateUrl = require('../form.html');

/**
 * @module avServices
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avServices` directive for the services form
 *
 */
angular
    .module('app.ui')
    .directive('avServices', avServices);

/**
 * `avServices` directive body.
 *
 * @function avServices
 * @return {object} directive body
 */
function avServices() {
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
 * Services form controller
 *
 * @function Controller
 * @param {Object} $scope module scope
 * @param {Object} $translate Angular translation object
 * @param {Object} events Angular events object
 * @param {Object} modelManager service to manage Angular Schema Form model
 * @param {Object} stateManager service to manage model state for validation
 * @param {Object} formService service with common functions for form
 * @param {Object} commonService service with common functions
 */
function Controller($scope, $translate, events, modelManager, stateManager, formService, commonService) {
    'ngInject';
    const self = this;
    self.modelName = 'services';
    self.sectionName = $translate.instant('app.section.services');
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
        self.sectionName = $translate.instant('app.section.services');
        init();
    });

    /**
     * Initialize Services form
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
        stateManager.validateModel(self.modelName, $scope.activeForm, $scope.form[0].tabs, $scope.model);
    });

    /**
     * Set Services form
     *
     * @function setForm
     * @private
     * @return {Object} the Services form
     */
    function setForm() {
        return [
            { 'type': 'tabs', 'htmlClass': 'av-inner-tab', 'tabs': [
                { 'title': $translate.instant('form.service.export'), 'key': 'export', 'items': [
                    { 'key': 'export.title', 'items': [
                        { 'type': 'section', 'items': [{ 'key': 'export.title.titleValue' }] },
                        { 'type': 'section', 'items': [{ 'key': 'export.title.isSelected' }] },
                        { 'type': 'section', 'items': [{ 'key': 'export.title.isSelectable' }] }
                    ] },
                    { 'key': 'export.map', 'htmlClass': 'av-form-advance hidden', 'items': [
                        { 'type': 'section', 'items': [{ 'key': 'export.map.isSelected' }] },
                        { 'type': 'section', 'items': [{ 'key': 'export.map.isSelectable' }] }
                    ] },
                    { 'key': 'export.legend', 'items': [
                        { 'type': 'section', 'items': [{ 'key': 'export.legend.isSelected' }] },
                        { 'type': 'section', 'items': [{ 'key': 'export.legend.isSelectable' }] },
                        { 'type': 'section', 'htmlClass': 'av-form-advance hidden', 'items': [{ 'key': 'export.legend.showInfoSymbology' }] },
                        { 'type': 'section', 'htmlClass': 'av-form-advance hidden', 'items': [{ 'key': 'export.legend.showControlledSymbology' }] },
                        { 'type': 'section', 'htmlClass': 'av-form-advance hidden', 'items': [{ 'key': 'export.legend.columnWidth' }] }
                    ] },
                    { 'key': 'export.mapElements', 'items': [
                        { 'type': 'section', 'items': [{ 'key': 'export.mapElements.isSelected' }] },
                        { 'type': 'section', 'items': [{ 'key': 'export.mapElements.isSelectable' }] }
                    ] },
                    { 'key': 'export.footnote', 'items': [
                        { 'key': 'export.footnote.footnoteValue','type':'textarea', 'notitle': true },
                        { 'type': 'section', 'items': [{ 'key': 'export.footnote.isSelected' }] },
                        { 'type': 'section', 'items': [{ 'key': 'export.footnote.isSelectable' }] }
                    ] },
                    { 'key': 'export.timestamp', 'items': [
                        { 'type': 'section', 'items': [{ 'key': 'export.timestamp.isSelected' }] },
                        { 'type': 'section', 'items': [{ 'key': 'export.timestamp.isSelectable' }] }
                    ] },
                    { 'title': $translate.instant('form.service.legendSettings'), 'htmlClass': 'av-form-advance hidden', 'key': 'export', 'items': [
                        { 'key': 'export.timeout' },
                        { 'key': 'export.cleanCanvas' }
                    ] }
                ] },
                { 'title': $translate.instant('form.service.geosearch'), 'key': 'search', 'items': [
                    { 'key': 'search.disabledSearches', 'titleMap': {
                        'NTS': $translate.instant('form.service.nts'),
                        'FSA': $translate.instant('form.service.fsa'),
                        'SCALE': $translate.instant('form.service.scale'),
                        'LAT/LNG': $translate.instant('form.service.latlong')
                    } },
                    { 'key': 'search.serviceUrls', 'htmlClass': 'av-form-advance hidden', 'readonly': true }
                ] },
                { 'title': $translate.instant('form.service.urls'), 'items': [
                    { 'type': 'template', 'template': self.formService.addCustomAccordion($translate.instant('form.custom.help'), `help/info-servicesurl-${commonService.getLang()}.md`, true) },
                    { 'key': 'proxyUrl', 'htmlClass': 'av-form-advance hidden', 'readonly': true },
                    { 'key': 'corsEverywhere', 'htmlClass': 'av-form-advance hidden', 'readonly': false },
                    { 'key': 'exportMapUrl', 'htmlClass': 'av-form-advance hidden', 'readonly': true },
                    { 'key': 'geometryUrl', 'htmlClass': 'av-form-advance hidden', 'readonly': true },
                    { 'key': 'googleAPIKey', 'htmlClass': 'av-form-advance hidden', 'readonly': true },
                    { 'key': 'esriLibUrl', 'htmlClass': 'av-form-advance hidden', 'readonly': false }
                    // FIXME: not defined in the schema... need to see of still needed { 'key': 'geolocation', 'htmlClass': 'av-form-advance hidden', 'readonly': true },
                    // FIXME: not defined in the schema... need to see of still needed { 'key': 'coordInfo' },
                    // FIXME: not defined in the schema... need to see of still needed { 'key': 'print' }
                ]}
            ] }
        ];
    }
}
