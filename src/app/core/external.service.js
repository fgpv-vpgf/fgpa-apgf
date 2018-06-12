/**
 * @name externalService
 * @module app.core
 *
 * @description extensions service
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
 * @param {Object} agolService service to get information about arcGIS online services,
 * @param {Object} modelManager service to manage Angular Schema Form model
 * @return {Object} service
 */
function externalService($mdDialog, $compile, $rootScope, translations, $translate, $timeout, constants, agolService,
    modelManager) {

    const service = {
        getExtensionsCount,
        hideDialog,
        setExtensionDialog,
        addButton,
        addTranslations,
        translate,
        getAgolToken,
        getAgolId,
        getAgolDataValue,
        setModelValue
    };

    let extCount = 0;

    return service;

    /***/

    function getExtensionsCount() { return extCount; }

    /**
     * Hide dialog window
     * @function hideDialog
     * @return {Function} the mdDialog hide function
     */
    function hideDialog() {
        return $mdDialog.hide;
    }

    /**
     * Set dialog box for extension
     * @function setExtensionDialog
     * @param  {String} template  template to use
     * @param {String} classEl   the classes to use to get back to caller button
     * @param {Object} controller optional - extention controller. If not set default controller will be use
     */
    function setExtensionDialog(template, classEl, controller = extensionDialogController) {
        $mdDialog.show({
            controller: controller,
            controllerAs: 'self',
            template: template,
            parent: $('.fgpa'),
            clickOutsideToClose: true,
            fullscreen: false,
            onRemoving: () => { $timeout(() => {
                document.getElementsByClassName(classEl)[0].focus();
            }, constants.delayWCAG); }
        });
    }

    /**
     * @description default extension dialog controller
     * @function extensionDialogController
     * @param  {Object} $mdDialog Angular mdDialog object
     */
    function extensionDialogController($mdDialog) {
        'ngInject';
        const self = this;

        self.close = $mdDialog.hide;
    }

    /**
     * Add extensions button to extensions panel
     * @function addButton
     * @param  {String} click  function to call on click event. Need to be added to the scope inside the extensions
     * @param  {String} label  label item to link to. Need to be added to translation insinde the extension (addTranslations)
     * @param  {String} tooltip  tooltip item to link to. Need to be added to translation insinde the extension (addTranslations)
     * @param {String} classEl   the classes to add
     */
    function addButton(click, label, tooltip, classEl) {
        document.getElementsByClassName('av-extentions-container')[0].append($compile(`<md-button
            class="av-button-square md-raised ${classEl}"
            ng-click="${click}">
            {{ 'extensions.${label}' | translate }}
            <md-tooltip>{{ 'extensions.${tooltip}' | translate }}</md-tooltip>
        </md-button>`)($rootScope)[0]);

        extCount++;
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

    /**
     * Translate a key from translation
     * @function translate
     * @param  {String} item  item key to translate
     * @return  {String} translated text
     */
    function translate(item) {
        return $translate.instant(item);
    }

    /**
     * Get ArcGIS Online token.
     * @function getToken
     * @param {String} url ArcGIS Online url
     * @param {String} user user name
     * @param {String} password password
     * @returns {Object} token
     */
    function getAgolToken(url, user, password) {
        return agolService.getToken(url, user, password);
    }

    /**
     * Get info from ArcGIS Online item id
     * @function getItemId
     * @param {String} url ArcGIS Online url
     * @param  {Object} id  web map or web app id
     * @param {String} token for secure arcGIS online id
     * @return {Object} the item is info
     */
    function getAgolId(url, id, token) {
        return agolService.getItemId(url, id, token);
    }

    /**
     * Get agol data object value
     * @function getModel
     * @param {Object} data agol json configuration object
     * @param {String} key key to find value for inside json object
     * @return {Object} the model
     */
    function getAgolDataValue(data, key) {
        return  deepAccessUsingString(data, key);
    }

    /**
     * Set value inside model
     * @function getModel
     * @param {String} key key inside the model to set value for
     * @param {String} value value to set
     */
    function setModelValue(key, value) {
        const modelName = key.split('.')[0];
        const model = { [modelName]: modelManager.getModel(modelName, false) };
        deepAccessUsingString(model, key, value, key.split('.').length - 1);
    }

    /**
     * Access deep object
     * @function deepAccessUsingString
     * @private
     * @param {Object} obj the object to look inside
     * @param {String} key the keyy to get
     * @param {String} value optional - value to set
     * @param {Interger} len the key to find inside the array of keys
     * @return {Object} until return is undefined, go deeper inside the object
     */
    function deepAccessUsingString(obj, key, value = '', len = -1){
        return key.split('.').reduce((nestedObject, key, index) => {
            if(nestedObject && key in nestedObject) {
                if (index === len) {
                    nestedObject[key] = value;
                }
                return nestedObject[key];
            }
            return undefined;
        }, obj);
    }
}
