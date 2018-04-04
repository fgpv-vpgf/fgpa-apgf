/**
 * @name recursionService
 * @module app.core
 *
 * @description recursion service to update html tree
 *
 */
angular
    .module('app.core')
    .factory('recursionService', recursionService);

/**
 * Manually compiles the element, fixing the recursion loop.
 * @function recursionService
 * @param {Object} $compile compile html to template Angular object
 * @returns {Object}  service Angular object
 */
function recursionService($compile) {

    const service = {
        compile
    };

    return service;

    /***/

    /**
     * Manually compiles the element, fixing the recursion loop.
     * @function compile
     * @param {Object} element element for recursion
     * @param {Object} link A post-link function, or an object with function(s) registered via pre and post properties.
     * @returns {Object}    An object containing the linking functions.
     */
    function compile(element, link) {
        // Normalize the link parameter
        if (angular.isFunction(link)) {
            link = { post: link };
        }

        // Break the recursion loop by removing the contents
        const contents = element.contents().remove();
        let compiledContents;
        return {
            pre: (link && link.pre) ? link.pre : null,
            /**
             * Compiles and re-adds the contents
             * @param {Object} scope Angular scope
             * @param {Object} element element for recursion
             */
            post: (scope, element) => {
                // Compile the contents
                if (!compiledContents) {
                    compiledContents = $compile(contents);
                }
                // Re-add the compiled contents to the element
                compiledContents(scope, clone => element.append(clone));

                // Call the post-linking function, if any
                if (link && link.post) {
                    link.post.apply(null, arguments);
                }
            }
        };
    }
}
