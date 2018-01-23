angular
    .module('app.core')
    .run(initLanguages)
    .run(initShortcut)
    .run(uploadDefault)
    .run(uploadSchema);

/**
 * @private
 * @memberof app.core
 * @description
 */

const DEFAULT_LANGS = ['en-CA', 'fr-CA'];
let languages = DEFAULT_LANGS;

/**
 * Initialize author by setting the languages.
 * @function initLanguages
 * @private
 * @param  {Object} $rootElement Angular object
 * @param  {Object} $translate Angular object
 * @param  {Object} commonService Common service
 */
function initLanguages($rootElement, $translate, commonService) {
    const langAttr = $rootElement.attr('data-av-langs');

    if (langAttr) {
        try {
            languages = angular.fromJson(langAttr);
        } catch (e) {
            console.warn(`Could not parse langs, defaulting to ${DEFAULT_LANGS}`);
        }
    }

    // set language and array of languages to use
    // we set the language directly instead of using setLang to avoid switchLanguage event
    $translate.use(languages[0]);
    commonService.setLangs(languages);
}

/**
 * Initialize keyboard shortcut.
 * @function initShortcut
 * @private
 * @param  {Object} keyNames key names with corresponding key code
 * @param  {Object} formService Form service
 */
function initShortcut(keyNames, formService) {
    $('body').keydown(e => {
        // Alt-s/Alt-x can also be use to expand or collapse the collection
        if (e.keyCode === keyNames.S && e.altKey || e.keyCode === keyNames.X && e.altKey)  {
            const obj = { currentTarget: { parentElement: document.getElementsByClassName('av-layers')[0] } };
            const collapse = (e.keyCode === keyNames.X) ? true : false;
            formService.toggleAll(obj, collapse);
        }
    });
}

/**
 * Starts default configuration upload.
 * @function uploadDefault
 * @private
 * @param  {Object} $rootElement Angular object
 * @param  {Object} $http Angular object to read file
 * @param  {Object} modelManager Model Manager service
 */
function uploadDefault($rootElement, $http, modelManager) {
    // check if there is user define template. If not, use default one
    // we need a default one to make sure model object exist. At the same time we need to defined
    // readonly field inside it
    const configAttr = (typeof $rootElement.data('av-config') !== 'undefined') ?
        $rootElement.data('av-config') : ['config-default.json'];

    // load default configuration
    const location = `./config/${configAttr[0]}`;
    $http.get(location).then(obj => modelManager.setDefault(obj.data));
}

/**
 * Starts schema upload.
 * @function uploadSchema
 * @private
 * @param  {Object} $http Angular object to read file
 * @param  {Object} $timeout Angular object to read file
 * @param  {Object} events Angular object
 * @param  {Object} constants Constants service
 * @param  {Object} modelManager Model Manager service
 */
function uploadSchema($http, $timeout, events, constants, modelManager) {
    const files = constants.schemas.length * languages.length;
    let loop = 1;

    // load schemas for all available languages
    languages.forEach(lang => {
        // loop trought all available schemas
        constants.schemas.forEach(file => {
            let location = `./schemaForm/${file.replace('[lang]', lang)}`;
            $http.get(location).then(obj => {
                modelManager.setSchema(obj.data.schema, obj.data, lang);

                if (loop++ === files) {
                    // TODO: use better way instead of timeout
                    $timeout(() => events.$broadcast(events.avSchemaUpdate), 500);
                }
            });
        });
    });


}
