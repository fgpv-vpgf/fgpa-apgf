/**
 *
 * @name formService
 * @module app.ui
 *
 * @description common JavaScript methods for forms
 *
 */
angular
    .module('app.ui')
    .factory('formService', formService);

function formService() {

    const service = {
        showAdvance
    };

    return service;

    /***/

    function showAdvance(form) {
        const elems = document.getElementsByTagName(`av-${form}`)[0].getElementsByClassName('av-form-advance');

        for (let elem of elems) {
            elem.classList.toggle('hidden');
        }
    }
}
