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

let activeElement;

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
            .then(data => eval(`(function(api, scope, url) { ${data} })(externalService, $rootScope, url);`));
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
        if (e.which === keyNames.S && e.altKey || e.which === keyNames.X && e.altKey)  {
            const obj = { currentTarget: { parentElement: document.getElementsByClassName('av-layers')[0] } };
            const collapse = (e.which === keyNames.X) ? true : false;
            formService.toggleAll(obj, collapse);
            const basemapobj = { currentTarget: { parentElement: document.getElementsByClassName('av-baseMaps')[0] } }
            const basemapcollapse = (e.which === keyNames.X) ? true : false;
            formService.toggleAll(basemapobj, basemapcollapse);
        }

        // Alt-q/ to focus to summary panel
        if (e.which === keyNames.Q && e.altKey)  {
            activeElement = document.activeElement;
            document.getElementsByClassName('av-summary-validate')[0].focus();
            e.preventDefault();
        }
        if (e.which === keyNames.A && e.altKey)  {
            if (typeof activeElement !== 'undefined') activeElement.focus();
            e.preventDefault();
        }
    });
}

/**
 * Starts default configuration upload.
 * @function uploadDefault
 * @private
 * @param  {Object} $rootElement Angular object
 * @param  {Object} $http Angular object to read file
 * @param  {Object} $timeout Angular timeout object
 * @param  {Object} events author events
 * @param  {Object} modelManager Model Manager service
 */
function uploadDefault($rootElement, $http, $timeout, events, modelManager) {
    // check if there is user define template. If not, use default one
    // we need a default one to make sure model object exist. At the same time we need to defined
    // readonly field inside it
    const configAttr = $rootElement.attr('data-av-config');
    const configList = (configAttr && angular.fromJson(configAttr).length > 0) ?
        angular.fromJson(configAttr) : ['config-default.json'];

    // check if application is call with option to open a predefine configuration file
    const url = new URL(window.location.href);
    const template = url.searchParams.get('template');
    const filename = url.searchParams.get('filename');
    let configUrl = [];

    if (template !== null) {
        // if config file exist, select it. If not, default or first template will be selected
        configUrl = configList.filter(item => item.split('/')[item.split('/').length - 1] === template);
    } else if (filename !== null) {
        configUrl = [filename];
    }

    // load default configuration. If configUrl fails, redirect to default
    const location = (configUrl.length === 0) ? configList[0] : configUrl[0];
    let name = location.split('/')[location.split('/').length - 1].replace('.json', '');

    $http.get(location).then(obj => {
        // set current file name and set default
        $timeout(() => { events.$broadcast(events.avNewSaveName, name) }, 1000);
        modelManager.setDefault(obj.data)
    }).catch(error => $http.get(configList[0]).then(obj => {
        // set current file name and set default
        name = configList[0].split('/')[configList[0].split('/').length - 1].replace('.json', '');
        $timeout(() => { events.$broadcast(events.avNewSaveName, name) }, 1000);
        modelManager.setDefault(obj.data);
    }));
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
