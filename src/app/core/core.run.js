angular
    .module('app.core')
    .run(initLanguages)
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
 * Starts default configuration upload.
 * @function uploadDefault
 * @private
 * @param  {Object} $rootElement Angular object
 * @param  {Object} $http Angular object to read file
 * @param  {Object} modelManager Model Manager sdrvice
 */
function uploadDefault($rootElement, $http, modelManager) {
    const configAttr = $rootElement.attr('data-av-config');

    if (configAttr) {
        // load default configuration for all available languages
        languages.forEach(lang => {
            let location = `./config/${configAttr.replace('[lang]', lang)}`;
            $http.get(location).then(obj => modelManager.setDefault(obj.data, lang));
        });
    }
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
    // load schemas for all available languages
    languages.forEach(lang => {
        // loop trought all available schemas
        constants.schemas.forEach(file => {
            let location = `./schemaForm/${file.replace('[lang]', lang)}`;
            $http.get(location).then(obj => modelManager.setSchema(obj.data.schema, obj.data, lang));
        });
    });

    // TODO: use better way instead of timeout
    $timeout(() => events.$broadcast(events.avSchemaUpdate), 1000);
}
