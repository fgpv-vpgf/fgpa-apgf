/**
 * @module dynamicSelect
 * @memberof app.ui
 * @restrict A
 * @description handle link between field by populating enum for selection drop dpwn with value from another field
 *
 */
angular
    .module('app.ui')
    .directive('dynamicSelect', dynamicSelect);

/**
 * `dynamicSelect` directive body.
 *
 * @function dynamicSelect
 * @return {Object}     directive body
 */
function dynamicSelect() {
    const directive = {
        restrict: 'A',
        require: ['ngModel', '?^sfSchema'],
        scope: {
            test: '=',
            form: '=',
            model: '='
        },
        controller: Controller,
        controllerAs: 'self',
        bindToController: true
    }

    return directive;
}

/**
 * Dynamic Select directive Controller
 *
 * @function Controller
 * @param {Object} $scope Angular directive scope
 * @param {Object} sfSelect dynamic select object - not used
 */
function Controller($scope, sfSelect) {
    'ngInject';
    const self = this;
    const scope = $scope.$parent;

    scope.form.options = { };

    // set model
    let parent = scope.$parent;
    while (parent.hasOwnProperty('model')) {
        parent = parent.$parent;
    }

    if (scope.form.optionData) {
        scope.$parent.evalExpr('this').$watchCollection(scope.form.optionData, (newOptions, oldOptions) => {
            let options = {};
            if (angular.isArray(newOptions)) {
                options = (angular.isString(newOptions[0])) ? { enum: newOptions } : { titleMap: newOptions };
            }
            processOptions('data:' + scope.form.optionData, options, scope.form.selectedOption);
        });
    }

    /**
     * Set options for Dynamic Select
     *
     * @function processOptions
     * @private
     * @param {Object} optionSource Source for options - not used
     * @param {Array} data data options
     * @param {Array} current current options - not used
     */
    function processOptions(optionSource, data, current) {
        let enumTitleMap = [];

        if (data.enum && data.enum.length) {
            for (let i = 0; i < data.enum.length; i++) {
                if (data.enum[i] && data.enum[i].length) {
                    let values = data.enum[i].split('**/');
                    enumTitleMap.push({ name: values[0], value: values[1] });
                }
            }
            scope.form.options = enumTitleMap;
        }

        return;
    }
}
