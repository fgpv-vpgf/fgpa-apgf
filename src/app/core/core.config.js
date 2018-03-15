const iconTemplateUrls = {
    action: require('../../content/svgCache/action.svg'),
    alert: require('../../content/svgCache/alert.svg'),
    communication: require('../../content/svgCache/communication.svg'),
    community: require('../../content/svgCache/community.svg'),
    content: require('../../content/svgCache/content.svg'),
    default: require('../../content/svgCache/default.svg'),
    editor: require('../../content/svgCache/editor.svg'),
    file: require('../../content/svgCache/file.svg'),
    hardware: require('../../content/svgCache/hardware.svg'),
    image: require('../../content/svgCache/image.svg'),
    maps: require('../../content/svgCache/maps.svg'),
    navigation: require('../../content/svgCache/navigation.svg'),
    social: require('../../content/svgCache/social.svg')
};

angular
    .module('app.core')
    .config(configBlock);

/**
 * @memberof app.core
 * @function configBlock
 * @private
 * @param  {Object} $translateProvider Angular object
 * @param  {Object} $mdThemingProvider Angular objec
 * @param  {Object} $mdIconProvider Angular object
 * @param  {Object} $parseProvider Angular object
 * @description
 *
 * The `configBlock` does three things right now:
 * - configure translation provider by prepping static loader (and optionally setting preferred language if we know what it is),
 * - configure theme colours for angular material
 */
function configBlock($translateProvider, $mdThemingProvider, $mdIconProvider, $parseProvider) {

    configureParser();
    configureTranslations();
    configureTheme();
    configureIconsets();

    /**
     * Configures the praser provider by adding accented characters as valid identifiers in Angular expressions.
     * This solves the problem with French characters used in datatable field names when they are bound to the template.
     * Potentially, it should work for other languages using accented characters. The condition can be expanded if needed.
     *
     * @function configureParser
     */
    function configureParser() {
        $parseProvider.setIdentifierFns(_isValidIdentifier, _isValidIdentifier);

        // original Angular issue: https://github.com/angular/angular.js/issues/2174
        // PR that fixes it https://github.com/angular/angular.js/commit/bd0915c4007dcc5b0cae6968598731117c510ffa
        // eslint-disable-next-line complexity
        function _isValidIdentifier(ch) {
            return ('a' <= ch && ch <= 'z' ||
                    'A' <= ch && ch <= 'Z' ||
                    '_' === ch || ch === '$' ||
                    'à' <= ch && ch <= 'ÿ' ||
                    'À' <= ch && ch <= 'Ÿ' ||
                    'Ç' === ch || ch === 'ç' ||
                    '0' <= ch && ch <= '9'  ||
                    ch === '’');
        }
    }

    /**
     * Configure angular translation provider. Set locale files location and file name pattern.
     * @inner
     * @memberof app.core
     * @function
     */
    function configureTranslations() {
        $translateProvider.directivePriority(222);
        $translateProvider.useLoader('translationService', { action: 'loader' });

        // Enable escaping of HTML
        $translateProvider.useSanitizeValueStrategy('escape');
    }

    /**
     * Set theme colours from material desing colour palette.
     * @inner
     * @memberof app.core
     * @function
     */
    function configureTheme() {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('cyan');
    }

    /**
     * Adds svg iconsets to the md icon provider.
     * @inner
     * @memberof app.core
     * @function
     */
    function configureIconsets() {
        // default icon set is needed because some of Angular Material directives have hardcoded svg icon names;
        // radio menu options use `check` icon which can be found in `navigation` icon set; since there is no easy way of overriding the icon name, the default icon set will have duplicates needed by such directives
        // NOTE use the gulp makesvgcache task to add new icons
        $mdIconProvider
            .defaultIconSet(iconTemplateUrls.default)
            .iconSet('action', iconTemplateUrls.action)
            .iconSet('alert', iconTemplateUrls.alert)
            .iconSet('communication', iconTemplateUrls.communication)
            .iconSet('community', iconTemplateUrls.community)
            .iconSet('content', iconTemplateUrls.content)
            .iconSet('editor', iconTemplateUrls.editor)
            .iconSet('file', iconTemplateUrls.file)
            .iconSet('hardware', iconTemplateUrls.hardware)
            .iconSet('image', iconTemplateUrls.image)
            .iconSet('maps', iconTemplateUrls.maps)
            .iconSet('navigation', iconTemplateUrls.navigation)
            .iconSet('social', iconTemplateUrls.social)
            .iconSet('toggle', iconTemplateUrls.toggle);
    }
}
