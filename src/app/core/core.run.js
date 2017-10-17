angular
    .module('app.core')
    .run(init)
    .run(uploadDefault)
    .run(uploadSchema);

/**
 * @function init
 * @private
 * @memberof app.core
 * @description
 */

const DEFAULT_LANGS = ['en-CA', 'fr-CA'];
let languages = DEFAULT_LANGS;

function init($rootElement, $translate, commonService) {
    const langAttr = $rootElement.attr('data-av-langs');

    if (langAttr) {
        try {
            languages = angular.fromJson(langAttr);
        } catch (e) {
            console.warn(`Could not parse langs, defaulting to ${DEFAULT_LANGS}`);
            // TODO: better way to handle when no languages are specified?
        }
    }

    $translate.use(languages[0]);
    commonService.setLangs(languages);
}

/**
 * Starts schema upload.
 * @function uploadSchema
 * @param  {Object} $http Angular object to read file
 */
function uploadSchema($http, constants, modelManager) {
    languages.forEach(lang => {
        constants.schemas.forEach(file => {
            let location = `./schemaForm/${file.replace('[lang]', lang)}`;
            $http.get(location).then(obj => modelManager.setSchema(obj.data.schema, obj.data, lang));
        });
    });
}

/**
 * Starts default configuration upload.
 * @function uploadDefault
 * @param  {Object} $http Angular object to read file
 */
function uploadDefault($rootElement, $http, modelManager) {
    const configAttr = $rootElement.attr('data-av-config');

    if (configAttr) {
        languages.forEach(lang => {
            let location = `./config/${configAttr.replace('[lang]', lang)}`;
            $http.get(location).then(obj => modelManager.setDefault(obj.data, lang));
        });
    }
}
