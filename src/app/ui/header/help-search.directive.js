const templateUrl = require('./help-search.html');

/**
 * @module avHelpSearch
 * @memberof app.ui
 * @restrict E
 * @description
 *
 * The `avHelpSearch` directive provides a search field for the help dialog.
 *
 */
angular
    .module('app.ui')
    .directive('avHelpSearch', avHelpSearch);

/**
 * `avHelpSearch` directive body.
 *
 * @function avHelpSearch
 * @return {object} directive body
 */
function avHelpSearch() {
    const directive = {
        restrict: 'E',
        templateUrl,
        controller: () => {}
    };

    return directive;
}
