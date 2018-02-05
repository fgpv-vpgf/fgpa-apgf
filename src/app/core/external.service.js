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

function externalService($mdDialog, $compile, $rootScope, translations, $translate) {

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
     */
    function setExtensionDialog(template) {
        $mdDialog.show({
            controller: extensionDialogController,
            controllerAs: 'self',
            template: template,
            parent: $('.fgpa'),
            disableParentScroll: false,
            clickOutsideToClose: true,
            fullscreen: false
        });

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
     */
    function addButton(element, addType, click, label, tooltip) {
        element[addType]($compile(`<md-button
            class="av-button-square md-raised"
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
