/**
 * @name debounceService
 * @module app.core
 *
 * @description debounce JavaScript methods
 *
 */
angular
    .module('app.core')
    .factory('externalService', externalService);

/**
 * Set dialog box for extension
 * @function externalService
 * @param  {Object} $mdDialog dialog Angular Object
 * @param  {Object} $compile compile html to template Angular object
 * @param  {Object} $rootScope top of the hierarchy of all scopes in an Angular app
 * @param  {Object} translations translation object that contains one property for every language Angular object
 * @param  {Object} $translate translate service Angular Object
 * @param {Object} $timeout Angular timeout object
 * @param {Object} constants service with all constants for the application
 * @return {Object} service
 */
function externalService($mdDialog, $compile, $rootScope, translations, $translate, $timeout, constants) {

    const service = {
        setExtensionDialog,
        addButton,
        addTranslations
    };

    return service;

    /***/

    /**
     * Set dialog box for extension
     * @function setExtensionDialog
     * @param  {String} template  template to use
     * @param {String} classEl   the classes to use to get back to caller button
     */
    function setExtensionDialog(template, classEl) {
        $mdDialog.show({
            controller: extensionDialogController,
            controllerAs: 'self',
            template: template,
            parent: $('.fgpa'),
            clickOutsideToClose: true,
            fullscreen: false,
            onRemoving: () => { $timeout(() => {
                document.getElementsByClassName(classEl)[0].focus();
            }, constants.delayWCAG); }
        });

        /**
         * @description extension dialog controller
         * @function extensionDialogController
         * @param  {Object} $mdDialog Angular mdDialog object
         */
        function extensionDialogController($mdDialog) {
            'ngInject';
            const self = this;

            self.close = $mdDialog.hide;
        }
    }

    /**
     * Add extensions button
     * @function addButton
     * @param  {Object} element  html elemen to add to
     * @param  {String} addType  type of add (append, prepend, ...)
     * @param  {String} click  function to call on cliclk event. Need to be added to the scope inside the extensions
     * @param  {String} label  label item to link to. Need to be added to translation insinde the extension (addTranslations)
     * @param  {String} tooltip  tooltip item to link to. Need to be added to translation insinde the extension (addTranslations)
     * @param {String} classEl   the classes to add
     */
    function addButton(element, addType, click, label, tooltip, classEl) {
        element[addType]($compile(`<md-button
            class="av-button-square md-raised ${classEl}"
            ng-click="${click}">
            {{ 'extensions.${label}' | translate }}
            <md-tooltip>{{ 'extensions.${tooltip}' | translate }}</md-tooltip>
        </md-button>`)($rootScope));
    }

    /**
     * Add item to translations
     * @function addTranslations
     * @param  {String} name  name of property to add
     * @param  {Array} text  text to add for each language
     */
    function addTranslations(name, text) {
        Object.keys(translations).forEach((key, index) => {
            if (!translations[key].extensions) { translations[key].extensions = { }; }
            translations[key].extensions[name] = text[index];
            $translate.refresh();
        });
    }
}
