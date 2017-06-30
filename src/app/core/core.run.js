angular
    .module('app.core')
    .run(init);

/**
 * @function init
 * @private
 * @memberof app.core
 * @description
 */
function init($translate, $rootElement) {
    const DEFAULT_LANGS = ['en-CA', 'fr-CA'];

    const langAttr = $rootElement.attr('av-langs');
    let languages = DEFAULT_LANGS;
    if (langAttr) {
        try {
            languages = angular.fromJson(langAttr);
        } catch (e) {
            console.warn(`Could not parse langs, defaulting to ${DEFAULT_LANGS}`);
            // TODO: better way to handle when no languages are specified?
        }
    }

    $translate.use(languages[0]);
}
