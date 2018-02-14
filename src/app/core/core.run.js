angular
    .module('app.core')
    .run(initLanguages)
    .run(initShortcut)
    .run(uploadDefault)
    .run(uploadSchema)
    .run(loadExtensions);

/**
 * @private
 * @memberof app.core
 * @description
 *
 * The `runBlock` triggers schema and locale file loading, sets language of the app.
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
 * Fetches any `data-av-extensions` scripts.
 *
 * @param {Object} $rootElement the root element
 * @param {Object} $rootScope the root scope element
 * @param {Object} externalService external service for extension functions
 */
function loadExtensions($rootElement, $rootScope, externalService) {
    const extAttr = $rootElement.attr('data-av-extensions');
    const extensionList = extAttr ? angular.fromJson(extAttr) : [];

    extensionList.forEach(url => {
        $.ajax({ method: 'GET', dataType: 'text', url })
            .then(data => eval(`(function(api, scope) { ${data} })(externalService, $rootScope);`));
    });
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
    const configAttr = $rootElement.attr('data-av-config');
    const configList = configAttr ? angular.fromJson(configAttr) : ['config-default.json'];

    // load default configuration
    const location = configList[0];
    $http.get(location).then(obj => modelManager.setDefault(obj.data));
}

/**
 * Starts schema upload.
 * @function uploadSchema
 * @private
 * @param  {Object} $http Angular object to read file
 * @param  {Object} $timeout Angular object to read file
 * @param  {Object} $rootElement Angular object
 * @param  {Object} events Angular object
 * @param  {Object} constants Constants service
 * @param  {Object} modelManager Model Manager service
 */
function uploadSchema($http, $timeout, $rootElement, events, constants, modelManager) {
    const files = constants.schemas.length * languages.length;
    let loop = 1;

    // get schemaform location
    const schemaFormFolder = (typeof $rootElement.attr('data-av-schema') !== 'undefined') ?
        $rootElement.attr('data-av-schema') : './schemaForm/';

    // load schemas for all available languages
    languages.forEach(lang => {
        // loop trought all available schemas
        constants.schemas.forEach(file => {
            let location = `${schemaFormFolder}/${file.replace('[lang]', lang)}`;
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
