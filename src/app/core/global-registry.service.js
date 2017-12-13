/**
 * @name globalRegistry
 * @memberof app.core
 * @description
 *
 * The `globalRegistry` constant wraps around AV global registry for a single point of reference. Use this to access `AV` global.
 * It's useful if we need to change the name of the global registry.
 *
 */
angular
    .module('app.core')
    .constant('globalRegistry', window.AV);
